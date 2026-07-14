"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/work";
import LivePreview from "./LivePreview";
import TechPill from "./TechPill";

function ProjectCard({
  project,
  overlayLabel,
}: {
  project: Project;
  overlayLabel: string;
}) {
  return (
    <Link href={`/work/${project.slug}`} className="block">
      <article className="project-card liquid-glass relative group h-full overflow-hidden">
        <div
          className="absolute -top-12 -right-12 w-40 sm:w-56 h-40 sm:h-56 rounded-full blur-[100px] pointer-events-none opacity-30"
          style={{ background: project.meta.orb }}
        />
        <div className="relative z-10 flex h-full flex-col">
          <LivePreview
            url={project.meta.link ?? ""}
            title={project.meta.title}
            thumbnail={project.meta.thumbnail}
            overlayLabel={overlayLabel}
          />
          <div className="p-5 sm:p-6">
            <p className="text-[10px] sm:text-[11px] text-white/30 uppercase tracking-[0.14em] mb-2 sm:mb-3">
              {project.meta.subtitle}
            </p>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] leading-[1.15] mb-2 sm:mb-3">
              {project.meta.title}
            </h3>
            <p className="text-[12px] sm:text-[13px] text-white/40 leading-[1.7] mb-4">
              {project.meta.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.meta.tech.map((t) => (
                <TechPill key={t} name={t} />
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function Work({ projects }: { projects: Project[] }) {
  const t = useTranslations("Work");
  return (
    <section id="work" className="relative py-20 sm:py-32 lg:py-44 scroll-mt-12">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="reveal text-center mb-14 sm:mb-24">
          <p className="text-[12px] sm:text-[13px] text-white/35 tracking-[0.12em] uppercase mb-3 sm:mb-4">
            {t("eyebrow")}
          </p>
          <h2 className="text-[clamp(28px,5vw,56px)] font-semibold tracking-[-0.03em]">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {projects.map((project) => (
            <div key={project.slug} className="reveal">
              <ProjectCard
                project={project}
                overlayLabel={t("viewCaseStudy")}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
