import { useEffect, useState } from "react";
import Box from "../components/Box";
import Card from "../components/Card";
import { getProducts } from "../utils/api";

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <>
      {toast && <div className="toast-message">{toast}</div>}

      <Box className="grid pb-10 pt-4 ">
        {products.map((prod) => (
          <Box key={prod.id} className="col-xs-12 col-sm-6 col-lg-4 col-xl-3">
            <Card {...prod} showToast={showToast} />
          </Box>
        ))}
      </Box>
    </>
  );
}

export default ProductGrid;
