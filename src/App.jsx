import React, { useEffect, useState } from "react";
import { commerce } from "./lib/commerce";
//import Products from "./components/Products/Products";
import { Navbar, Products, Cart } from "./components";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const fetchProducts = async () => {
    try {
      const { data } = await commerce.products.list();

      setProducts(data);
    } catch (error) {
      console.log("There was an error fetching products", error);
    }
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  return (
    <div>
      <Navbar totalItems={cart.total_items} />
      {/* <Products products={products} onAddToCart={handleAddToCart} /> */}
      <Cart cart={cart} />
    </div>
  );
}

export default App;
