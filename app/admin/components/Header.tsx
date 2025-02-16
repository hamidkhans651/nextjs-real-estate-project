"use client";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Input,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
} from "@nextui-org/react";
import { Kbd } from "@nextui-org/kbd";
import { SearchIcon, Logo } from "@/components/icons";
import DashboardMenu from "./DashboardMenu"
import { Bell } from "lucide-react";



export default function Header() {


    const searchInput = (
        <Input
            aria-label="Search"
            classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
            }}
            endContent={
                <Kbd className="hidden lg:inline-block" keys={["command"]}></Kbd>
            }
            labelPlacement="outside"
            placeholder="City,Address.."
            startContent={
                <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
        />)
    return (


        <div className=" ">

            <section className="  w-full top-0 flex items-center gap-3  border-b px-4 py-4">
                <div className="flex justify-end items-center md:hidden  ">
                    <button >
                        <DashboardMenu />
                    </button>
                </div>
                <div className="grid grid-cols-2 w-full gap-2 items-center ">
                    <h1 className="col-span-1 text-xl font-semibold  flex justify-between items-center  object-fill">
                        Admin Dashboard


                    </h1>

                    {/* Search Input shifted to the right */}


                    <div className="ml-auto flex items-center justify-end gap-2  pr-2 ">
                        <div >

                            <Bell strokeWidth={3} />
                        </div>
                        <div className="flex justify-end">
                            {searchInput}
                        </div>
                    </div>
                    <div className="flex gap-2 items-center ">
                        <div className="md:flex flex-col items-end hidden ">


                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}



