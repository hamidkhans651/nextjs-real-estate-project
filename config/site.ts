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
      label: "Buy",
      href: "/Properties",
    },
    {
      label: "Sell",
      href: "/Properties",
    },
    {
      label: "Rent",
      href: "/Properties",
    },
    {
      label: "Admin Dashboard",
      href: "/admin",
      auth: true,
      adminOnly: true
    },
    {
      label: "My Dashboard",
      href: "/dashboard",
      auth: true,
      userOnly: true
    },
    {
      label: "Login",
      href: "/login",
      auth: false
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Admin Dashboard",
      href: "/admin",
      auth: true,
      adminOnly: true
    },
    {
      label: "My Dashboard",
      href: "/dashboard",
      auth: true,
      userOnly: true
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
      auth: false
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

export type SiteConfig = typeof siteConfig;
