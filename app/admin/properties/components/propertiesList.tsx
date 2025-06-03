"use client";

import { useState, useEffect } from "react";
import { Spinner } from "@heroui/react"; // Import the Spinner component
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { Property } from "@/types/property";
import Link from "next/link";

import DropdownButton from "../../components/DropdownButton";
import ShareButton from "../../components/ShareButton";

export default function PropertiesList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [properties, setProperties] = useState<Property[]>([]);
    const [propertiesToShow, setPropertiesToShow] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const handleDelete = (id: string) => {
        console.log(`Deleting property with id: ${id}`);
    };

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            try {
                const response = await fetch("/api/properties");
                const data = await response.json();
                setProperties(data);
            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setLoading(false);
            }
        };


        fetchProperties();
    }, []);

    useEffect(() => {
        const start = (currentPage - 1) * 10;
        const end = start + 10;
        setPropertiesToShow(properties.slice(start, end));
    }, [currentPage, properties]);

    // function handleDelete(arg0: string): void {
    //     throw new Error("Function not implemented.");
    // }

    return (
        <div className="relative">
            {/* Component-specific Loading Spinner */}
            {loading && (
                <div className="absolute inset-0 z-10 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <Spinner />
                </div>


            )}



            {/* Component Content */}
            <div className={loading ? "blur-sm pointer-events-none" : ""}>
                <h1 className="flex p-6 font-bold text-2xl items-center justify-center">
                    Available Properties
                </h1>
                <div className="p-5 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    {propertiesToShow.map((property) => (
                        <Card shadow="sm" key={property.id} isPressable className="relative">
                            <div className="relative w-full h-[200px] overflow-hidden rounded-t-lg">

                                <Image
                                    shadow="sm"
                                    radius="lg"
                                    width="100%"
                                    alt={property.title}
                                    className="w-full object-cover h-100%"
                                    src={property.imageUrl}
                                />
                            </div>
                            {/* Dropdown Button */}
                            <div>
                                <DropdownButton
                                    propertyId={property.id ?? 0}
                                    onDelete={() => handleDelete((property.id ?? 0).toString())}
                                />
                            </div>
                            {/* Share Button */}
                            <div>
                                <ShareButton />
                            </div>
                            <CardBody className=" overflow-visible  p-3">
                                <p className="text-xl text-start">$ {property.price}</p>
                                <p className="p-2 text-sm text-start">
                                    {property.bedrooms} bed, {property.bathrooms} bath, {property.sqft} SQ FT
                                </p>
                                <b className="p-1 text-md text-default-500">{property.location}</b>
                            </CardBody>
                            <CardFooter className="text-small justify-between">
                                <b className="text-xs text-start text-default-500">
                                    For Sale: {property.isForSale ? "Yes" : "No"}
                                </b>

                                <Link href={`/properties/edit/${property.id}`}>
                                    <Button color="primary">Edit</Button>
                                </Link>

                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
