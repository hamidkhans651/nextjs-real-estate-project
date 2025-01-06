"use client";

import { useState, useEffect } from "react";
import { Input, Pagination, PaginationItemRenderProps, PaginationItemType, CircularProgress } from "@nextui-org/react";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { Loader } from "lucide-react";
import { ChevronIcon } from "@/app/Properties/icons/ChevronIcon";
import { Property } from "@/types/property";
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

    const renderItem = ({ key, value, isActive, onNext, onPrevious, setPage, className }: PaginationItemRenderProps) => {
        if (value === PaginationItemType.NEXT) {
            return (
                <span key={key} className={className} onClick={onNext}>
                    <ChevronIcon className="rotate-180" />
                </span>
            );
        }
        if (value === PaginationItemType.PREV) {
            return (
                <span key={key} className={className} onClick={onPrevious}>
                    <ChevronIcon />
                </span>
            );
        }
        if (value === PaginationItemType.DOTS) {
            return <span key={key} className={className}>...</span>;
        }
        return (
            <span
                key={key}
                className={`${className} ${isActive ? "text-white bg-gradient-to-br from-indigo-500 to-pink-500 font-bold" : ""}`}
                onClick={() => setPage(value)}
            >
                {value}
            </span>
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
                    <h1 className="flex p-6 font-bold text-2xl items-center justify-center">Available Properties</h1>
                    <div className="p-5 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                        {propertiesToShow.map((property) => (
                            <Card shadow="sm" key={property.id} isPressable className="relative">
                                <Image
                                    shadow="sm"
                                    radius="lg"
                                    width="100%"
                                    alt={property.title}
                                    className="w-full object-cover h-100%"
                                    src={property.imageUrl}
                                />
                                {/* Ensure DropdownButton is not nested in another <button> */}
                                <div>
                                    <DropdownButton
                                        propertyId={property.id ?? 0}
                                        onDelete={() => handleDelete((property.id ?? 0).toString())}
                                    />
                                </div>
                                <div>
                                    <ShareButton />
                                </div>
                                <CardBody className="overflow-visible p-3">
                                    <p className="text-xl text-start">{property.price}</p>
                                    <p className="p-2 text-sm text-start">
                                        {property.bedrooms} bed, {property.bathrooms} bath, {property.sqft} SQ FT
                                    </p>
                                    <b className="p-1 text-md text-default-500">{property.location}</b>
                                </CardBody>
                                <CardFooter className="text-small justify-between">
                                    <b className="text-xs text-start text-default-500">
                                        For Sale: {property.isForSale ? "Yes" : "No"}
                                    </b>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                    {/* <Pagination
                        disableCursorAnimation
                        showControls
                        total={Math.ceil(properties.length / 10)}
                        initialPage={1}
                        className="gap-1 mt-4"
                        radius="full"
                        renderItem={}
                        variant="light"
                        onChange={setCurrentPage}
                    /> */}
                </>
            )}
        </main>
    );
}
