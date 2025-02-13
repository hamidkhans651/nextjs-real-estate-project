"use client";

import PropertyFilter from "@/components/PropertyFilter"
import { useState, useEffect, useRef } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
} from "@nextui-org/react";
import { SearchIcon } from "@/app/Properties/icons/SearchIcon";

export default function PropertySearchBar() {
  // Fix SSR hydration issues
  const [isMounted, setIsMounted] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("No Min");
  const [maxPrice, setMaxPrice] = useState("No Max");
  const priceDropdownRef = useRef<HTMLDivElement | null>(null);

  const priceOptions = [
    "No Min", "$0", "$200", "$400", "$600", "$800", "$1,000", "$2,000", "$5,000", "$10,000",
  ];

  useEffect(() => {
    setIsMounted(true);

    // Handle screen size for medium and mobile devices
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth <= 1024);
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (priceDropdownRef.current && !priceDropdownRef.current.contains(event.target as Node)) {
        setIsPriceOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="w-full px-4 py-2 flex flex-wrap md:flex-nowrap items-center justify-center gap-3 md:gap-2">
      {/* Search Bar */}
      <div className="flex-grow md:w-auto relative">
        <Input
          label=""
          isClearable
          radius="lg"
          placeholder="Address, neighborhood, city, ZIP"
          className="w-full md:w-96"
          startContent={
            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-3">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">For Sale</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="For Sale Options">
            <DropdownItem key="sale">For Sale</DropdownItem>
            <DropdownItem key="rent">For Rent</DropdownItem>
            <DropdownItem key="sold">Sold</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* Custom Price Dropdown */}
        <div className="relative inline-block text-left" ref={priceDropdownRef}>
          <button
            onClick={() => setIsPriceOpen(!isPriceOpen)}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md bg-white hover:bg-gray-100 flex items-center justify-between w-32"
          >
            Price ▼
          </button>

          {isPriceOpen && (
            <div className="absolute mt-2 w-72 bg-white shadow-lg border border-gray-200 rounded-md p-4 z-50">
              <h3 className="text-gray-600 text-sm font-semibold mb-2">Price Range</h3>

              {/* Min & Max Price Select */}
              <div className="flex justify-between items-center space-x-2">
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500">Minimum</label>
                  <select
                    className="border p-2 rounded-md w-32"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  >
                    {priceOptions.map((price, index) => (
                      <option key={index} value={price}>{price}</option>
                    ))}
                  </select>
                </div>

                <span className="text-gray-500"> - </span>

                <div className="flex flex-col">
                  <label className="text-xs text-gray-500">Maximum</label>
                  <select
                    className="border p-2 rounded-md w-32"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  >
                    {priceOptions.map((price, index) => (
                      <option key={index} value={price}>{price}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Apply Button */}
              <button
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                onClick={() => setIsPriceOpen(false)}
              >
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Beds & Baths and Home Type moved to "More" dropdown for Medium Screens */}
        {!isMediumScreen && (
          <>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">Beds & Baths</Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Beds & Baths">
                <DropdownItem key="1b">1+ Bed</DropdownItem>
                <DropdownItem key="2b">2+ Beds</DropdownItem>
                <DropdownItem key="3b">3+ Beds</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">Home Type</Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Home Type">
                <DropdownItem key="apartment">Apartment</DropdownItem>
                <DropdownItem key="house">House</DropdownItem>
                <DropdownItem key="condo">Condo</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        )}
        <PropertyFilter />

        {/* Save Search Button */}
        <Button color="primary">Save Search</Button>
      </div>
    </div>
  );
}
