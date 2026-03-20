import { FiArrowUpRight } from "react-icons/fi";

// ✅ IMPORT IMAGES
import clientImg from "../../assets/images/client.webp";
import teamImg from "../../assets/images/team-qualified.webp";
import reliableImg from "../../assets/images/reliable-delivery.webp";
import valueImg from "../../assets/images/value.webp";

const values = [
  {
    id: "01",
    title: "Client-Focused",
    desc: "We identify core needs and deliver tailored solutions aligned with your budget, priorities, and timeline.",
    image: clientImg,
  },
  {
    id: "02",
    title: "Qualified Team",
    desc: "A multi-disciplinary team including architects, engineers, finance consultants, business advisors, marketers, and legal professionals.",
    image: teamImg,
  },
  {
    id: "03",
    title: "Reliable Delivery",
    desc: "Structured planning, transparent reporting, and accountability — ensuring a smooth, hassle-free experience.",
    image: reliableImg,
  },
  {
    id: "04",
    title: "Value Enhancement",
    desc: "We align your property with market demands to strengthen usability, positioning, and long-term commercial value.",
    image: valueImg,
  },
];

export default function ValuesGrid() {
  return (
    <section className="container-wide mt-24">
      {/* Section Heading */}
      <div className="max-w-2xl">
        <p className="text-xs tracking-[0.28em] uppercase text-[color:var(--muted)]">
          Our Strength
        </p>

        <h2 className="mt-3 heading-font text-3xl md:text-4xl font-semibold text-[color:var(--navy)]">
          Why Choose{" "}
          <span className="text-[color:var(--sky)]">Pearl Heritance</span>
        </h2>
      </div>

      {/* Values */}
      <div className="mt-12 space-y-10">
        {values.map((v, i) => {
          const reverse = i % 2 !== 0;

          return (
            <div
              key={v.id}
              className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              {/* IMAGE */}
              <div className={reverse ? "md:order-2" : ""}>
                <div className="relative rounded-[26px] overflow-hidden">
                  <img
                    src={v.image}
                    alt={v.title}
                    loading="lazy"
                    className="w-full h-[300px] md:h-[380px] object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* TEXT */}
              <div className={reverse ? "md:order-1" : ""}>
                <div className="flex items-start gap-5">
                  <span className="heading-font text-2xl text-black/20 w-10">
                    {v.id}
                  </span>

                  <div>
                    <h3 className="heading-font text-xl font-semibold text-[color:var(--navy)]">
                      {v.title}
                    </h3>

                    <p className="mt-2 text-sm text-black/60 leading-relaxed max-w-md">
                      {v.desc}
                    </p>

                    <button className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--navy)] hover:text-[color:var(--sky)] transition-colors group">
                      Learn More
                      <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}