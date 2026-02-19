import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What Services Do You Offer?",
    answer:
      "We provide architectural design, interior design, renovation planning, space optimization, and project consultation services tailored to residential and commercial needs.",
  },
  {
    id: 2,
    question: "How Long Does A Typical Project Take?",
    answer:
      "Project timelines vary depending on scope, complexity, and approvals. On average, design projects may take 2–6 weeks, while full builds depend on construction phases.",
  },
  {
    id: 3,
    question: "Can You Work Within My Budget?",
    answer:
      "Yes, we carefully plan each project to match your budget, offering creative design solutions while ensuring high quality and functional results.",
  },
  {
    id: 4,
    question: "What Makes Your Design Approach Unique?",
    answer:
      "Our design philosophy balances aesthetics, practicality, sustainability, and client lifestyle — creating spaces that are both visually striking and highly functional.",
  },
];

export default function FAQSection() {
  const [activeId, setActiveId] = useState<number | null>(3);

  const toggleFAQ = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10">
        
        {/* Left Image / Card */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="https://images.pexels.com/photos/261146/pexels-photo-261146.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Architectural Interior"
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-lg p-5 max-w-xs">
            <div className="flex items-center gap-2 text-[#8B5E3C] mb-2">
              <span className="text-lg">💬</span>
              <span className="text-sm font-medium">FAQ</span>
            </div>
            <h3 className="text-lg font-semibold leading-snug">
              Relax, We’ve Got <br /> The Answers
            </h3>
          </div>
        </div>

        {/* Right FAQ */}
        <div>
          <p className="text-sm text-gray-500 mb-2">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Professional Insights For <br />
            Confident Decisions
          </h2>

          <div className="space-y-4">
            {faqData.map((item) => {
              const isActive = activeId === item.id;

              return (
                <div
                  key={item.id}
                  className="border-b border-gray-200 pb-4"
                >
                  <button
                    onClick={() => toggleFAQ(item.id)}
                    className="w-full flex justify-between items-center text-left"
                  >
                    <span
                      className={`text-lg font-medium ${
                        isActive ? "text-[#8B5E3C]" : "text-black"
                      }`}
                    >
                      {item.id}. {item.question}
                    </span>

                    <FiArrowUpRight
                      className={`text-xl transition-transform duration-300 ${
                        isActive ? "rotate-45 text-[#8B5E3C]" : "text-gray-500"
                      }`}
                    />
                  </button>

                  {isActive && (
                    <p className="mt-3 text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
