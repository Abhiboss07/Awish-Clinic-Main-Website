import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getBookingSlotCount } from "@/lib/cmsData";

export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        available: false,
        remaining: 0,
        count: 0,
        error: "Supabase is not configured yet.",
      },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date")?.trim();
  const time = searchParams.get("time")?.trim();

  if (!date || !time) {
    return NextResponse.json(
      { error: "Both date and time are required." },
      { status: 400 }
    );
  }

  const count = await getBookingSlotCount(date, time);

  return NextResponse.json({
    available: count < 3,
    count,
    remaining: Math.max(0, 3 - count),
  });
}
