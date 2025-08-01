import Box from "../components/Box";
import Text from "../components/Text";
import Container from "../components/Container";
import Form from "../components/Form";
import useForm from "../hooks/useForm";

const uploadInputs = [
  { name: "name", label: "Nombre del producto", type: "text", required: true },

  {
    name: "age_range",
    label: "Edad recomendada",
    type: "select",
    required: true,
    options: [
      { value: "", label: "Seleccionar una opción" },
      { value: "0-3-meses", label: "0 a 3 meses" },
      { value: "3-6-meses", label: "3 a 6 meses" },
      { value: "6-12-meses", label: "6 a 12 meses" },
      { value: "1-2-años", label: "1 a 2 años" },
      { value: "3-5-años", label: "3 a 5 años" },
      { value: "6-8-años", label: "6 a 8 años" },
      { value: "9-12-años", label: "9 a 12 años" },
      { value: "12+", label: "12 años o más" },
    ],
  },

  { name: "price", label: "Precio", type: "number", required: true },
  { name: "stock", label: "Stock", type: "number", required: true },
  { name: "brand", label: "Marca", type: "text", required: true },
  {
    name: "category",
    label: "Categoría",
    type: "select",
    required: true,
    options: [
      { value: "", label: "Seleccionar una opción" },
      { value: "primeros-juguetes", label: "Primeros Juguetes" },
      { value: "vehiculos", label: "Vehículos" },
      { value: "muñecas-accesorios", label: "Muñecas - Accesorios" },
    ],
  },
  { name: "short_description", label: "Descripción corta", type: "textarea", required: true },
  { name: "large_description", label: "Descripción larga", type: "textarea" },
  { name: "free_delivery", label: "Envío sin cargo", type: "checkbox" },
  { name: "image", label: "Imagen", type: "file", required: true },
];

const uploadValidations = {
  name: { validation: (v) => v.trim() !== "", errorText: "Nombre obligatorio" },
  price: { validation: (v) => v > 0, errorText: "Precio debe ser mayor a 0" },
  stock: { validation: (v) => v >= 0, errorText: "Stock inválido" },
  brand: { validation: (v) => v.trim() !== "", errorText: "Marca obligatoria" },
  category: { validation: (v) => v !== "", errorText: "Elegí una categoría" },
  short_description: { validation: (v) => v.trim().length >= 10, errorText: "Mínimo 10 caracteres" },
  image: { validation: (v) => v !== "", errorText: "Seleccioná una imagen" },
  age_from_value: { validation: (v) => v !== "", errorText: "Requerido" },
  age_from_unit: { validation: (v) => v !== "", errorText: "Elegí unidad" },
  age_to_value: { validation: (v) => v !== "", errorText: "Requerido" },
  age_to_unit: { validation: (v) => v !== "", errorText: "Elegí unidad" },
};

function Upload() {
  const { values, errors, submitted, onChange, onBlur, onSubmit, resetForm } = useForm(
    {
      name: "",
      price: "",
      stock: "",
      brand: "",
      category: "",
      short_description: "",
      large_description: "",
      free_delivery: false,
      image: "",
    },
    uploadValidations
  );

  return (
    <Box as="main" className="upload">
      <Container className="upload__container">
        <Text as="h2" className="upload__title">
          Alta de productos
        </Text>

        <Box className="upload__grid grid">
          <Box className="upload__form col-xs-12 col-md-6 col-lg-5 col-xl-4">
            <Form
              inputsArray={uploadInputs}
              values={values}
              errors={errors}
              onChange={onChange}
              onBlur={onBlur}
              onSubmit={(e, callback) =>
                onSubmit(e, (vals) => {
                  console.log("Producto enviado:", vals);
                  resetForm();
                  callback(vals);
                })
              }
              submitted={submitted}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Upload;
