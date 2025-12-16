import { Route, Routes } from "react-router";

import EditProfile from "./page/profile/EditProfile";
import ScreenCS from "./page/chat/ScreenCS";
import CustomitationWithAi from "./page/product/CustomitationWithAi";
import SplashScreen from "./components/common/SplashScreen";
import GetStarted from "./page/auth/GetStarted";

// product
import ProductDetail from "./page/product/ProductDetail";

// cart
import Cart from "./page/product/Cart";

// auth
import ForgotPassword from "./page/auth/password/ForgotPassword";
import ResetPassword from "./page/auth/password/ResetPassword";
import ResetPWSuccess from "./page/auth/password/ResetPWSuccess";
import FBScreen from "./page/auth/user/FBScreen";
// user
import Login from "./page/auth/user/Login";
import Register from "./page/auth/user/Register";
import VerifyLogin from "./page/auth/user/VerifyLogin";
// admin
import LoginAdmin from "./page/auth/admin/LoginAdmin";
import RegisterAdmin from "./page/auth/admin/RegisterAdmin";
// layout
import UserLayout from "./layout/UserLayout";

// home
import Home from "./page/home/Home";
import Product from "./page/home/Product";
import Payment from "./page/home/Payment";
import Profile from "./page/home/Profile";

// payment
import PaymentDetail from "./page/payment/Payment_Detail";
import CheckManual from "./page/product/CheckManual";

function App() {
  return (
    <Routes>
      {/* home */}
      <Route element={<UserLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />
        {/* product */}
        <Route element={<ProductDetail />} path="/product/:id" />
      </Route>
      {/* profile */}
      <Route element={<EditProfile />} path="/edit-profile" />
      {/* paymet */}
      <Route element={<PaymentDetail />} path="/payment/bank" />
      {/* chat */}
      <Route element={<ScreenCS />} path="/chat-bot" />
      {/* cart */}
      <Route element={<Cart />} path="/cart" />
      {/* customitation AI */}
      <Route
        element={<CustomitationWithAi />}
        path="/product/:id/customitation"
      />

      <Route
        element={<CheckManual />}
        path="/product/:id/checkoutManual"
      />

      {/* spalsh */}
      <Route path="/" element={<SplashScreen />} />
      {/* auth */}
      <Route path="/get-started" element={<GetStarted />} />
      {/* users */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/2fa" element={<VerifyLogin />} />
      <Route path="/fb-screen" element={<FBScreen />} />

      {/* admin */}
      <Route path="/login-admin" element={<LoginAdmin />} />
      <Route path="/register-admin" element={<RegisterAdmin />} />

      {/* password */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-password-success" element={<ResetPWSuccess />} />
    </Routes>
  );
}

export default App;
