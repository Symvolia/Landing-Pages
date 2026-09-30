export function Logo() {
  return (
    <a href="#home" className="group flex items-center gap-3" aria-label="InShape Gym, torna all'inizio">
      <span className="grid h-10 w-10 place-items-center bg-ember text-ink transition group-hover:scale-105">
        <span className="font-display text-[1.7rem] leading-none">IS</span>
      </span>
      <span className="leading-none">
        <span className="block font-display text-[1.7rem] tracking-wide">INSHAPE</span>
        <span className="mt-0.5 block text-[10px] font-semibold tracking-[0.38em] text-ember">GYM</span>
      </span>
    </a>
  )
}

export function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14.2 21v-7.1h2.4l.4-2.8h-2.8V9.3c0-.8.2-1.4 1.4-1.4H17V5.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2h-2.5v2.8H11V21h3.2Z" />
    </svg>
  )
}

export function TikTokIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14.5 3c.4 2.6 1.9 4.4 4.5 4.7v2.4c-1.5 0-2.9-.5-4.1-1.3v6.7c0 3.4-2.7 6.2-6.3 6.2S2.3 19 2.3 15.5 5 9.3 8.6 9.3c.4 0 .8 0 1.2.1v2.6a3.7 3.7 0 0 0-1.2-.2c-1.9 0-3.4 1.6-3.4 3.6s1.5 3.6 3.4 3.6 3.4-1.6 3.4-3.6V3h2.5Z" />
    </svg>
  )
}
