// "use client"

// import { useState } from "react";
import { auth } from "@/server/auth"; // Replace with the correct path to your auth function
import { redirect } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";


export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Perform session check
    const session = await auth();

    // If no session or not admin, redirect to login
    if (!session || !session.user || !('role' in session.user) || session.user.role !== "admin") {
        redirect("/login");
    }


    return (

        <main className=" flex">
            <div className="hidden md:block ">
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