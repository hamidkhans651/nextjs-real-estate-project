import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Button } from "@nextui-org/react";
import { Ellipsis } from "lucide-react";

export default function DropdownButton() {
  return (
    <Dropdown >
      <DropdownTrigger className=" bg-transparent items-center md:size-6 sm:size-3 lg:size-7" >
        <Button className="absolute top-1 left-40 z-10"

        ><Ellipsis />
        </Button>


      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">Edit property</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete property
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
