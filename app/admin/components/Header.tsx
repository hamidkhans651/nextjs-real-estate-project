"use client";

// import { useAuth } from "@/contexts/AuthContext";
// import { useAdmin } from "@/lib/firestore/admins/read";
// import { Avatar } from "@nextui-org/react";
import { Menu } from "lucide-react";
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarItem,
} from "@nextui-org/navbar";
import { ThemeSwitch } from "@/components/theme-switch";



export default function Header() {
    // const { user } = useAuth();
    // const { data: admin } = useAdmin({ email: user?.email });


    return (
        <div className=" ">
            <section className=" w-full top-0 flex items-center gap-3  border-b px-4 py-4">

                <div className="flex justify-center items-center md:hidden ">

                    <button >
                        <Menu />
                    </button>

                </div>
                <div className="w-full flex justify-between items-center pr-0 md:pr-[260px] ">
                    <h1 className="text-xl font-semibold ">Dashboard</h1>



                    <div className="flex gap-2 items-center ">
                        <div className="md:flex flex-col items-end hidden ">


                            {/* <h1 className="text-sm font-semibold">{admin?.name}</h1>
            <h1 className="text-xs text-gray-600">{admin?.email}</h1> */}
                        </div>
                        {/* <Avatar size="sm" src={admin?.imageURL} /> */}
                    </div>
                </div>
            </section>
        </div>
    );
}



{/* <nav className="">
<NextUINavbar>

    <NavbarContent className="pl-[30vw]  " justify="end">
        {/* Mobile Theme Switch */}
<ThemeSwitch />
{/* Mobile Menu Toggle */ }
// </NavbarContent>
// </NextUINavbar>
// </nav> */}