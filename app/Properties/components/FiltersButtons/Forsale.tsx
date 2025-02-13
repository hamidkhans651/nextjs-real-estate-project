"use client";

import { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
} from "@nextui-org/react";
import { SearchIcon } from "@/app/Properties/icons/SearchIcon";
import { useMediaQuery } from "react-responsive"; // For responsiveness

export default function PropertySearchBar() {
  const [isMounted, setIsMounted] = useState(false);
  const isMediumScreen = useMediaQuery({ maxWidth: 1024 }); // Medium screens and below
  const isMobile = useMediaQuery({ maxWidth: 768 }); // Mobile detection

  // Fix SSR hydration issues
  useEffect(() => {
    setIsMounted(true);
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

      {/* Filter Buttons (Grouped) */}
      <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-3">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">For Sale</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="For Sale Options">
            <DropdownItem key="sale">For Sale</DropdownItem>
            <DropdownItem key="rent">For Rent</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">Price</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Price Filter">
            <DropdownItem key="low">Under $200K</DropdownItem>
            <DropdownItem key="mid">$200K - $500K</DropdownItem>
            <DropdownItem key="high">Over $500K</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* Move "Beds & Baths" and "Home Type" to "More" dropdown on Medium Screens */}
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

        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">More</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="More Filters">
            {/* Ensuring valid elements inside DropdownMenu */}
            {isMediumScreen ? (
              <>
                <DropdownItem key="beds">
                  <b>Beds & Baths</b>
                  <DropdownMenu aria-label="Beds & Baths">
                    <DropdownItem key="1b">1+ Bed</DropdownItem>
                    <DropdownItem key="2b">2+ Beds</DropdownItem>
                    <DropdownItem key="3b">3+ Beds</DropdownItem>
                  </DropdownMenu>
                </DropdownItem>

                <DropdownItem key="home-type">
                  <b>Home Type</b>
                  <DropdownMenu aria-label="Home Type">
                    <DropdownItem key="apartment">Apartment</DropdownItem>
                    <DropdownItem key="house">House</DropdownItem>
                    <DropdownItem key="condo">Condo</DropdownItem>
                  </DropdownMenu>
                </DropdownItem>
              </>
            ) : null}

            <DropdownItem key="garage">Garage</DropdownItem>
            <DropdownItem key="pool">Swimming Pool</DropdownItem>
            <DropdownItem key="basement">Basement</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* Save Search Button */}
        <Button color="primary">Save Search</Button>
      </div>
    </div>
  );
}
