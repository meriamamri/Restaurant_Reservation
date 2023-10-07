import Header from "./components/Header";

interface RestaurantLayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

const RestaurantLayout = (props: RestaurantLayoutProps) => {
  const { children, params } = props;
  return (
    <main>
      <Header name={params.slug} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </main>
  );
};

export default RestaurantLayout;
