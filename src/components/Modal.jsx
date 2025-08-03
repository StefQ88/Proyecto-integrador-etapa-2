import { useEffect } from "react";
import { createPortal } from "react-dom";
import Box from "./Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function Modal({ show, closeModal, children }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };

    if (show) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [show, closeModal]);

  // renderizado condicional usando portal

  return show
    ? createPortal(
        <Box className="modal__overlay" role="button" onClick={closeModal}>
          <Box className="modal__content" onClick={(e) => e.stopPropagation()}>
            <Box className="d-flex justify-end">
              <button className="modal__close" onClick={closeModal}>
                <FontAwesomeIcon icon={faClose} size="xl" />
              </button>
            </Box>

            {children}
          </Box>
        </Box>,

        document.body
      )
    : null;
}

export default Modal;
