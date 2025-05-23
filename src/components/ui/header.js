import { Link, useLocation } from "react-router";
import { FiShoppingCart } from "react-icons/fi";

export const Header = () => {
  const route = useLocation();
  return (
    <header className="text-[#2b2d42] p-2 flex justify-center lg:justify-end items-center gap-2 container py-5 relative">
      <Link to="/" end className="-mt-4">
        <img
          src={`${process.env.PUBLIC_URL}/images/Dlogo.png`}
          className={`border-0 border-[#121212] rounded-b-2xl -left-10 lg:absolute 
          ${route.pathname === "/" ? "w-[120px] lg:h-[120px] lg:w-[270px] mt-5" : "w-[120px] mt-4 lg:mt-0 lg:top-5 lg:h-[120px] lg:w-[280px]"} z-50 pb-2 lg:px-5 bg-[#f4f3e7]`}
          alt="Store Logo" />
      </Link>
      <div className="flex gap-5 font-bold px-4 uppercase items-center">
        <Link to="/menu" end>Menu</Link>
        <Link to="/cart" end><FiShoppingCart size={50} className="" /></Link>
      </div>
    </header>
  );
}
