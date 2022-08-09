import "./scss/app.scss";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ContentLayout from "./layouts/ContentLayout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<ContentLayout />}>
          <Route path="category/:category" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="product/:id" element={<Product />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
