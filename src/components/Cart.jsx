import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import Box from "../components/Box";
import Text from "../components/Text";
import Modal from "../components/Modal";
import Button from "../components/Button";

function Cart() {
  const [showModal, setShowModal] = useState(false);

  // Contexto del carrito: productos, total de unidades y funciones para modificar cantidades.
  const { cart, totalQuantity, incrementQuantity, decrementQuantity } = useContext(CartContext);

  // Suma total del carrito.
  const totalAmount = cart.reduce((acc, item) => acc + item.prod.amount * item.quantity, 0);

  return (
    <>
      {/* Ícono del carrito en el header */}
      <Box
        className="cart__container"
        role="button"
        aria-label="Abrir carrito"
        title="Ver carrito"
        onClick={() => setShowModal(true)}>
        <FontAwesomeIcon icon={faShoppingCart} size="xl" />
        {totalQuantity > 0 && (
          <Box className="cart__badge">
            <Text as="span">{totalQuantity}</Text>
          </Box>
        )}
      </Box>

      {/* Modal del carrito */}
      <Modal show={showModal} closeModal={() => setShowModal(false)}>
        <Text as="h3" className="cart__title">
          Productos seleccionados
        </Text>

        {/* Listado de productos en el carrito */}
        {cart.length === 0 ? (
          <Text as="p">Tu carrito está vacío.</Text>
        ) : (
          cart.map(({ prod, quantity }) => (
            <Box key={prod.id} className="cart__item d-flex align-center space-between my-2">
              {/* Imagen del producto */}
              <Box className="cart__imgbox">
                <img src={prod.photo} alt={prod.name} className="cart__img" width={50} height={50} loading="lazy" />
              </Box>

              {/* Nombre del producto */}
              <Text as="h4" className="cart__name">
                {prod.name}
              </Text>

              {/* Precio unitario */}
              <Text as="span" className="cart__unitprice">
                ${prod.amount}
              </Text>

              {/* Controles de cantidad */}
              <Box className="d-flex align-center gap-1 cart__qtybox">
                <Button
                  size="sm"
                  onClick={() => decrementQuantity(prod.id)}
                  aria-label="Quitar uno"
                  title="Quitar uno"
                  disabled={quantity === 1}>
                  -
                </Button>
                <Text as="span">{quantity}</Text>
                <Button
                  size="sm"
                  onClick={() => incrementQuantity(prod.id)}
                  aria-label="Agregar uno"
                  title="Agregar uno">
                  +
                </Button>
              </Box>

              {/* Subtotal del producto */}
              <Text as="b" className="cart__subtotal">
                ${prod.amount * quantity}
              </Text>
            </Box>
          ))
        )}

        {/* Total general */}
        <Box className="cart__total d-flex align-center space-between mt-3">
          <Text as="h4">Total:</Text>
          <Text as="b">${totalAmount}</Text>
        </Box>
      </Modal>
    </>
  );
}

export default Cart;
