import React from "react";
import { Dashboardnav } from "./components/dashboard-nav";
import { auth } from "@/server/auth"; // Replace with the correct path to your auth function
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Perform session check
  const session = await auth();

  // If no session, redirect to login
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        {/* <Dashboardnav /> */}
      </header>
      <div className="dashboard-content">
        <aside className="dashboard-sidebar"></aside>
        <main className="dashboard-main">{children}</main>
      </div>
      <footer className="dashboard-footer"></footer>
    </div>
  );
}
