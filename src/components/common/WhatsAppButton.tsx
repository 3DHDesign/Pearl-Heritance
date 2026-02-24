import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/94773523040"
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