import { useState } from "react";
import { FiArrowUpRight, FiHelpCircle } from "react-icons/fi";

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
  const [activeId, setActiveId] = useState<number | null>(faqData[0].id);

  const toggleFAQ = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="w-full   py-20 md:py-28 overflow-hidden">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left side – image with decorative elements */}
          <div className="relative">
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/261146/pexels-photo-261146.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Architectural Interior"
                className="w-full h-[500px] md:h-[550px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/30 via-transparent to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 md:right-6 bg-white rounded-2xl shadow-2xl p-6 max-w-[280px] border border-[var(--border)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[var(--sky)]/10 flex items-center justify-center">
                  <FiHelpCircle className="text-[var(--sky)] text-xl" />
                </div>
                <span className="text-xs font-semibold tracking-wider uppercase text-[var(--muted)]">
                  Got Questions?
                </span>
              </div>
              <h3 className="heading-font text-xl font-bold text-[var(--navy)] leading-snug">
                We have answers to your most common queries.
              </h3>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[var(--sky)]/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[var(--navy)]/5 rounded-full blur-3xl" />
          </div>

          {/* Right side – FAQ list */}
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[var(--sky)]" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--muted)]">
                FAQ
              </span>
            </div>

            <h2 className="heading-font text-4xl md:text-5xl font-bold text-[var(--navy)] leading-tight mb-6">
              Professional Insights For
              <br />
              <span className="text-[var(--sky)]">Confident Decisions</span>
            </h2>

            <div className="space-y-4 mt-10">
              {faqData.map((item, index) => (
                <div
                  key={item.id}
                  className={`
                    rounded-2xl transition-all duration-300
                    ${activeId === item.id 
                      ? 'bg-white shadow-lg border border-[var(--sky)]/20' 
                      : 'hover:bg-white/50'
                    }
                  `}
                >
                  <button
                    onClick={() => toggleFAQ(item.id)}
                    className="w-full flex items-center justify-between p-5 text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                        ${activeId === item.id
                          ? 'bg-[var(--sky)] text-white'
                          : 'bg-[var(--surface)] text-[var(--muted)] group-hover:bg-[var(--sky)]/10 group-hover:text-[var(--navy)]'
                        }
                      `}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className={`
                        heading-font text-lg font-medium transition-colors duration-200
                        ${activeId === item.id
                          ? 'text-[var(--navy)]'
                          : 'text-[var(--muted)] group-hover:text-[var(--navy)]'
                        }
                      `}>
                        {item.question}
                      </span>
                    </div>

                    <FiArrowUpRight
                      className={`
                        text-xl transition-all duration-300
                        ${activeId === item.id
                          ? 'rotate-45 text-[var(--sky)]'
                          : 'text-[var(--muted)] group-hover:text-[var(--navy)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                        }
                      `}
                    />
                  </button>

                  {activeId === item.id && (
                    <div className="px-5 pb-5 pt-0 pl-[72px] pr-12">
                      <p className="font-body text-[var(--text)]/70 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom note */}
            <p className="mt-8 text-sm text-[var(--muted)] flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[var(--sky)]" />
              Still have questions? <a href="/contact" className="font-medium text-[var(--navy)] hover:text-[var(--sky)] transition-colors underline underline-offset-4">Contact our team</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}