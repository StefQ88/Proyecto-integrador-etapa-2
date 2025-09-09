import Box from "./Box";
import Text from "./Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

function Form({ inputsArray, values, errors, onChange, onBlur, onSubmit, submitted, children }) {
  return (
    <form className="form" onSubmit={onSubmit}>
      {inputsArray.map((input) => {
        const { name, label, type, options, required, fields } = input;
        const errorClass = errors[name] ? " with-error" : "";

        // InlineGroup

        if (type === "inlineGroup" && fields) {
          return (
            <Box key={name} className="form__group">
              <Text as="label" className={`form__label${required ? " is-required" : ""}`}>
                {label}
              </Text>

              {/* Contenedor para línea */}

              <Box className="form__inline-group">
                {fields.map((field) =>
                  field.type === "select" ? (
                    <select
                      key={field.name}
                      id={field.name}
                      name={field.name}
                      value={values[field.name]}
                      onChange={onChange}
                      onBlur={onBlur}
                      className={`form__input${errors[field.name] ? " with-error" : ""}`}>
                      {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      key={field.name}
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      value={values[field.name]}
                      onChange={onChange}
                      onBlur={onBlur}
                      className={`form__input${errors[field.name] ? " with-error" : ""}`}
                      min={field.type === "number" ? 0 : undefined}
                    />
                  )
                )}
              </Box>

              {/* Errores */}

              {fields.map(
                (field) =>
                  errors[field.name] && (
                    <Text key={`${field.name}-error`} as="span" className="form__error">
                      {errors[field.name]}
                    </Text>
                  )
              )}
            </Box>
          );
        }

        // Checkbox

        if (type === "checkbox") {
          return (
            <Box key={name} className="form__group">
              <label className="form__checkbox-wrapper">
                <input
                  id={name}
                  name={name}
                  type="checkbox"
                  checked={values[name] || false}
                  onChange={onChange}
                  onBlur={onBlur}
                  className="form__checkbox"
                />
                <span>{label}</span>
              </label>
              {errors[name] && (
                <Text as="span" className="form__error">
                  {errors[name]}
                </Text>
              )}
            </Box>
          );
        }

        // Input file

        if (type === "file") {
          return (
            <Box key={name} className="form__group">
              <Text as="label" className={`form__label${required ? " is-required" : ""}`} htmlFor={name}>
                {label}
              </Text>
              <Box className="form__file-wrapper">
                <input
                  id={name}
                  name={name}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  required={!!required}
                  onChange={onChange}
                  onBlur={onBlur}
                  className={`form__input${errorClass}`}
                />
              </Box>
              {errors[name] && (
                <Text as="span" className="form__error">
                  {errors[name]}
                </Text>
              )}
            </Box>
          );
        }

        // Inputs normales

        return (
          <Box key={name} className="form__group">
            <Text as="label" className={`form__label${required ? " is-required" : ""}`} htmlFor={name}>
              {label}
            </Text>

            {type === "textarea" ? (
              <textarea
                id={name}
                name={name}
                value={values[name]}
                onChange={onChange}
                onBlur={onBlur}
                className={`form__input${errorClass}`}
              />
            ) : type === "select" ? (
              <select
                id={name}
                name={name}
                value={values[name]}
                onChange={onChange}
                onBlur={onBlur}
                className={`form__input${errorClass}`}>
                {options &&
                  options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
              </select>
            ) : (
              <input
                key={submitted ? "sent" : "editing"} //limpia
                id={name}
                name={name}
                type={type}
                value={values[name]}
                onChange={onChange}
                onBlur={onBlur}
                className={`form__input${errorClass}`}
                min={type === "number" ? 0 : undefined}
              />
            )}

            {errors[name] && (
              <Text as="span" className="form__error">
                {errors[name]}
              </Text>
            )}
          </Box>
        );
      })}

      {children}

      {/* botón de submit */}
      <Box className="form__actions">
        <Button type="submit" variant="solid" color="primary">
          <FontAwesomeIcon icon={faPaperPlane} /> Enviar
        </Button>
      </Box>

      {/* mensaje de éxito */}
      {submitted && (
        <Text as="p" className="form__success">
          Formulario enviado correctamente
        </Text>
      )}
    </form>
  );
}

export default Form;
