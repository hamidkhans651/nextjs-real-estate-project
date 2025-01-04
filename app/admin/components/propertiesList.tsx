"use client";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
} from "@nextui-org/react";

import { useState, useEffect } from "react";
import { Input, Pagination, PaginationItemRenderProps, PaginationItemType, CircularProgress } from "@nextui-org/react";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { Loader } from "lucide-react";
import { Ellipsis, Share2 } from "lucide-react"
import { ChevronIcon } from "@/app/Properties/icons/ChevronIcon";
import { Property } from "@/types/property"; // Use the Property type

export default function PropertiesList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [properties, setProperties] = useState<Property[]>([]);
    const [propertiesToShow, setPropertiesToShow] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch properties from the API
    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true); // Start loading
            try {
                const response = await fetch("/api/properties");
                const data = await response.json();
                setProperties(data); // Set all properties
            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchProperties();
    }, []);

    // Update displayed properties based on the current page
    useEffect(() => {
        const start = (currentPage - 1) * 10;
        const end = start + 10;
        setPropertiesToShow(properties.slice(start, end));
    }, [currentPage, properties]);


    // Render pagination item
    const renderItem = ({ key, value, isActive, onNext, onPrevious, setPage, className }: PaginationItemRenderProps) => {
        if (value === PaginationItemType.NEXT) {
            return (
                <button key={key} className={className} onClick={onNext}>
                    <ChevronIcon className="rotate-180" />
                </button>
            );
        }
        if (value === PaginationItemType.PREV) {
            return (
                <button key={key} className={className} onClick={onPrevious}>
                    <ChevronIcon />
                </button>
            );
        }
        if (value === PaginationItemType.DOTS) {
            return <button key={key} className={className}>...</button>;
        }
        return (
            <button
                key={key}
                className={`${className} ${isActive ? "text-white bg-gradient-to-br from-indigo-500 to-pink-500 font-bold" : ""}`}
                onClick={() => setPage(value)}
            >
                {value}
            </button>
        );
    };

    return (
        <main>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Loader />


                </div>
            ) : (
                <>
                    <div className="flex justify-center items-center mt-6">
                        <Button className=" sm:w-auto px-6 py-3 text-center">
                            Add new property
                        </Button>
                    </div>



                    <h1 className="flex p-6 font-bold text-2xl items-center justify-center">Available Properties </h1>

                    {/* Displaying properties */}
                    <div className="p-4 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {propertiesToShow.map((property) => (
                            <Card shadow="sm" key={property.id} isPressable className="relative">
                                <Image
                                    shadow="sm"
                                    radius="lg"
                                    width="100%"
                                    alt={property.title}
                                    className="w-full object-cover h-100%"
                                    src={property.imageUrl} // Dynamic image URL
                                />
                        
                                <Dropdown >
                                    <DropdownTrigger>
                                        <Avatar
                                            // isBordered
                                            as="button"
                                            className="transition-transform absolute top-2 right-2 z-10"
                                            // color="defual"
                                            name="button"
                                            size="sm"
                                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWVsbGlwc2lzIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxIi8+PGNpcmNsZSBjeD0iMTkiIGN5PSIxMiIgcj0iMSIvPjxjaXJjbGUgY3g9IjUiIGN5PSIxMiIgcj0iMSIvPjwvc3ZnPg=="
                                        />
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                                 
                                        <DropdownItem key="Delete">Delete</DropdownItem>
                                        <DropdownItem key="team_settings">Update</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>

                                <Button

                                    size="sm"
                                    isIconOnly
                                    // color="none"
                                    aria-label="Like"
                                    className="absolute top-2 right-12 z-10">
                                    <Share2 />

                                </Button>
                                <CardBody className="overflow-visible p-3">
                                    <p className="text-xl text-start">{property.price}</p>
                                    <p className="p-2 text-sm text-start">
                                        {property.bedrooms} bed, {property.bathrooms} bath, {property.sqft} SQ FT
                                    </p>
                                    <b className="p-1 text-md text-default-500">{property.location}</b>
                                </CardBody>
                                <CardFooter className="text-small justify-between">
                                    <b className="text-xs text-start text-default-500">For Sale: {property.isForSale ? "Yes" : "No"}</b>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <Pagination
                        disableCursorAnimation
                        showControls
                        total={Math.ceil(properties.length / 10)} // Total pages
                        initialPage={1}
                        className="gap-2 mt-4"
                        radius="full"
                        renderItem={renderItem}
                        variant="light"
                        onChange={setCurrentPage} // Update page when changed
                    />
                </>
            )}
        </main>
    );
}