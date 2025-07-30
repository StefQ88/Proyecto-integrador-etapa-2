import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Box from "../components/Box";

function Layout() {
  return (
    <Box>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
}

export default Layout;
