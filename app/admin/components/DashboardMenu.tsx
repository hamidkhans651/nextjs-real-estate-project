import React from "react";
import {
    Drawer,
    DrawerContent,
    DrawerBody,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

export default function DashboardMenu() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            {/* Menu Button */}
            <div className="  top-4 left-4 z-50">
                <Button
                    isIconOnly
                    className="bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full"
                    onPress={onOpen}
                >
                    <Menu />
                </Button>
            </div>

            {/* Drawer */}
            <Drawer isOpen={isOpen} placement="left" onOpenChange={onOpenChange}>
                <DrawerContent>
                    {(onClose) => (
                        <DrawerBody>
                            <Sidebar />
                        </DrawerBody>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
}
