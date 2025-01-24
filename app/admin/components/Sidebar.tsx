"use client";

import Link from "next/link";
import LogoutButton from "@/components/auth/logout-button";
import { Layers2, Settings, LayoutDashboard, House } from "lucide-react";
import { Tab } from "./Tab"; // Import the Tab component
import { JSX } from "react";

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
    {
        name: "Settings",
        link: "/admin/settings",
        icon: <Settings className="h-5 w-5" />,
    },
];

export default function Sidebar() {
    const handleClose = () => {
        console.log("Sidebar close logic here");
    };

    return (
        <section className="sticky top-0 flex flex-col gap-10 border-r px-5 py-3 h-screen overflow-hidden w-[260px] z-50">
            <div className="flex justify-center py-4">
                <Link href={`/`} className="font-bold hover:divide-sky-600">
                    <h1>HAMID-HOMES
                    </h1>
                </Link>
            </div>
            <ul className="flex-1 h-full overflow-y-auto flex flex-col gap-4">
                {menuList?.map((item, key) => (
                    <Tab item={item} key={key} onClose={handleClose} />
                ))}
            </ul>
            <div className="flex justify-center">
                <button className="flex gap-2 items-center px-3 py-2 rounded-xl w-full justify-center ease-soft-spring duration-400 transition-all">
                    <LogoutButton />
                </button>
            </div>
        </section>
    );
}
