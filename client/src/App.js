import Header from "./layout/Header";
import Home from "./pages/home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/authentication/Login";
import ShoppingCart from "./pages/shoppingCart";
import About from "./pages/about";
import Contact from "./pages/contact";
import NotFound from "./pages/notFound";
import Footer from "./layout/Footer";
import Deliveries from "./pages/deliveries";
import TermsOfSales from "./pages/termsOfSales";
import LegalNotice from "./pages/legalNotice";
import Register from "./pages/authentication/Register";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import AccountClient from "./pages/dashboardClient/AccountClient";
import AdminDashboard from "./pages/dashboardAdmin";
import VerifyEmailRegister from "./pages/authentication/VerifyEmailRegister";
import ResetPassword from "./pages/authentication/ResetPassword";
import useAuthWrappers from "./useAuthWrappers";
import { Provider } from "react-redux";
import { configureStoreWithRole } from "./app/configureStoreWithRole";
import Collection from "./pages/collection/Master";
import Collections from "./pages/collection";
import MasterProduct from "./pages/MasterProduct";

function App() {
  const {
    RequireAuthAdmin,
    RequireAuthUser,
    role: getRole,
  } = useAuthWrappers();
  const role = getRole();
  const store = configureStoreWithRole(role);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route
              path="/admin/dashboard"
              element={
                <RequireAuthAdmin>
                  <AdminDashboard />
                </RequireAuthAdmin>
              }
            />
            <Route path="/" element={<Home />} />
            <Route
              path="/account"
              element={
                <RequireAuthUser>
                  <AccountClient />
                </RequireAuthUser>
              }
            />
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
            <Route path="/menu-tab-collections" element={<Collections />} />
            <Route path="/menu-tab-collections/:collectionId" element={<Collection />} />
            <Route path="/master-product/:productId" element={<MasterProduct />} />
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
