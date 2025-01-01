"use client"

import Link from "next/link";
// import toast from "react-hot-toast";
import LogoutButton from "@/components/auth/logout-button";



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
            <div className="flex justify-center">
                <button
                    //   onClick={async () => {
                    //     try {
                    //       await toast.promise(signOut(auth), {
                    //         error: (e) => e?.message,
                    //         loading: "Loading...",
                    //         success: "Successfully Logged out",
                    //       });
                    //     } catch (error) {
                    //       toast.error(error?.message);
                    //     }
                    //   }}
                    className="flex gap-2 items-center px-3 py-2 rounded-xl w-full justify-center ease-soft-spring duration-400 transition-all">
                    {/* <LogOut className="h-5 w-5" />  */}
                    <LogoutButton />

                </button>
            </div>
        </section>
    );
}
