import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa"; // adjust path as needed
import { getContactPage } from "../../api/contact";

export default function WhatsAppButton() {
  const [whatsapp, setWhatsapp] = useState<{
    number: string;
    message: string | null;
  } | null>(null);

  useEffect(() => {
    getContactPage()
      .then((res) => {
        setWhatsapp(res.data.header_contact_strip.whatsapp);
      })
      .catch(console.error);
  }, []);

  if (!whatsapp) return null;

  const href = `https://wa.me/${whatsapp.number.replace(/\D/g, "")}${
    whatsapp.message
      ? `?text=${encodeURIComponent(whatsapp.message)}`
      : ""
  }`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-6 right-6 z-50
        w-14 h-14
        flex items-center justify-center
        rounded-full
        bg-green-500 hover:bg-green-600
        text-white text-2xl
        shadow-lg
        transition-all duration-300
        hover:scale-110
      "
    >
      <FaWhatsapp />
    </a>
  );
}