import React, { Children, createElement } from "react";

const boxElements = {
  div: "div",
  main: "main",
  aside: "aside",
  footer: "footer",
  nav: "nav",
  section: "section",
  header: "header",
  article: "article",
  form: "form",
};

function Box({ as = "div", className = "", children, ...props }) {
  return createElement(boxElements[as] || "div", { className, ...props }, children);
}

export default Box;
