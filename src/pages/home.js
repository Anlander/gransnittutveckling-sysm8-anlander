import { Products } from "../components/products";
import { Basket } from "../components/ui/basket";

const Home = ({
  products,
  addToCart,
  totalCartItems,
  productAdd,
  loading,
  cart
}) => {
  return (
    <div className="container">
      <div className="h-[50vh] lg:h-[80vh] relative w-[95%] lg:w-full rounded-xl mx-auto">
        <div className="w-full absolute text-center h-full items-center lg:items-end justify-center flex mx-auto z-30">
          <div className="absolute xl:-bottom-1 2xl:bottom-1 text-center">
            <h1 className="text-[5rem] lg:text-[10rem] 2xl:text-[12rem] text-[#f4f3e7] uppercase font-bold leading-[5rem] lg:leading-[9rem]">
              Crave. Click. Eat
            </h1>
          </div>
        </div>

        <div className="rounded-xl absolute top-0 w-full h-full bg-black z-20 opacity-30" />
        <img src={`${process.env.PUBLIC_URL + "/images/bg-hero.jpg"} `} className="h-full absolute rounded-xl w-full object-cover z-0" alt="Store Logo" />
      </div>

      <div>
        {loading ? (
          <div className="min-h-[30vh] text-[4rem] font-bold uppercase flex justify-center flex-col lg:flex-row items-center">
            Loading products...
          </div>
        ) : (
          <>
            <Products
              products={products.main_course}
              addToCart={addToCart}
              productAdd={productAdd}
              title={"Most popular main courses"}
            />
            <Products
              products={products.dessert}
              addToCart={addToCart}
              productAdd={productAdd}
              title={"Most popular desserts"}
            />
          </>
        )}
      </div>

      <Basket totalCartItems={totalCartItems} cart={cart} />
    </div>
  )
}

export default Home;
