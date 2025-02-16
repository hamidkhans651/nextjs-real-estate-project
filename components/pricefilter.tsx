import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface PriceFilterProps {
    priceOptions: string[];
    minPrice: string;
    setMinPrice: (value: string) => void;
    maxPrice: string;
    setMaxPrice: (value: string) => void;
}

export default function PriceFilter({ priceOptions, minPrice, setMinPrice, maxPrice, setMaxPrice }: PriceFilterProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Price ▼</Button>
            </PopoverTrigger>
            <PopoverContent className="p-4 w-64">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Price Range</h3>
                <div className="flex justify-between items-center space-x-2">
                    {/* Minimum Price */}
                    <div className="flex flex-col w-1/2">
                        <label className="text-xs text-gray-500">Minimum</label>
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
                    <span className="text-gray-500"> - </span>
                    {/* Maximum Price */}
                    <div className="flex flex-col w-1/2">
                        <label className="text-xs text-gray-500">Maximum</label>
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
