import { useState } from 'react';
import { FiPlusCircle, FiCheckCircle, FiPlus, FiMinus } from 'react-icons/fi';

export const Products = ({
  products,
  addToCart,
  title,
  productAdd
}) => {
  const [quantities, setQuantities] = useState({});

  const increase = (id) => {
    setQuantities(prev => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const decrease = (id) => {
    setQuantities(prev => {
      const newQty = (prev[id] || 1) - 1;
      return { ...prev, [id]: newQty < 1 ? 1 : newQty };
    });
  };

  const handleAdd = (item) => {
    const quantity = quantities[item.id] || 1;
    addToCart(item, quantity);
  };

  if (!products) return <p className="text-center my-14 text-[2rem]">Loading products...</p>;

  return (
    <div className="products my-5 lg:my-14 px-4 lg:px-0">
      <h1 className="text-[1.5rem] lg:text-[3rem] uppercase font-bold my-5 lg:my-10 text-center">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map(item => (
          <div
            key={item.id}
            className="w-full bg-[#eeeddb] relative flex flex-col gap-2 rounded-xl border-black"
          >
            <img
              src={process.env.PUBLIC_URL + item.image}
              alt={item.title}
              className="max-h-[250px] rounded-t-lg min-h-[250px] w-full object-cover"
            />
            <div className="flex flex-col px-4 py-2 gap-2 text-[#2d2d42]">
              <p className="text-xl capitalize italic">
                {item.category?.replace(/_/g, ' ')}
              </p>
              <h2 className="font-bold text-[1rem] lg:text-[2rem] uppercase">
                {item.title || 'Title missing'}
              </h2>
              <p className="text-xl font-bold">{item.price} SEK</p>
            </div>

            <div className="flex items-center justify-between px-4 pb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decrease(item.id)}
                  className="p-1 rounded-full bg-[#2b2d42] text-white hover:bg-opacity-80"
                >
                  <FiMinus />
                </button>
                <span className="min-w-[2rem] text-center font-semibold">{quantities[item.id] || 1}</span>
                <button
                  onClick={() => increase(item.id)}
                  className="p-1 rounded-full bg-[#2b2d42] text-white hover:bg-opacity-80"
                >
                  <FiPlus />
                </button>
              </div>

              <button
                onClick={() => handleAdd(item)}
                className="cursor-pointer bg-transparent border-0 hover:bg-transparent hover:text-current p-0 font-bold rounded-full transition-all duration-300"
              >
                {productAdd === item.id ? (
                  <FiCheckCircle size={40} />
                ) : (
                  <FiPlusCircle size={40} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
