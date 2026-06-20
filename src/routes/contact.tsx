import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { SocialIcons } from "@/components/SiteFooter";
import touchEarth from "@/assets/touch-earth.jpg";

const schema = z.object({
  name: z.string().trim().min(2, "Please share your name").max(80),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Valid email required").max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(10, "A few more words please").max(3000, "Character limit exceeded"),
});
type FormData = z.infer<typeof schema>;

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [sent, setSent] = useState(false);

  const messageVal = watch("message") || "";
  const maxWords = 250;
  const words = messageVal.trim() === "" ? 0 : messageVal.trim().split(/\s+/).length;

  const { onChange: onMessageChange, ...messageRegisterRest } = register("message");

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    const currentWords = val.trim() === "" ? 0 : val.trim().split(/\s+/).length;
    if (currentWords > maxWords) {
      const match = val.match(new RegExp(`^\\s*(?:\\S+\\s+){0,${maxWords - 1}}\\S+\\s*`));
      if (match) {
        if (match[0] === messageVal) {
          e.target.value = messageVal;
        } else {
          setValue("message", match[0], { shouldValidate: true, shouldDirty: true });
          e.target.value = match[0];
        }
      } else {
        e.target.value = messageVal;
      }
      return;
    }
    onMessageChange(e);
  };

  const onSubmit = async (data: FormData) => {
    // Static submission: open mail client with prefilled body.
    const body = `Name: ${data.name}%0D%0ACompany: ${data.company ?? ""}%0D%0AEmail: ${data.email}%0D%0APhone: ${data.phone ?? ""}%0D%0A%0D%0A${encodeURIComponent(data.message)}`;
    window.location.href = `mailto:info@phytohealthorganics.com?subject=${encodeURIComponent("Inquiry from " + data.name)}&body=${body}`;
    setSent(true);
    reset();
  };

  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-20">
        <div className="absolute inset-0 -z-10">
          <img src={touchEarth} alt="" className="h-full w-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/60 via-cream/80 to-cream" />
        </div>
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-12">
          <span className="text-[10px] uppercase tracking-[0.5em] text-turmeric">Talk to us</span>
          <h1 className="mt-4 text-display text-[clamp(44px,7vw,120px)] leading-[0.98] text-forest-deep">
            Let's <em className="not-italic shimmer-text">collaborate</em>.
          </h1>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-12 space-y-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl glass p-8 lg:p-10 [border-top:none]">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Field label="Your name" error={errors.name?.message}>
                <input {...register("name")} className="ayra-input" placeholder="Asha Patel" />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Company (optional)" error={errors.company?.message}>
                  <input {...register("company")} className="ayra-input" placeholder="Your brand" />
                </Field>
                <Field label="Phone (optional)" error={errors.phone?.message}>
                  <input {...register("phone")} className="ayra-input" placeholder="+91 ..." />
                </Field>
              </div>
              <Field label="Email" error={errors.email?.message}>
                <input {...register("email")} type="email" className="ayra-input" placeholder="you@brand.com" />
              </Field>
              <Field label="Message" error={errors.message?.message}>
                <textarea 
                  {...messageRegisterRest} 
                  onChange={handleMessageChange}
                  maxLength={3000}
                  rows={5} 
                  className="ayra-input resize-none" 
                  placeholder="Tell us about the powder, quantity and timeline you're considering..." 
                />
                <div className="mt-1.5 text-right text-xs text-forest-deep/40">
                  {words}/{maxWords} word{words !== 1 ? 's' : ''}
                </div>
              </Field>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <MagneticButton type="submit" variant="primary">{isSubmitting ? "Sending..." : "Send Message"}</MagneticButton>
                {sent && <span className="text-sm text-forest">Opening your mail client…</span>}
              </div>
              <style>{`.ayra-input { width:100%; border-radius: 1rem; background: oklch(1 0 0 / 0.6); border: 1px solid oklch(0.36 0.07 156 / 0.15); padding: 0.85rem 1rem; font-size: 0.95rem; color: oklch(0.2 0.04 158); outline: none; transition: all .25s; }
              .ayra-input:focus { border-color: oklch(0.86 0.17 82); box-shadow: 0 0 0 4px oklch(0.86 0.17 82 / 0.18); }`}</style>
            </form>
          </motion.div>

          <div className="lg:col-span-5 space-y-4">
            <a href="https://wa.me/917899868441" target="_blank" rel="noreferrer"
              className="block rounded-3xl bg-[oklch(0.7_0.16_150)] p-7 text-cream shadow-soft hover:scale-[1.01] transition">
              <div className="text-[10px] uppercase tracking-[0.4em] opacity-80">WhatsApp</div>
              <div className="mt-2 text-display text-2xl">+91 78998 68441</div>
              <div className="mt-2 text-sm opacity-90">Chat with our team — fastest response.</div>
            </a>
            <a href="mailto:info@phytohealthorganics.com" className="block rounded-3xl bg-forest p-7 text-cream shadow-soft">
              <div className="text-[10px] uppercase tracking-[0.4em] text-turmeric-glow">Email</div>
              <div className="mt-2 text-display text-2xl break-all">info@phytohealthorganics.com</div>
              <div className="mt-2 text-sm text-cream/80">For samples, pricing & specifications.</div>
            </a>
            <div className="rounded-3xl bg-forest-deep p-7 text-cream">
              <div className="text-[10px] uppercase tracking-[0.4em] text-turmeric-glow">Follow Us</div>
              <p className="mt-2 text-sm text-cream/70">Stay connected for updates, new products and organic living tips.</p>
              <SocialIcons className="mt-5 [&_a]:border-cream/25 [&_a]:bg-cream/10 [&_a:hover]:border-turmeric/70 [&_a:hover]:bg-cream/20" />
            </div>
            <div className="rounded-3xl glass p-7 sm:col-span-2 lg:col-span-1">
              <div className="text-[10px] uppercase tracking-[0.4em] text-turmeric">Visit</div>
              <div className="mt-2 text-display text-2xl text-forest-deep">Phyto Health Organics</div>
              <p className="mt-2 text-sm text-forest-deep/70">Telangana, India</p>
              <div className="mt-4 overflow-hidden rounded-2xl">
                <iframe
                  title="Phyto Health Organics location"
                  src="https://www.google.com/maps?q=Telangana,+India&output=embed"
                  className="h-56 w-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.3em] text-forest-deep/70">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
