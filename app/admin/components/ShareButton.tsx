import { Link } from "@nextui-org/react";
import { Share2 } from "lucide-react"



export default function ShareButton() {
    return (
        <div className="absolute top-2 right-2 z-10">
            <Link href="#" size="sm">
                <Share2 />
            </Link>
            <Link href="#" size="md">
                <Share2 />

            </Link>
            <Link href="#" size="lg">
                <Share2 />
            </Link>
        </div>
    );
}
