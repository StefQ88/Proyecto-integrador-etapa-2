import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";

import Box from "../components/Box";
import Text from "../components/Text";
import Button from "../components/Button";
import Container from "../components/Container";

function Checkout() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce((acc, item) => acc + item.prod.price * item.quantity, 0);

  if (!cart || cart.length === 0) {
    return (
      <Container>
        <Box className="p-4">
          <Text as="h3" className="mb-2">
            Checkout
          </Text>
          <Text as="p" className="mb-4">
            No tienes productos en el carrito.
          </Text>
          <Button onClick={() => navigate("/")}>Volver a la tienda</Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box className="p-4">
        <Text as="h3" className="mb-3">
          Checkout
        </Text>

        {cart.map(({ prod, quantity }) => (
          <Box key={prod.id} className="d-flex align-center space-between mb-2">
            <Text>
              {prod.name} x {quantity}
            </Text>
            <Text as="b">$ {prod.price * quantity}</Text>
          </Box>
        ))}

        <hr />

        <Box className="d-flex align-center space-between mt-3">
          <Text as="h4">Total:</Text>
          <Text as="b">$ {totalPrice}</Text>
        </Box>

        <Box className="d-flex justify-end mt-3">
          <Button onClick={() => navigate("/")}>Seguir comprando</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Checkout;
