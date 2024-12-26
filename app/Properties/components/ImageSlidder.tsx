import { usePagination, PaginationItemType } from "@nextui-org/react";
import { SliderIcon } from "../icons/SliderIcon";
import clsx from 'clsx'; // Importing clsx utility

export default function ImageSlidder() {
  const { activePage, range, setPage, onNext, onPrevious } = usePagination({
    total: 5,
    showControls: false,
    // siblings: 10,
    boundaries: 10,
  });

  return (
    <div className="flex flex-col gap-2">
      <p> {activePage}</p>
      <ul className="flex gap-2 items-center">
        {range.map((page) => {
          if (page === PaginationItemType.NEXT) {
            return (
              <li key={page} aria-label="next page" className="w-4 h-4">
                <button
                  className="w-full h-full bg-default-200 rounded-full"
                  onClick={onNext}
                >
                  <SliderIcon className="rotate-180" />
                </button>
              </li>
            );
          }

          if (page === PaginationItemType.PREV) {
            return (
              <li key={page} aria-label="previous page" className="w-4 h-4">
                <button
                  className="w-full h-full bg-default-200 rounded-full"
                  onClick={onPrevious}
                >
                  <SliderIcon />
                </button>
              </li>
            );
          }

          if (page === PaginationItemType.DOTS) {
            return (
              <li key={page} className="w-4 h-4">
                ...
              </li>
            );
          }

          return (
            <li key={page} aria-label={`page ${page}`} className="w-4 h-4">
              <button
                className={clsx(
                  "w-full h-full bg-default-300 rounded-full",
                  activePage === page && "bg-secondary"
                )}
                onClick={() => setPage(page)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
