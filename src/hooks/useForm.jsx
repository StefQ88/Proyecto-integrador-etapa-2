import React from "react";

import { useState } from "react";

export const useForm = (initialValues, validations) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submittted, setSubmitted] = useState(false);

  //se dispara al cambiar el input
  const onChange = ({ target }) => {
    const { name, type, value, checked, files } = target;

    let newValue = value;
    if (type === "checkbox") newValue = checked;
    if (type === "file") newValue = files[0] || null; //primer archivo o null

    setValues((prev) => ({
      ...prev,
      [name]: newValue, //sobre escribe solo el cambio
    }));

    if (validations[name]) {
      const { validation, errorText } = validations[name];

      setErrors((prev) => ({
        ...prev,
        [name]: validation(newValue, values) ? "" : errorText,
      }));
    }
  };

  //Validacion individual, se dispara cuando el input pierde el foco
  const onBlur = ({ target }) => {
    const { name } = target;
    if (validations[name]) {
      const { validation, errorText } = validations[name];
      setErrors((prev) => ({
        ...prev,
        [name]: validation(values[name], values) ? "" : errorText,
      }));
    }
  };

  //Validacion total del formulario al enviarlo, recorre todas las validaciones
  const validateAll = () => {
    const newErrors = {};

    for (const field in validations) {
      const { validation, errorText } = validations[field];
      const isValid = validation(values[field], values);

      if (!isValid) newErrors[field] = errorText;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; //true si el formulario es valido
  };

  //Submit
  const onSubmit = (e, callback) => {
    e.preventDefault();
    const isValid = validateAll(); //validacion antes
    if (isValid && callback) {
      callback(values);
      setSubmitted(true); //booleano, flag para mostrar mensaje de exito
    }
  };

  //Reset
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setSubmitted(false);
  };

  return {
    values,
    errors,
    onChange,
    onBlur,
    validateAll,
    onSubmit,
    submittted,
    resetForm,
  };
};

export default useForm;
