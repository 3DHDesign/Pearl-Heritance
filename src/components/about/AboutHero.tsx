
import { NavLink } from "react-router-dom"; 

export default function AboutHero() {
  return (
    <section className="container-wide">
      <div className="relative overflow-hidden rounded-[44px] bg-black">
        {/* background image */}
        <img
          src="https://cdn.prod.website-files.com/68b6b0c3e87664926e54360e/68b823495313f99825794928_1.webp"
          alt="About Pearl Heritance"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* top left logo */}
       

        {/* centered title */}
        <div className="relative z-10 flex min-h-[320px] md:min-h-[420px] items-center justify-center text-center px-6">
          <div>
            <h1 className="heading-font text-4xl md:text-6xl font-semibold text-white">
              About Us
            </h1>

            <div className="mt-3 flex items-center justify-center gap-2 text-white/85 text-sm">
              <NavLink to="/" className="hover:text-white transition">
                Home
              </NavLink>
              <span className="opacity-70">/</span>
              <span>About Us</span>
            </div>
          </div>
        </div>

        {/* optional: subtle bottom fade to look premium */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
      </div>
    </section>
  );
}
