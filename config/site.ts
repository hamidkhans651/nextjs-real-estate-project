export type SiteConfig = typeof siteConfig;

import LogoutButton from "@/components/auth/logout-button";

export const siteConfig = {
  name: "Real Estate",
  description: "Search properties.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Properties",
      href: "/Properties",
    },
    {
      label: "Dashboard",
      href: "/admin",
    },
    {
      label: "Login",
      href: "/login",
    },

  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Dashboard",
      href: "/admin",
    },
    {
      label: "Properties",
      href: "/Properties",
    },
    {
      label: "Agents",
      href: "/agent",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "login",
      href: "/login",
    },
  ],
  links: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    docs: "https://nextui.org",
    discord: "https://discord.gg",
    sponsor: "https://patreon.com",
  },
};
