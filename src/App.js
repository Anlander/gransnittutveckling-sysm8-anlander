import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/ui/header';
import { Footer } from './components/ui/footer';
import Cart from './pages/cart';
import Menu from './pages/menu';
import Home from './pages/home';
import Confirmation from './pages/confirmation';

import './App.css';
import Checkout from './pages/checkout';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productAdd, setProductAdd] = useState(null);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const getMenu = async () => {
      try {
        const res = await fetch('http://localhost:3001/menu');
        const json = await res.json();
        setProducts(json);
      } catch (err) {
        console.error('Failed to fetch:', err);
      } finally {
        setLoading(false);
      }
    };
    getMenu();
  }, []);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });

    setProductAdd(product.id);
    setTimeout(() => {
      setProductAdd(null);
    }, 500);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/"
          element={
            <Home
              totalCartItems={totalCartItems}
              products={products}
              addToCart={addToCart}
              loading={loading}
              cart={cart}
              productAdd={productAdd}
            />
          }
        />
        <Route path="/menu"
          element={
            <Menu
              totalCartItems={totalCartItems}
              products={products}
              addToCart={addToCart}
              loading={loading}
              cart={cart}
              productAdd={productAdd}
            />
          }
        />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
