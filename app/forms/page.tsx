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
  appliances: string[];
  basement: string;
  floorCovering: string[];
  coolingType: string[];
  heatingType: string[];
  heatingFuel: string[];
  rooms: string[];
  totalRooms: number;
  indoorFeatures: string[];
  buildingAmenities: string[];
  architecturalStyle: string;
  exterior: string[];
  outdoorAmenities: string[];
  numberOfStories: number;
  parking: string[];
  parkingSpaces: number;
  roof: string[];
  view: string[];
  phoneNumber: string;
  agreement: boolean;
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
      appliances: [],
      basement: "",
      floorCovering: [],
      coolingType: [],
      heatingType: [],
      heatingFuel: [],
      rooms: [],
      totalRooms: 0,
      indoorFeatures: [],
      buildingAmenities: [],
      architecturalStyle: "",
      exterior: [],
      outdoorAmenities: [],
      numberOfStories: 0,
      parking: [],
      parkingSpaces: 0,
      roof: [],
      view: [],
      phoneNumber: "",
      agreement: false,
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


      <h1 className="text-2xl font-bold">Room Details</h1>
      {/* Appliances Section */}
      <div>
        <h2 className="font-semibold mb-2">Appliances</h2>
        <div className="grid grid-cols-2 gap-4">
          {["Dishwasher", "Dryer", "Freezer", "Garbage disposal", "Microwave", "Range / Oven", "Refrigerator", "Trash compactor", "Washer"].map((appliance) => (
            <label key={appliance} className="flex items-center">
              <input
                type="checkbox"
                value={appliance}
                {...register("appliances")}
                className="mr-2"
              />
              {appliance}
            </label>
          ))}
        </div>
      </div>

      {/* Basement Section */}
      <div>
        <h2 className="font-semibold mb-2">Basement</h2>
        <div className="flex flex-col">
          {["Finished", "Partially finished", "Unfinished", "None"].map((basement) => (
            <label key={basement} className="flex items-center">
              <input
                type="radio"
                value={basement}
                {...register("basement")}
                className="mr-2"
              />
              {basement}
            </label>
          ))}
        </div>
      </div>

      {/* Floor Covering Section */}
      <div>
        <h2 className="font-semibold mb-2">Floor Covering</h2>
        <div className="grid grid-cols-2 gap-4">
          {["Carpet", "Concrete", "Hardwood", "Laminate", "Linoleum / Vinyl", "Slate", "Softwood", "Tile", "Other"].map((floor) => (
            <label key={floor} className="flex items-center">
              <input
                type="checkbox"
                value={floor}
                {...register("floorCovering")}
                className="mr-2"
              />
              {floor}
            </label>
          ))}
        </div>
      </div>

      {/* Utility Details Section */}
      <h1 className="text-2xl font-bold mt-10">Utility Details</h1>

      {/* Cooling Type Section */}
      <div>
        <h2 className="font-semibold mb-2">Cooling Type</h2>
        <div className="grid grid-cols-2 gap-4">
          {["Central", "Evaporative", "Geothermal", "Refrigeration", "Solar", "Wall", "Other", "None"].map((cooling) => (
            <label key={cooling} className="flex items-center">
              <input
                type="checkbox"
                value={cooling}
                {...register("coolingType")}
                className="mr-2"
              />
              {cooling}
            </label>
          ))}
        </div>
      </div>

      {/* Heating Type Section */}
      <div>
        <h2 className="font-semibold mb-2">Heating Type</h2>
        <div className="grid grid-cols-2 gap-4">
          {["Baseboard", "Forced air", "Geothermal", "Heat pump", "Radiant", "Stove", "Wall", "Other"].map((heating) => (
            <label key={heating} className="flex items-center">
              <input
                type="checkbox"
                value={heating}
                {...register("heatingType")}
                className="mr-2"
              />
              {heating}
            </label>
          ))}
        </div>
      </div>

      {/* Heating Fuel Section */}
      <div>
        <h2 className="font-semibold mb-2">Heating Fuel</h2>
        <div className="grid grid-cols-2 gap-4">
          {["Coal", "Electric", "Gas", "Oil", "Propane / Butane", "Solar", "Wood / Pellet", "Other", "None"].map((fuel) => (
            <label key={fuel} className="flex items-center">
              <input
                type="checkbox"
                value={fuel}
                {...register("heatingFuel")}
                className="mr-2"
              />
              {fuel}
            </label>
          ))}
        </div>
      </div>
      <h1 className="text-2xl font-bold">Room Details</h1>

      {/* Rooms Section */}
      <div>
        <h2 className="font-semibold mb-2">Rooms</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            "Breakfast nook",
            "Dining room",
            "Family room",
            "Laundry room",
            "Library",
            "Master bath",
            "Mud room",
            "Office",
            "Pantry",
            "Recreation room",
            "Workshop",
            "Solarium / Atrium",
            "Sun room",
            "Walk-in closet",
          ].map((room) => (
            <label key={room} className="flex items-center">
              <input
                type="checkbox"
                value={room}
                {...register("rooms")}
                className="mr-2"
              />
              {room}
            </label>
          ))}
        </div>
        <div className="mt-4">
          <label
            htmlFor="totalRooms"
            className="block text-sm font-medium text-gray-700"
          >
            Total Rooms
          </label>
          <Controller
            name="totalRooms"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                id="totalRooms"
                className="mt-1 block w-full border rounded p-2"
              />
            )}
          />
        </div>
      </div>

      {/* Indoor Features Section */}
      <div>
        <h2 className="font-semibold mb-2">Indoor Features</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            "Attic",
            "Cable ready",
            "Ceiling fans",
            "Double pane/storm windows",
            "Fireplace",
            "Intercom system",
            "Jetted tub",
            "Mother-in-law apartment",
            "Security system",
            "Skylights",
            "Vaulted ceiling",
            "Wet bar",
            "Wired",
          ].map((feature) => (
            <label key={feature} className="flex items-center">
              <input
                type="checkbox"
                value={feature}
                {...register("indoorFeatures")}
                className="mr-2"
              />
              {feature}
            </label>
          ))}
        </div>
      </div>

      {/* Building Amenities Section */}
      <h1 className="text-2xl font-bold mb-4">Building Details</h1>
      <div>
        <h2 className="font-semibold mb-2">Building Amenities</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            "Assisted living community",
            "Basketball court",
            "Controlled access",
            "Disabled access",
            "Doorman",
            "Elevator",
            "Fitness center",
            "Gated entry",
            "Near transportation",
            "Over 55+ active community",
            "Sports court",
            "Storage",
            "Tennis court",
          ].map((amenity) => (
            <label key={amenity} className="flex items-center">
              <input
                type="checkbox"
                value={amenity}
                {...register("buildingAmenities")}
                className="mr-2"
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>

      {/* Architectural Style Section */}
      <div>
        <h2 className="font-semibold mb-2">Architectural Style</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            "Bungalow",
            "Cape Cod",
            "Colonial",
            "Contemporary",
            "Craftsman",
            "French",
            "Georgian",
            "Loft",
            "Modern",
            "Queen Anne / Victorian",
            "Ranch / Rambler",
            "Santa Fe / Pueblo Style",
            "Spanish",
            "Split-level",
            "Tudor",
            "Other",
          ].map((style) => (
            <label key={style} className="flex items-center">
              <input
                type="radio"
                value={style}
                {...register("architecturalStyle")}
                className="mr-2"
              />
              {style}
            </label>
          ))}
        </div>
      </div>



      <h1 className="text-2xl font-bold mb-4">Exterior and Outdoor Amenities</h1>

      {/* Exterior Section */}
      <div>
        <h2 className="font-semibold mb-2">Exterior</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            "Brick",
            "Cement / Concrete",
            "Composition",
            "Metal",
            "Shingle",
            "Stone",
            "Stucco",
            "Vinyl",
            "Wood",
            "Wood products",
            "Other",
          ].map((item) => (
            <label key={item} className="flex items-center">
              <input
                type="checkbox"
                value={item}
                {...register("exterior")}
                className="mr-2"
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* Outdoor Amenities Section */}
      <div>
        <h2 className="font-semibold mb-2">Outdoor Amenities</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            "Balcony/patio",
            "Barbecue area",
            "Deck",
            "Dock",
            "Fenced yard",
            "Garden",
            "Greenhouse",
            "Hot tub/spa",
            "Lawn",
            "Pond",
            "Pool",
            "Porch",
            "RV parking",
            "Sauna",
            "Sprinkler system",
            "Waterfront",
          ].map((amenity) => (
            <label key={amenity} className="flex items-center">
              <input
                type="checkbox"
                value={amenity}
                {...register("outdoorAmenities")}
                className="mr-2"
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>

      {/* Number of Stories */}
      <div>
        <label htmlFor="numberOfStories" className="block text-sm font-medium text-gray-700">
          # of Stories
        </label>
        <input
          type="number"
          id="numberOfStories"
          {...register("numberOfStories")}
          className="mt-1 block w-full border rounded p-2"
        />
      </div>

      <h1 className="text-2xl font-bold mb-4">Parking, Roof, and View</h1>

      {/* Parking Section */}
      <div>
        <h2 className="font-semibold mb-2">Parking</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            "Carport",
            "Garage - Attached",
            "Garage - Detached",
            "Off-street",
            "On-street",
            "None",
          ].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="checkbox"
                value={option}
                {...register("parking")}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
        <label htmlFor="parkingSpaces" className="block mt-4 text-sm font-medium text-gray-700">
          # Parking Spaces
        </label>
        <input
          type="number"
          id="parkingSpaces"
          {...register("parkingSpaces")}
          className="mt-1 block w-full border rounded p-2"
        />
      </div>

      {/* Roof Section */}
      <div>
        <h2 className="font-semibold mb-2">Roof</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            "Asphalt",
            "Built-up",
            "Composition",
            "Metal",
            "Shake / Shingle",
            "Slate",
            "Tile",
            "Other",
          ].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="checkbox"
                value={option}
                {...register("roof")}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      </div>


      {/* View Section */}
      <div>
        <h2 className="font-semibold mb-2">View</h2>
        <div className="grid grid-cols-2 gap-4">
          {["City", "Mountain", "Park", "Territorial", "Water", "None"].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="checkbox"
                value={option}
                {...register("view")}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      </div>






      <h1 className="text-2xl font-bold mb-4">Contact Information</h1>

      {/* Instruction Section */}
      <p className="text-gray-600 mb-4">
        Potential buyers will contact you through the email address you use to register on Zillow.
        You must also add your phone number to the listing here.
      </p>

      {/* Phone Number Section */}
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNumber"
          {...register("phoneNumber", {
            required: "Phone number is required",
            pattern: {
              value: /^\(\d{3}\)\s\d{3}-\d{4}(\s(x\d{1,5})?)?$/,
              message: "Please enter a valid phone number",
            },
          })}
          placeholder="(555) 555-5555 x5555"
          className={`mt-1 block w-full border rounded p-2 ${errors.phoneNumber ? "border-red-500" : ""
            }`}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
        )}
      </div>

      {/* Agreement Section */}
      <div>
        <label className="flex items-start space-x-2">
          <input
            type="checkbox"
            {...register("agreement", {
              required: "You must agree to the terms",
            })}
            className="mt-1"
          />
          <span className="text-sm text-gray-600">
            I agree to, acknowledge and understand the following: (i) I am (or I have authority to
            act on behalf of) the owner of this home; (ii) I will not provide incorrect information
            or state a discriminatory preference; (iii) I will be posting my property "for sale by
            owner" on zillow.com and other affiliated websites and that I will solely be responsible
            for maintaining and updating the posting and responding to and negotiating potential
            offers to purchase the property; (iv) Zillow, Inc. ("Zillow") is a licensed real estate
            brokerage, that I am not entering into any agency or brokerage relationship with Zillow
            as part of this posting and that Zillow is not providing me with any real estate
            brokerage services as part of this posting; and (v) I will comply with the{" "}
            <a
              href="https://www.zillow.com/terms/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Zillow Terms of Use
            </a>{" "}
            and{" "}
            <a
              href="https://www.zillow.com/listing-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Listing Quality Policy
            </a>.
          </span>
        </label>
        {errors.agreement && (
          <p className="text-red-500 text-sm mt-1">{errors.agreement.message}</p>
        )}
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
