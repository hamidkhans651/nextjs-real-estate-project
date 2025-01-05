// components/Tab.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react/jsx-runtime";

// Define the type for the menu item
interface MenuItem {
    name: string;
    link: string;
    icon: JSX.Element;
}

interface TabProps {
    item: MenuItem;
    onClose: () => void; // New prop for closing the drawer
}

export function Tab({ item, onClose }: TabProps) {
    const pathname = usePathname();
    const isSelected = pathname === item?.link;

    const handleClick = () => {
        onClose(); // Trigger the drawer close
    };

    return (
        <Link href={item?.link} onClick={handleClick}>
            <li
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ease-soft-spring transition-all duration-300
            ${isSelected ? "bg-[#879fff] text-white" : "bg-white text-black"} 
            `}
            >
                {item?.icon} {item?.name}
            </li>
        </Link>
    );
}
