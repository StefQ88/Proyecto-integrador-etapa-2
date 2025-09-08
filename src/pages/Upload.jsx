import Box from "../components/Box";
import Text from "../components/Text";
import Container from "../components/Container";
import Form from "../components/Form";
import useForm from "../hooks/useForm";
import { postProduct } from "../utils/api";
import { useState } from "react";

// Array de inputs
const uploadInputs = [
  { name: "name", label: "Nombre del producto", type: "text", required: true },
  {
    name: "ageRange",
    label: "Edad recomendada",
    type: "inlineGroup",
    required: true,
    fields: [
      {
        name: "ageFrom",
        label: "Mínima",
        type: "number",
        required: true,
        min: 0,
      },
      {
        name: "ageUnitFrom",
        label: "",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Unidad" },
          { value: "meses", label: "meses" },
          { value: "años", label: "años" },
        ],
      },
      {
        name: "ageTo",
        label: "Máxima",
        type: "number",
        required: true,
        min: 0,
      },
      {
        name: "ageUnitTo",
        label: "",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Unidad" },
          { value: "meses", label: "meses" },
          { value: "años", label: "años" },
        ],
      },
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
      { value: "didacticos", label: "Didácticos" },
      { value: "aire-libre", label: "Aire Libre" },
    ],
  },
  { name: "shortDescription", label: "Descripción corta", type: "textarea", required: true },
  { name: "largeDescription", label: "Descripción larga", type: "textarea" },
  { name: "freeDelivery", label: "Envío sin cargo", type: "checkbox" },
  { name: "image", label: "Imagen", type: "file", required: true },
];

// Validaciones
const uploadValidations = {
  name: { validation: (v) => v.trim() !== "", errorText: "Nombre obligatorio" },
  price: { validation: (v) => v > 0, errorText: "Precio debe ser mayor a 0" },
  stock: {
    validation: (v) => {
      if (v === "" || isNaN(Number(v))) return "Stock requerido";
      if (Number(v) < 0) return "Debe ser mayor o igual a 0";
      return true;
    },
  },
  brand: { validation: (v) => v.trim() !== "", errorText: "Marca obligatoria" },
  category: { validation: (v) => v !== "", errorText: "Elegí una categoría" },
  shortDescription: { validation: (v) => v.trim().length >= 10, errorText: "Mínimo 10 caracteres" },
  image: {
    validation: (v) => v.trim() !== "" && v.startsWith("http"),
    errorText: "Pegá una URL de imagen válida",
  },

  ageFrom: { validation: (v) => v !== "", errorText: "Edad mínima requerida" },
  ageUnitFrom: { validation: (v) => v !== "", errorText: "Unidad mínima requerida" },
  ageTo: { validation: (v) => v !== "", errorText: "Edad máxima requerida" },
  ageUnitTo: { validation: (v) => v !== "", errorText: "Unidad máxima requerida" },
};

function Upload() {
  const { values, errors, submitted, onChange, onBlur, onSubmit, resetForm } = useForm(
    {
      name: "",
      price: "",
      stock: "",
      brand: "",
      category: "",
      shortDescription: "",
      largeDescription: "",
      freeDelivery: false,
      image: "",
      ageFrom: "",
      ageUnitFrom: "",
      ageTo: "",
      ageUnitTo: "",
    },
    uploadValidations
  );

  const [showSuccess, setShowSuccess] = useState(false);

  // handler
  const handleSubmit = (e) =>
    onSubmit(e, (vals) => {
      postProduct(vals)
        .then(() => {
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            resetForm(); // limpia el form
          }, 2000);
        })
        .catch((err) => console.error(err));
    });

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
              onSubmit={handleSubmit}
              submitted={submitted}
            />

            {showSuccess && (
              <Text as="p" className="form__success">
                Producto guardado correctamente
              </Text>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Upload;
