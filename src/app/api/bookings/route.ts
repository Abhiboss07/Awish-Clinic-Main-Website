import { NextResponse } from "next/server";
import type { BookingPayload } from "@/lib/cms";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getBookingSlotCount } from "@/lib/cmsData";

function cleanPhone(value: string) {
  return value.replace(/[^\d]/g, "");
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured yet." },
      { status: 503 }
    );
  }

  const service = createSupabaseServiceClient();

  if (!service) {
    return NextResponse.json(
      { error: "Supabase service client is unavailable." },
      { status: 503 }
    );
  }

  const payload = (await request.json()) as BookingPayload;
  const name = payload.name?.trim();
  const phone = cleanPhone(payload.phone ?? "");
  const email = payload.email?.trim() || null;
  const preferredDate = payload.preferredDate?.trim() || null;
  const preferredTime = payload.preferredTime?.trim() || null;
  const source = payload.source ?? "contact";

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }

  if (!/^\d{10,13}$/.test(phone)) {
    return NextResponse.json(
      { error: "Enter a valid phone number." },
      { status: 400 }
    );
  }

  if (source === "appointment" && (!preferredDate || !preferredTime)) {
    return NextResponse.json(
      { error: "Please choose both preferred date and preferred time." },
      { status: 400 }
    );
  }

  if (preferredDate && preferredTime) {
    const count = await getBookingSlotCount(preferredDate, preferredTime);

    if (count >= 3) {
      return NextResponse.json(
        {
          error:
            "This slot is already full. Please choose another date or time.",
          slotCount: count,
          remaining: 0,
        },
        { status: 409 }
      );
    }
  }

  const { data, error } = await service
    .from("bookings")
    .insert({
      source,
      name,
      phone,
      email,
      service: payload.service?.trim() || null,
      message: payload.message?.trim() || null,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
      status: "pending",
    })
    .select("id, preferred_date, preferred_time")
    .single();

  if (error) {
    return NextResponse.json(
      { error: "The booking could not be saved right now." },
      { status: 500 }
    );
  }

  let remaining = 3;

  if (data?.preferred_date && data?.preferred_time) {
    const count = await getBookingSlotCount(
      data.preferred_date as string,
      data.preferred_time as string
    );
    remaining = Math.max(0, 3 - count);
  }

  return NextResponse.json({
    success: true,
    id: data.id,
    remaining,
  });
}
