import Header from './layout/Header';
import Home from './pages/Home';
import {Routes,Route} from "react-router-dom"
import Login from './pages/Login';
import WishList from './pages/WishList';
import ShoppingCart from "./pages/ShoppingCart"
import ForTheDay from "./pages/ForTheDay"
import ForEveryday from "./pages/ForEveryday"
import About from "./pages/About"
import Contact from "./pages/Contact"
import NotFound from "./pages/NotFound"
import Footer from './layout/Footer';
import Product from './pages/ProductDetails';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home /> } />
        <Route path='/login' element={<Login /> } />
        <Route path='/wishlist' element={<WishList /> } />
        <Route path='/cart' element={<ShoppingCart /> } />
        <Route path='/pour-un-jour-unique' element={<ForTheDay /> } />
        <Route path='/pour-le-quotidien' element={<ForEveryday /> } />
        <Route path='/produits/:id' element={<Product /> } />
        <Route path='/a-propos' element={<About /> } />
        <Route path='/contact' element={<Contact /> } />
        <Route path='/*' element={<NotFound /> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
