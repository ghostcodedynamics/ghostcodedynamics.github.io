/**
 * Central navigation registry. Every surface (nav, footer, sitemap generator)
 * should read from here so link changes are one-edit.
 */
export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Insights" },
  { to: "/about", label: "About" },
  { to: "/founder", label: "Founder" },
  { to: "/contact", label: "Contact" },
] as const;

export const FOOTER_EXPLORE_LINKS = [
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Insights" },
  { to: "/about", label: "About" },
  { to: "/founder", label: "Founder" },
  { to: "/#why-choose-us", label: "Why Choose Us" },
  { to: "/contact", label: "Contact" },
] as const;

export const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/company/ghostcodedynamics/",
    label: "LinkedIn",
    icon: "linkedin" as const,
  },
  {
    href: "https://www.instagram.com/ghostcode_dynamics",
    label: "Instagram",
    icon: "instagram" as const,
  },
  { href: "https://github.com/", label: "GitHub", icon: "github" as const },
  {
    href: "mailto:ghostcodedynamics@gmail.com",
    label: "Email",
    icon: "mail" as const,
  },
] as const;
