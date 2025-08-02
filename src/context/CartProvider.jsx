import { useState } from "react";
import { CartContext } from "../context/CartContext";

function CartProvider({ children }) {
  const [cart, setCart] = useState([]); // Estructura: { prod: {}, quantity: number }

  const setQuantity = (product, quantity) => {
    const { id } = product; //extrae el id

    if (!quantity) {
      // Si la cantidad es 0 o falsa se elimina
      setCart(cart.filter(({ prod }) => prod.id !== id));
    } else {
      const found = cart.find(({ prod }) => prod.id === id);

      if (!found) {
        // agrega nuevo producto
        setCart([...cart, { prod: product, quantity }]);
      } else {
        // s ya estaba se ctualiza la cantidad
        setCart(
          cart.map(({ prod, quantity: q }) => (prod.id === id ? { prod: product, quantity } : { prod, quantity: q }))
        );
      }
    }
  };

  const totalQuantity = cart.reduce((acc, { quantity }) => acc + quantity, 0);

  return <CartContext.Provider value={{ cart, setQuantity, totalQuantity }}>{children}</CartContext.Provider>;
}

export default CartProvider;
