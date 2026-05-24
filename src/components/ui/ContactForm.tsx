"use client";

import { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { services } from "@/data/services";

interface FormData {
  name: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  service?: string;
}

interface ContactFormProps {
  className?: string;
  preselectedService?: string;
}

export default function ContactForm({
  className = "",
  preselectedService,
}: ContactFormProps) {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    service: preselectedService || "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = form.phone.replace(/[\s\-+]/g, "").replace(/^91/, "");
    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!form.service) {
      newErrors.service = "Please select a service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const serviceName =
      services.find((s) => s.slug === form.service)?.name || form.service;

    const text = `Hi, I'm ${form.name}.%0AI'm interested in *${serviceName}*.%0APhone: ${form.phone}${
      form.message ? `%0AMessage: ${form.message}` : ""
    }`;

    const whatsappNumber = siteConfig.whatsapp.replace(/[^0-9]/g, "");
    window.open(
      `https://wa.me/${whatsappNumber}?text=${text}`,
      "_blank"
    );
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputBase =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors";

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 ${className}`}
      noValidate
    >
      {/* Name */}
      <div>
        <label htmlFor="cf-name" className="block text-sm font-medium text-slate-700 mb-1">
          Name *
        </label>
        <input
          id="cf-name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          className={`${inputBase} ${errors.name ? "border-red-400" : ""}`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="cf-phone" className="block text-sm font-medium text-slate-700 mb-1">
          Phone *
        </label>
        <input
          id="cf-phone"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="10-digit mobile number"
          className={`${inputBase} ${errors.phone ? "border-red-400" : ""}`}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
        )}
      </div>

      {/* Service */}
      <div>
        <label htmlFor="cf-service" className="block text-sm font-medium text-slate-700 mb-1">
          Service *
        </label>
        <select
          id="cf-service"
          name="service"
          value={form.service}
          onChange={handleChange}
          className={`${inputBase} ${errors.service ? "border-red-400" : ""}`}
        >
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="mt-1 text-sm text-red-500">{errors.service}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="cf-message" className="block text-sm font-medium text-slate-700 mb-1">
          Message (optional)
        </label>
        <textarea
          id="cf-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={3}
          placeholder="Tell us about your concern..."
          className={inputBase}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-emerald-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 flex items-center justify-center gap-2 cursor-pointer"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Send via WhatsApp
      </button>
    </form>
  );
}
