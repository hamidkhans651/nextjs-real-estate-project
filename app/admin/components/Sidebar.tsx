"use client"

import Link from "next/link";


import {
    Cat,
    Layers2,
    LayoutDashboard,
    LibraryBig,
    LogOut,
    PackageOpen,
    ShieldCheck,
    ShoppingCart,
    Star,
    User,
    House
} from "lucide-react";


// components/Sidebar.tsx

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
        link: "/admin/products",
        icon: <House className="h-5 w-5" />,
    },
    {
        name: "Categories",
        link: "/admin/categories",
        icon: <Layers2 className="h-5 w-5" />,
    },
];

export default function Sidebar() {
    return (
        <section className="sticky top-0 flex flex-col gap-10  border-r px-5 py-3 h-screen overflow-hidden w-[260px] z-50 ">
            <div className="flex justify-center py-4">
                <Link href={`/`}>
                    <img className="h-8" src="/logo.png" alt="Logo" />
                </Link>
            </div>
            <ul className="flex-1 h-full overflow-y-auto flex flex-col gap-4">
                {menuList?.map((item, key) => {
                    return <Tab item={item} key={key} />;
                })}
            </ul>
        </section>
    );
}
