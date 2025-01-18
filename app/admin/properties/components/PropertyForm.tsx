"use client";
import { toast } from "react-hot-toast";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { LoaderIcon } from "@/components/icons/LoaderIcon";

// Zod validation schema
const addPropertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  location: z.string().min(1, "Location is required"),
  imageUrl: z.string().url("Image URL must be a valid URL"),
  bedrooms: z.number().min(1, "Bedrooms must be at least 1"),
  bathrooms: z.number().min(1, "Bathrooms must be at least 1"),
  sqft: z.number().min(1, "Square footage must be greater than 0"),
  propertyType: z.string().min(1, "Property type is required"),
  isForSale: z.boolean(),
});

export default function AddPropertyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(addPropertySchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      location: "",
      imageUrl: "",
      bedrooms: 1,
      bathrooms: 1,
      sqft: 0,
      propertyType: "",
      isForSale: true,
    },
  });

  const onSubmit = async (values: z.infer<typeof addPropertySchema>) => {
    try {
      console.log("Submitting Data:", values);

      // Show a loading toast while the fetch is ongoing
      const response = await toast.promise(
        fetch("/api/properties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }),
        {
          loading: "Adding property...",
          success: "Property added successfully!",
          error: "Failed to add property. Please try again.",
        }
      );


    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from API:", errorData);
      toast.error(`Failed to add property: ${errorData.error || "Unknown error"}`);
    } else {
      form.reset();
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error submitting form:", error.message);
      toast.error(`An unexpected error occurred: ${error.message}`);
    } else {
      console.error("Unknown error:", error);
      toast.error("An unexpected error occurred.");
    }
  }
};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Title and Description */}
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Property title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Property description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Price and Location */}
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            name="price"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter price"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))} // Convert to number
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="location"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Image URL and Property Type */}
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="propertyType"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Property Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="bungalow">Bungalow</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Bedrooms, Bathrooms, and Square Footage */}
        <div className="flex flex-col md:flex-row gap-4">
          <FormField
            name="bedrooms"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Bedrooms</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Number of bedrooms" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="bathrooms"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Bathrooms</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Number of bathrooms" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="sqft"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Square Footage</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Square footage"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))} // Convert to number
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Is For Sale */}
        <FormField
          name="isForSale"
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(value) => field.onChange(value)}
                />
              </FormControl>
              <FormLabel className="ml-2">For Sale</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <LoaderIcon className="animate-spin" /> : "Add Property"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
