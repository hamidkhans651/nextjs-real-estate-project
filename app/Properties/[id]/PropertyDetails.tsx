"use client";
import {
    Hammer,
    BadgeDollarSign, Ruler,
    House
} from "lucide-react";
import SaveShare from "@/components/SaveShare"
import { useState } from "react";
import Image from "next/image";
import { BedDouble } from "lucide-react";

type PropertyDetailsProps = {
    property: {
        imageUrl: string;
        title: string;
        isForSale: boolean;
        location: string;
        price: number;
        bedrooms: number;
        bathrooms: number;
        sqft: number;
        propertyType: string;
        description: string;
        LotSize: number;
        HOADues: number;
        YearBuilt: number;
        GarageSqFt: number;
        BasementSqFt: number;
        basement: string; // ✅ Now handled as an empty string if null
        floorCovering: string[]; // ✅ Expecting an array
        coolingType: string[];
        heatingType: string[];
        heatingFuel: string[];
        rooms: string[];
        indoorFeatures: string[];
        buildingAmenities: string[];
        architecturalStyle: string;
        exterior: string[];
        outdoorAmenities: string[];
        parking: string[];
        roof: string[];
        view: string[];
    };
};


export default function PropertyDetails({ property }: PropertyDetailsProps) {
    const [showMore, setShowMore] = useState(false); // State for "Show More"
    const toggleShowMore = () => setShowMore(!showMore);

    return (

        <main className="p-2">


            {/* Tabs for navigation */}
            <div className="tabs-container flex flex-wrap sm:flex-nowrap  font-medium text-xs sm:text-sm md:text-base justify-between border-b border-gray-300 mb-4 ">

                <button
                    className="tab-button p-2  font-medium whitespace-nowrap  "
                    onClick={() =>
                        document.getElementById("overview")?.scrollIntoView({
                            behavior: "smooth",
                        })
                    }
                >
                    Overview
                </button>

                <button
                    className="tab-button p-2  py-2 font-medium whitespace-nowrap  "
                    onClick={() =>
                        document.getElementById("description")?.scrollIntoView({
                            behavior: "smooth",
                        })
                    }
                >
                    Property Description
                </button>
                <button
                    className="tab-button  py-2 font-medium whitespace-nowrap"
                    onClick={() =>
                        document.getElementById("Facts & features")?.scrollIntoView({
                            behavior: "smooth",
                        })
                    }
                >
                    Facts & features
                </button>
                <button
                    className="tab-button py-2 font-medium whitespace-nowrap"
                    onClick={() =>
                        document.getElementById("price")?.scrollIntoView({
                            behavior: "smooth",
                        })
                    }
                >
                    Property Price
                </button>
            </div>



            <div className="flex ">
                <Image
                    className="rounded-md"
                    src={property.imageUrl}
                    alt={property.title}
                    width={12000}
                    height={200}
                />
            </div>
            {/* Overview Section */}

            <div className="py-4">
                <section
                    id="overview"
                    className="p-6  rounded-xl border-2 mb-4 shadow-md"
                >


                    {/* Price and Location */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between
                        ">
                            <h2 className="text-3xl font-bold  mb-2">${property.price.toLocaleString()}</h2>
                            <SaveShare />


                        </div>
                        <p className="">{property.location}</p>

                    </div>

                    {/* Beds, Baths, and Sqft */}
                    <div className="flex items-center justify-between border-t border-b py-4 border-gray-300">
                        <div className="flex flex-col items-center text-center">
                            <h3 className="text-xl font-bold ">{property.bedrooms}</h3>
                            <p className="">Beds
                                <BedDouble />
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <h3 className="text-xl font-bold ">{property.bathrooms}</h3>
                            <p className="">Baths</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <h3 className="text-xl font-bold ">{property.sqft.toLocaleString()}</h3>
                            <p className="">Sq Ft</p>
                        </div>
                    </div>

                    {/* Additional Details */}
                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm  mb-6 ">
                        <div className="flex items-center gap-2">
                            <span className=" w-6 h-6 rounded-full flex items-center justify-center">
                                <House />
                            </span>
                            <p>{property.propertyType}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className=" w-6 h-6 rounded-full flex items-center justify-center">
                                🛠️
                            </span>
                            <p>Built in {property.YearBuilt}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className=" w-6 h-6  rounded-full flex items-center justify-center">
                                <Ruler />
                            </span>
                            <p>{property.LotSize} sqft lot</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className=" w-6 h-6  rounded-full flex items-center justify-center">
                                💰
                            </span>
                            <p>$-- Zestimate</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className=" w-6 h-6 rounded-full flex items-center justify-center">
                                <BadgeDollarSign />
                            </span>
                            <p>${property.HOADues}/mo HOA</p>
                        </div>
                    </div>


                    {/* Property Description Section */}

                    <section className="border-t border-b   border-gray-300">

                        <h2 className="text-xl font-bold  py-6 ">
                            What's special</h2>
                        <p>
                            {showMore
                                ? property.description
                                : property.description.slice(0, 200) + "..."}
                        </p>
                        <button
                            onClick={toggleShowMore}
                            className="text-blue-500 underline mt-2"
                        >
                            {showMore ? "Show Less" : "Show More"}
                        </button>

                        <div className="flex gap-2 py-2">
                            |<p>Now on MHK-RealEstate</p>
                            |<p>200 views</p>
                            |<p>19 saves</p>

                        </div>
                        <ol className="py-2">
                            <li>MHK last checked: 13 hours ago</li>
                            <li>Listing updated:January 25, 2025 at 08:00pm </li>
                            <li>Listed by: Polly Grueso TREC #0742460 281-235-5925, Anchored Real Estate Group



                            </li>
                            <li className="py-2">Source: HAR,MLS#: 89058153</li>
                        </ol>



                    </section>

                </section>

                {/* Facts & features */}
                <section
                    id="Facts & features"
                    className="flex p-6 rounded-xl border-2 shadow-md mb-4 items-start justify-between"
                >
                    {/* Left Column */}
                    <div className="w-1/2 pr-4">
                        <h1 className="text-xl font-bold mb-2">Facts & features</h1>
                        <h1>Interior.</h1>

                        <h3 className="font-semibold text-lg">Bedrooms & bathrooms</h3>
                        <ul className="list-disc list-inside">
                            <li>Bedrooms: 3</li>
                            <li>Bathrooms: 3</li>
                            <li>Full bathrooms: 2</li>
                            <li>1/2 bathrooms: 1</li>
                        </ul>

                        <h3 className="font-semibold text-lg mt-4">Rooms</h3>
                        <ul className="list-disc list-inside">
                            <li>Room types: 1 Living Area, Den, Formal Dining</li>
                        </ul>

                        <h3 className="font-semibold text-lg mt-4">Heating</h3>
                        <ul className="list-disc list-inside">
                            <li>Natural Gas</li>
                        </ul>

                        <h3 className="font-semibold text-lg mt-4">Cooling</h3>
                        <ul className="list-disc list-inside">
                            <li>Electric</li>
                        </ul>
                    </div>

                    {/* Right Column */}
                    <div className="w-1/2 pl-4">
                        <h3 className="font-semibold text-lg">Appliances</h3>
                        <ul className="list-disc list-inside">
                            <li>
                                Included: Gas Oven, Gas Range, Trash Compactor, Dishwasher, Disposal,
                                Microwave, Washer/Dryer
                            </li>
                            <li>Laundry: Electric Dryer Hookup, Gas Dryer Hookup</li>
                        </ul>

                        <h3 className="font-semibold text-lg mt-4">Features</h3>
                        <ul className="list-disc list-inside">
                            <li>Crown Molding, All Bedrooms Up, Countertops (Granite)</li>
                            <li>Flooring: Carpet, Laminate</li>
                            <li>Windows: Insulated/Low-E windows</li>
                            <li>Number of fireplaces: 1</li>
                            <li>Fireplace features: Wood Burning</li>
                        </ul>

                        <h3 className="font-semibold text-lg mt-4">Interior area</h3>
                        <ul className="list-disc list-inside">
                            <li>Total structure area: 2,156</li>
                            <li>Total interior livable area: 2,156 sqft</li>
                        </ul>
                        <h3 className="font-semibold text-lg mt-4">Financial & listing details
                        </h3>
                        <ul className="list-disc list-inside">
                            <li>Total structure area: 2,156</li>
                            <li>Total interior livable area: 2,156 sqft</li>
                        </ul>
                    </div>
                </section>
                <section
                    id="Facts & features"
                    className="flex p-6 rounded-xl border-2 shadow-md mb-4 items-start justify-between"
                >
                    {/* Left Column */}
                    <div className="w-1/2 pr-4">
                        <h1 className="text-xl font-bold mb-2">Property</h1>
                        <h1>Interior.</h1>

                        <h3 className="font-semibold text-lg">Parking</h3>
                        <ul className="list-disc list-inside">
                            <li>Bedrooms: 3</li>
                            <li>Bathrooms: 3</li>
                            <li>Full bathrooms: 2</li>
                            <li>1/2 bathrooms: 1</li>
                        </ul>

                        <h3 className="font-semibold text-lg mt-4">Features</h3>
                        <ul className="list-disc list-inside">
                            <li>Room types: 1 Living Area, Den, Formal Dining</li>
                        </ul>
                    </div>

                    {/* Right Column */}
                    <div className="w-1/2 pl-4">
                        <h3 className="font-semibold text-lg">Lot</h3>
                        <ul className="list-disc list-inside">
                            <li>
                                Included: Gas Oven, Gas Range, Trash Compactor, Dishwasher, Disposal,
                                Microwave, Washer/Dryer
                            </li>
                            <li>Laundry: Electric Dryer Hookup, Gas Dryer Hookup</li>
                        </ul>

                        <h3 className="font-semibold text-lg mt-4">Features</h3>
                        <ul className="list-disc list-inside">
                            <li>Crown Molding, All Bedrooms Up, Countertops (Granite)</li>
                            <li>Flooring: Carpet, Laminate</li>
                            <li>Windows: Insulated/Low-E windows</li>
                            <li>Number of fireplaces: 1</li>
                            <li>Fireplace features: Wood Burning</li>
                        </ul>

                        <h3 className="font-semibold text-lg mt-4">Interior area</h3>
                        <ul className="list-disc list-inside">
                            <li>Total structure area: 2,156</li>
                            <li>Total interior livable area: 2,156 sqft</li>
                        </ul>
                    </div>
                </section>

                {/* Property Price Section */}
                < section
                    id="price"
                    className="p-4 rounded-xl border-2 mb-4 shadow-md"
                >
                    <h2 className="text-xl font-bold mb-2">Property Price</h2>
                    <p>${property.price}</p>
                </section >

                <section
                    id="price"
                    className="p-4 rounded-xl border-2 mb-4 shadow-md"
                >
                    <h2 className="text-xl font-bold mb-2">Around this home</h2>
                    <p>${property.price}</p>
                </section>
                <section
                    id="price"
                    className="p-4 rounded-xl border-2 mb-4 shadow-md"
                >
                    <h2 className="text-xl font-bold mb-2">Payment calculator</h2>
                    <p>${property.price}</p>
                </section>
                <section
                    id="price"
                    className="p-4 rounded-xl border-2 mb-4 shadow-md"
                >
                    <h2 className="text-xl font-bold mb-2">Payment calculator</h2>
                    <p>${property.price}</p>
                </section>
                <section
                    id="price"
                    className="p-4 rounded-xl border-2 mb-4 shadow-md"
                >
                    <h2 className="text-xl font-bold mb-2">Payment calculator</h2>
                    <p>${property.price}</p>
                </section>
                <section
                    id="price"
                    className="p-4 rounded-xl border-2 mb-4 shadow-md"
                >
                    <h2 className="text-xl font-bold mb-2">Payment calculator</h2>
                    <p>${property.price}</p>
                </section>
                {/* <section
                    id="price"
                    className="p-4 border-slate-200 rounded-xl border-2 mb-4"
                >
                    <h2 className="text-xl font-bold mb-2">Payment calculator</h2>
                    <p>${property.price}</p>
                </section>
                <section
                    id="price"
                    className="p-4 border-slate-200 rounded-xl border-2 mb-4"
                >
                    <h2 className="text-xl font-bold mb-2">Payment calculator</h2>
                    <p>${property.price}</p>
                </section>
                <section
                    id="price"
                    className="p-4 border-slate-200 rounded-xl border-2 mb-4"
                >
                    <h2 className="text-xl font-bold mb-2">Payment calculator</h2>
                    <p>${property.price}</p>
                </section>
                <section
                    id="price"
                    className="p-4 border-slate-200 rounded-xl border-2 mb-4"
                >
                    <h2 className="text-xl font-bold mb-2">Payment calculator</h2>
                    <p>${property.price}</p>
                </section>
                <section
                    id="price"
                    className="p-4 border-slate-200 rounded-xl border-2 mb-4"
                >
                    <h2 className="text-xl font-bold mb-2">Payment calculator</h2>
                    <p>${property.price}</p>
                </section>
                <section
                    id="price"
                    className="p-4 border-slate-200 rounded-xl border-2 mb-4"
                >
                    <h2 className="text-xl font-bold mb-2">Payment calculator</h2>
                    <p>${property.price}</p>
                </section> */}

            </div >
        </main >
    );
}
