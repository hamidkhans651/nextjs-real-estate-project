'use client'

import { useState, useEffect } from "react";
import { Input, Pagination, PaginationItemRenderProps, PaginationItemType } from "@nextui-org/react";
import { SearchIcon } from "./icons/SearchIcon";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { HeartIcon } from './icons/HeartIcon';
import { ChevronIcon } from "./icons/ChevronIcon";

const heroCards = [
  { seller: "TARRANT AND HARMAN REAL ESTATE", img: "/assets/images/prop3.webp", price: "$2,000,000", address: "7753 S Sawyer Ave, chicago,IL 60652", bed: "2 bed 2 bath  1200 SQ FT" },
  { title: "TARRANT AND HARMAN REAL ESTATE", img: "/assets/images/prop3.webp", price: "$1,500,000" },
  { title: "Cozy Cottage", img: "/assets/images/prop3.webp", price: "$700,000" },
  { title: "Cozy Cottage", img: "/assets/images/prop3.webp", price: "$700,000" },
  { title: "Cozy Cottage", img: "/assets/images/prop2.webp", price: "$700,000" },
  { title: "Cozy Cottage", img: "/assets/images/prop3.webp", price: "$700,000" },
  { title: "Cozy Cottage", img: "/assets/images/prop3.webp", price: "$700,000" },
  { title: "Cozy Cottage", img: "/assets/images/prop3.webp", price: "$700,000" },
  { title: "Cozy Cottage", img: "/assets/images/prop3.webp", price: "$700,000" },
  { title: "Cozy Cottage", img: "/assets/images/prop3.webp", price: "$700,000" },
  { title: "Cozy Cottage", img: "/assets/images/prop3.webp", price: "$700,000" },
  { title: "Cozy Cottage", img: "/assets/images/prop3.webp", price: "$700,000" },
  { title: "Cozy Cottage", img: "/assets/images/prop3.webp", price: "$700,000" },
  { title: "Cozy Cottage", img: "/assets/images/prop3.webp", price: "$700,000" },
  { title: "Cozy Cottage", img: "/assets/images/prop4.webp", price: "$700,000" },
  { title: "Cozy Cottage", img: "/assets/images/prop5.webp", price: "$700,000" },
  { title: "Cozy Cottage", img: "/assets/images/prop6.webp", price: "$700,000" },
  { title: "Charming Bungalow", img: "/assets/images/prop1.webp", price: "$850,000" },
  { title: "Spacious Condo", img: "/assets/images/prop7.webp", price: "$1,200,000" },
  { title: "Beachfront Villa", img: "/assets/images/prop8.webp", price: "$3,000,000" },
  { title: "Penthouse Suite", img: "/assets/images/prop9.webp", price: "$2,500,000" },
  { title: "Mountain Retreat", img: "/assets/images/prop10.webp", price: "$950,000" },
  { title: "Urban Loft", img: "/assets/images/prop11.webp", price: "$1,000,000" },
  { title: "Luxury Mansion", img: "/assets/images/prop12.webp", price: "$4,500,000" },
];

export default function Hero() {
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesToShow, setPropertiesToShow] = useState(heroCards.slice(0, 10));

  // Update properties when the page changes
  useEffect(() => {
    const start = (currentPage - 1) * 10;
    const end = start + 10;
    setPropertiesToShow(heroCards.slice(start, end));
  }, [currentPage]);

  const renderItem = ({
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button key={key} className={className} onClick={onNext}>
          <ChevronIcon className="rotate-180" />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button key={key} className={className} onClick={onPrevious}>
          <ChevronIcon />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return <button key={key} className={className}>...</button>;
    }

    return (
      <button
        key={key}
        className={`${className} ${isActive ? "text-white bg-gradient-to-br from-indigo-500 to-pink-500 font-bold" : ""}`}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  return (
    <main>
      <div className="rounded-2xl flex justify-center items-center text-white pb-4">
      
        <Input
          label=""
          isClearable
          radius="lg"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focus=true]:bg-default-200/50",
              "dark:group-data-[focus=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          placeholder="Type to search..."
          startContent={
            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>

      {/* Displaying properties */}
      <div className="p-4 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {propertiesToShow.map((card, index) => (
          <Card shadow="sm" key={index} isPressable className="relative">

            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={card.bed}
              className="w-full object-cover h-100%"
              src={card.img}

            />
 
            <Button
            size="sm"
              isIconOnly
              color="danger"
              aria-label="Like"
              className="absolute top-2 right-2 z-10"
            >
              <HeartIcon size={20} />

            </Button>
            {/* <span className="absolute pt-36 left-24 z-10">
            <ImageSlidder  />
            </span> */}

            <CardBody className="overflow-visible p-3">
           

              <p className=" text-xl text-start">{card.price}</p>
              <p className="p-2 text-sm text-start">{card.bed}</p>

              <b className="p-1 text-md  text-default-500 ">{card.address}</b>

            </CardBody>
            <CardFooter className="text-small justify-between">

              <b className="text-xs text-start  text-default-500 ">{card.seller}</b>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination Controls */}
      <Pagination
        disableCursorAnimation
        showControls
        total={Math.ceil(heroCards.length / 10)}  // Total pages
        initialPage={1}
        className="gap-2 mt-4"
        radius="full"
        renderItem={renderItem}
        variant="light"
        onChange={setCurrentPage}  // Update page when changed
      />
    </main>
  );
}
