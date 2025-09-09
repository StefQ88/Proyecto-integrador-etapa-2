import Text from "../components/Text";
import Box from "../components/Box";
import Form from "../components/Form";
import Container from "../components/Container";
import useForm from "../hooks/useForm";
import { useState } from "react";
import { postContact } from "../utils/api";

const contactInputs = [
  { name: "name", label: "Nombre", type: "text", required: true },
  { name: "surname", label: "Apellido(s)", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  {
    name: "reason",
    label: "Motivo",
    type: "select",
    required: true,
    options: [
      { value: "", label: "Seleccionar una opción" },
      { value: "compras-web", label: "Compra Web" },
      { value: "reclamo-producto", label: "Reclamo de productos" },
      { value: "otro", label: "Otros Motivos" },
    ],
  },
  { name: "body", label: "Comentarios", type: "textarea", required: true },
];

const contactValidations = {
  name: {
    validation: (value) => value.trim().length >= 2,
    errorText: "El nombre es obligatorio y debe tener al menos 2 letras",
  },
  surname: {
    validation: (value) => value.trim().length >= 2,
    errorText: "El apellido es obligatorio y debe tener al menos 2 letras",
  },
  email: {
    validation: (value) => {
      const regexp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
      return regexp.test(value);
    },
    errorText: "Email inválido, usa formato usuario@dominio.com",
  },
  reason: {
    validation: (value) => value !== "",
    errorText: "Selecciona un motivo",
  },
  body: {
    validation: (value) => value.trim().length >= 10,
    errorText: "El comentario debe tener al menos 10 caracteres",
  },
};

function ContactUs() {
  const { values, errors, submitted, onChange, onBlur, onSubmit, resetForm } = useForm(
    {
      name: "",
      surname: "",
      email: "",
      reason: "",
      body: "",
    },
    contactValidations
  );

  const [showSuccess, setShowSuccess] = useState(false);
  const [sendError, setSendError] = useState("");

  const handleSubmit = (e) =>
    onSubmit(e, async (vals) => {
      console.log("SUBMIT DISPARADO:", vals);
      try {
        setSendError("");

        const resp = await postContact(vals);
        if (resp?.ok) {
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            resetForm();
          }, 2000);
        } else {
          setSendError(resp?.msg || "No se pudo enviar el mensaje.");
        }
      } catch (error) {
        setSendError("Error de red o servidor.");
        console.error(error);
      }

      const prevMsgs = JSON.parse(localStorage.getItem("contactMessages") || "[]");
      prevMsgs.push(vals);
      localStorage.setItem("contactMessages", JSON.stringify(prevMsgs));
    });

  return (
    <Box as="main" className="contact">
      <Container className="contact__container">
        <Text as="h2" className="contact__title">
          Contáctenos
        </Text>

        <Box className="contact__grid grid">
          <Box className="contact__form col-xs-12 col-md-6 col-lg-5 col-xl-4">
            <Form
              inputsArray={contactInputs}
              values={values}
              errors={errors}
              onChange={onChange}
              onBlur={onBlur}
              onSubmit={handleSubmit}
              submitted={submitted}
            />

            {showSuccess && (
              <Text as="p" className="form__success">
                Mensaje enviado correctamente
              </Text>
            )}
            {!!sendError && (
              <Text as="p" className="form__error">
                {sendError}
              </Text>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ContactUs;
