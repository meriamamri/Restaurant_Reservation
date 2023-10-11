import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import { Cuisine, Location, PRICE, PrismaClient, Review } from "@prisma/client";

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  location: Location;
  cuisine: Cuisine;
  price: PRICE;
  slug: string;
  reviews: Review[];
}

const prisma = new PrismaClient();

const fetchRestaurants = async () => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      slug: true,
      cuisine: true,
      price: true,
      location: true,
      reviews: true,
    },
  });
  return restaurants;
};

export default async function Home() {
  const restaurants = await fetchRestaurants();
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map((restaurant: RestaurantCardType) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
}
