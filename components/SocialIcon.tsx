import type { ReactNode, SVGProps } from "react";
import type { SocialLink } from "@/lib/data";

type SocialIconProps = Pick<SVGProps<SVGSVGElement>, "className"> & {
  name: SocialLink["id"];
};

export default function SocialIcon({ name, className }: SocialIconProps) {
  const icon = {
    email: (
      <>
        <path d="M3 5.5h18v13H3z" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    github: (
      <path
        fill="currentColor"
        stroke="none"
        d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.7 0 0 .8-.3 2.8 1.1a9.4 9.4 0 0 1 5.1 0c2-1.4 2.8-1.1 2.8-1.1.5 1.4.2 2.5.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.6 4.9.4.3.7 1 .7 1.9v2.8c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5Z"
      />
    ),
    linkedin: (
      <path
        fill="currentColor"
        stroke="none"
        d="M5.2 8.2H2.1V21h3.1V8.2ZM3.6 3A1.8 1.8 0 1 0 3.6 6.6 1.8 1.8 0 0 0 3.6 3ZM21.9 13.7c0-3.9-2.1-5.7-4.9-5.7-2.3 0-3.3 1.3-3.8 2.2V8.2h-3.1V21h3.1v-6.3c0-1.7.3-3.3 2.4-3.3 2.1 0 2.1 2 2.1 3.4V21h3.1v-7.3Z"
      />
    ),
    discord: (
      <path
        fill="currentColor"
        stroke="none"
        d="M19.5 5.2A16.7 16.7 0 0 0 15.4 4l-.5 1.1a15.2 15.2 0 0 0-5.8 0L8.6 4a16.7 16.7 0 0 0-4.1 1.2C1.9 9 1.2 12.7 1.5 16.3c1.7 1.3 3.4 2.1 5.1 2.6l1.2-1.7a10.5 10.5 0 0 1-1.9-.9l.5-.4c3.6 1.7 7.5 1.7 11.1 0l.5.4c-.6.3-1.2.6-1.9.9l1.2 1.7c1.7-.5 3.4-1.3 5.1-2.6.4-4.2-.7-7.8-2.9-11.1ZM8.5 14.1c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm7 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z"
      />
    ),
  } satisfies Record<SocialLink["id"], ReactNode>;

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {icon[name]}
    </svg>
  );
}
