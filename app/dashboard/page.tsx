"use client";


import AddPropertyForm from "@/components/forms/PropertyForm";
import { Navbar } from "@/components/navbar";
import {Dashboardnav} from "./components/dashboard-nav"
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { useState } from "react";


export default  function SidebarLayout() {

  const [activeSection, setActiveSection] = useState("home"); // Manage active section

  return (
    <>
      <header>
        <Dashboardnav />

      </header>
      <div className="flex">
        {/* Sidebar */}

        <aside className="w-1/5 h-screen p-4 text-black">
          <ul className="space-y-4">
            <li>

              <button
                onClick={() => setActiveSection("home")}
                className="w-1/2 p-2 text-center bg-white shadow-md rounded-full"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("addProperties")}
                className="w-1/2 p-2 text-center bg-white shadow-md rounded-full"
              >
                Add Properties
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="w-3/4 h-screen p-4">
          {activeSection === "home" && (
            <div>
              <h1>Welcome to the Dashboard</h1>
              <p>Select an option from the sidebar to get started.</p>
            </div>
          )}
          {activeSection === "addProperties" && <AddPropertyForm />}
        </main>
      </div>
    </>
  );
}
