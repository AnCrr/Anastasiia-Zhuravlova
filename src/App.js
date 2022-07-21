import "./scss/app.scss";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Product from "./pages/Product";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="product/:id" element={<Product />} />
      </Route>
    </Routes>
  );
}

export default App;
