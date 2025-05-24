import { NavLink } from 'react-router';
import { IoClose } from 'react-icons/io5';
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router"

const Cart = ({ cart, setCart }) => {

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const removeItem = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const updateQuantity = (productId, newQuantity) => {
    const newCart = cart
      .map(item => item.id === productId
        ? { ...item, quantity: newQuantity }
        : item)
      .filter(item => item.quantity > 0); // Remove if quantity is 0

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <div className="container p-4">
      <h1 className="text-[2rem] lg:text-[3rem] mb-2 lg:mb-0 font-semibold uppercase text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center lg:py-10">
          <p className="text-xl mb-4">There is nothing in your cart 😢</p>
          <NavLink to="/menu">
            Go to menu
          </NavLink>
        </div>
      ) : (
        <div className="lg:my-4 border-0 rounded-lg bg-[#d6d1c4] pt-10 px-5 lg:px-10 pb-5">
          {cart.map(item => (
            <div key={item.id} className="py-2 lg:py-0 flex flex-col lg:grid lg:grid-cols-2 lg:mb-2 justify-between items-start lg:items-center border-b-2 lg:border-b-0 border-[#2b2d42]">
              <div className="flex lg:flex-row items-start lg:items-center gap-0 lg:gap-2">
                <button
                  className="bg-transparent border-0 hover:bg-transparent"
                  onClick={() => removeItem(item.id)}
                >
                  <IoClose size={30} color="#2b2d42" className="w-8 lg:w-auto" />
                </button>
                <div className="flex gap-5 items-center">
                  <img src={process.env.PUBLIC_URL + item.image} alt={item.name} className="w-14 h-14 lg:w-12 lg:h-12 object-cover  lg:block rounded" />
                  <div className="flex flex-col justify-center">
                    <h2 className="text-[1rem] lg:text-[1.5rem] font-semibold uppercase">
                      {item.title}
                      <span className="lowercase ml-4">x</span>
                      {item.quantity}
                    </h2>
                    <span className="font-bold text-[#2b2d42]">
                      {(item.price * item.quantity).toFixed(2)} SEK
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex w-full justify-center lg:justify-end items-center gap-4">
                <div className="flex lg:items-center">
                  <button
                    className="bg-transparent border-0 hover:bg-transparent"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <FaMinus color="#2b2d42" size={25} className="w-4 lg:w-auto" />
                  </button>
                  <span className="text-[1rem] lg:text-[2rem] font-mono font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-transparent border-0 hover:bg-transparent"
                  >
                    <FaPlus color="#2b2d42" size={25} className="w-4 lg:w-auto" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-8 flex gap-0 p-2 flex-col items-center lg:items-end justify-end">
            <div className="flex gap-2 text-[#2b2d42] justify-between items-center font-bold text-[1.5rem] lg:text-[2rem] uppercase">
              <span>Total:</span>
              <span>{total.toFixed(2)} SEK</span>
            </div>
            <Link to="/checkout" className="bg-[#2b2d42] text-white transition-all duration-300 uppercase font-bold
                rounded-lg text-center py-2 min-w-[250px] px-4 text-[1.5rem] hover:opacity-80">
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
