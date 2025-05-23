import { Link } from "react-router-dom"
import { IoCart } from "react-icons/io5";

export const Basket = ({ cart, totalCartItems }) => {
  return (
    cart.length > 0 &&
    <Link to="/cart" className="fixed right-4 bottom-4 
        p-4 rounded-full  bg-[#4e5a65] flex justify-center items-center">
      <IoCart size={50} color="#fefefe" />
      <span className="absolute  -left-2 -top-2 text-[#fefefe] bg-[#7c9885]
          p-2 rounded-full text-[20px] w-[40px] h-[40px]  flex justify-center
          items-center">
        {totalCartItems}
      </span>
    </Link>
  )
}
