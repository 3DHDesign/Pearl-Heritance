import { NavLink } from "react-router-dom";

export default function CTAAbout() {
  return (
    <section className="container-wide mt-14">
      <div className="rounded-[40px] bg-[color:var(--navy)] px-6 md:px-12 py-10 md:py-12 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <h3 className="heading-font text-3xl md:text-4xl font-semibold leading-tight">
              Ready to transform your property?
            </h3>
            <p className="mt-3 text-white/80 leading-relaxed">
              Tell us what you’re planning — we’ll guide you from concept to completion.
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end gap-3 flex-wrap">
            <NavLink to="/contact" className="btn-accent">
              Contact Us
            </NavLink>
            <NavLink to="/projects" className="btn-primary">
              View Work
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}
