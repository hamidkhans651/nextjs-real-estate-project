"use client";

import { useState } from "react";
import Image from "next/image";

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

        <main className="">

            {/* Tabs for navigation */}
            <div className="tabs-container flex justify-between border-b border-gray-300 mb-4">
                <button
                    className="tab-button px-4 py-2 font-medium"
                    onClick={() =>
                        document.getElementById("overview")?.scrollIntoView({
                            behavior: "smooth",
                        })
                    }
                >
                    Overview

                </button>
                <button
                    className="tab-button px-4 py-2 font-medium"
                    onClick={() =>
                        document.getElementById("description")?.scrollIntoView({
                            behavior: "smooth",
                        })
                    }
                >
                    Property Description
                </button>
                <button
                    className="tab-button px-4 py-2 font-medium"
                    onClick={() =>
                        document.getElementById("contact")?.scrollIntoView({
                            behavior: "smooth",
                        })
                    }
                >
                    Contact Us
                </button>
                <button
                    className="tab-button px-4 py-2 font-medium"
                    onClick={() =>
                        document.getElementById("price")?.scrollIntoView({
                            behavior: "smooth",
                        })
                    }
                >
                    Property Price
                </button>
            </div>

            <Image
                className="rounded-md"
                src={property.imageUrl}
                alt={property.title}
                width={600}
                height={600}
            />

            {/* Overview Section */}
            <section
                id="overview"
                className="p-2 border-slate-200 rounded-xl border-2 mb-4"
            >
                <p>For Sale: {property.isForSale ? "Yes" : "No"}</p>
                <p className="font-bold p-2">{property.location}</p>
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold ">${property.price}</h2>
                    <p className="flex font-bold p-2">Beds {property.bedrooms}</p>
                    <p className="flex font-bold p-2">Baths {property.bathrooms}</p>
                    <p className="font-bold p-2">Sq Ft {property.sqft}</p>
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
        </main>
    );
}
