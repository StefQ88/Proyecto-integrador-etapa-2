import Box from "../components/Box";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Box className="site-wrapper">
      <Header />
      <Box as="main" className="main">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
