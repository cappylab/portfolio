import Image from "next/image";

interface LivePreviewProps {
  url: string;
  title: string;
  thumbnail: string;
  overlayLabel?: string;
}

export default function LivePreview({
  url,
  title,
  thumbnail,
  overlayLabel,
}: LivePreviewProps) {
  return (
    <div className="live-preview group/preview" aria-label={`Preview of ${title}`}>
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.06]">
        <span className="w-[7px] h-[7px] rounded-full bg-white/[0.08]" />
        <span className="w-[7px] h-[7px] rounded-full bg-white/[0.08]" />
        <span className="w-[7px] h-[7px] rounded-full bg-white/[0.08]" />
        <span className="ml-2 flex-1 text-[9px] text-white/15 font-mono truncate">{url.replace(/^https?:\/\//, "")}</span>
      </div>

      <div className="live-preview-viewport">
        <Image
          src={thumbnail}
          alt={`Preview of ${title}`}
          fill
          sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1023px) calc(100vw - 5rem), 450px"
          className="object-cover"
        />
      </div>

      {overlayLabel && (
        <div className="absolute inset-0 z-20 rounded-2xl bg-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="text-[11px] text-white/60 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
            {overlayLabel} ↗
          </span>
        </div>
      )}
    </div>
  );
}
