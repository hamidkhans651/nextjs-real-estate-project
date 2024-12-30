"use client"

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { Navbar } from "@/components/navbar";
import Header from "./components/Header";


export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }
    return (

        <main className=" flex">
            <div className="hidden md:block ">
                <Sidebar />
            </div>
            <div className={`fixed md:hidden
            ${isOpen ? "translate-x-0" : "-translate-x-[1000px]"}
            `}

            >
                <Sidebar />
            </div>

            <section className="flex-1 flex flex-col">
                <Header />
                <section className="flex-1 ">
                    {children}

                </section>

            </section>

        </main>
    )
}