import Box from "./Box";
import Text from "./Text";
import Button from "./Button";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const categoryLabels = {
  "primeros-juguetes": "Primeros Juguetes",
  vehiculos: "Vehículos",
  "muñecas-accesorios": "Muñecas - Accesorios",
  didacticos: "Didácticos",
  "aire-libre": "Aire Libre",
};

function Card({ id, image, name, shortDescription, category, price, showToast, ...props }) {
  const { cart, setQuantity } = useContext(CartContext);

  // busca el producto en el carrito por id
  const prodInCart = cart.find(({ prod }) => prod.id === id);
  const quantity = prodInCart?.quantity || 0;

  // suma 1 o agrega el producto al carrito
  const handleAdd = () => {
    setQuantity({ id, image, name, shortDescription, price, ...props }, quantity + 1);
    if (showToast) showToast(`¡${name} agregado al carrito!`);
  };

  return (
    <Box className="card h-100 w-100 p-4">
      <Box className="card__image-box">
        <img src={image} alt={name} className="card__image" />
      </Box>
      <Box className="card__body">
        <Text as="h3" className="card__title">
          {name}
        </Text>
        <Text className="card__description">{shortDescription}</Text>
        <Text className="card__category">{categoryLabels[category]}</Text>
      </Box>
      <hr className="w-100" />
      <Text as="b" className="card__price">{`$ ${price}`}</Text>

      <Button className="card__button" color="secondary" size="md" onClick={handleAdd}>
        Agregar al carrito
      </Button>
    </Box>
  );
}

export default Card;
