import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/work";
import LivePreview from "./LivePreview";
import TechPill from "./TechPill";

function ProjectCard({
  project,
  overlayLabel,
  index,
  roleLabel,
  highlightLabel,
}: {
  project: Project;
  overlayLabel: string;
  index: number;
  roleLabel: string;
  highlightLabel: string;
}) {
  return (
    <Link href={`/work/${project.slug}`} className="block h-full">
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
            <div className="flex items-center justify-between gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] mb-2 sm:mb-3">
              <p className="text-white/30">
                {project.meta.category} <span className="text-white/15">·</span>{" "}
                {project.meta.year}
              </p>
              <span className="font-mono text-white/20">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] leading-[1.15] mb-2 sm:mb-3">
              {project.meta.title}
            </h3>
            <p className="text-[12px] sm:text-[13px] text-white/40 leading-[1.7] mb-4">
              {project.meta.description}
            </p>
            <dl className="grid grid-cols-2 gap-3 border-y border-white/[0.06] py-4 mb-4 text-[10px] sm:text-[11px]">
              <div>
                <dt className="text-white/20 uppercase tracking-[0.12em]">
                  {roleLabel}
                </dt>
                <dd className="mt-1 text-white/55 leading-[1.45]">
                  {project.meta.role}
                </dd>
              </div>
              <div>
                <dt className="text-white/20 uppercase tracking-[0.12em]">
                  {highlightLabel}
                </dt>
                <dd className="mt-1 text-white/55 leading-[1.45]">
                  {project.meta.highlight}
                </dd>
              </div>
            </dl>
            <div className="flex flex-wrap gap-1.5">
              {project.meta.tech.map((tech) => (
                <TechPill key={tech} name={tech} />
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default async function Work({
  projects,
  catalogue = false,
}: {
  projects: Project[];
  catalogue?: boolean;
}) {
  const t = await getTranslations("Work");
  const categories = [...new Set(projects.map((project) => project.meta.category))];
  const Heading = catalogue ? "h1" : "h2";

  return (
    <section
      id={catalogue ? undefined : "work"}
      className={
        catalogue
          ? "relative pt-32 sm:pt-40 pb-20 sm:pb-32"
          : "relative py-20 sm:py-32 lg:py-44 scroll-mt-12"
      }
    >
      <div className="max-w-[980px] mx-auto px-6">
        <div className="reveal text-center mb-14 sm:mb-24">
          <p className="text-[12px] sm:text-[13px] text-white/35 tracking-[0.12em] uppercase mb-3 sm:mb-4">
            {catalogue ? t("catalogueEyebrow") : t("eyebrow")}
          </p>
          <Heading className="text-[clamp(28px,5vw,56px)] font-semibold tracking-[-0.03em]">
            {catalogue ? t("catalogueTitle") : t("title")}
          </Heading>
          {catalogue && (
            <div
              className="mt-6 flex flex-wrap justify-center gap-2"
              aria-label={t("catalogueEyebrow")}
            >
              {categories.map((category) => (
                <span
                  key={category}
                  className="liquid-glass-pill px-3 py-1.5 text-[10px] sm:text-[11px] text-white/40"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {projects.map((project, index) => (
            <div key={project.slug} data-testid="work-card" className="reveal defer-project-card">
              <ProjectCard
                project={project}
                overlayLabel={t("viewCaseStudy")}
                index={index}
                roleLabel={t("role")}
                highlightLabel={t("highlight")}
              />
            </div>
          ))}
        </div>

        {!catalogue && (
          <div className="reveal mt-8 sm:mt-10 flex justify-center">
            <Link
              href="/work"
              className="btn-liquid liquid-glass-pill inline-flex items-center gap-2 px-5 py-2.5 text-[12px] text-white/60 hover:text-white"
            >
              {t("allWork")} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
