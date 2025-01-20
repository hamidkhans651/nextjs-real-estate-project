// components/ImageGallery.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const ImageGallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const response = await axios.get("/api/get-images");
            setImages(response.data);
        };

        fetchImages();
    }, []);

    return (
        <div className="grid grid-cols-3 gap-4">
            {images.map((image: any) => (
                <div key={image.id} className="border p-2">
                    <img src={image.fileUrl} alt={image.fileName} className="w-full h-48 object-cover" />
                    <p className="mt-2">{image.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ImageGallery;
