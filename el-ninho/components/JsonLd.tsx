import { site } from "@/lib/constants";

export function RestaurantJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    servesCuisine: ["Portuguese", "Mediterranean"],
    priceRange: "€€€€",
    telephone: "+351213421180",
    email: site.email,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      addressLocality: "Lisboa",
      postalCode: "1200-205",
      addressCountry: "PT",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "19:00",
        closes: "23:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "12:30",
        closes: "15:30",
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
