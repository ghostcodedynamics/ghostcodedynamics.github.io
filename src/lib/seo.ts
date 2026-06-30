export const SITE = {
  name: "GhostCode Dynamics",
  shortName: "GhostCode",
  url: "https://ghostcodedynamics.github.io",
  locale: "en_IN",
  language: "en",
  description:
    "GhostCode Dynamics is a founder-led technology brand building digital solutions for businesses and empowering the next generation of tech professionals.",
  email: "ghostcodedynamics@gmail.com",
  founder: "Jeet Ahirwar",
  keywords:
    "GhostCode Dynamics, web development, MERN stack, software development, cybersecurity labs, student mentorship, portfolio websites, business websites",
  themeColor: "#0a0a12",
  twitterHandle: "@ghostcodedynamics",
  sameAs: [
    "https://github.com/JeetAhirwar",
    "https://www.linkedin.com/company/ghostcodedynamics/",
    "https://www.linkedin.com/in/jeetahirwar/",
    "https://www.instagram.com/ghostcode_dynamics",
  ],
} as const;

export const DEFAULT_OG_IMAGE = "/og-image.webp";

type JsonLd = Record<string, unknown>;

interface SeoHeadOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  robots?: string;
  keywords?: string;
  schemas?: JsonLd[];
}

export function absoluteUrl(path = "/") {
  return new URL(path, SITE.url).toString();
}

export function createSeoHead({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  keywords = SITE.keywords,
  schemas = [],
}: SeoHeadOptions) {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { name: "author", content: SITE.name },
      { name: "publisher", content: SITE.name },
      { name: "robots", content: robots },
      { name: "application-name", content: SITE.name },
      { name: "apple-mobile-web-app-title", content: SITE.shortName },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: imageUrl },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "GhostCode Dynamics brand preview" },
      { property: "og:url", content: canonical },
      { property: "og:type", content: type },
      { property: "og:site_name", content: SITE.name },
      { property: "og:locale", content: SITE.locale },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
      { name: "twitter:image:alt", content: "GhostCode Dynamics brand preview" },
      { name: "twitter:creator", content: SITE.twitterHandle },
      { name: "twitter:site", content: SITE.twitterHandle },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: schemas.map((schema) => ({
      type: "application/ld+json",
      children: JSON.stringify(schema),
    })),
  };
}

export function createNoIndexHead(title: string, description: string, path: string) {
  return createSeoHead({
    title,
    description,
    path,
    robots: "noindex, follow",
  });
}

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: absoluteUrl("/android-chrome-512.png"),
    email: SITE.email,
    founder: {
      "@type": "Person",
      name: SITE.founder,
      url: absoluteUrl("/founder"),
    },
    sameAs: SITE.sameAs,
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    inLanguage: SITE.language,
  };
}

export function webPageSchema(title: string, description: string, path: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    inLanguage: SITE.language,
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function founderSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.founder,
    jobTitle: `Founder, ${SITE.name}`,
    url: absoluteUrl("/founder"),
    image: absoluteUrl("/og-image.webp"),
    worksFor: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    alumniOf: "MCA - Cyber Security",
    knowsAbout: ["MERN Stack", "Cybersecurity", "Web Development", "Student Mentorship"],
    sameAs: ["https://www.linkedin.com/in/jeetahirwar/"],
  };
}

export function servicesSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "GhostCode Dynamics services",
    itemListElement: [
      "Business Websites",
      "Portfolio Websites",
      "Landing Pages",
      "Web Applications",
      "Project Mentorship",
      "Portfolio Development",
      "Cybersecurity Learning Labs",
    ].map((name, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name,
        provider: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
        },
        areaServed: "Worldwide",
      },
    })),
  };
}
