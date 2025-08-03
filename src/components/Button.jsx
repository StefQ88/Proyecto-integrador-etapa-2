import React from "react";

const Button = ({
  type = "button",
  variant = "solid",
  color = "primary",
  size = "md",
  children,
  className = "",
  ...rest
}) => {
  const fullClass = `
    btn
    btn--${variant}
    btn--${variant}-${color} 
    btn--${size}
    ${className}
    `.trim();

  return (
    <button type={type} className={fullClass} {...rest}>
      {children}
    </button>
  );
};

export default Button;
