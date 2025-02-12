"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Spinner } from "@heroui/react"; // Import the Spinner component

// Zod validation schema
const imageUploadSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    propdetails: z.string().min(1, "Property details are required"),
    price: z.number().min(1, "Price must be greater than 0"),
    location: z.string().min(1, "Location is required"),
    bedrooms: z.number().min(1, "Bedrooms must be at least 1"),
    bathrooms: z.number().min(1, "Bathrooms must be at least 1"),
    sqft: z.number().min(1, "Square footage must be greater than 0"),
    LotSize: z.coerce.number().min(1, "Lot Size must be greater than 0"),
    HOADues: z.coerce.number().min(0, "HOA Dues must be at least 0"),
    YearBuilt: z.coerce.number().min(1800, "Year Built must be a valid year"),
    GarageSqFt: z.coerce.number().min(0, "Garage Square Footage must be at least 0"),
    BasementSqFt: z.coerce.number().min(0, "Basement Square Footage must be at least 0"),
    propertyType: z.string().min(1, "Property type is required"),
    isForSale: z.boolean(),

    appliances: z.array(z.string()).optional(), // Added appliances array
    imageFiles: z.array(z.any()).min(1, "At least one image must be uploaded"),
    descriptions: z.array(z.string()).min(1, "Each image must have a description"),
    basement: z.string().optional(), // For single selection (radio)
    floorCovering: z.array(z.string()).optional(), // For multiple selections (checkbox)
    coolingType: z.array(z.string()).optional(),
    heatingType: z.array(z.string()).optional(),
    heatingFuel: z.array(z.string()).optional(),
    rooms: z.array(z.string()).optional(),
    indoorFeatures: z.array(z.string()).optional(),
    buildingAmenities: z.array(z.string()).optional(),
    architecturalStyle: z.string().optional(), // Single selection
    exterior: z.array(z.string()).optional(),
    outdoorAmenities: z.array(z.string()).optional(),
    parking: z.array(z.string()).optional(),
    roof: z.array(z.string()).optional(),
    view: z.array(z.string()).optional(),
});
// Type for the form data
type FormData = z.infer<typeof imageUploadSchema>;

const PropertiesForm = ({ propertyId }: { propertyId?: number }) => {
    const [previews, setPreviews] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
  
    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(imageUploadSchema),
        defaultValues: {
            title: "",
            description: "",
            propdetails: "",
            price: 0,
            location: "",
            bedrooms: 1,
            bathrooms: 1,
            sqft: 0,
            LotSize: 0,
            HOADues: 0,
            YearBuilt: new Date().getFullYear(),
            GarageSqFt: 0,
            BasementSqFt: 0,
            propertyType: "apartment",
            isForSale: true,
            appliances: [], // Default empty appliances array
            imageFiles: [],
            descriptions: [],
            basement: "",
            floorCovering: [],
            coolingType: [],
            heatingType: [],
            heatingFuel: [],
            rooms: [],
            indoorFeatures: [],
            buildingAmenities: [],
            architecturalStyle: "",
            exterior: [],
            outdoorAmenities: [],
            parking: [],
            roof: [],
            view: [],
        },
    });

    const imageFiles = watch("imageFiles");
    const descriptions = watch("descriptions");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setValue("imageFiles", files);

        const previews = files.map((file) => URL.createObjectURL(file));
        setPreviews(previews);

        const descArray = files.map(() => "");
        setValue("descriptions", descArray);
    };

    const handleDescriptionChange = (index: number, value: string) => {
        const updatedDescriptions = [...descriptions];
        updatedDescriptions[index] = value;
        setValue("descriptions", updatedDescriptions);
    };

    const onSubmit = async (data: FormData) => {
        const { imageFiles, descriptions, ...details } = data;

        // Show loading spinner
        setLoading(true);

        try {
            const filesBase64 = await Promise.all(
                imageFiles.map((file) => {
                    return new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result as string);
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    });
                })
            );

            await axios.post("/api/upload-image", {
                files: filesBase64,
                descriptions,
                details,
            });

            toast.success("Property added successfully!");
            setTimeout(() => window.location.reload(), 1500); // Refresh page
        } catch (error) {
            toast.error("Failed to add property. Please try again.");
        } finally {
            setLoading(false); // Hide loading spinner
        }
    };

    return (
        <>
            <Toaster position="top-center" />

            {/* Loading spinner with blur effect */}
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <Spinner />
                </div>
            )}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className={`space-y-4 ${loading ? "filter blur-sm pointer-events-none" : ""}`}
            >
                {/* Title form */}
                <div>
                    <label htmlFor="title" className="block font-semibold mb-1">Title</label>
                    <input
                        id="title"
                        {...register("title")}
                        type="text"
                        className="w-full border rounded p-2"
                    />
                    {errors.title && <span className="text-red-500">{errors.title.message}</span>}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block font-semibold mb-1">Property Details</label>
                    <textarea
                        id="description"
                        {...register("description")}
                        className="w-full border rounded p-2"
                    />
                    {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                </div>

                {/* Property Details */}
                <div>
                    <label htmlFor="propdetails" className="block font-semibold mb-1"> Description Optional</label>
                    <textarea
                        id="propdetails"
                        {...register("propdetails")}
                        className="w-full border rounded p-2"
                    />
                    {errors.propdetails && <span className="text-red-500">{errors.propdetails.message}</span>}
                </div>


                {/* Location */}
                <div>
                    <label htmlFor="location" className="block font-semibold mb-1 ">Address with zip-code</label>
                    <input
                        id="location"
                        {...register("location")}
                        type="text"
                        className="w-full border rounded p-2"
                    />
                    {errors.location && <span className="text-red-500">{errors.location.message}</span>}
                </div>
                {/* Price */}
                <div>
                    <label htmlFor="price" className="block font-semibold mb-1">Price ($)</label>
                    <input
                        id="price"
                        {...register("price", { valueAsNumber: true })} // ✅ Convert input to number
                        type="number"
                        onChange={(e) => setValue("price", Number(e.target.value))} // ✅ Ensure number conversion
                        className="w-full border rounded p-2"
                    />
                    {errors.price && <span className="text-red-500">{errors.price.message}</span>}
                </div>

                {/* Bedrooms */}
                <div>
                    <label htmlFor="bedrooms" className="block font-semibold mb-1">Bedrooms</label>
                    <input
                        id="bedrooms"
                        {...register("bedrooms", { valueAsNumber: true })}  // ✅ Converts value to number
                        type="number"
                        onChange={(e) => setValue("bedrooms", Number(e.target.value) || 1)}  // ✅ Ensure a valid number
                        className="w-full border rounded p-2"
                    />
                    {errors.bedrooms && <span className="text-red-500">{errors.bedrooms.message}</span>}
                </div>

                {/* Bathrooms */}
                <div>
                    <label htmlFor="bathrooms" className="block font-semibold mb-1">Bathrooms</label>
                    <input
                        id="bathrooms"
                        type="number"
                        {...register("bathrooms", { valueAsNumber: true })} // ✅ Force number conversion
                        onChange={(e) => setValue("bathrooms", Number(e.target.value) || 1)} // ✅ Ensure it's a number
                        className="w-full border rounded p-2"
                    />
                    {errors.bathrooms && <span className="text-red-500">{errors.bathrooms.message}</span>}
                </div>

                {/* Square Footage */}
                <div>
                    <label htmlFor="sqft" className="block font-semibold mb-1">Square Footage (sq ft)</label>
                    <input
                        id="sqft"
                        type="number"
                        {...register("sqft", { valueAsNumber: true })} // Ensures form treats it as a number
                        onChange={(e) => {
                            const value = parseFloat(e.target.value) || 0; // Explicit conversion
                            setValue("sqft", value);
                        }}
                        className="w-full border rounded p-2"
                    />
                    {errors.sqft && <span className="text-red-500">{errors.sqft.message}</span>}
                </div>




                {/* Lot Size */}
                <div>
                    <label htmlFor="LotSize" className="block font-semibold mb-1">Lot Size</label>
                    <input
                        id="LotSize"
                        {...register("LotSize")}
                        type="number"
                        className="w-full border rounded p-2"
                    />
                    {errors.LotSize && <span className="text-red-500">{errors.LotSize.message}</span>}
                </div>

                {/* Square Footage */}
                <div>
                    <label htmlFor="sqft" className="block font-semibold mb-1">Square Footage (sq ft)</label>
                    <input
                        id="sqft"
                        type="number"
                        {...register("sqft")}
                        onChange={(e) => setValue("sqft", Number(e.target.value) || 0)}
                        className="w-full border rounded p-2"
                    />
                    {errors.sqft && <span className="text-red-500">{errors.sqft.message}</span>}
                </div>

                {/* HOA Dues */}
                <div>
                    <label htmlFor="HOADues" className="block font-semibold mb-1">HOA Dues</label>
                    <input
                        id="HOADues"
                        type="number"
                        {...register("HOADues")}
                        onChange={(e) => setValue("HOADues", Number(e.target.value) || 0)}
                        className="w-full border rounded p-2"
                    />
                    {errors.HOADues && <span className="text-red-500">{errors.HOADues.message}</span>}
                </div>

                {/* Year Built */}
                <div>
                    <label htmlFor="YearBuilt" className="block font-semibold mb-1">Year Built</label>
                    <input
                        id="YearBuilt"
                        type="number"
                        {...register("YearBuilt")}
                        onChange={(e) => setValue("YearBuilt", Number(e.target.value) || new Date().getFullYear())}
                        className="w-full border rounded p-2"
                    />
                    {errors.YearBuilt && <span className="text-red-500">{errors.YearBuilt.message}</span>}
                </div>

                {/* Garage Sq Ft */}
                <div>
                    <label htmlFor="GarageSqFt" className="block font-semibold mb-1">Garage Square Footage</label>
                    <input
                        id="GarageSqFt"
                        type="number"
                        {...register("GarageSqFt")}
                        onChange={(e) => setValue("GarageSqFt", Number(e.target.value) || 0)}
                        className="w-full border rounded p-2"
                    />
                    {errors.GarageSqFt && <span className="text-red-500">{errors.GarageSqFt.message}</span>}
                </div>

                {/* Basement Sq Ft */}
                <div>
                    <label htmlFor="BasementSqFt" className="block font-semibold mb-1">Basement Square Footage</label>
                    <input
                        id="BasementSqFt"
                        type="number"
                        {...register("BasementSqFt")}
                        onChange={(e) => setValue("BasementSqFt", Number(e.target.value) || 0)}
                        className="w-full border rounded p-2"
                    />
                    {errors.BasementSqFt && <span className="text-red-500">{errors.BasementSqFt.message}</span>}
                </div>


                {/* Property Type */}
                <div>
                    <label htmlFor="propertyType" className="block font-semibold mb-1">Property Type</label>
                    <select
                        id="propertyType"
                        {...register("propertyType")}
                        className="w-full border rounded p-2"
                    >
                        <option value="apartment">Apartment</option>
                        <option value="villa">Villa</option>
                        <option value="condo">Condo</option>
                        <option value="bungalow">Bungalow</option>
                    </select>
                    {errors.propertyType && <span className="text-red-500">{errors.propertyType.message}</span>}
                </div>
                {/* Appliances Section */}
                <div>
                    <h1 className="text-2xl font-bold">Room Details</h1>
                    <h2 className="font-semibold mb-2">Appliances</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            "Dishwasher",
                            "Dryer",
                            "Freezer",
                            "Garbage disposal",
                            "Microwave",
                            "Range / Oven",
                            "Refrigerator",
                            "Trash compactor",
                            "Washer",
                        ].map((appliance) => (
                            <label key={appliance} className="flex items-center">
                                <Controller
                                    name="appliances"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            type="checkbox"
                                            value={appliance}
                                            onChange={(e) => {
                                                const selected = field.value || [];
                                                if (e.target.checked) {
                                                    setValue("appliances", [...selected, appliance]);
                                                } else {
                                                    setValue(
                                                        "appliances",
                                                        selected.filter((item) => item !== appliance)
                                                    );
                                                }
                                            }}
                                            className="mr-2"
                                        />
                                    )}
                                />
                                {appliance}
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    {/* Basement Section */}
                    <h2 className="font-semibold mb-2">Basement</h2>
                    <div className="flex flex-col">
                        {["Finished", "Partially finished", "Unfinished", "None"].map((basement) => (
                            <label key={basement} className="flex items-center">
                                <input
                                    type="radio"
                                    value={basement}
                                    {...register("basement")}
                                    className="mr-2"
                                />
                                {basement}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Floor Covering Section */}
                <div>
                    <h2 className="font-semibold mb-2">Floor Covering</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {["Carpet", "Concrete", "Hardwood", "Laminate", "Linoleum / Vinyl", "Slate", "Softwood", "Tile", "Other"].map((floor) => (
                            <label key={floor} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={floor}
                                    {...register("floorCovering")}
                                    className="mr-2"
                                />
                                {floor}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Utility Details Section */}
                <h1 className="text-2xl font-bold mt-10">Utility Details</h1>

                {/* Cooling Type Section */}
                <div>
                    <h2 className="font-semibold mb-2">Cooling Type</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {["Central", "Evaporative", "Geothermal", "Refrigeration", "Solar", "Wall", "Other", "None"].map((cooling) => (
                            <label key={cooling} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={cooling}
                                    {...register("coolingType")}
                                    className="mr-2"
                                />
                                {cooling}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Heating Type Section */}
                <div>
                    <h2 className="font-semibold mb-2">Heating Type</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {["Baseboard", "Forced air", "Geothermal", "Heat pump", "Radiant", "Stove", "Wall", "Other"].map((heating) => (
                            <label key={heating} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={heating}
                                    {...register("heatingType")}
                                    className="mr-2"
                                />
                                {heating}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Heating Fuel Section */}
                <div>
                    <h2 className="font-semibold mb-2">Heating Fuel</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {["Coal", "Electric", "Gas", "Oil", "Propane / Butane", "Solar", "Wood / Pellet", "Other", "None"].map((fuel) => (
                            <label key={fuel} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={fuel}
                                    {...register("heatingFuel")}
                                    className="mr-2"
                                />
                                {fuel}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Room Details */}
                <h1 className="text-2xl font-bold mt-10">Room Details</h1>

                {/* Rooms Section */}
                <div>
                    <h2 className="font-semibold mb-2">Rooms</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            "Breakfast nook",
                            "Dining room",
                            "Family room",
                            "Laundry room",
                            "Library",
                            "Master bath",
                            "Mud room",
                            "Office",
                            "Pantry",
                            "Recreation room",
                            "Workshop",
                            "Solarium / Atrium",
                            "Sun room",
                            "Walk-in closet",
                        ].map((room) => (
                            <label key={room} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={room}
                                    {...register("rooms")}
                                    className="mr-2"
                                />
                                {room}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Indoor Features */}
                <div>
                    <h2 className="font-semibold mb-2">Indoor Features</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            "Attic",
                            "Cable ready",
                            "Ceiling fans",
                            "Double pane/storm windows",
                            "Fireplace",
                            "Intercom system",
                            "Jetted tub",
                            "Mother-in-law apartment",
                            "Security system",
                            "Skylights",
                            "Vaulted ceiling",
                            "Wet bar",
                            "Wired",
                        ].map((feature) => (
                            <label key={feature} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={feature}
                                    {...register("indoorFeatures")}
                                    className="mr-2"
                                />
                                {feature}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Building Details */}
                <h1 className="text-2xl font-bold mt-10">Building Details</h1>
                <div>
                    <h2 className="font-semibold mb-2">Building Amenities</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            "Assisted living community",
                            "Basketball court",
                            "Controlled access",
                            "Disabled access",
                            "Doorman",
                            "Elevator",
                            "Fitness center",
                            "Gated entry",
                            "Near transportation",
                            "Over 55+ active community",
                            "Sports court",
                            "Storage",
                            "Tennis court",
                        ].map((amenity) => (
                            <label key={amenity} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={amenity}
                                    {...register("buildingAmenities")}
                                    className="mr-2"
                                />
                                {amenity}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Architectural Style */}
                <div>
                    <h2 className="font-semibold mb-2">Architectural Style</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            "Bungalow",
                            "Cape Cod",
                            "Colonial",
                            "Contemporary",
                            "Craftsman",
                            "French",
                            "Georgian",
                            "Loft",
                            "Modern",
                            "Queen Anne / Victorian",
                            "Ranch / Rambler",
                            "Santa Fe / Pueblo Style",
                            "Spanish",
                            "Split-level",
                            "Tudor",
                            "Other",
                        ].map((style) => (
                            <label key={style} className="flex items-center">
                                <input
                                    type="radio"
                                    value={style}
                                    {...register("architecturalStyle")}
                                    className="mr-2"
                                />
                                {style}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Exterior and Outdoor Amenities */}
                <h1 className="text-2xl font-bold mt-10">Exterior and Outdoor Amenities</h1>

                {/* Exterior */}
                <div>
                    <h2 className="font-semibold mb-2">Exterior</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            "Brick",
                            "Cement / Concrete",
                            "Composition",
                            "Metal",
                            "Shingle",
                            "Stone",
                            "Stucco",
                            "Vinyl",
                            "Wood",
                            "Wood products",
                            "Other",
                        ].map((item) => (
                            <label key={item} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={item}
                                    {...register("exterior")}
                                    className="mr-2"
                                />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Outdoor Amenities */}
                <div>
                    <h2 className="font-semibold mb-2">Outdoor Amenities</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            "Balcony/patio",
                            "Barbecue area",
                            "Deck",
                            "Dock",
                            "Fenced yard",
                            "Garden",
                            "Greenhouse",
                            "Hot tub/spa",
                            "Lawn",
                            "Pond",
                            "Pool",
                            "Porch",
                            "RV parking",
                            "Sauna",
                            "Sprinkler system",
                            "Waterfront",
                        ].map((amenity) => (
                            <label key={amenity} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={amenity}
                                    {...register("outdoorAmenities")}
                                    className="mr-2"
                                />
                                {amenity}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Parking */}
                <h1 className="text-2xl font-bold mt-10">Parking, Roof, and View</h1>
                <div>
                    <h2 className="font-semibold mb-2">Parking</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {["Carport", "Garage - Attached", "Garage - Detached", "Off-street", "On-street", "None"].map(
                            (option) => (
                                <label key={option} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={option}
                                        {...register("parking")}
                                        className="mr-2"
                                    />
                                    {option}
                                </label>
                            )
                        )}
                    </div>
                </div>

                {/* Roof */}
                <div>
                    <h2 className="font-semibold mb-2">Roof</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            "Asphalt",
                            "Built-up",
                            "Composition",
                            "Metal",
                            "Shake / Shingle",
                            "Slate",
                            "Tile",
                            "Other",
                        ].map((option) => (
                            <label key={option} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={option}
                                    {...register("roof")}
                                    className="mr-2"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>

                {/* View */}
                <div>
                    <h2 className="font-semibold mb-2">View</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {["City", "Mountain", "Park", "Territorial", "Water", "None"].map((option) => (
                            <label key={option} className="flex items-center">
                                <input
                                    type="checkbox"
                                    value={option}
                                    {...register("view")}
                                    className="mr-2"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>



                {/* Is For Sale */}
                <Controller
                    name="isForSale"
                    control={control}
                    render={({ field }) => (
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={field.value}
                                onChange={(e) => field.onChange(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <span>For Sale</span>
                        </div>
                    )}
                />


                {/* Image Upload */}
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                    />
                    {errors.imageFiles && (
                        <span className="text-red-500">{errors.imageFiles.message}</span>
                    )}
                </div>

                {previews.map((preview, index) => (
                    <div key={index} className="space-y-2">
                        <img
                            src={preview}
                            alt={`Preview ${index}`}
                            className="w-64 h-64 object-cover"
                        />
                    </div>
                ))}
                {errors.descriptions && (
                    <span className="text-red-500">{errors.descriptions.message}</span>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default PropertiesForm;
