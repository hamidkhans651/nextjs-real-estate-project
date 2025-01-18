"use client";

import { useState, useEffect } from "react";
import { Input, Pagination, PaginationItemRenderProps, PaginationItemType } from "@nextui-org/react";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { SearchIcon } from "./icons/SearchIcon";
import { HeartIcon } from "./icons/HeartIcon";
import { useRouter } from "next/navigation";

import { ChevronIcon } from "./icons/ChevronIcon";
import { Property } from "@/types/property";

export default function Hero() {
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertiesToShow, setPropertiesToShow] = useState<Property[]>([]);
  const router = useRouter();

  // Fetch properties from the API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/properties");
        const data = await response.json();
        setProperties(data); // Set all properties
      } catch (error) {
        console.error("Error fetching properties:", error);
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
  const renderItem = ({
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: PaginationItemRenderProps) => {
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
      <div className="rounded-2xl flex justify-center items-center text-white ">
        <Input
          label=""
          isClearable
          radius="lg"
          placeholder="Type to search..."
          startContent={<SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />}
        />
      </div>

      {/* Displaying properties */}
      <div className="p-4 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {propertiesToShow.map((property) => (
          <Card
            shadow="sm"
            key={property.id}
            isPressable
            className="relative"
            onPress={() => router.push(`/Properties/${property.id}`)} // Add navigation
          >
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={property.title}
              className="w-full object-cover h-100%"
              src={property.imageUrl} // Dynamic image URL
            />
            <Button
              size="sm"
              isIconOnly
              color="danger"
              aria-label="Like"
              className="absolute top-2 right-2 z-10"
            >
              <HeartIcon size={20} />
            </Button>
            <CardBody className="overflow-visible p-3">
              <p className="text-xl text-start">${property.price}</p>
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
    </main>
  );
}
