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
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import AccountUser from "./pages/AccountUser";
import AdminDashboard from "./pages/AdminDashboard";
import GenerateInvoice from "./components/admin/clientOrders/GenerateInvoice";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/generate-invoice/:orderId" element={<GenerateInvoice />} />
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<AccountUser />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="account/register" element={<Register />} />
        <Route path="account/forgot-password" element={<ForgotPassword />} />
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
