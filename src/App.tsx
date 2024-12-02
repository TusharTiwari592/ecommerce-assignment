import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Catelog from './components/Catelog';
import Cart from './components/Cart';



const App = () => {
  return (
    <>
      <nav className=''>
        <Link to="/">Home</Link> | <Link to="/products">catelog</Link> | <Link to="/cart">Cart</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<Catelog/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </>
  );
};

export default App;
