import React, { useContext } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { CartContext } from "../context/CartContext";

import Box from "./Box";
import Text from "./Text";
import Modal from "./Modal";
import Counter from "./Counter";
import Button from "./Button";

function Cart({ showModal, setShowModal }) {
  const { cart, removeProduct } = useContext(CartContext);

  const totalPrice = cart.reduce((acc, item) => acc + item.prod.price * item.quantity, 0);

  return (
    <Modal show={showModal} closeModal={() => setShowModal(false)}>
      <Text as="h3" className="mb-4">
        Productos seleccionados
      </Text>

      {cart.length === 0 ? (
        <Text as="p">No tienes productos en el carrito.</Text>
      ) : (
        <Box className="cart__list">
          {cart.map(({ prod, quantity }) => (
            <Box key={prod.id} className="cart__item d-flex align-center space-between mb-3">
              <img src={prod.image} alt={prod.name} className="cart__img" loading="lazy" />
              <Box className="cart__info flex-1 ">
                <Text as="b" className="cart__name">
                  {prod.name}
                </Text>
                <Text className="cart__unitprice">${prod.price}</Text>
              </Box>
              <Box className="d-flex align-center gp-6">
                <Counter product={prod} />
                <Text as="b" className="cart__subtotal">
                  $ {prod.price * quantity}
                </Text>
                <Button
                  size="sm"
                  color="danger"
                  className="ml-2"
                  title="Eliminar producto"
                  onClick={() => removeProduct(prod.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      )}

      <hr />
      <Box className="cart__total d-flex align-center space-between">
        <Text as="h4">Total:</Text>
        <Text as="b">${totalPrice}</Text>
      </Box>
    </Modal>
  );
}

export default Cart;
