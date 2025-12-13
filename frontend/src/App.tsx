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
import Home from "./page/home/Home";
import UserLayout from "./layout/UserLayout";
import Profile from "./page/home/Profile";
import Payment from "./page/home/Payment";
import Product from "./page/home/Product";

function App() {
  return (
    <Routes>
      {/* home */}
      <Route element={<UserLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
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
