import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./assets/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./assets/PrivateRoutes";
import Products from "./pages/Product";
import ProductCards from "./pages/ProductCards";
import ShoppingCart from "./pages/ShoppingCart";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/store" element={<ProductCards />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
