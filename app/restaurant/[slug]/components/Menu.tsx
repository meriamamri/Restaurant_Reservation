import { Item } from "@prisma/client";
import MenuCard from "./MenuCard";

interface MenuProps {
  items: Item[];
}

const Menu = (props: MenuProps) => {
  const { items } = props;

  const renderMenuCard = () => {
    if (items.length > 0) {
      return items.map((item: Item) => <MenuCard key={item.id} item={item} />);
    } else {
      return <p>This restaurant does not have a menu</p>;
    }
  };

  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        <div className="flex flex-wrap justify-between">{renderMenuCard()}</div>
      </div>
    </main>
  );
};

export default Menu;
