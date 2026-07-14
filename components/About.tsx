import { getTranslations } from "next-intl/server";
import { skills, experience } from "@/lib/data";

export default async function About() {
  const t = await getTranslations("About");
  const principles = [
    { title: t("principleIntentTitle"), body: t("principleIntentBody") },
    { title: t("principleCraftTitle"), body: t("principleCraftBody") },
    { title: t("principleMomentumTitle"), body: t("principleMomentumBody") },
  ];

  return (
    <section id="about" className="py-20 sm:py-32 lg:py-44 scroll-mt-12">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="reveal text-center mb-14 sm:mb-24">
          <p className="text-[12px] sm:text-[13px] text-white/35 tracking-[0.12em] uppercase mb-3 sm:mb-4">{t("eyebrow")}</p>
          <h2 className="max-w-4xl mx-auto text-[clamp(28px,5vw,56px)] font-semibold tracking-[-0.03em]">{t("title")}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="reveal lg:col-span-7">
            <div className="liquid-glass p-6 sm:p-8 md:p-10">
              <p className="text-[15px] sm:text-[17px] text-white/60 leading-[1.85] font-light">
                {t("paragraph1")}
              </p>
              <p className="mt-5 text-[14px] sm:text-[16px] text-white/45 leading-[1.85] font-light">
                {t("paragraph2")}
              </p>

              <div className="mt-8 pt-6 border-t border-white/[0.08]">
                <p className="text-[11px] text-white/25 uppercase tracking-[0.14em] mb-5">{t("principlesLabel")}</p>
                <div className="grid gap-5 md:grid-cols-3">
                  {principles.map((principle, index) => (
                    <div key={principle.title} className="border-l border-white/[0.1] pl-4">
                      <span className="text-[10px] font-mono text-white/20">0{index + 1}</span>
                      <h3 className="mt-2 text-[13px] font-medium text-white/80">{principle.title}</h3>
                      <p className="mt-1.5 text-[12px] leading-5 text-white/35">{principle.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="reveal lg:col-span-5 lg:pt-2" aria-label={t("techLabel")}>
            <p className="text-[11px] text-white/25 uppercase tracking-[0.14em] mb-5">{t("techLabel")}</p>
            <div className="reveal-stagger grid grid-cols-2 gap-2">
              {skills.map((skill) => (
                <div key={skill} className="rounded-xl border border-white/[0.06] bg-white/[0.02] text-center py-2.5 text-[11px] sm:text-[12px] text-white/45">{skill}</div>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-20 sm:mt-28">
          <div className="reveal">
            <p className="text-[11px] text-white/20 uppercase tracking-[0.14em] mb-6 sm:mb-8">{t("journeyLabel")}</p>
          </div>
          <div className="reveal">
            <div className="liquid-glass overflow-hidden">
              {experience.map((exp, i) => (
                <div
                  key={exp.role}
                  className={`group flex flex-col sm:flex-row sm:items-center justify-between px-5 sm:px-8 py-4 sm:py-5 hover:bg-white/[0.02] transition-colors duration-300 ${
                    i < experience.length - 1 ? "border-b border-white/[0.04]" : ""
                  }`}
                >
                  <div>
                    <h3 className="text-[13px] sm:text-[14px] font-medium text-white/70 group-hover:text-white/90 transition-colors duration-300">{exp.role}</h3>
                    <p className="text-[11px] sm:text-[12px] text-white/25 mt-0.5">
                      {exp.company}<span className="mx-2 text-white/10">·</span>{exp.desc}
                    </p>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-white/20 font-mono mt-1 sm:mt-0 shrink-0">{exp.period}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
