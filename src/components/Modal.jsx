// React hooks necesarios
import { useEffect } from "react";

// createPortal permite renderizar el modal fuera del flujo normal del DOM
import { createPortal } from "react-dom";

// Componentes reutilizables de tu proyecto
import Box from "./Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

// Componente Modal: ventana emergente reutilizable
function Modal({ show, closeModal, children }) {
  // ===========================
  // ESC Listener para cerrar modal con teclado
  // ===========================
  useEffect(() => {
    // Si se presiona la tecla "Escape", se cierra el modal
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };

    // Si el modal está abierto, agregamos el listener
    if (show) {
      document.addEventListener("keydown", handleEsc);
    }

    // Cuando se desmonta el componente o cambia `show`, se elimina el listener
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [show, closeModal]); // Se vuelve a ejecutar si `show` o `closeModal` cambian

  // ===========================
  // Renderizado condicional usando portal
  // ===========================
  return show
    ? createPortal(
        // Fondo oscuro (overlay) que cierra el modal al hacer clic afuera
        <Box className="modal__overlay" role="button" onClick={closeModal}>
          {/* Contenido del modal. Evita que el click en su interior cierre el modal */}
          <Box className="modal__content" onClick={(e) => e.stopPropagation()}>
            {/* Botón de cierre (ícono "X" en la esquina) */}
            <Box className="d-flex justify-end">
              <button className="modal__close" onClick={closeModal}>
                <FontAwesomeIcon icon={faClose} size="xl" />
              </button>
            </Box>

            {/* Contenido inyectado desde el componente que llama al modal */}
            {children}
          </Box>
        </Box>,

        // Renderiza el modal directamente dentro de <body>
        document.body
      )
    : null; // Si `show` es false, no renderiza nada
}

export default Modal;
