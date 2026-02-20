import { useMemo, useState } from "react";
import PageHero from "../components/PageHero";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FaLocationDot, FaPhone, FaEnvelope } from "react-icons/fa6";
import { HiOutlineArrowUp } from "react-icons/hi";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

export default function ContactUs() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const mapEmbed = useMemo(() => {
    const address = encodeURIComponent(
      "No. 253 B, 1/1, Stanley Thilakarathne Road, Nugegoda, Sri Lanka"
    );
    return `https://www.google.com/maps?q=${address}&output=embed`;
  }, []);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form:", form);
    alert("Message submitted successfully! We'll get back to you soon.");
    setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="bg-[var(--bg)]">
      <PageHero
        title="Contact Us"
        bgImage="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=2000&q=80"
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact Us" }]}
      />

      {/* Decorative elements */}
      <div className="absolute left-0 top-96 w-64 h-64 bg-[var(--sky)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-96 w-80 h-80 bg-[var(--navy)]/5 rounded-full blur-3xl pointer-events-none" />

      <section className="container-wide mx-auto px-4 py-16 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
          
          {/* LEFT: map + form */}
          <div className="lg:col-span-2 space-y-10">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-[var(--border)] shadow-lg">
              <iframe
                title="Google Map"
                src={mapEmbed}
                className="w-full h-[350px] md:h-[400px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Form */}
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--sky)] opacity-40" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--sky)]" />
                </span>
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--muted)]">
                  Get In Touch
                </span>
              </div>

              <h2 className="heading-font text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--navy)] leading-tight">
                Let's Design Spaces That
                <br className="hidden md:block" />
                <span className="text-[var(--sky)]">Reflect Your Lifestyle</span>
              </h2>

              <form onSubmit={submit} className="mt-10 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={onChange}
                    placeholder="First Name"
                    className="h-14 w-full rounded-xl bg-[var(--surface)] border border-[var(--border)] px-5 outline-none focus:border-[var(--sky)] focus:ring-1 focus:ring-[var(--sky)] transition-all duration-200 font-body"
                    required
                  />
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={onChange}
                    placeholder="Last Name"
                    className="h-14 w-full rounded-xl bg-[var(--surface)] border border-[var(--border)] px-5 outline-none focus:border-[var(--sky)] focus:ring-1 focus:ring-[var(--sky)] transition-all duration-200 font-body"
                    required
                  />
                </div>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="Email Address"
                  className="h-14 w-full rounded-xl bg-[var(--surface)] border border-[var(--border)] px-5 outline-none focus:border-[var(--sky)] focus:ring-1 focus:ring-[var(--sky)] transition-all duration-200 font-body"
                  required
                />

                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="Phone Number"
                  className="h-14 w-full rounded-xl bg-[var(--surface)] border border-[var(--border)] px-5 outline-none focus:border-[var(--sky)] focus:ring-1 focus:ring-[var(--sky)] transition-all duration-200 font-body"
                />

                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Your Message"
                  rows={6}
                  className="w-full rounded-xl bg-[var(--surface)] border border-[var(--border)] px-5 py-4 outline-none focus:border-[var(--sky)] focus:ring-1 focus:ring-[var(--sky)] transition-all duration-200 font-body resize-none"
                  required
                />

                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--navy)] text-white font-semibold px-8 h-14 hover:bg-[var(--sky)] transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Send Message
                  <HiOutlineArrowUp className="text-lg rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: details card */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="rounded-3xl border border-[var(--border)] bg-white shadow-xl overflow-hidden">
                {/* Header gradient */}
                <div className="h-2 bg-gradient-to-r from-[var(--navy)] to-[var(--sky)]" />
                
                <div className="p-8 space-y-8">
                  {/* Email */}
                  <div className="group">
                    <p className="text-xs font-medium tracking-wider uppercase text-[var(--muted)] mb-2 flex items-center gap-2">
                      <FaEnvelope className="text-[var(--sky)]" />
                      Email
                    </p>
                    <a 
                      href="mailto:info@pearlheritance.com"
                      className="heading-font text-lg font-semibold text-[var(--navy)] group-hover:text-[var(--sky)] transition-colors"
                    >
                      info@pearlheritance.com
                    </a>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

                  {/* Phone */}
                  <div className="group">
                    <p className="text-xs font-medium tracking-wider uppercase text-[var(--muted)] mb-2 flex items-center gap-2">
                      <FaPhone className="text-[var(--sky)]" />
                      Contact Us
                    </p>
                    <a 
                      href="tel:+94114236952"
                      className="heading-font text-lg font-semibold text-[var(--navy)] group-hover:text-[var(--sky)] transition-colors"
                    >
                      (+94) 114 23 69 52
                    </a>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

                  {/* Address */}
                  <div className="group">
                    <p className="text-xs font-medium tracking-wider uppercase text-[var(--muted)] mb-2 flex items-center gap-2">
                      <FaLocationDot className="text-[var(--sky)]" />
                      Our Address
                    </p>
                    <address className="not-italic text-[var(--navy)] font-body leading-relaxed">
                      No. 253 B, 1/1,<br />
                      Stanley Thilakarathne Road,<br />
                      Nugegoda, Sri Lanka.
                    </address>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

                  {/* Social Media */}
                  <div>
                    <p className="text-xs font-medium tracking-wider uppercase text-[var(--muted)] mb-4">
                      Follow Us
                    </p>
                    <div className="flex gap-3">
                      <SocialBtn icon={<FaFacebookF />} href="#" />
                      <SocialBtn icon={<FaInstagram />} href="#" />
                      <SocialBtn icon={<FaXTwitter />} href="#" />
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="bg-[var(--surface)] rounded-xl p-4 border border-[var(--border)]">
                    <p className="text-xs font-medium uppercase text-[var(--muted)] mb-2">
                      Business Hours
                    </p>
                    <p className="text-sm text-[var(--navy)] font-medium">
                      Mon - Fri: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-sm text-[var(--navy)]">
                      Sat: 9:00 AM - 1:00 PM
                    </p>
                    <p className="text-sm text-[var(--muted)] mt-1">
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 bg-[var(--surface)] rounded-full px-6 py-3 border border-[var(--border)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--sky)] opacity-40" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--sky)]" />
            </span>
            <span className="text-sm text-[var(--muted)]">
              Prefer email? We typically respond within 24 hours
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

function SocialBtn({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group h-12 w-12 rounded-xl bg-[var(--surface)] border border-[var(--border)] grid place-items-center text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white hover:border-[var(--navy)] transition-all duration-300 shadow-sm hover:shadow-lg"
      aria-label="social link"
    >
      <span className="group-hover:scale-110 transition-transform">
        {icon}
      </span>
    </a>
  );
}