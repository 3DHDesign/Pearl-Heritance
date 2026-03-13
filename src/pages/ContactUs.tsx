 
import { useEffect, useState } from "react";
import PageHero from "../components/PageHero";
import { getContactPage } from "../api/contact";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";
import { HiOutlineArrowUp } from "react-icons/hi";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

type ContactData = Awaited<ReturnType<typeof getContactPage>>["data"];

export default function ContactUs() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [contactData, setContactData] = useState<ContactData | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await getContactPage();
        setContactData(res.data);
      } catch (error) {
        console.error("Contact API failed:", error);
      }
    };

    fetchContact();
  }, []);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form:", form);
    alert("Message submitted successfully! We'll get back to you soon.");
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="bg-[var(--bg)]">
      <PageHero
        title="Contact Us"
        bgImage={contactData?.hero_image || ""}
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact Us" }]}
      />

      <div className="absolute left-0 top-96 w-64 h-64 bg-[var(--sky)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-96 w-80 h-80 bg-[var(--navy)]/5 rounded-full blur-3xl pointer-events-none" />

      <section className="container-wide mx-auto px-4 py-16 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-10">

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-[var(--border)] shadow-lg">
              {contactData?.map_embed_url && (
                <iframe
                  title="Google Map"
                  src={contactData.map_embed_url}
                  className="w-full h-[350px] md:h-[400px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
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
                    className="h-14 w-full rounded-xl bg-[var(--surface)] border border-[var(--border)] px-5"
                    required
                  />
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={onChange}
                    placeholder="Last Name"
                    className="h-14 w-full rounded-xl bg-[var(--surface)] border border-[var(--border)] px-5"
                    required
                  />
                </div>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="Email Address"
                  className="h-14 w-full rounded-xl bg-[var(--surface)] border border-[var(--border)] px-5"
                  required
                />

                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="Phone Number"
                  className="h-14 w-full rounded-xl bg-[var(--surface)] border border-[var(--border)] px-5"
                />

                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Your Message"
                  rows={6}
                  className="w-full rounded-xl bg-[var(--surface)] border border-[var(--border)] px-5 py-4"
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

          {/* RIGHT */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="rounded-3xl border border-[var(--border)] bg-white shadow-xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-[var(--navy)] to-[var(--sky)]" />
                <div className="p-8 space-y-8">

                  <div>
                    <p className="text-xs font-medium uppercase text-[var(--muted)] mb-2 flex items-center gap-2">
                      <FaEnvelope className="text-[var(--sky)]" />
                      Email
                    </p>
                    <a
                      href={`mailto:${contactData?.contact_details.email}`}
                      className="heading-font text-lg font-semibold text-[var(--navy)]"
                    >
                      {contactData?.contact_details.email}
                    </a>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

                  <div>
                    <p className="text-xs font-medium uppercase text-[var(--muted)] mb-2 flex items-center gap-2">
                      <FaPhone className="text-[var(--sky)]" />
                      Contact Us
                    </p>
                    <a
                      href={`tel:${contactData?.contact_details.phone}`}
                      className="heading-font text-lg font-semibold text-[var(--navy)]"
                    >
                      {contactData?.contact_details.phone}
                    </a>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

                  <div>
                    <p className="text-xs font-medium uppercase text-[var(--muted)] mb-2 flex items-center gap-2">
                      <FaLocationDot className="text-[var(--sky)]" />
                      Our Address
                    </p>
                    <address className="not-italic text-[var(--navy)]">
                      {contactData?.contact_details.address}
                    </address>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

                  <div>
                    <p className="text-xs font-medium uppercase text-[var(--muted)] mb-4">
                      Follow Us
                    </p>
                    <div className="flex gap-3">
                      <SocialBtn icon={<FaFacebookF />} href={contactData?.social_links.facebook || "#"} />
                      <SocialBtn icon={<FaInstagram />} href={contactData?.social_links.instagram || "#"} />
                      <SocialBtn icon={<FaXTwitter />} href={contactData?.social_links.linkedin || "#"} />
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
      className="group h-12 w-12 rounded-xl bg-[var(--surface)] border border-[var(--border)] grid place-items-center text-[var(--navy)] hover:bg-[var(--navy)] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
    >
      {icon}
    </a>
  );
} 