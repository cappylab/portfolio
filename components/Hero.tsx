import { getTranslations } from "next-intl/server";
import Arrow from "./Arrow";

export default async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <div data-testid="hero-backdrop" aria-hidden="true" className="hero-backdrop" />

      <div className="relative z-10 max-w-3xl">
        <p className="reveal text-[12px] sm:text-[13px] text-white/55 tracking-[0.12em] uppercase mb-6 sm:mb-8">
          {t("eyebrow")}
        </p>
        <h1 className="reveal text-gradient-hero text-[clamp(36px,8vw,96px)] font-semibold tracking-[-0.04em] leading-[1.08]">
          {t("titleLine1")}
          <br />
          {t("titleLine2")}
        </h1>
        <p className="reveal mt-6 sm:mt-8 text-[15px] sm:text-[21px] text-white/40 max-w-[500px] mx-auto leading-[1.65] font-light px-2">
          {t("subtitle")}
        </p>
        <div className="reveal mt-10 sm:mt-14">
          <a href="#work" className="btn-liquid liquid-glass-elevated inline-flex items-center justify-center gap-2 text-white text-[13px] font-medium px-7 py-3 rounded-full">
            {t("cta")} <Arrow className="link-arrow mt-px" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-25 hidden sm:block" aria-hidden="true">
        <div className="w-[26px] h-[42px] border border-white/15 rounded-full flex justify-center pt-2">
          <div className="w-[3px] h-[6px] bg-white/25 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
