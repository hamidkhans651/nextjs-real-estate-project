"use client";


import DashboardMenu from "./DashboardMenu"

export default function Header() {

    return (
        <div className=" ">
            <section className=" w-full top-0 flex items-center gap-3  border-b px-4 py-4">
                <div className="flex justify-center items-center md:hidden ">
                    <button >
                        <DashboardMenu />
                    </button>
                </div>
                <div className="w-full flex justify-between items-center pr-0 md:pr-[260px] ">
                    <h1 className="text-xl font-semibold ">Dashboard</h1>
                    <div className="flex gap-2 items-center ">
                        <div className="md:flex flex-col items-end hidden ">
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}



