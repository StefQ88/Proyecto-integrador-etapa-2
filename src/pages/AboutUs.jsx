import Container from "../components/Container";
import Box from "../components/Box";
import Text from "../components/Text";
import historiaImg from "../assets/about-historia.jpg";
import espacioImg from "../assets/about-espacio.jpg";
import compromisoImg from "../assets/about-compromiso.jpg";

function AboutUs() {
  return (
    <Container>
      <section className="about">
        <Text as="h2" className="subtitle mb-6">
          Sobre nosotros ...
        </Text>

        {/* Fila 1 */}
        <Box className="grid mb-5">
          <Box className="col-12 col-md-6 about__item">
            <Text as="h3" className="title-section mb-3">
              Nuestra Historia
            </Text>
            <Text className="about__text mb-3">
              Juguetería Cósmica comenzó como un proyecto familiar apasionado por el juego como derecho. Lo que nació en
              un pequeño local de barrio fue creciendo gracias a la confianza de las familias que buscan algo más que un
              simple juguete: buscan experiencias.
            </Text>
            <Text className="about__text">
              A lo largo de los años, nos transformamos en un espacio referente en el universo infantil, donde cada
              producto cuenta una historia y cada cliente se convierte en parte de la nuestra. Nos impulsa una
              convicción: que jugar es aprender, compartir, imaginar... y crecer.
            </Text>
          </Box>

          {/*imagen*/}
          <Box className="col-12 col-md-6 about__item d-flex align-center justify-center">
            <img src={historiaImg} alt="Niños jugando" className="about__image" />
          </Box>
        </Box>

        {/* Fila 2 */}
        <Box className="grid mb-5">
          <Box className="col-12 col-md-6 about__item d-flex align-center justify-center">
            <img src={espacioImg} alt="Interior de la tienda" className="about__image" />
          </Box>
          <Box className="col-12 col-md-6 about__item">
            <Text as="h3" className="title-section mb-3">
              Nuestro espacio
            </Text>
            <Text className="about__text mb-3">
              Contamos con una tienda mágica y didáctica, pensada para que cada visita sea una experiencia inolvidable
              para chicos y grandes.
            </Text>
            <Text className="about__text">
              Desde estanterías al alcance de los más pequeños hasta zonas interactivas para probar juguetes, creamos un
              ambiente que invita a explorar con los sentidos y el corazón. Queremos que cada visita se convierta en una
              experiencia única.
            </Text>
          </Box>
        </Box>

        {/* Fila 3 */}
        <Box className="grid mb-5">
          <Box className="col-12 col-md-6 about__item">
            <Text as="h3" className="title-section mb-3">
              Nuestro compromiso
            </Text>
            <Text className="about__text mb-3">
              Detrás de cada propuesta de Juguetería Cósmica hay un equipo apasionado por el desarrollo infantil y el
              poder del juego. Nuestro personal está formado por educadores, artistas y especialistas en infancia que
              trabajan con dedicación y sensibilidad.
            </Text>
            <Text className="about__text">
              Nos esforzamos por brindar una atención cercana, respetuosa y creativa, acompañando a cada familia en la
              elección de juguetes que enriquezcan la imaginación y fortalezcan los vínculos. Creemos que cada
              interacción es una oportunidad para sembrar curiosidad y alegría.
            </Text>
          </Box>
          <Box className="col-12 col-md-6 about__item d-flex align-center justify-center">
            <img src={compromisoImg} alt="Compromiso con los valores" className="about__image" />
          </Box>
        </Box>
      </section>
    </Container>
  );
}

export default AboutUs;
