import { createPortal } from "react-dom";
import Box from "./Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function DrawerMenu({ show, closeMenu, children }) {
  return show
    ? createPortal(
        <Box className="drawer__overlay" role="button" onClick={closeMenu}>
          <Box className="drawer__content" onClick={(e) => e.stopPropagation()}>
            <Box className="d-flex justify-end">
              <button className="drawer__close">
                <FontAwesomeIcon icon={faClose} onClick={closeMenu} size="xl" />
              </button>
            </Box>
            {children}
          </Box>
        </Box>,
        document.body
      )
    : undefined;
}

export default DrawerMenu;
