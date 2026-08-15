"use client";

import { useState, type FormEvent } from "react";
import { pb, LISTINGS_COLLECTION } from "@/lib/pocketbase";

const PROPERTY_TYPES = ["شقة", "فيلا", "أرض", "مكتب", "محل تجاري", "مستودع", "بناء كامل"];

type Status = "idle" | "submitting" | "success" | "error";

export default function ListPropertyPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: a field real users never see or fill. Bots that blindly
    // fill every input will trip this, and we silently pretend success.
    if (data.get("website")) {
      setStatus("success");
      return;
    }

    // Mirror the same value into both city fields since the schema stores
    // an Arabic-labeled duplicate (city / cityAr) with identical content
    // on every existing record.
    const cityValue = data.get("city");
    if (cityValue) data.set("cityAr", cityValue);

    // Always forced to pending regardless of what's in the form — matches
    // the Create API rule (@request.data.status = "pending") so a listing
    // never goes live without review.
    data.set("status", "pending");
    data.delete("website");

    setStatus("submitting");
    setErrorMessage("");

    try {
      await pb().collection(LISTINGS_COLLECTION).create(data);
      setStatus("success");
      form.reset();
    } catch (err) {
      console.error("Submission failed", err);
      setStatus("error");
      setErrorMessage(
        "حدث خطأ أثناء إرسال العقار. تأكد من تعبئة الحقول المطلوبة وحاول مرة أخرى."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal/10 text-teal">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold text-ink">
          تم إرسال عقارك بنجاح
        </h1>
        <p className="mt-3 text-ink-soft">
          سيقوم فريق بيتي بمراجعة التفاصيل، وسيظهر عقارك على الموقع بعد
          الموافقة عليه خلال يوم أو يومين.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 rounded-xl bg-teal px-6 py-3 font-body text-sm font-semibold text-cream transition hover:bg-teal-light"
        >
          إضافة عقار آخر
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <p className="text-clay">أضف عقارك</p>
      <h1 className="font-display text-4xl font-bold text-ink">
        أعلن عن عقارك على بيتي
      </h1>
      <p className="mt-3 text-ink-soft">
        عبّئ التفاصيل التالية، وسيقوم فريقنا بمراجعة الإعلان قبل نشره على
        الموقع.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-8">
        {/* Honeypot — hidden from real users via CSS, bots fill every field */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label>
            الموقع الإلكتروني
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <fieldset className="space-y-5 rounded-2xl border border-line bg-cream p-6 shadow-card">
          <legend className="px-1 font-display text-lg text-ink">
            نوع العرض
          </legend>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-line px-4 py-3 has-[:checked]:border-clay has-[:checked]:bg-clay/5">
              <input type="radio" name="goal" value="sale" required className="accent-clay" />
              <span className="font-body text-sm text-ink">للبيع</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-line px-4 py-3 has-[:checked]:border-clay has-[:checked]:bg-clay/5">
              <input type="radio" name="goal" value="rent" required className="accent-clay" />
              <span className="font-body text-sm text-ink">للإيجار</span>
            </label>
          </div>
        </fieldset>

        <fieldset className="space-y-5 rounded-2xl border border-line bg-cream p-6 shadow-card">
          <legend className="px-1 font-display text-lg text-ink">
            تفاصيل العقار
          </legend>

          <div>
            <label className="mb-1 block text-sm font-medium text-ink">
              عنوان الإعلان
            </label>
            <input
              type="text"
              name="titleAr"
              required
              placeholder="مثال: شقة مفروشة للإيجار في المزة"
              className="w-full rounded-lg border border-line bg-cream px-4 py-2.5 font-body text-ink placeholder:text-ink/35 focus:border-clay focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-ink">
              نوع العقار
            </label>
            <select
              name="type"
              required
              defaultValue=""
              className="w-full rounded-lg border border-line bg-cream px-4 py-2.5 font-body text-ink focus:border-clay focus:outline-none"
            >
              <option value="" disabled>
                اختر النوع
              </option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-ink">
                المدينة
              </label>
              <input
                type="text"
                name="city"
                required
                placeholder="دمشق"
                className="w-full rounded-lg border border-line bg-cream px-4 py-2.5 font-body text-ink placeholder:text-ink/35 focus:border-clay focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-ink">
                الحي / المنطقة
              </label>
              <input
                type="text"
                name="addressAr"
                placeholder="المزة، أوتستراد"
                className="w-full rounded-lg border border-line bg-cream px-4 py-2.5 font-body text-ink placeholder:text-ink/35 focus:border-clay focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-ink">
                غرف النوم
              </label>
              <input
                type="number"
                name="rooms"
                min="0"
                dir="ltr"
                className="w-full rounded-lg border border-line bg-cream px-4 py-2.5 font-mono text-ink focus:border-clay focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-ink">
                الحمامات
              </label>
              <input
                type="number"
                name="bathrooms"
                min="0"
                dir="ltr"
                className="w-full rounded-lg border border-line bg-cream px-4 py-2.5 font-mono text-ink focus:border-clay focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-ink">
                المساحة (م²)
              </label>
              <input
                type="number"
                name="area"
                min="0"
                dir="ltr"
                className="w-full rounded-lg border border-line bg-cream px-4 py-2.5 font-mono text-ink focus:border-clay focus:outline-none"
              />
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-2">
            <input type="checkbox" name="hasBalcony" value="true" className="accent-clay" />
            <span className="text-sm text-ink">يحتوي على بلكون</span>
          </label>
        </fieldset>

        <fieldset className="space-y-5 rounded-2xl border border-line bg-cream p-6 shadow-card">
          <legend className="px-1 font-display text-lg text-ink">السعر</legend>
          <div className="grid grid-cols-[2fr_1fr] gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-ink">
                السعر
              </label>
              <input
                type="number"
                name="price"
                min="0"
                required
                dir="ltr"
                className="w-full rounded-lg border border-line bg-cream px-4 py-2.5 font-mono text-ink focus:border-clay focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-ink">
                العملة
              </label>
              <select
                name="currency"
                defaultValue="SYP"
                className="w-full rounded-lg border border-line bg-cream px-4 py-2.5 font-body text-ink focus:border-clay focus:outline-none"
              >
                <option value="SYP">ليرة سورية</option>
                <option value="USD">دولار أمريكي</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-5 rounded-2xl border border-line bg-cream p-6 shadow-card">
          <legend className="px-1 font-display text-lg text-ink">الصور</legend>
          <div>
            <label className="mb-1 block text-sm font-medium text-ink">
              صور العقار
            </label>
            <input
              type="file"
              name="imageUrl"
              accept="image/*"
              multiple
              className="w-full rounded-lg border border-line bg-cream px-4 py-2.5 font-body text-sm text-ink file:mr-4 file:rounded-lg file:border-0 file:bg-teal/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-teal"
            />
            <p className="mt-1 text-xs text-ink-soft">
              يمكنك اختيار أكثر من صورة واحدة
            </p>
          </div>
        </fieldset>

        <fieldset className="space-y-5 rounded-2xl border border-line bg-cream p-6 shadow-card">
          <legend className="px-1 font-display text-lg text-ink">
            معلومات التواصل
          </legend>
          <p className="text-xs text-ink-soft">
            لن تظهر هذه المعلومات على الموقع، وتُستخدم فقط ليتواصل فريق بيتي
            معك بخصوص الإعلان.
          </p>
          <div>
            <label className="mb-1 block text-sm font-medium text-ink">
              الاسم
            </label>
            <input
              type="text"
              name="contactName"
              className="w-full rounded-lg border border-line bg-cream px-4 py-2.5 font-body text-ink focus:border-clay focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-ink">
              رقم الهاتف
            </label>
            <input
              type="tel"
              name="contactPhone"
              required
              dir="ltr"
              placeholder="09xxxxxxxx"
              className="w-full rounded-lg border border-line bg-cream px-4 py-2.5 text-end font-mono text-ink placeholder:text-ink/35 focus:border-clay focus:outline-none"
            />
          </div>
        </fieldset>

        {status === "error" && (
          <p className="rounded-xl bg-clay/10 px-4 py-3 text-sm text-clay-dark">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-xl bg-clay py-3.5 font-body text-sm font-semibold text-cream transition duration-300 ease-smooth hover:bg-clay-dark hover:shadow-md disabled:opacity-60"
        >
          {status === "submitting" ? "جارٍ الإرسال..." : "إرسال العقار للمراجعة"}
        </button>
      </form>
    </div>
  );
}
