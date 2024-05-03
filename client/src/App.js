import Header from "./layout/Header";
import Home from "./pages/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/authentication/Login";
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
import Register from "./pages/authentication/Register";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import AccountClient from "./pages/AccountClient";
import AdminDashboard from "./pages/AdminDashboard";
import VerifyEmailRegister from "./pages/authentication/VerifyEmailRegister";
import ResetPassword from "./pages/authentication/ResetPassword";
import { Provider } from "react-redux";
import useClientFromToken from "./pages/authentication/hooks/useClientFromToken";
import { configureStoreWithRole } from "./app/configureStoreWithRole";

function App() {
  const { role } = useClientFromToken();
  const store = configureStoreWithRole(role);
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<AccountClient />} />
            <Route path="/account/login" element={<Login />} />
            <Route path="/account/register" element={<Register />} />
            <Route
              path="/account/forgot-password"
              element={<ForgotPassword />}
            />
            <Route
              path="/account/verify-email-register/:token"
              element={<VerifyEmailRegister />}
            />
            <Route
              path="/account/reset-password/:token"
              element={<ResetPassword />}
            />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/menu-tab/:tab" element={<Tab />} />
            <Route path="/menu-tab-category/:category" element={<Category />} />
            <Route
              path="/menu-tab-subcategory/:subcategory"
              element={<SubCategory />}
            />
            <Route path="/orderProducts/:id" element={<Product />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/deliveries&returns" element={<Deliveries />} />
            <Route path="/terms-of-sales" element={<TermsOfSales />} />
            <Route path="/legal-notice" element={<LegalNotice />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
