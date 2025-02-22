import { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/app/Properties/icons/SearchIcon";
import { Button } from "@/components/ui/button";
import { InferSelectModel } from "drizzle-orm";
import { properties } from "@/server/schema";

// Define Property type using Drizzle ORM
type Property = InferSelectModel<typeof properties>;

export default function Filters() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]); // ✅ Correctly typed
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredProperties([]); // Reset when search is empty
            return;
        }

        const fetchProperties = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/properties?search=${searchTerm}`);
                const data: Property[] = await response.json(); // ✅ Ensures correct type
                setFilteredProperties(data);
            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchProperties();
        }, 500); // Debounce API calls

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <div className="w-full px-4 py-2 flex flex-wrap items-center justify-center gap-3 border-t border-b border-gray-700">
            {/* Search Bar */}
            <div className="flex-grow md:w-auto relative">
                <Input
                    isClearable
                    radius="lg"
                    placeholder="Address, neighborhood, city, ZIP"
                    className="w-full md:w-96"
                    startContent={<SearchIcon className="pointer-events-none flex-shrink-0" />}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Search Results */}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                filteredProperties.length > 0 && (
                    <div className="w-full bg-white shadow-lg rounded-lg p-4 mt-2">
                        <h3 className="text-lg font-semibold">Matching Properties</h3>
                        <ul>
                            {filteredProperties.map((property) => (
                                <li key={property.zpid} className="py-2 border-b">
                                    <p className="text-sm font-medium">{property.title}</p>
                                    <p className="text-xs text-gray-500">{property.location}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            )}
        </div>
    );
}
