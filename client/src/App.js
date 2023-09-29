import Header from "./layout/Header";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import WishList from "./pages/WishList";
import ShoppingCart from "./pages/ShoppingCart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Footer from "./layout/Footer";
import Product from "./pages/ProductDetails";
import Tab from "./pages/Tab";
import Category from "./pages/Category";
import SubCategory from "./pages/SubCategory";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/menu-tab/:tab" element={<Tab />} />
        <Route path="/menu-tab-category/:category" element={<Category />} />
        <Route path="/menu-tab-subcategory/:subcategory" element={<SubCategory />} />
        <Route path="/produits/:id" element={<Product />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
