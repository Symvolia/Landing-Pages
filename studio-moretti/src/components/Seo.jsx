import { useEffect } from "react"

function ensureMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute("content", value)
}

export default function Seo({ title, description, path = "/" }) {
  useEffect(() => {
    const full = title.includes("Rossi") ? title : `${title} · Studio Legale Rossi`
    document.title = full
    ensureMeta("name", "description", description)
    ensureMeta("property", "og:title", full)
    ensureMeta("property", "og:description", description)
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.rel = "canonical"
      document.head.appendChild(canonical)
    }
    canonical.href = `https://www.studiolegalerossi.it${path}`
  }, [title, description, path])
  return null
}
