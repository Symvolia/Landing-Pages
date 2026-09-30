import { useId } from "react";

type LogoProps = {
  className?: string;
};

const MARK =
  "M8.5 44.19V19.81H12.3L13.94 24.68V44.19ZM25.33 44.19 10.97 25.79 12.3 19.81 26.66 38.21ZM25.33 44.19 23.86 39.34V19.81H29.3V44.19ZM41.24 35.31V31.1H46.49Q47.5 31.1 48.32 30.69Q49.13 30.28 49.61 29.49Q50.1 28.69 50.1 27.56Q50.1 26.43 49.61 25.64Q49.13 24.85 48.32 24.44Q47.5 24.03 46.49 24.03H41.24V19.81H47.27Q49.6 19.81 51.46 20.75Q53.33 21.7 54.41 23.43Q55.5 25.16 55.5 27.56Q55.5 29.95 54.41 31.69Q53.33 33.43 51.46 34.37Q49.6 35.31 47.27 35.31ZM37.08 44.19V19.81H42.52V44.19Z";

export function Logo({ className }: LogoProps) {
  const id = useId().replace(/:/g, "");
  const gradientId = `np-fill-${id}`;

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="6" y1="2" x2="58" y2="62" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00d9ff" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill={`url(#${gradientId})`} />
      <path fill="#0f172a" d={MARK} />
    </svg>
  );
}
