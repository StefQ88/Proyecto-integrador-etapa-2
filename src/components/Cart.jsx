import React, { useContext, useEffect, useRef, useState } from "react";
import { faTrash, faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";
import { saveCart } from "../utils/api"; // ← tu ruta

import Box from "./Box";
import Text from "./Text";
import Modal from "./Modal";
import Counter from "./Counter";
import Button from "./Button";

function Cart({ showModal, setShowModal }) {
  const { cart, removeProduct } = useContext(CartContext);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // evita dobles envios
  const submittedRef = useRef(false);

  useEffect(() => {
    if (showModal) submittedRef.current = false;
  }, [showModal]);

  const totalPrice = cart.reduce((acc, item) => acc + item.prod.price * item.quantity, 0);

  const handleComprar = async () => {
    if (submittedRef.current || saving || cart.length === 0) return;

    try {
      submittedRef.current = true;
      setSaving(true);
      setMsg("");

      const cartItems = cart.map(({ prod, quantity }) => ({
        _id: prod._id || prod.id,
        id: prod.id,
        name: prod.name,
        price: Number(prod.price),
        image: prod.image,
        qty: Number(quantity),
      }));

      await saveCart(cartItems); // POST /api/cart
      setShowModal(false);
      navigate("/checkout");
    } catch (e) {
      console.error(e);
      setMsg("No se pudo crear el carrito.");
      submittedRef.current = false; // permitir reintento si falló
    } finally {
      setSaving(false);
    }
  };

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
      <Box className="cart__total d-flex align-center space-between mb-3">
        <Text as="h4">Total:</Text>
        <Text as="b">${totalPrice}</Text>
      </Box>

      {msg && (
        <Text as="p" className="mb-2">
          {msg}
        </Text>
      )}

      <Box className="d-flex justify-end">
        <Button
          type="button"
          onClick={handleComprar}
          disabled={cart.length === 0 || saving}
          aria-busy={saving}
          style={saving ? { pointerEvents: "none", opacity: 0.8 } : undefined}>
          <FontAwesomeIcon icon={faShop} />
          &nbsp;{saving ? "Guardando..." : "Comprar"}
        </Button>
      </Box>
    </Modal>
  );
}

export default Cart;
