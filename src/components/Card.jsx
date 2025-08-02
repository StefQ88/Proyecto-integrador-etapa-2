import Box from "./Box";
import Text from "./Text";
import Button from "./Button";

function Card({ image, name, shortDescription, price, ...props }) {
  const handleAdd = () => {
    alert(`Agregado: ${name}`);
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
