import TechIcon from "./TechIcon";
import { techExperience } from "@/lib/data";

interface TechPillProps {
  name: string;
}

export default function TechPill({ name }: TechPillProps) {
  const experience = techExperience[name];
  const title = experience
    ? `${experience.level} · ${experience.years}`
    : undefined;

  return (
    <span
      className="liquid-glass-pill inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] sm:text-[11px] text-white/40"
      title={title}
    >
      <TechIcon name={name} />
      {name}
    </span>
  );
}
