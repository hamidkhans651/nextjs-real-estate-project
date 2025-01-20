// components/ImageUploadForm.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import Gallery from "../upload/components/gallery"

const ImageUploadForm = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [description, setDescription] = useState("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!imageFile) return alert("Please select an image to upload.");

        const reader = new FileReader();
        reader.onload = async () => {
            try {
                const response = await axios.post("/api/upload-image", {
                    file: reader.result, // Base64 string of the image
                    fileName: imageFile.name,
                    description,
                });

                alert("Image uploaded successfully!");
                console.log("Uploaded image:", response.data.image);
            } catch (error) {
                console.error("Image upload failed:", error);
                alert("Failed to upload image.");
            }
        };

        reader.readAsDataURL(imageFile); // Convert file to Base64
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {previewUrl && <img src={previewUrl} alt="Preview" className="w-64 h-64 object-cover" />}
            <textarea
                placeholder="Add a description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-4 block w-full border rounded p-2"
            />
            <button onClick={handleUpload} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Upload
            </button>

            <h1> preview of Upload
                <Gallery />
            </h1>
        </div>
    );
};

export default ImageUploadForm;
