import { Basket } from "../components/ui/basket";
import { FilterProducts } from "../components/filter-products";

const Menu = ({
  products,
  addToCart,
  productAdd,
  totalCartItems,
  cart
}) => {
  return (
    <div className="container pt-4">
      <FilterProducts
        products={products}
        addToCart={addToCart}
        productAdd={productAdd}
      />
      <Basket totalCartItems={totalCartItems} cart={cart} />
    </div>
  )
}

export default Menu;
