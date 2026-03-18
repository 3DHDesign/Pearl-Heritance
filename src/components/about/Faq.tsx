import { useEffect, useState } from "react";
import { FiArrowUpRight, FiHelpCircle } from "react-icons/fi";
import { getActiveFaqs, type FAQItem } from "../../api/faqs";

export default function FAQSection() {
  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await getActiveFaqs();
        const activeFaqs = data.filter((item) => item.is_active);

        setFaqData(activeFaqs);

        if (activeFaqs.length > 0) {
          setActiveId(activeFaqs[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const toggleFAQ = (id: number) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  if (loading) {
    return (
      <section className="w-full overflow-hidden py-20 md:py-28">
        <div className="container-wide px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <div className="h-[500px] animate-pulse overflow-hidden rounded-3xl bg-[var(--border)]/40 md:h-[550px]" />
            </div>

            <div>
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--sky)]" />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                  FAQ
                </span>
              </div>

              <div className="mb-4 h-10 w-3/4 animate-pulse rounded bg-[var(--border)]/40" />
              <div className="mb-10 h-10 w-2/3 animate-pulse rounded bg-[var(--border)]/30" />

              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-[var(--border)]/30 bg-white p-5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-8 w-8 animate-pulse rounded-full bg-[var(--border)]/40" />
                      <div className="h-5 w-3/4 animate-pulse rounded bg-[var(--border)]/30" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!faqData.length) return null;

  return (
    <section className="w-full overflow-hidden py-20 md:py-28">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left side – image with decorative elements */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="https://images.pexels.com/photos/261146/pexels-photo-261146.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Architectural Interior"
                className="h-[500px] w-full object-cover md:h-[550px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/30 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -right-6 max-w-[280px] rounded-2xl border border-[var(--border)] bg-white p-6 shadow-2xl md:right-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--sky)]/10">
                  <FiHelpCircle className="text-xl text-[var(--sky)]" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                  Got Questions?
                </span>
              </div>

              <h3 className="heading-font text-xl font-bold leading-snug text-[var(--navy)]">
                We have answers to your most common queries.
              </h3>
            </div>

            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-[var(--sky)]/5 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-[var(--navy)]/5 blur-3xl" />
          </div>

          {/* Right side – FAQ list */}
          <div>
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--sky)]" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                FAQ
              </span>
            </div>

            <h2 className="heading-font mb-6 text-4xl font-bold leading-tight text-[var(--navy)] md:text-5xl">
              Professional Insights For
              <br />
              <span className="text-[var(--sky)]">Confident Decisions</span>
            </h2>

            <div className="mt-10 space-y-4">
              {faqData.map((item, index) => (
                <div
                  key={item.id}
                  className={`rounded-2xl transition-all duration-300 ${
                    activeId === item.id
                      ? "border border-[var(--sky)]/20 bg-white shadow-lg"
                      : "hover:bg-white/50"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(item.id)}
                    className="group flex w-full items-center justify-between p-5 text-left"
                    type="button"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                          activeId === item.id
                            ? "bg-[var(--sky)] text-white"
                            : "bg-[var(--surface)] text-[var(--muted)] group-hover:bg-[var(--sky)]/10 group-hover:text-[var(--navy)]"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span
                        className={`heading-font text-lg font-medium transition-colors duration-200 ${
                          activeId === item.id
                            ? "text-[var(--navy)]"
                            : "text-[var(--muted)] group-hover:text-[var(--navy)]"
                        }`}
                      >
                        {item.question}
                      </span>
                    </div>

                    <FiArrowUpRight
                      className={`text-xl transition-all duration-300 ${
                        activeId === item.id
                          ? "rotate-45 text-[var(--sky)]"
                          : "text-[var(--muted)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--navy)]"
                      }`}
                    />
                  </button>

                  {activeId === item.id && (
                    <div className="px-5 pb-5 pt-0 pl-[72px] pr-12">
                      <p className="leading-relaxed text-[var(--text)]/70">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-8 flex items-center gap-2 text-sm text-[var(--muted)]">
              <span className="h-1 w-1 rounded-full bg-[var(--sky)]" />
              Still have questions?{" "}
              <a
                href="/contact"
                className="font-medium text-[var(--navy)] underline underline-offset-4 transition-colors hover:text-[var(--sky)]"
              >
                Contact our team
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}