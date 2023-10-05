import Header from "./layout/Header";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ShoppingCart from "./pages/ShoppingCart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Footer from "./layout/Footer";
import Product from "./pages/ProductDetails";
import Tab from "./pages/Tab";
import Category from "./pages/Category";
import SubCategory from "./pages/SubCategory";
import Deliveries from "./pages/Deliveries";
import TermsOfSales from "./pages/TermsOfSales";
import LegalNotice from "./pages/LegalNotice";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/menu-tab/:tab" element={<Tab />} />
        <Route path="/menu-tab-category/:category" element={<Category />} />
        <Route path="/menu-tab-subcategory/:subcategory" element={<SubCategory />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/deliveries&returns" element={<Deliveries />} />
        <Route path="/terms-of-sales" element={<TermsOfSales />} />
        <Route path="/legal-notice" element={<LegalNotice />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
