import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Catelog from "./components/Catelog";
import Cart from "./components/Cart";
import Product from "./components/Product";

const App = () => {
  return (
    <>
      <nav className="p-4 bg-blue-400">
        <Link className="border-r-2 p-4" to="/">
          Home
        </Link>
        <Link className="border-r-2 p-4" to="/products">
          catelog
        </Link>{" "}
        <Link className="border-r-2 p-4" to="/cart">
          Cart
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Catelog />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default App;
