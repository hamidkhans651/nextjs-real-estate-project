import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/app/admin/components/Sidebar";
import Header from "@/app/admin/components/Header";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    // If no session, redirect to login
    if (!session) {
        redirect("/login");
    }

    // If user is an admin, redirect to admin dashboard
    if (session.user && 'role' in session.user && session.user.role === "admin") {
        redirect("/admin");
    }

    return (
        <main className="flex">
            <div className="hidden md:block">
                <Sidebar />
            </div>
            <section className="flex-1 flex flex-col">
                <Header />
                <section className="flex-1">
                    {children}
                </section>
            </section>
        </main>
    );
} 