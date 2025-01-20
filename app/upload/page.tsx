"use client";

import { useState } from "react";
import Gallery from "./components/gallery"
import axios from "axios";

const MultipleImageUploadForm = () => {
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [descriptions, setDescriptions] = useState<string[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImageFiles(files);

        const previews = files.map((file) => URL.createObjectURL(file));
        setPreviews(previews);

        const descArray = files.map(() => ""); // Create empty descriptions for each image
        setDescriptions(descArray);
    };

    const handleDescriptionChange = (index: number, value: string) => {
        const updatedDescriptions = [...descriptions];
        updatedDescriptions[index] = value;
        setDescriptions(updatedDescriptions);
    };

    const handleUpload = async () => {
        if (!imageFiles.length) return alert("Please select images to upload.");

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

        try {
            const response = await axios.post("/api/upload-image", {
                files: filesBase64,
                descriptions,
            });

            alert("Images uploaded successfully!");
            console.log("Uploaded images:", response.data.uploadedImages);
        } catch (error) {
            console.error("Error uploading images:", error);
            alert("Failed to upload images.");
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" multiple onChange={handleImageChange} />
            <div className="grid grid-cols-3 gap-4 mt-4">
                {previews.map((preview, index) => (
                    <div key={index}>
                        <img src={preview} alt={`Preview ${index}`} className="w-64 h-64 object-cover" />
                        <textarea
                            placeholder="Enter a description"
                            value={descriptions[index]}
                            onChange={(e) => handleDescriptionChange(index, e.target.value)}
                            className="mt-2 block w-full border rounded p-2"
                        />
                    </div>
                ))}
            </div>
            <button
                onClick={handleUpload}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Upload Images
            </button>

            <h1>
                uploaded images
            </h1>

            <Gallery />

        </div>
    );
};

export default MultipleImageUploadForm;
