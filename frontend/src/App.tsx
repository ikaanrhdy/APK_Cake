import { Route, Routes } from "react-router";

// auth
import Login from "./page/auth/Login";
import Register from "./page/auth/Register";
import GetStarted from "./page/auth/GetStarted";
import SplashScreen from "./components/common/SplashScreen";
import VerifyLogin from "./page/auth/VerifyLogin";
import ForgotPassword from "./page/auth/ForgotPassword";
import FBScreen from "./page/auth/FBScreen";
import ResetPassword from "./page/auth/ResetPassword";
import ResetPWSuccess from "./page/auth/ResetPWSuccess";

// layout
import UserLayout from "./layout/UserLayout";

// home
import Profile from "./page/home/Profile";
import Payment from "./page/home/Payment";
import Product from "./page/home/Product";
import Home from "./page/home/Home";

// payment
import PaymentDetail from "./page/payment/Payment_Detail";

import EditProfile from "./page/profile/EditProfile";
import ProductDetail from "./page/product/ProductDetail";

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
        <Route element={<ProductDetail />} path="/product/detail/:id" />
      </Route>
      {/* profile */}
      <Route element={<EditProfile />} path="/edit-profile" />
      {/* paymet */}
      <Route element={<PaymentDetail />} path="/payment/detail" />

      {/* spalsh */}
      <Route path="/" element={<SplashScreen />} />
      {/* auth */}
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/login" element={<Login />} />
      <Route path="/2fa" element={<VerifyLogin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-password-success" element={<ResetPWSuccess />} />
      <Route path="/fb-screen" element={<FBScreen />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
