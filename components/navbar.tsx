'use client'

// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   Avatar,
// } from "@nextui-org/react";
import LogoutButton from "@/components/auth/logout-button";
import { useSession } from "next-auth/react";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";

import { SearchIcon, Logo } from "@/components/icons";

import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import DropdownButton from "@/app/admin/components/DropdownButton";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  
  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}></Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const filteredNavItems = siteConfig.navItems.filter(item => {
    if ('auth' in item) {
      if (item.adminOnly) {
        return item.auth ? !!session?.user && 'role' in session.user && session.user.role === 'admin' : !session;
      }
      if (item.userOnly) {
        return item.auth ? !!session?.user && (!('role' in session.user) || session.user.role !== 'admin') : !session;
      }
      return item.auth ? !!session : !session;
    }
    return true;
  });
  
  const filteredNavMenuItems = siteConfig.navMenuItems.filter(item => {
    if ('auth' in item) {
      if (item.adminOnly) {
        return item.auth ? !!session?.user && 'role' in session.user && session.user.role === 'admin' : !session;
      }
      if (item.userOnly) {
        return item.auth ? !!session?.user && (!('role' in session.user) || session.user.role !== 'admin') : !session;
      }
      return item.auth ? !!session : !session;
    }
    return true;
  });

  // Don't render anything until the component is mounted to avoid hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <main className="">
      <NextUINavbar maxWidth="xl" position="sticky">
        {/* Left-side Branding */}
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink className="flex justify-start items-center gap-1" href="/">
              <p className="font-bold text-inherit">Hamid-Homes</p>
            </NextLink>
          </NavbarBrand>

          {/* Updated Desktop Nav Items */}
          <ul className="hidden md:flex gap-9 justify-center md:ml-40 lg:ml-80">
            {filteredNavItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>

        {/* Right-side Content (Theme switch, search, etc.) */}
        <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full " justify="end">
          {/* Theme Switcher */}
          <NavbarItem className="hidden md:flex  gap-2">
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>

        {/* Mobile View */}
        <NavbarContent className="sm:hidden basis-1 pl-4  " justify="end">
          {/* Mobile Theme Switch */}
          <ThemeSwitch />
          {/* Mobile Menu Toggle */}
          <NavbarMenuToggle />
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu>
          {searchInput}
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {filteredNavMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === filteredNavMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  href={item.href}
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
            {session && (
              <button className="flex justify-start">
                <LogoutButton />
              </button>
            )}
          </div>
        </NavbarMenu>
      </NextUINavbar>
    </main>
  );
};
