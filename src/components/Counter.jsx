import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../context/CartContext";
import Button from "./Button";
import Box from "./Box";
import Text from "./Text";

function Counter({ product }) {
  const { cart, setQuantity } = useContext(CartContext);

  const prodInCart = cart.find(({ prod }) => prod.id === product.id);
  const quantity = prodInCart?.quantity || 0;

  const increment = () => setQuantity(product, quantity + 1);

  const decrement = () => setQuantity(product, quantity - 1);

  return (
    <Box clasName="d-flex align-center gp-2">
      <Button onClick={decrement} disabled={quantity === 0}>
        <FontAwesomeIcon icon={faMinus} />
      </Button>

      <Text as="strong" className="ml-2 mr-2">
        {quantity}
      </Text>

      <Button onClick={increment}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </Box>
  );
}

export default Counter;
