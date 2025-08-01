import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";

import Box from "../components/Box";
import Text from "../components/Text";
import Container from "../components/Container";

export default function Footer() {
  return (
    <Box as="footer" className="footer">
      <Container className="footer__container">
        {/* Columna 1 */}
        <Box className="footer__col">
          <Text as="h4" className="footer__title">
            Medios de pago
          </Text>
          <Text as="span" className="footer__text">
            Tarjetas de débito y crédito
          </Text>
        </Box>

        {/* Columna 2 */}
        <Box className="footer__col">
          <Text as="h4" className="footer__title">
            Seguínos en:
          </Text>
          <Box className="footer__social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </Box>
        </Box>

        {/* Columna 3 */}
        <Box className="footer__col">
          <Text as="span" className="footer__copyright">
            © 2025 Juguetería Cósmica
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
