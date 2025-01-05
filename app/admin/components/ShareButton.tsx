import { Link } from "@nextui-org/react";
import { Share2 } from "lucide-react"



export default function ShareButton() {
    return (
        <div className="absolute top-2 right-12 z-10 md:size-6 sm:size-3 lg:size-7 items-center ">
            <Link href="#" size="sm">
                <Share2 />
            </Link>

        </div>
    );
}
