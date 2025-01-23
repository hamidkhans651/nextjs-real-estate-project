'use client';

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Property = {
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  // Add other fields if required
};

const PropertyDetails = () => {
  const router = useRouter();
  const { zpid } = router.query;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!zpid) return;

    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/property/${zpid}`);
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error("Failed to fetch property details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [zpid]);

  if (loading) return <p>Loading...</p>;

  if (!property) return <p>Property not found.</p>;

  return (
    <div>
      <h1>{property.title}</h1>
      <p>{property.description}</p>
      <p>Price: ${property.price}</p>
      <p>Bedrooms: {property.bedrooms}</p>
      <p>Bathrooms: {property.bathrooms}</p>
      <p>Sqft: {property.sqft}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default PropertyDetails;
