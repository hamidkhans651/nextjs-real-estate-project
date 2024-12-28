"use client";


import AddPropertyForm from "@/components/forms/PropertyForm";
import { Navbar } from "@/components/navbar";
import {Dashboardnav} from "./dashboard-nav"
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

        <aside className="w-1/4 h-screen  p-4 text-black">
          <ul className="space-y-4">
            <li>

              <button
                onClick={() => setActiveSection("home")}
                className="w-full text-left p-2 bg-gray-200 rounded"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("addProperties")}
                className="w-full text-left p-2 bg-gray-200 rounded"
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
