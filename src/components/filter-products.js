import React, { useState } from "react"
import { FiPlusCircle, FiCheckCircle, FiPlus, FiMinus } from 'react-icons/fi';

export const FilterProducts = ({
  products,
  addToCart,
  productAdd
}) => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setIsFilter] = useState(false);
  const [quantities, setQuantities] = useState({});

  const handleAdd = (item) => {
    const quantity = quantities[item.id] || 1;
    addToCart(item, quantity);
  };

  const increase = (id) => {
    setQuantities(prev => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const decrease = (id) => {
    setQuantities(prev => {
      const newQty = (prev[id] || 1) - 1;
      return { ...prev, [id]: newQty < 1 ? 1 : newQty };
    });
  };

  if (!products) return <p>Loading...</p>;

  const allProducts = Object.entries(products)
    .flatMap(([category, items]) => items.map(item => ({ ...item, category })));

  const filteredProducts = allProducts.filter(item => {
    const matchesCategory =
      categoryFilter === '' || item.category.toLowerCase() === categoryFilter;

    const matchesSearch =
      searchTerm === '' || item.title.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  const handleFilter = (filter) => {
    setCategoryFilter(filter);
  }

  const filterChoice = [
    "dessert",
    "drinks",
    "appetizers",
    "main_course"
  ]

  return (
    <div className="products mt-0 lg:mt-14 mb-20 px-4 lg:px-0">

      <div className="flex w-full mb-4 justify-end border-0">
        <button className="bg-[#2b2d42] lg:min-w-[250px] text-[1.2rem] text-[#eeeddb]" onClick={() => setIsFilter(!filter)}>{!filter ? "Show filter" : "Hide filter"}</button>
      </div>

      {filter &&
        <div className="flex flex-col lg:flex lg:flex-row justify-center my-4 lg:my-4 font-bold">
          <input type="text" name="search" placeholder="What are you looking for? 🍕"
            className="w-full lg:min-w-[450px] bg-[#eeeddb]  
          rounded-lg border-0 text-[1rem] lg:text-[1.2rem] font-bold text-[#2d2d42] px-5 py-2 lg:mx-0"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="flex flex-col-reverse md:grid md:grid-cols-2 ml-2 lg:flex lg:flex-row gap-4 mt-4 lg:mt-0 lg:gap-1">
            <button
              onClick={() => handleFilter("")}
              className={`lg:min-w-[150px] border-4 font-bold text-[1rem] hover:border-[#2b2d42] transition-all duration-300
              ${categoryFilter === "" ? "bg-[#2b2d42] border-[#2b2d42] text-[#eeeddb]" : "bg-[#eeeddb] border-[#eeeddb] text-[#2b2d42]"}  capitalize`}
            >
              All
            </button>

            {filterChoice.map((item) => (
              <button
                className={`lg:min-w-[150px] border-4 font-bold text-[1.2rem] hover:border-[#2b2d42] transition-all duration-300
              ${categoryFilter === item ? "bg-[#2b2d42] border-[#2b2d42] text-[#eeeddb]" : "bg-[#eeeddb] border-[#eeeddb] text-[#2b2d42]"}  capitalize`}
                onClick={() => handleFilter(item == "all" ? "" : item)}
              >
                {item.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>
      }
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts?.map(item => (
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
    </div >
  )
}
