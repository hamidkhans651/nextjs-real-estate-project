"use client";

import { useState } from "react";
import Image from "next/image";
import { BedDouble } from "lucide-react"

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
                    className="tab-button p-2 font-medium whitespace-nowrap  "
                    onClick={() =>
                        document.getElementById("overview")?.scrollIntoView({
                            behavior: "smooth",
                        })
                    }
                >
                    Overview
                </button>
                <button
                    className="tab-button p-2  py-2 font-medium whitespace-nowrap rounded-xl "
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
                        document.getElementById("contact")?.scrollIntoView({
                            behavior: "smooth",
                        })
                    }
                >
                    Contact Us
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
                        <h2 className="text-3xl font-bold  mb-2">${property.price.toLocaleString()}</h2>
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
                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                            <span className=" w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                                🏠
                            </span>
                            <p>{property.propertyType}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className=" w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                                🛠️
                            </span>
                            <p>Built in</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className=" w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                                📏
                            </span>
                            <p></p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className=" w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                                💰
                            </span>
                            <p>{property.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className=" w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                                💳
                            </span>
                            <p></p>
                        </div>
                    </div>
                </section>

                {/* Property Description Section */}
                <section
                    id="description"
                    className="p-4 border-slate-200 rounded-xl border-2 mb-4"
                >
                    <h2 className="text-xl font-bold mb-2">Property Description</h2>
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
                </section>

                {/* Contact Section */}
                <section
                    id="contact"
                    className="p-4 border-slate-200 rounded-xl border-2 mb-4"
                >
                    <h2 className="text-xl font-bold mb-2">Contact Us</h2>
                    <p>For inquiries, please contact us via email or phone.</p>
                </section>

                {/* Property Price Section */}
                <section
                    id="price"
                    className="p-4 border-slate-200 rounded-xl border-2 mb-4"
                >
                    <h2 className="text-xl font-bold mb-2">Property Price</h2>
                    <p>${property.price}</p>
                </section>

                <section
                    id="price"
                    className="p-4 border-slate-200 rounded-xl border-2 mb-4"
                >
                    <h2 className="text-xl font-bold mb-2">Around this home</h2>
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

            </div>
        </main>
    );
}
