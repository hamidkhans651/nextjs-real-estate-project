"use client";

import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";

type HomeFactsFormData = {
  homeType: string;
  beds: number;
  fullBaths: number;
  threeQuarterBaths: number;
  halfBaths: number;
  quarterBaths: number;
  finishedSqFt: number;
  lotSize: number;
  hoaDues: number;
  basementSqFt: number;
  garageSqFt: number;
  yearBuilt: number;
  remodelYear: number;
  description: string;
  openHouses: { date: string; startTime: string; endTime: string }[];
  website: string;
  additionalDescription: string;
};

export default function CombinedForm() {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<HomeFactsFormData>({
    defaultValues: {
      homeType: "Single family",
      beds: 0,
      fullBaths: 0,
      threeQuarterBaths: 0,
      halfBaths: 0,
      quarterBaths: 0,
      finishedSqFt: 0,
      lotSize: 0,
      hoaDues: 0,
      basementSqFt: 0,
      garageSqFt: 0,
      yearBuilt: 0,
      remodelYear: 0,
      description: "",
      openHouses: [{ date: "", startTime: "1:00 PM", endTime: "4:00 PM" }],
      website: "",
      additionalDescription: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "openHouses",
  });

  const onSubmit = (data: HomeFactsFormData) => {
    console.log("Form Submitted:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 max-w-4xl mx-auto border rounded shadow-md"
    >
      <h1 className="text-4xl font-bold mb-4">Home Facts</h1>
      {/* Home Facts Section */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="homeType" className="block text-sm font-medium text-gray-700">
            Home Type
          </label>
          <Controller
            name="homeType"
            control={control}
            render={({ field }) => (
              <select {...field} id="homeType" className="mt-1 block w-full border rounded p-2">
                <option value="Single family">Single family</option>
                <option value="Condo">Condo</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Apartment">Apartment</option>
              </select>
            )}
          />
        </div>

        <div>
          <label htmlFor="beds" className="block text-sm font-medium text-gray-700">
            Beds
          </label>
          <Controller
            name="beds"
            control={control}
            render={({ field }) => (
              <input {...field} type="number" id="beds" className="mt-1 block w-full border rounded p-2" />
            )}
          />
        </div>

        <div>
          <label htmlFor="fullBaths" className="block text-sm font-medium text-gray-700">
            Full Baths
          </label>
          <Controller
            name="fullBaths"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                id="fullBaths"
                className="mt-1 block w-full border rounded p-2"
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="threeQuarterBaths" className="block text-sm font-medium text-gray-700">
            3/4 Baths
          </label>
          <Controller
            name="threeQuarterBaths"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                id="threeQuarterBaths"
                className="mt-1 block w-full border rounded p-2"
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="halfBaths" className="block text-sm font-medium text-gray-700">
            1/2 Baths
          </label>
          <Controller
            name="halfBaths"
            control={control}
            render={({ field }) => (
              <input {...field} type="number" id="halfBaths" className="mt-1 block w-full border rounded p-2" />
            )}
          />
        </div>

        <div>
          <label htmlFor="quarterBaths" className="block text-sm font-medium text-gray-700">
            1/4 Baths
          </label>
          <Controller
            name="quarterBaths"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                id="quarterBaths"
                className="mt-1 block w-full border rounded p-2"
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="finishedSqFt" className="block text-sm font-medium text-gray-700">
            Finished Square Feet
          </label>
          <Controller
            name="finishedSqFt"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                id="finishedSqFt"
                className="mt-1 block w-full border rounded p-2"
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="lotSize" className="block text-sm font-medium text-gray-700">
            Lot Size
          </label>
          <Controller
            name="lotSize"
            control={control}
            render={({ field }) => (
              <input {...field} type="number" id="lotSize" className="mt-1 block w-full border rounded p-2" />
            )}
          />
        </div>

        <div>
          <label htmlFor="hoaDues" className="block text-sm font-medium text-gray-700">
            HOA Dues
          </label>
          <Controller
            name="hoaDues"
            control={control}
            render={({ field }) => (
              <input {...field} type="number" id="hoaDues" className="mt-1 block w-full border rounded p-2" />
            )}
          />
        </div>

        <div>
          <label htmlFor="basementSqFt" className="block text-sm font-medium text-gray-700">
            Basement Sq. Ft.
          </label>
          <Controller
            name="basementSqFt"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                id="basementSqFt"
                className="mt-1 block w-full border rounded p-2"
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="garageSqFt" className="block text-sm font-medium text-gray-700">
            Garage Sq. Ft.
          </label>
          <Controller
            name="garageSqFt"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                id="garageSqFt"
                className="mt-1 block w-full border rounded p-2"
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="yearBuilt" className="block text-sm font-medium text-gray-700">
            Year Built
          </label>
          <Controller
            name="yearBuilt"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                id="yearBuilt"
                className="mt-1 block w-full border rounded p-2"
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="remodelYear" className="block text-sm font-medium text-gray-700">
            Structural Remodel Year
          </label>
          <Controller
            name="remodelYear"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                id="remodelYear"
                className="mt-1 block w-full border rounded p-2"
              />
            )}
          />
        </div>
      </div>

      <h1 className="text-4xl font-bold mt-10">Open House</h1>
      {/* Open House Section */}
      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-4 gap-4">
          <div>
            <label htmlFor={`openHouses.${index}.date`} className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              {...register(`openHouses.${index}.date` as const)}
              type="date"
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          <div>
            <label htmlFor={`openHouses.${index}.startTime`} className="block text-sm font-medium text-gray-700">
              Start Time
            </label>
            <input
              {...register(`openHouses.${index}.startTime` as const)}
              type="time"
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          <div>
            <label htmlFor={`openHouses.${index}.endTime`} className="block text-sm font-medium text-gray-700">
              End Time
            </label>
            <input
              {...register(`openHouses.${index}.endTime` as const)}
              type="time"
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          <div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-500 text-sm underline"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ date: "", startTime: "1:00 PM", endTime: "4:00 PM" })}
        className="text-blue-500 underline text-sm"
      >
        Add Another Date
      </button>

      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700">
          Related Website
        </label>
        <Controller
          name="website"
          control={control}
          rules={{
            pattern: {
              value: /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/,
              message: "Invalid URL format",
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              type="url"
              placeholder="www.sample.com"
              className="mt-1 block w-full border rounded p-2"
            />
          )}
        />
        {errors.website && <p className="text-red-500 text-sm">{errors.website.message}</p>}
      </div>

      <div>
        <label htmlFor="additionalDescription" className="block text-sm font-medium text-gray-700">
          What I Love About This Home
        </label>
        <textarea
          {...register("additionalDescription")}
          placeholder="Describe what you love about this home..."
          className="mt-1 block w-full border rounded p-2"
          rows={4}
        ></textarea>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
