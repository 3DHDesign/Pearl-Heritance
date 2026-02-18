import { useEffect, useState } from "react";
import sideSvg from "../../assets/images/side.svg";

export default function VideoBannerSection() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const youtubeId = "zumJJUL_ruM";
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;

  return (
    <section className="py-16 bg-[var(--bg)]">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--sky)] opacity-40" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--sky)]" />
            </span>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--muted)]">
              Visual Experience
            </span>
          </div>
          <h2 className="heading-font text-3xl md:text-4xl font-semibold text-[var(--navy)]">
            A quick look into our design approach and quality.
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)] font-body">
            Video Tour — See our craftsmanship in action
          </p>
        </div>

        {/* Banner */}
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] shadow-[0_20px_50px_-20px_rgba(11,45,75,0.2)] bg-[var(--surface)]">
          
          {/* Online Image */}
          <img
            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Interior Video Banner"
            className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy)]/10 via-transparent to-transparent" />

          {/* side.svg shape top-right - MUCH WHITER NOW */}
          <img
            src={sideSvg}
            alt=""
            className="
              absolute right-[-45px] top-[0px] z-10
              w-[580px] sm:w-[360px] md:w-[460px] lg:w-[520px]
              max-w-none
              pointer-events-none select-none
                brightness-200 contrast-75
            "
            style={{
              filter: 'brightness(2.5) contrast(0.8) saturate(0)',
              mixBlendMode: 'screen'
            }}
          />

          {/* Play Button */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="
              absolute left-1/2 top-1/2 z-20
              -translate-x-1/2 -translate-y-1/2
              group
            "
          >
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full bg-[var(--sky)]/20 animate-ping" />
            
            {/* Main button */}
            <div className="
              relative h-20 w-20 md:h-24 md:w-24
              rounded-full bg-white
              shadow-[0_20px_40px_rgba(11,45,75,0.25)]
              flex items-center justify-center
              transition-all duration-300
              group-hover:scale-110 group-hover:shadow-[0_25px_50px_rgba(42,167,223,0.3)]
              active:scale-95
            ">
              <div className="
                ml-1 w-0 h-0 
                border-y-[12px] border-y-transparent
                border-l-[18px] border-l-[var(--navy)]
                transition-transform group-hover:scale-110
              " />
            </div>
          </button>

          {/* Bottom text */}
          <div className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-[var(--border)]">
            <p className="text-[var(--navy)] text-xs md:text-sm font-medium flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--sky)] opacity-40" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--sky)]" />
              </span>
              Click play to watch the project showcase
            </p>
          </div>

          {/* Corner decoration */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[var(--sky)]/10 to-transparent rounded-br-[2rem] z-5" />
        </div>

        {/* Stats */}
       
      </div>

      {/* Video Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[999] bg-[var(--navy)]/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl rounded-2xl overflow-hidden bg-[var(--surface)] shadow-[0_30px_80px_rgba(11,45,75,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-[var(--navy)]/80 to-transparent">
              <span className="text-white text-sm font-medium flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--sky)] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--sky)]" />
                </span>
                Now Playing: Project Showcase
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20 transition flex items-center justify-center backdrop-blur-sm"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* YouTube Iframe */}
            <div className="relative w-full aspect-video">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={embedUrl}
                title="YouTube video"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 z-20 px-4 py-2 bg-gradient-to-t from-[var(--navy)]/80 to-transparent">
              <p className="text-white/80 text-xs flex items-center justify-between font-body">
                <span>Pearl Heritage Collection</span>
                <span className="text-white/40">•</span>
                <span>Premium Design & Craftsmanship</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}