import React from "react";

const Button = ({
  type = "button",
  variant = "solid",
  color = "primary",
  children,
  className = "",
  ...rest //resto de las props
}) => {
  const fullClass = `
    btn
    btn--${variant}
    btn--${variant}-${color} 
    ${className}
    `.trim();

  return (
    <button type={type} className={fullClass} {...rest}>
      {children} {/* se muestra dentro del botón */}
    </button>
  );
};

export default Button;
