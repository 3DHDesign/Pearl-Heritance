const values = [
    {
      title: "Client-Focused",
      desc: "We identify core needs and deliver tailored solutions aligned with your budget and timeline.",
    },
    {
      title: "Qualified Team",
      desc: "Architects, engineers, finance consultants, business advisors, marketers, and lawyers.",
    },
    {
      title: "Reliable Delivery",
      desc: "Structured planning, reporting, and accountability—hassle-free from start to finish.",
    },
    {
      title: "Value Enhancement",
      desc: "We align your property with market requirements to maximize commercial value.",
    },
  ];
  
  export default function ValuesGrid() {
    return (
      <section className="container-wide mt-14">
        <h2 className="heading-font text-3xl md:text-4xl font-semibold">
          Why choose Pearl Heritance
        </h2>
  
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6"
            >
              <p className="text-[15px] font-semibold text-[color:var(--text)]">{v.title}</p>
              <p className="mt-2 text-sm text-black/70 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  