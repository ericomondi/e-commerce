import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./assets/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./assets/PrivateRoutes";
import Products from "./pages/Product";
// import Store from "./pages/store";

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
            {/* <Route path="/store" element={<Store />} /> */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
