import { useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";

function CartProvider({ children }) {
  // carga carrito desde localStorage
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  // guarda carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //actualizo o elimino producto
  const setQuantity = (product, quantity) => {
    const { id } = product;

    if (!quantity) {
      setCart(cart.filter(({ prod }) => prod.id !== id));
    } else {
      const found = cart.find(({ prod }) => prod.id === id);
      if (!found) {
        setCart([...cart, { prod: product, quantity }]);
      } else {
        setCart(
          cart.map(({ prod, quantity: q }) => (prod.id === id ? { prod: product, quantity } : { prod, quantity: q }))
        );
      }
    }
  };

  const removeProduct = (id) => {
    setCart(cart.filter(({ prod }) => prod.id !== id));
  };

  const totalQuantity = cart.reduce((acc, { quantity }) => acc + quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        setQuantity,
        totalQuantity,
        removeProduct,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
