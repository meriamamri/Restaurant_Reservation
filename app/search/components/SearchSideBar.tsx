import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";

export interface SearchParamsType {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}

interface SearchSideBarProps {
  cuisines: Cuisine[];
  locations: Location[];
  searchParams: SearchParamsType;
}

const SearchSideBar = (props: SearchSideBarProps) => {
  const { cuisines, locations, searchParams } = props;

  const Prices = [
    {
      value: PRICE.CHEAP,
      label: "$",
      className: "border w-full text-reg text-center font-light rounded-l p-2",
    },
    {
      value: PRICE.REGULAR,
      label: "$$",
      className: "border w-full text-reg text-center font-light p-2",
    },
    {
      value: PRICE.EXPENSIVE,
      label: "$$$",
      className: "border w-full text-reg text-center font-light rounded-r p-2",
    },
  ];

  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {locations.map((location: Location) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                city: location.name || "",
              },
            }}
            className="font-light text-reg capitalize"
            key={location.id}
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine: Cuisine) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                cuisine: cuisine.name || "",
              },
            }}
            className="font-light text-reg capitalize"
            key={cuisine.id}
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {Prices.map((price: any) => (
            <Link
              key={price.value}
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  price: price.value,
                },
              }}
              className={price.className}
            >
              {price.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;
