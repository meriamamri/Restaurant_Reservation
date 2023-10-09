import { PRICE, PrismaClient } from "@prisma/client";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";

const prisma = new PrismaClient();

const fetchRestaurantByCity = (city: string) => {
  const select = {
    id: true,
    main_image: true,
    name: true,
    price: true,
    location: true,
    cuisine: true,
    slug: true,
  };
  if (!city) return prisma.restaurant.findMany({ select });
  return prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city.toLowerCase(),
        },
      },
    },
    select,
  });
};

const fetchLocations = () => {
  return prisma.location.findMany();
};

const fetchCuisines = () => {
  return prisma.cuisine.findMany();
};

const Search = async ({
  searchParams,
}: {
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) => {
  const restaurants = await fetchRestaurantByCity(searchParams.city as string);

  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  const renderRestaurantCard = () => {
    if (restaurants.length > 0) {
      return restaurants.map((restaurant: any) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ));
    } else {
      return <p>Sorry, we found no restaurants in this area </p>;
    }
  };

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          cuisines={cuisines}
          locations={locations}
          searchParams={searchParams}
        />
        <div className="w-5/6">{renderRestaurantCard()}</div>
      </div>
    </>
  );
};

export default Search;
