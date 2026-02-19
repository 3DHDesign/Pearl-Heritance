import { useMemo, useState } from "react";
import PageHero from "../components/PageHero";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

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
    // ✅ your address (Pearl Heritage image)
    const address = encodeURIComponent(
      "No. 253 B, 1/1, Stanley Thilakarathne Road, Nugegoda, Sri Lanka"
    );

    // NOTE: No API key needed for embed iframe.
    return `https://www.google.com/maps?q=${address}&output=embed`;
  }, []);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // for now just console log / later connect to backend
    console.log("Contact form:", form);
    alert("Message submitted (demo). Connect backend to send email.");
    setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="bg-white">
      <PageHero
        title="Contact Us"
        bgImage="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=2000&q=80"
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact Us" }]}
      />

      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT: map + form */}
          <div className="lg:col-span-2">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
              <iframe
                title="Google Map"
                src={mapEmbed}
                className="w-full h-[320px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Form */}
            <div className="mt-10">
              <p className="text-xs tracking-[0.22em] uppercase text-[#8B5E3C]">
                Contact Us
              </p>
              <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                Let’s Design Spaces That
                <br className="hidden md:block" />
                Reflect Your Lifestyle
              </h2>

              <form onSubmit={submit} className="mt-10 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={onChange}
                    placeholder="First Name"
                    className="h-12 w-full rounded-2xl bg-gray-50 border border-gray-200 px-4 outline-none focus:border-[#8B5E3C]"
                    required
                  />
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={onChange}
                    placeholder="Last Name"
                    className="h-12 w-full rounded-2xl bg-gray-50 border border-gray-200 px-4 outline-none focus:border-[#8B5E3C]"
                    required
                  />
                </div>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="Email Address"
                  className="h-12 w-full rounded-2xl bg-gray-50 border border-gray-200 px-4 outline-none focus:border-[#8B5E3C]"
                  required
                />

                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="Phone Number"
                  className="h-12 w-full rounded-2xl bg-gray-50 border border-gray-200 px-4 outline-none focus:border-[#8B5E3C]"
                />

                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Your Message"
                  rows={6}
                  className="w-full rounded-2xl bg-gray-50 border border-gray-200 px-4 py-3 outline-none focus:border-[#8B5E3C] resize-none"
                  required
                />

                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-[#8B5E3C] text-white font-semibold px-8 h-12 hover:opacity-90"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: details card */}
          <aside className="lg:col-span-1">
            <div className="rounded-3xl border border-gray-200 bg-gray-50 overflow-hidden">
              <div className="h-10 bg-[#8B5E3C]" />
              <div className="p-8 space-y-8">
                <InfoRow label="Email" value="info@pearlhe.com" />
                <Divider />
                <InfoRow label="Contact Us" value="(+94) 114 23 69 52" />
                <Divider />
                <InfoRow
                  label="Our Address"
                  value="No. 253 B, 1/1, Stanley Thilakarathne Road, Nugegoda, Sri Lanka."
                />

                <div className="pt-2 flex gap-3">
                  <SocialBtn icon={<FaFacebookF />} />
                  <SocialBtn icon={<FaInstagram />} />
                  <SocialBtn icon={<FaXTwitter />} />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-gray-200" />;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="mt-2 text-gray-900 font-extrabold text-lg leading-snug">
        {value}
      </p>
    </div>
  );
}

function SocialBtn({ icon }: { icon: React.ReactNode }) {
  return (
    <button
      type="button"
      className="h-12 w-12 rounded-xl bg-white border border-gray-200 grid place-items-center text-[#8B5E3C] hover:bg-gray-50"
      aria-label="social"
    >
      {icon}
    </button>
  );
}
