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
import useAuthWrappers from "./config/useAuthWrappers";
import { Provider } from "react-redux";
import { configureStoreWithRole } from "./app/configureStoreWithRole";
import MasterCollection from "./pages/collection/Master";
import MasterCategory from "./pages/category/Master";
import Collections from "./pages/collection";
import MasterProduct from "./pages/MasterProduct";
import AllProductsPage from "./pages/allProducts";
import Categories from "./pages/category";
import InitConfigPage from "./config/InitConfigPage";
import Tradition from "./pages/tradition";
import PaymentCheckout from "./pages/payment";
import StripeWrapper from "./components/payment/StripeWrapper";
import Success from "./pages/payment/Success";

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
            <Route
              path="/"
              element={
                <InitConfigPage>
                  <Home />
                </InitConfigPage>
              }
            />
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
            <Route
              path="/cart"
              element={
                <InitConfigPage>
                  {" "}
                  <ShoppingCart />
                </InitConfigPage>
              }
            />
            <Route
              path="/cart/payment"
              element={
                <InitConfigPage>
                  <StripeWrapper>
                    <PaymentCheckout />
                  </StripeWrapper>
                </InitConfigPage>
              }
            />
            <Route
              path="/cart/payment/success"
              element={
                <InitConfigPage>
                  <StripeWrapper>
                    <Success />
                  </StripeWrapper>
                </InitConfigPage>
              }
            />
            <Route
              path="/menu-tab-collections"
              element={
                <InitConfigPage>
                  <Collections />
                </InitConfigPage>
              }
            />
            <Route
              path="/menu-tab-categories"
              element={
                <InitConfigPage>
                  <Categories />
                </InitConfigPage>
              }
            />
            <Route
              path="/menu-tab-collections/:collectionId"
              element={
                <InitConfigPage>
                  <MasterCollection />
                </InitConfigPage>
              }
            />
            <Route
              path="/menu-tab-categories/:categoryId"
              element={
                <InitConfigPage>
                  <MasterCategory />
                </InitConfigPage>
              }
            />
            <Route
              path="/master-product/:productId"
              element={
                <InitConfigPage>
                  <MasterProduct />
                </InitConfigPage>
              }
            />
            <Route
              path="/about"
              element={
                <InitConfigPage>
                  {" "}
                  <About />
                </InitConfigPage>
              }
            />
            <Route
              path="/tradition"
              element={
                <InitConfigPage>
                  {" "}
                  <Tradition />
                </InitConfigPage>
              }
            />
            <Route
              path="/contact"
              element={
                <InitConfigPage>
                  <Contact />
                </InitConfigPage>
              }
            />
            <Route
              path="/products"
              element={
                <InitConfigPage>
                  <AllProductsPage />
                </InitConfigPage>
              }
            />
            <Route
              path="/deliveries&returns"
              element={
                <InitConfigPage>
                  <Deliveries />
                </InitConfigPage>
              }
            />
            <Route
              path="/terms-of-sales"
              element={
                <InitConfigPage>
                  <TermsOfSales />
                </InitConfigPage>
              }
            />
            <Route
              path="/legal-notice"
              element={
                <InitConfigPage>
                  <LegalNotice />
                </InitConfigPage>
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
