import Link from "next/link";
import AuthModel from "./AuthModal";

const NavBar = () => {
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div>
        <div className="flex">
          <AuthModel isSignIn={true} />
          <AuthModel isSignIn={false} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
