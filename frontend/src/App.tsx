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
import CheckManual from "./page/product/CheckManual";
import PaymentBank from "./page/payment/PaymentBank";
import PaymentDetail from "./page/payment/PaymentDetail";
import ScreenPusatBantuan from "./page/chat/ScreenPusatBantuan";
import SettingDetails from "./page/setting/SettingDetails";
import SettingAccount from "./page/setting/SettingAccount";
import SettingAddress from "./page/setting/SettingAddress";
import SettingLanguage from "./page/setting/SettingLanguage";
import AddAddress from "./page/setting/AddAddress";
import OrderPage from "./page/order/OrderPage";
import Checkout from "./page/product/Checkout";
import OrderTrackingPage from "./page/order/tabs/OrderTrackingPage";
import CheckoutDetail from "./page/product/CheckoutDetail";
import BadgeUser from "./page/badge/BadgeUser";
import AdminLayout from "./layout/AdminLayout";
import DashboardAdmin from "./page/admin/DashboardAdmin";
import ProductAdmin from "./page/admin/ProductAdmin";
import FinanceAdmin from "./page/admin/FinanceAdmin";
import AnalyticsAdmin from "./page/admin/AnalyticsAdmin";
import { Toaster } from "sonner";
import BadgeDetail from "./page/badge/BadgeDetail";
import HistoryProgresBadge from "./page/badge/HistoryProgresBadge";
import ProgresBadge from "./page/badge/ProgresBadge";

function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors closeButton />
      <Routes>
        {/* user */}
        <Route element={<UserLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          {/* product */}
          <Route element={<ProductDetail />} path="/product/:id" />
        </Route>
        {/* admin */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<DashboardAdmin />} />
          <Route path="/admin/product" element={<ProductAdmin />} />
          <Route path="/admin/finance" element={<FinanceAdmin />} />
          <Route path="/admin/analytics" element={<AnalyticsAdmin />} />
        </Route>
        {/* profile */}
        <Route element={<EditProfile />} path="/edit-profile" />
        {/* badge */}
        <Route element={<BadgeUser />} path="/badge" />
        <Route element={<BadgeDetail />} path="/badge/detail" />
        <Route
          element={<HistoryProgresBadge />}
          path="/badge/progess/history"
        />
        <Route element={<ProgresBadge />} path="/badge/progress" />
        {/* paymet */}
        <Route element={<PaymentBank />} path="/payment/bank" />
        <Route element={<PaymentDetail />} path="/payment/bank/detail" />

        {/* chat */}
        <Route element={<ScreenCS />} path="/chat-bot" />
        <Route element={<ScreenPusatBantuan />} path="/help" />

        {/* cart */}
        <Route element={<Cart />} path="/cart" />
        {/* cart */}
        <Route element={<Checkout />} path="/checkout" />
        <Route element={<CheckoutDetail />} path="/checkout/:id/detail" />
        {/* customitation AI */}
        <Route
          element={<CustomitationWithAi />}
          path="/product/customitation"
        />

        <Route element={<CheckManual />} path="/product/:id/checkoutManual" />
        <Route element={<OrderPage />} path="/order" />
        <Route element={<OrderTrackingPage />} path="/order/tracking" />

        {/* settings */}
        <Route path="/profile/settings" element={<SettingDetails />} />
        <Route path="/profile/settings/account" element={<SettingAccount />} />
        <Route path="/profile/settings/account/add" element={<AddAddress />} />
        <Route path="/profile/settings/address" element={<SettingAddress />} />
        <Route
          path="/profile/settings/language"
          element={<SettingLanguage />}
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
    </>
  );
}

export default App;
