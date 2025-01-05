"use client";

import Link from "next/link";
import LogoutButton from "@/components/auth/logout-button";
import { Layers2, LayoutDashboard, House } from "lucide-react";

import { Tab } from "./Tab"; // Import the Tab component
import { JSX } from "react";
import React from "react";
import {
    Drawer,
    DrawerContent,
    DrawerBody,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import { Menu } from "lucide-react";

export default function DashboardMenu() {
    // Define the type for the menu item
    interface MenuItem {
        name: string;
        link: string;
        icon: JSX.Element;
    }

    const menuList: MenuItem[] = [
        {
            name: "Dashboard",
            link: "/admin",
            icon: <LayoutDashboard className="h-5 w-5" />,
        },
        {
            name: "Properties",
            link: "/admin/properties",
            icon: <House className="h-5 w-5" />,
        },
        {
            name: "Add new property",
            link: "/admin/Addproperties",
            icon: <Layers2 className="h-5 w-5" />,
        },
    ];
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            {/* Menu Button */}
            <div className="  top-4 left-4 z-50">
                <Button
                    isIconOnly
                    className="bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full"
                    onPress={onOpen}
                >
                    <Menu />
                </Button>
            </div>

            {/* Drawer */}
            <Drawer isOpen={isOpen} placement="left" onOpenChange={onOpenChange}>
                <DrawerContent>
                    {(onClose) => (
                        <DrawerBody>
                            <section className="sticky top-0 flex flex-col gap-10 px-5 py-3 h-screen overflow-hidden w-[260px] z-10  ">
                                <div className="flex justify-center py-4">
                                    <Link href={`/`}>
                                        <img className="h-8" src="/logo.png" alt="Logo" />
                                    </Link>
                                </div>
                                <ul className="flex-1 h-full overflow-y-auto flex flex-col gap-4">
                                    {menuList?.map((item, key) => {
                                        return (
                                            <Tab
                                                item={item}
                                                key={key}
                                                onClose={onClose} // Pass the onClose function
                                            />
                                        );
                                    })}
                                </ul>
                                <div className="flex justify-center">
                                    <button className="flex gap-2 items-center px-3 py-2 rounded-xl w-full justify-center ease-soft-spring duration-400 transition-all">
                                        <LogoutButton />
                                    </button>
                                </div>
                            </section>
                        </DrawerBody>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
}
