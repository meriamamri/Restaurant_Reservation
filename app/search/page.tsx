import { PRICE, PrismaClient } from "@prisma/client";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar, { SearchParamsType } from "./components/SearchSideBar";

const prisma = new PrismaClient();

const fetchRestaurantByCity = (searchParams: SearchParamsType) => {
  const where: any = {};

  if (searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      },
    };
    where.location = location;
  }

  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase(),
      },
    };
    where.cuisine = cuisine;
  }

  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    };
    where.price = price;
  }

  const select = {
    id: true,
    main_image: true,
    name: true,
    price: true,
    location: true,
    cuisine: true,
    slug: true,
    reviews: true,
  };

  return prisma.restaurant.findMany({
    where,
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
  const restaurants = await fetchRestaurantByCity(searchParams);

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
