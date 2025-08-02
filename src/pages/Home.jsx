import Container from "../components/Container";
import Text from "../components/Text";

import ProductGrid from "../layout/ProductGrid";

function Home() {
  return (
    <Container>
      <Text as="h2">Productos</Text>
      <ProductGrid />
    </Container>
  );
}

export default Home;
