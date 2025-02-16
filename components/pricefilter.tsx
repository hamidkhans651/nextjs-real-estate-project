import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { ChevronDown } from "lucide-react";

interface PriceFilterProps {
    minPrice: string;
    setMinPrice: (value: string) => void;
    maxPrice: string;
    setMaxPrice: (value: string) => void;
}

const priceOptions = Array.from({ length: 61 }, (_, i) => `$${(i * 500000).toLocaleString()}`);

export default function PropertyFilter({ minPrice, setMinPrice, maxPrice, setMaxPrice }: PriceFilterProps) {
    const [sliderValue, setSliderValue] = useState([0, 30000000]);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Popover onOpenChange={(open) => setIsOpen(open)}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    <span>Price</span>
                    <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} size={16} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-4 ">
                <h3 className=" text-sm font-semibold mb-2">Price Range</h3>
                <div className="flex justify-between items-center space-x-2">
                    {/* Minimum Price */}
                    <div className="flex flex-col w-1/2">
                        <label className="text-xs p-2 ">Minimum</label>
                        <Select value={minPrice} onValueChange={setMinPrice}>
                            <SelectTrigger className="border p-2 rounded-md">
                                <SelectValue placeholder="Min" />
                            </SelectTrigger>
                            <SelectContent>
                                {priceOptions.map((price, index) => (
                                    <SelectItem key={index} value={price}>{price}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <span className="items-center"> - </span>
                    {/* Maximum Price */}
                    <div className="flex flex-col w-1/2">
                        <label className="text-xs p-2">Maximum</label>
                        <Select value={maxPrice} onValueChange={setMaxPrice}>
                            <SelectTrigger className="border p-2 rounded-md">
                                <SelectValue placeholder="Max" />
                            </SelectTrigger>
                            <SelectContent>
                                {priceOptions.map((price, index) => (
                                    <SelectItem key={index} value={price}>{price}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button className="bg-blue-600 mt-4 w-full" variant="outline" onClick={() => console.log('Apply clicked')}>
                    Apply
                </Button>
            </PopoverContent>
        </Popover>
    );
}

const CheckboxWithLabel = ({ label, tooltip }: { label: string; tooltip?: string }) => (
    <div className="flex items-center gap-2">
        <Checkbox id={label} />
        <label htmlFor={label} className="text-sm ">{label}</label>
        {tooltip && (
            <Tooltip>
                <TooltipTrigger>
                    <span className="cursor-help">ⓘ</span>
                </TooltipTrigger>
                <TooltipContent>{tooltip}</TooltipContent>
            </Tooltip>
        )}
    </div>
);





















