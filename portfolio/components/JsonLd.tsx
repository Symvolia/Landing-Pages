import { site } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    email: site.email,
    image: `${site.url}/work/velvet.jpg`,
    knowsAbout: ["Web Design", "Web Development", "UX Design", "UI Design", "Design Thinking"],
    sameAs: [site.linkedin, site.github],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
