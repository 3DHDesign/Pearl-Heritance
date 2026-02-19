export default function VisionMission() {
    return (
      <section className="container-wide mt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-[28px] bg-[color:var(--surface)] border border-[color:var(--border)] p-8">
            <h3 className="heading-font text-3xl font-semibold">Our Vision</h3>
            <p className="mt-4 text-black/70 leading-relaxed">
              Transforming properties to meet high-end commercial standards and requirements.
            </p>
          </div>
  
          <div className="rounded-[28px] bg-white border border-[color:var(--border)] p-8">
            <h3 className="heading-font text-3xl font-semibold">Our Mission</h3>
            <p className="mt-4 text-black/70 leading-relaxed">
              Deliver client-focused, reliable, and professionally qualified services in a hassle-free,
              all-in-one destination.
            </p>
          </div>
        </div>
      </section>
    );
  }
  