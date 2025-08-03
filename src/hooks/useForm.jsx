import { useState } from "react";

const useForm = (initialValues, validations) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = ({ target }) => {
    const { name, type, value, checked, files } = target;

    let newValue = value;
    if (type === "checkbox") newValue = checked;
    if (type === "file") newValue = files[0] || null;

    // objeto actualizado con el valor nuevo
    const updatedValues = {
      ...values,
      [name]: newValue,
    };

    setValues(updatedValues);

    // Validación para el campo
    if (validations[name]) {
      const { validation, errorText } = validations[name];
      const result = validation(newValue, updatedValues);
      setErrors((prev) => ({
        ...prev,
        [name]: result === true ? "" : result || errorText,
      }));
    }
  };

  const onBlur = ({ target }) => {
    const { name } = target;
    if (validations[name]) {
      const { validation, errorText } = validations[name];
      const result = validation(values[name], values);
      setErrors((prev) => ({
        ...prev,
        [name]: result === true ? "" : result || errorText,
      }));
    }
  };

  const validateAll = () => {
    const newErrors = {};
    for (const field in validations) {
      const { validation, errorText } = validations[field];
      const result = validation(values[field], values);
      if (result !== true) newErrors[field] = result || errorText;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e, callback) => {
    e.preventDefault();
    const isValid = validateAll();
    if (isValid && callback) {
      callback(values);
      setSubmitted(true);
    }
  };

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
    submitted,
    resetForm,
  };
};

export default useForm;
