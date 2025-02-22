"use client";

import PropertyFilter from "@/components/PropertyFilter"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import PriceFilter from "@/components/pricefilter"
import { useState, useEffect, useRef } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MailOpen } from "lucide-react";



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

      {/* Beds & Baths and Home Type moved to "More" dropdown for Medium Screens */}
      {!isMediumScreen && (
        <>
          <Button variant="link">Find an Agent</Button>
          <Button variant="link">Home Loans</Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Beds & Baths</Button>
            </PopoverTrigger>
            <PopoverContent className="">
              <TooltipProvider>
                <div className=" p-2 overflow-hidden  w-full ">
                  <h3 className="font-semibold ">Bedrooms</h3>
                  <div className=" mt-4  flex items-center">
                    <CheckboxWithLabel label="1+ Beds" tooltip="Properties coming to market soon." />
                    <CheckboxWithLabel label="2+ Beds" tooltip="Properties accepting secondary offers." />
                    <CheckboxWithLabel label="3+ Beds" tooltip="Homes that have pending deals." />
                  </div>
                  <h3 className="font-semibold mt-4 ">Bathrooms</h3>
                  <div className=" mt-4 flex items-center">
                    <CheckboxWithLabel label="1+ Bath" tooltip="Properties coming to market soon." />
                    <CheckboxWithLabel label="2+ Bath" tooltip="Properties accepting secondary offers." />
                    <CheckboxWithLabel label="3+ Bath" tooltip="Homes that have pending deals." />
                  </div>
                </div>
                <Button className="bg-blue-600 mt-4 w-full" variant="outline">apply</Button>
              </TooltipProvider>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Home Type</Button>
            </PopoverTrigger>
            <PopoverContent className="">
              <TooltipProvider>
                <div className=" p-2  w-full ">
                  <h3 className="font-semibold ">Home Type</h3>
                  <div className="space-y-2 mt-2">
                    <CheckboxWithLabel label="apartment" tooltip="Properties coming to market soon." />
                    <CheckboxWithLabel label="houses" tooltip="Properties accepting secondary offers." />
                    <CheckboxWithLabel label="condo" tooltip="Homes that have pending deals." />
                  </div>
                </div>
                <Button className="bg-blue-600 w-full" variant="outline">apply</Button>
              </TooltipProvider>
            </PopoverContent>
          </Popover>


          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">For Sale</Button>
            </PopoverTrigger>
            <PopoverContent className="">
              <TooltipProvider>
                <div className="p-2">
                  <RadioGroup defaultValue="comfortable">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="default" id="r1" />
                      <Label htmlFor="r1">Default</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="comfortable" id="r2" />
                      <Label htmlFor="r2">Comfortable</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="compact" id="r3" />
                      <Label htmlFor="r3">Compact</Label>
                    </div>
                  </RadioGroup>

                </div>


                <Button className="bg-blue-600 w-full" variant="outline">apply</Button>
              </TooltipProvider>
            </PopoverContent>
          </Popover>
        </>
      )}

      <div className="flex gap-3 ">
        <PriceFilter minPrice={""} setMinPrice={function (value: string): void {
          throw new Error("Function not implemented.");
        }} maxPrice={""} setMaxPrice={function (value: string): void {
          throw new Error("Function not implemented.");
        }} />
        <PropertyFilter />
        {/* Save Search Button */}
        <Button color="primary">Save Search</Button>
        <div className="md:block hidden">
          <MailOpen />
        </div>
      </div>

    </div>

  );
}



// Reusable Checkbox with Label & Optional Tooltip
const CheckboxWithLabel = ({ label, tooltip }: { label: string; tooltip?: string }) => (
  <div className="flex items-center gap-2">
    <Checkbox id={label} />
    <label htmlFor={label} className="text-sm ">
      {label}
    </label>
    {tooltip && (
      <Tooltip>
        <TooltipTrigger>
          <span className=" cursor-help"></span>
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    )}
  </div>
);
