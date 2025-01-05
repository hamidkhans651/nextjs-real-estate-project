'use client'

// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   Avatar,
// } from "@nextui-org/react";
import LogoutButton from "@/components/auth/logout-button";


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

export const Navbar = () => {
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

          {/* Navbar Links (Desktop) */}
          <ul className="hidden lg:flex gap-9 justify-center ml-80 " >
            {siteConfig.navItems.map((item) => (
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
        {/* <NavbarContent as="div"  justify="end" className="hidden md:flex ">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem href="dashboard" key="settings">My Dashboard</DropdownItem>
              <DropdownItem href="/register" key="P"> </DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent> */}

        {/* Right-side Content (Theme switch, search, etc.) */}
        <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full " justify="end">

          {/* Theme Switcher */}
          <NavbarItem className="hidden lg:flex  gap-2">
            <ThemeSwitch />
          </NavbarItem>
        </NavbarContent>
        {/* Mobile View */}
        <NavbarContent className="md:hidden basis-1 pl-4  " justify="end">
          {/* Mobile Theme Switch */}
          <ThemeSwitch />
          {/* Mobile Menu Toggle */}
          <NavbarMenuToggle />
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu >
          {/* Mobile Search Input */}
          {searchInput}

          {/* Mobile Navbar Links */}
          <div className="mx-4 mt-2 flex flex-col gap-2  ">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  href={item.href}
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>

            ))}
            <button className="flex justify-start ">
              <LogoutButton />
            </button>


          </div>
        </NavbarMenu>
      </NextUINavbar>
    </main>

  );
};
