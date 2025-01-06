import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Ellipsis } from "lucide-react";
import { toast } from "react-hot-toast";

interface DropdownButtonProps {
  propertyId: number;
  onDelete: (id: number) => void;
}

export default function DropdownButton({ propertyId, onDelete }: DropdownButtonProps) {
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this property?")) {
      toast.loading("Deleting property...");
      try {
        const response = await fetch(`/api/properties?id=${propertyId}`, {
          method: "DELETE",
        });
        const data = await response.json();

        if (response.ok) {
          toast.dismiss(); // Dismiss the loading toast
          toast.success(data.message || "Property deleted successfully");
          onDelete(propertyId); // Update the UI
        } else {
          toast.dismiss();
          toast.error(data.error || "Failed to delete property");
        }
      } catch (error) {
        console.error("Error deleting property:", error);
        toast.dismiss();
        toast.error("An error occurred while deleting the property");
      }
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger className="bg-transparent ">
        <Button className="absolute top-0 right-[-10] z-10 ">
          <Ellipsis />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Property Actions">
        <DropdownItem key="edit">Edit Property</DropdownItem>
        <DropdownItem
          key="delete"
          onClick={handleDelete} // Triggers the delete logic
          className="text-danger"
          color="danger"
        >
          Delete Property
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
