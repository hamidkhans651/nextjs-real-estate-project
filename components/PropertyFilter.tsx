"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export default function PropertyFilter() {
  const [squareFeetMin, setSquareFeetMin] = useState("");
  const [squareFeetMax, setSquareFeetMax] = useState("");
  const [lotSizeMin, setLotSizeMin] = useState("");
  const [lotSizeMax, setLotSizeMax] = useState("");

  return (
    <main>
      {/* More (Popover) */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">More</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 max-h-[400px] overflow-y-auto">
          <TooltipProvider>
            <div className="space-y-6 p-4  w-full max-w-md">

              {/* Property Status */}
              <div>
                <h3 className="font-semibold ">Property Status</h3>
                <div className="space-y-2 mt-2">
                  <CheckboxWithLabel label="Coming soon" tooltip="Properties coming to market soon." />
                  <CheckboxWithLabel label="Accepting backup offers" tooltip="Properties accepting secondary offers." />
                  <CheckboxWithLabel label="Pending & under contract" tooltip="Homes that have pending deals." />
                </div>
              </div>

              {/* Tours */}
              <div>
                <h3 className="font-semibold">Tours</h3>
                <div className="space-y-2 mt-2">
                  <CheckboxWithLabel label="Must have open house" />
                  <CheckboxWithLabel label="Must have 3D Tour" />
                  <CheckboxWithLabel label="Must have Showcase" tooltip="Homes with virtual or showcase tours." />
                </div>
              </div>

              {/* Parking Spots */}
              <div>
                <h3 className="font-semibold ">Parking Spots</h3>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
                <CheckboxWithLabel label="Must have garage" />
              </div>

              {/* Square Feet */}
              <div>
                <h3 className="font-semibold ">Square Feet</h3>
                <div className="flex items-center gap-2 mt-2">
                  <SelectInput value={squareFeetMin} onChange={setSquareFeetMin} placeholder="No Min" />
                  <span className="">-</span>
                  <SelectInput value={squareFeetMax} onChange={setSquareFeetMax} placeholder="No Max" />
                </div>
              </div>

              {/* Lot Size */}
              <div>
                <h3 className="font-semibold">Lot Size</h3>
                <div className="flex items-center gap-2 mt-2">
                  <SelectInput value={lotSizeMin} onChange={setLotSizeMin} placeholder="No Min" />
                  <span className="">-</span>
                  <SelectInput value={lotSizeMax} onChange={setLotSizeMax} placeholder="No Max" />
                </div>
              </div>
              <h1 className="font-bold py-2">Home Type</h1>
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


              <h1 className="font-bold py-2">Max HOA</h1>
              <Input placeholder="Enter Max HOA" className="w-full" />

              <h1 className="font-bold py-2">Property Status</h1>
              <div className="flex items-center space-x-2">
                <Checkbox id="status1" />
                <label htmlFor="status1" className="text-sm">
                  Coming soon
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="status2" />
                <label htmlFor="status2" className="text-sm">
                  Accepting backup offers
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="status3" />
                <label htmlFor="status3" className="text-sm">
                  Pending & under contract
                </label>
              </div>
            </div>
          </TooltipProvider>

        </PopoverContent>
      </Popover>
    </main>

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
          <span className=" cursor-help">ⓘ</span>
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    )}
  </div>
);

// Reusable Select Dropdown for Min/Max Inputs
const SelectInput = ({ value, onChange, placeholder }: { value: string; onChange: (val: string) => void; placeholder: string }) => (
  <Select onValueChange={onChange}>
    <SelectTrigger className="w-full">
      <SelectValue placeholder={value || placeholder} />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="No Min">No Min</SelectItem>
      <SelectItem value="500">500</SelectItem>
      <SelectItem value="1000">1,000</SelectItem>
      <SelectItem value="2000">2,000</SelectItem>
      <SelectItem value="5000">5,000</SelectItem>
      <SelectItem value="No Max">No Max</SelectItem>
    </SelectContent>
  </Select>
);
