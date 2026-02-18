// TeamSection.tsx
// No people photos — role/discipline cards with icons, app.css tokens

export default function TeamSection() {
    const roles = [
      {
        icon: (
          <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="8" width="30" height="22" rx="2" />
            <path d="M14 30v4M26 30v4M10 34h20" />
            <path d="M11 14h18M11 19h12" />
            <path d="M25 22l4 4" />
          </svg>
        ),
        tag: "01",
        title: "Chartered\nArchitects",
        desc: "Licensed to design, plan and oversee construction of buildings across residential, commercial and civic sectors.",
        count: "8 members",
      },
      {
        icon: (
          <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="20" cy="20" r="12" />
            <path d="M20 8v4M20 28v4M8 20h4M28 20h4" />
            <path d="M20 20l5-5" />
            <circle cx="20" cy="20" r="2.5" fill="currentColor" stroke="none" />
          </svg>
        ),
        tag: "02",
        title: "Chartered\nEngineers",
        desc: "Structural and civil specialists ensuring every build meets safety codes and performs with precision.",
        count: "6 members",
      },
      {
        icon: (
          <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 32L20 10l12 22H8z" />
            <path d="M14 32v-6h12v6" />
            <path d="M17 26v-4h6v4" />
          </svg>
        ),
        tag: "03",
        title: "Quantity\nSurveyors",
        desc: "Managing project costs from initial estimates through to final accounts with full financial transparency.",
        count: "5 members",
      },
      {
        icon: (
          <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="7" y="12" width="26" height="20" rx="2" />
            <path d="M14 12V9a6 6 0 0112 0v3" />
            <circle cx="20" cy="22" r="3" />
            <path d="M20 25v4" />
          </svg>
        ),
        tag: "04",
        title: "Project\nManagers",
        desc: "Orchestrating timelines, teams and resources so every project is delivered on time and within scope.",
        count: "7 members",
      },
      {
        icon: (
          <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 30V16l10-8 10 8v14" />
            <rect x="16" y="22" width="8" height="8" />
            <path d="M6 16l14-12 14 12" />
          </svg>
        ),
        tag: "05",
        title: "Business\nAdvisors",
        desc: "Strategic consultants aligning every architectural decision with commercial viability and long-term value.",
        count: "4 members",
      },
      {
        icon: (
          <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="8" y="6" width="24" height="30" rx="2" />
            <path d="M13 14h14M13 19h14M13 24h8" />
            <circle cx="28" cy="28" r="6" fill="#011E4F" stroke="#011E4F" />
            <path d="M26 28l1.5 1.5L30 26" stroke="#fff" strokeWidth="1.5" />
          </svg>
        ),
        tag: "06",
        title: "Attorneys\nat Law",
        desc: "Legal experts handling contracts, compliance, land rights and dispute resolution across all project phases.",
        count: "3 members",
      },
    ];
  
    return (
      <section
        style={{
          padding: "90px 0 100px",
          background: "#ffffff",
          fontFamily: "'Poppins', ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <style>{`
          /* ── TeamSection scoped styles ── */
          .ts-container {
            width: 100%;
            margin-inline: auto;
            padding-inline: clamp(16px, 5vw, 64px);
            max-width: 1440px;
          }
  
          /* header */
          .ts-header {
            text-align: center;
            max-width: 640px;
            margin: 0 auto 64px;
          }
          .ts-eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 14px;
          }
          .ts-eyebrow-line {
            width: 24px; height: 2px;
            background: #011E4F; border-radius: 2px;
          }
          .ts-eyebrow-text {
            font-size: 11px; font-weight: 500;
            letter-spacing: 0.2em; text-transform: uppercase;
            color: #011E4F;
          }
          /* h1 from app.css */
          .ts-heading {
            font-size: 42px; line-height: 50px; font-weight: 700;
            color: #011E4F; margin: 0 0 12px;
          }
          /* p from app.css */
          .ts-subtext {
            font-size: 18px; line-height: 25px; font-weight: 300;
            color: #555555; margin: 0;
          }
  
          /* grid */
          .ts-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
          @media (max-width: 900px) {
            .ts-grid { grid-template-columns: repeat(2, 1fr); }
            .ts-heading { font-size: 32px; line-height: 40px; }
          }
          @media (max-width: 560px) {
            .ts-grid { grid-template-columns: 1fr; }
          }
  
          /* card */
          .ts-card {
            position: relative;
            border: 1px solid rgba(1,30,79,.09);
            border-radius: 16px;
            padding: 32px 28px 28px;
            background: #fff;
            overflow: hidden;
            cursor: default;
            transition:
              border-color .35s ease,
              box-shadow .35s ease,
              transform .35s cubic-bezier(.25,.46,.45,.94);
            box-shadow: 0 4px 16px rgba(1,30,79,.05);
          }
          .ts-card::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(1,30,79,.04) 0%, transparent 60%);
            border-radius: inherit;
            pointer-events: none;
            opacity: 0;
            transition: opacity .35s ease;
          }
          .ts-card:hover {
            border-color: #011E4F;
            box-shadow: 0 18px 48px rgba(1,30,79,.15);
            transform: translateY(-4px);
          }
          .ts-card:hover::before { opacity: 1; }
  
          /* large bg number */
          .ts-bg-num {
            position: absolute;
            top: -8px; right: 16px;
            font-size: 96px; font-weight: 700; line-height: 1;
            color: rgba(1,30,79,.04);
            pointer-events: none; user-select: none;
            transition: color .35s ease;
          }
          .ts-card:hover .ts-bg-num {
            color: rgba(1,30,79,.07);
          }
  
          /* icon box */
          .ts-icon-wrap {
            width: 52px; height: 52px;
            border-radius: 12px;
            background: rgba(1,30,79,.06);
            border: 1px solid rgba(1,30,79,.1);
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 20px;
            color: #011E4F;
            transition: background .35s ease, border-color .35s ease, transform .35s cubic-bezier(.34,1.56,.64,1);
          }
          .ts-icon-wrap svg {
            width: 26px; height: 26px;
          }
          .ts-card:hover .ts-icon-wrap {
            background: #011E4F;
            border-color: #011E4F;
            color: #fff;
            transform: scale(1.08) rotate(-3deg);
          }
  
          /* tag + title row */
          .ts-tag {
            font-size: 10px; font-weight: 500;
            letter-spacing: 0.18em; text-transform: uppercase;
            color: #5A8AB2; margin-bottom: 6px;
          }
          /* h2 from app.css (slightly smaller here) */
          .ts-title {
            font-size: 22px; line-height: 30px; font-weight: 600;
            color: #011E4F; margin: 0 0 10px;
            white-space: pre-line;
          }
  
          /* desc — p from app.css */
          .ts-desc {
            font-size: 14px; line-height: 22px; font-weight: 300;
            color: #555555; margin: 0 0 20px;
          }
  
          /* footer row */
          .ts-footer {
            display: flex; align-items: center;
            justify-content: space-between;
            padding-top: 16px;
            border-top: 1px solid rgba(1,30,79,.07);
          }
          .ts-count {
            display: flex; align-items: center; gap: 7px;
          }
          .ts-count-dots {
            display: flex; gap: 3px;
          }
          .ts-count-dot {
            width: 6px; height: 6px; border-radius: 50%;
            background: #5A8AB2; opacity: .5;
          }
          .ts-count-dot:first-child { opacity: 1; }
          .ts-count-text {
            font-size: 11px; font-weight: 400;
            letter-spacing: 0.08em;
            color: #555;
          }
          .ts-arrow {
            width: 30px; height: 30px; border-radius: 50%;
            border: 1px solid rgba(1,30,79,.14);
            display: flex; align-items: center; justify-content: center;
            color: #011E4F; opacity: 0;
            transform: translateX(-6px);
            transition: opacity .3s ease, transform .3s ease, background .3s ease;
          }
          .ts-card:hover .ts-arrow {
            opacity: 1; transform: translateX(0);
          }
          .ts-arrow:hover {
            background: #011E4F; color: #fff;
          }
  
          /* active line */
          .ts-active-line {
            position: absolute; bottom: 0; left: 0; right: 0;
            height: 3px;
            background: linear-gradient(90deg, #011E4F 0%, #5A8AB2 100%);
            border-radius: 0 0 16px 16px;
            transform: scaleX(0); transform-origin: left;
            transition: transform .4s cubic-bezier(.25,.46,.45,.94);
          }
          .ts-card:hover .ts-active-line {
            transform: scaleX(1);
          }
  
          /* bottom stats bar */
          .ts-stats-bar {
            margin-top: 52px;
            display: flex; align-items: center; justify-content: center;
            gap: 0;
            border: 1px solid rgba(1,30,79,.08);
            border-radius: 16px;
            overflow: hidden;
            background: rgba(1,30,79,.02);
          }
          .ts-stat-item {
            flex: 1;
            padding: 22px 16px;
            text-align: center;
            border-right: 1px solid rgba(1,30,79,.08);
          }
          .ts-stat-item:last-child { border-right: none; }
          .ts-stat-num {
            font-size: 28px; font-weight: 700; line-height: 1;
            color: #011E4F; margin-bottom: 5px;
          }
          .ts-stat-label {
            font-size: 11px; font-weight: 300;
            letter-spacing: 0.12em; text-transform: uppercase;
            color: #555;
          }
          @media (max-width: 600px) {
            .ts-stats-bar { flex-wrap: wrap; }
            .ts-stat-item { flex: 1 1 calc(50% - 1px); border-bottom: 1px solid rgba(1,30,79,.08); }
          }
        `}</style>
  
        <div className="ts-container">
  
          {/* ── HEADER ── */}
          <div className="ts-header">
            <div className="ts-eyebrow">
              <div className="ts-eyebrow-line" />
              <span className="ts-eyebrow-text">Our Team</span>
              <div className="ts-eyebrow-line" />
            </div>
            <h1 className="ts-heading">
              The Experts Behind<br />Every Project
            </h1>
            <p className="ts-subtext">
              A multidisciplinary team of licensed professionals — each bringing deep expertise to deliver outstanding results.
            </p>
          </div>
  
          {/* ── GRID ── */}
          <div className="ts-grid">
            {roles.map((role) => (
              <div key={role.tag} className="ts-card">
                {/* large bg number */}
                <span className="ts-bg-num">{role.tag}</span>
  
                {/* icon */}
                <div className="ts-icon-wrap">{role.icon}</div>
  
                {/* tag */}
                <div className="ts-tag">{role.tag}</div>
  
                {/* title */}
                <h2 className="ts-title">{role.title}</h2>
  
                {/* desc */}
                <p className="ts-desc">{role.desc}</p>
  
                {/* footer */}
                <div className="ts-footer">
                  <div className="ts-count">
                    <div className="ts-count-dots">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="ts-count-dot" />
                      ))}
                    </div>
                    <span className="ts-count-text">{role.count}</span>
                  </div>
                  <div className="ts-arrow">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M3 13L13 3M13 3H6M13 3V10" />
                    </svg>
                  </div>
                </div>
  
                {/* hover bottom line */}
                <div className="ts-active-line" />
              </div>
            ))}
          </div>
  
          {/* ── STATS BAR ── */}
          <div className="ts-stats-bar">
            {[
              { num: "33+", label: "Team Members" },
              { num: "6", label: "Disciplines" },
              { num: "18+", label: "Years Combined" },
              { num: "120+", label: "Projects Delivered" },
              { num: "100%", label: "Licensed Professionals" },
            ].map((s) => (
              <div key={s.label} className="ts-stat-item">
                <div className="ts-stat-num">{s.num}</div>
                <div className="ts-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
  
        </div>
      </section>
    );
  }