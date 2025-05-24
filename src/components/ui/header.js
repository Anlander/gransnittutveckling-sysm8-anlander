import { Link, useLocation } from "react-router";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router";
import { logout } from "../../helper/auth";

export const Header = () => {
  const route = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const handleLogout = logout(navigate);

  return (
    <header >
      <div className="flex justify-end pt-2 px-2 lg:px-0 container">
        {token &&
          <button
            className="bg-transparent p-0 md:w-auto border-0 
            hover:bg-transparent text-[1rem] uppercase font-bold hover:text-current"
            onClick={handleLogout}
          >
            logout
          </button>
        }
        {!token &&
          <Link to="/login" end
            className="bg-transparent p-0 md:w-auto border-0 
            hover:bg-transparent text-[1rem] uppercase font-bold hover:text-current"
          >
            login
          </Link>
        }
      </div>

      <div className="text-[#2b2d42] flex justify-center lg:justify-end items-center gap-2 container pb-2 relative">
        <Link to="/" end className="-mt-4">
          <img
            src={`${process.env.PUBLIC_URL}/images/Dlogo.png`}
            className={`border-0 border-[#121212] rounded-b-2xl -left-10 lg:absolute 
          ${route.pathname === "/" ? "w-[120px] lg:h-[120px] lg:w-[270px] mt-5" : "w-[120px] mt-4 lg:mt-0 lg:top-5 lg:h-[120px] lg:w-[280px]"} z-50 pb-2 lg:px-5 bg-[#f4f3e7]`}
            alt="Store Logo" />
        </Link>
        <div className="flex gap-4 font-bold uppercase items-center ">
          <Link to="/cart" end><FiShoppingCart size={50} className="" /></Link>
          <Link to="/menu" end>Menu</Link>
        </div>
      </div>
    </header>
  );
}
