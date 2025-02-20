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
import { ChevronDown } from "lucide-react";


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
        basement: string;
        architecturalStyle: string; // ✅ Now always a string
        floorCovering: string[];
        coolingType: string[];
        heatingType: string[];
        heatingFuel: string[];
        rooms: string[];
        indoorFeatures: string[];
        buildingAmenities: string[];
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
                        document.getElementById("Facts & features")?.scrollIntoView({
                            behavior: "smooth",
                        })
                    }
                >
                    Facts & features

                </button>
                <button
                    className="tab-button  py-2 font-medium whitespace-nowrap"
                    onClick={() =>
                        document.getElementById("Market value")?.scrollIntoView({
                            behavior: "smooth",
                        })
                    }
                >
                    Market value
                </button>
                <button
                    className="tab-button py-2 font-medium whitespace-nowrap"
                    onClick={() =>
                        document.getElementById("Payment Calculator")?.scrollIntoView({
                            behavior: "smooth",
                        })
                    }
                >
                    Payment Calculator
                </button>
                <button
                    className="tab-button py-2 font-medium whitespace-nowrap"
                    onClick={() =>
                        document.getElementById("Neighburhood")?.scrollIntoView({
                            behavior: "smooth",
                        })
                    }
                >
                    Neighburhood
                </button>
            </div>



            <div className="flex ">

                <Image
                    className="rounded-md w-full h-[600px] object-cover"
                    src={property.imageUrl}
                    alt={property.title}
                    width={1200}
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
                                <Hammer />
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
                                <BadgeDollarSign />

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
                        <div className="flex gap-2 p-2 text-black">
                            <p className="bg-[#F1F1F4] rounded-sm  p-1" p-2 >{property.architecturalStyle}</p>
                            <p className="bg-[#F1F1F4] rounded-sm p-1" p-2 >{property.exterior}</p>
                            <p className="bg-[#F1F1F4] rounded-sm p-1" p-2 >{property.outdoorAmenities}</p>
                            <p className="bg-[#F1F1F4] rounded-sm p-1 " p-2 >{property.indoorFeatures}</p>
                            <p className="bg-[#F1F1F4] rounded-sm p-1" m-10 >{property.propertyType}</p>
                        </div>

                        <p>
                            {showMore
                                ? property.description
                                : property.description.slice(0, 200) + "..."}
                        </p>
                        <button
                            onClick={toggleShowMore}
                            className="flex items-center text-blue-500 underline mt-2 transition-transform"
                        >
                            {showMore ? "Show Less" : "Show More"}
                            <ChevronDown className={`ml-1 transition-transform ${showMore ? "rotate-180" : "rotate-0"}`} size={16} />
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
                            <li>Bedrooms: {property.bedrooms}</li>
                            <li>Bathrooms: {property.bathrooms}</li>
                            {/* <li>Full bathrooms: </li>
                            <li>1/2 bathrooms: 1</li> */}
                        </ul>

                        <h3 className="font-semibold text-lg mt-4">Rooms</h3>
                        <ul className="list-disc list-inside">
                            <li className="gap-2 p-2">Room types: {property.rooms}</li>
                        </ul>

                        <h3 className="font-semibold text-lg mt-4">Heating</h3>
                        <ul className="list-disc list-inside">
                            <li>{property.heatingFuel}</li>
                        </ul>

                        <h3 className="font-semibold text-lg mt-4">Cooling</h3>
                        <ul className="list-disc list-inside">
                            <li>{property.coolingType}</li>
                        </ul>
                    </div>

                    {/* Right Column */}
                    <div className="w-1/2 pl-4">
                        <h3 className="font-semibold text-lg">Appliances</h3>
                        <ul className="list-disc list-inside">
                            <li>
                                {property.rooms}
                            </li>
                        </ul>

                        <h3 className="font-semibold text-lg mt-4">Features</h3>
                        <ul className="list-disc list-inside">

                            <li>{property.indoorFeatures}</li>

                        </ul>

                        <h3 className="font-semibold text-lg mt-4">Interior area</h3>
                        <ul className="list-disc list-inside">

                            <li>Total structure area: 2,156 </li>
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
                    className="flex p-6 rounded-xl border-2 shadow-md mb-4 items-start justify-between"
                >
                    {/* Left Column */}
                    <div className="w-1/2 pr-4">
                        <h1 className="text-xl font-bold mb-2">Property</h1>

                        <h3 className="font-semibold text-lg">Parking</h3>
                        <ul className="list-disc list-inside">
                            <li>{property.parking}</li>

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
                                Lot-Size:  {property.LotSize}

                            </li>
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
                    id="Market value"
                    className="p-4 rounded-xl border-2 mb-4 shadow-md"
                >

                    {/* Section Header */}
                    <h2 className="text-2xl font-bold text-blue-700 mb-4">
                        Estimated market value
                    </h2>

                    {/* Three-Column Overview */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        {/* Zestimate */}
                        <div className="p-4 border rounded-md text-center">
                            <p className="font-semibold">Zestimate<sup>®</sup></p>
                            <p className="text-gray-500">Not available</p>
                        </div>

                        {/* Estimated Sales Range */}
                        <div className="p-4 border rounded-md text-center">
                            <p className="font-semibold">Estimated sales range</p>
                            <p className="text-gray-500">Not available</p>
                        </div>

                        {/* Rent Zestimate */}
                        <div className="p-4 border rounded-md text-center">
                            <p className="font-semibold">Rent Zestimate<sup>®</sup></p>
                            <p className="text-gray-500">Not available</p>
                        </div>
                    </div>

                    {/* Price History */}
                    <h3 className="text-xl font-bold mb-2">Price history</h3>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-300 text-gray-600 font-semibold">
                                <th className="py-2 px-2 w-1/4">Date</th>
                                <th className="py-2 px-2 w-1/4">Event</th>
                                <th className="py-2 px-2 w-1/4">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200">
                                <td className="py-3 px-2">1/25/2025</td>
                                <td className="py-3 px-2">Listed for sale</td>
                                <td className="py-3 px-2">
                                    <p>$200,000</p>
                                    <p className="text-sm text-gray-500">$93/sqft</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Source Info */}
                    <p className="text-sm text-gray-500 mt-2">
                        Source:{" "}
                        <span className="text-blue-600">
                            HAR #89058153
                        </span>{" "}
                        <a href="#" className="underline">
                            Report
                        </a>
                    </p>

                    <h1>
                        Public tax history

                    </h1>
                    <p>

                        Tax history is unavailable.
                    </p>
                </section >

                <section
                    id="Payment Calculator"
                    className="p-4 rounded-xl border-2 mb-4 shadow-md"
                >
                    {/* Heading */}
                    <h2 className="text-xl font-bold mb-4">Monthly payment</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        {/* Left Section: Pie Chart + Legend */}
                        <div className="flex items-center  rounded p-4">
                            {/* Pie Chart */}
                            <div className="relative w-40 h-40 flex-none mr-6">
                                {/* Background circle */}
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: "conic-gradient(#0069B4 25%, #7D00A3 25% 35%, #222F89 35% 50%, #08CB9A 50% 100%)",
                                    }}
                                />
                                {/* Center text overlay */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <p className="text-sm ">Est.</p>
                                    <p className="text-xl font-bold">$1,526</p>
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="text-sm space-y-2">
                                <div className="flex items-center">
                                    <span className="inline-block w-3 h-3 rounded-full bg-[#222F89] mr-2" />
                                    <p>
                                        Principal & interest: <strong>$984</strong>
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <span className="inline-block w-3 h-3 rounded-full bg-[#7D00A3] mr-2" />
                                    <p>
                                        Property taxes: <strong>$267</strong>
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <span className="inline-block w-3 h-3 rounded-full bg-[#06B6D4] mr-2" />
                                    <p>
                                        Home insurance: <strong>$70</strong>
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <span className="inline-block w-3 h-3 rounded-full bg-[#08CB9A] mr-2" />
                                    <p>
                                        HOA: <strong>$205</strong>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Section: Info Box */}
                        <div className="rounded p-4">
                            <div className="flex items-start space-x-2 mb-2">
                                <div className="text-blue-500">
                                    {/* Info icon, e.g. Lucide or Material icon */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13 16h-1v-4h-1m1-4h.01M12 4.5c4.142 0 7.5 
                   3.358 7.5 7.5s-3.358 7.5-7.5 7.5-7.5-3.358-7.5-7.5
                   3.358-7.5 7.5-7.5z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Your custom payment is not available</h3>
                                    <p className="text-sm text-gray-600">
                                        We're using a representative interest rate for this calculation.
                                    </p>
                                </div>
                            </div>

                            {/* Links */}
                            <div className="flex items-center space-x-6 text-blue-600 text-sm mt-2">
                                <button className="underline">Edit your info</button>
                                <button className="underline">Learn more</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="Neighburhood"
                    className="p-4 rounded-xl border-2 mb-4 shadow-md"
                >
                    <h2 className="text-xl font-bold mb-2">Neighburhood</h2>
                    <p>${property.price}</p>
                </section>


            </div >
        </main >
    );
}
