// components/Tab.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";

// Define the type for the menu item
interface MenuItem {
    name: string;
    link: string;
    icon: TSX.Element;

}

interface TabProps {
    item: MenuItem;
}

export function Tab({ item }: TabProps) {
    const pathname = usePathname();
    const isSelected = pathname === item?.link;
    return (
        <Link href={item?.link}>
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
