import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home";
import Users from "../Pages/Dashboard/Users";
import Admin from "../Pages/Dashboard/Admin";
import PrivacyPolicy from "../Pages/Dashboard/PrivacyPolicy";
import ChangePassword from "../Pages/Auth/ChangePassword";
import Login from "../Pages/Auth/Login";
import Subscription from "../Pages/Dashboard/Subscription";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../NotFound";
import Notifications from "../Pages/Dashboard/Notifications";
import User from "../Pages/Dashboard/User";
import Press from "../Pages/Dashboard/Press";
import Transactions from "../Pages/Dashboard/Transactions";
import Promotion from "../Pages/Dashboard/Promotion";
import UserProfile from "../Pages/Dashboard/AdminProfile/UserProfile";
import TermsAndCondition from "../Pages/Dashboard/TermsAndCondition";
import Vendors from "../Pages/Dashboard/Vendors";
import PrivateRoute from "./PrivateRoute";
import Banners from "../Pages/Dashboard/Banners";
import EditBanners from "../components/ui/Banners/EditBanners";
import AddBanners from "../components/ui/Banners/AddBanners";
import Freelancers from "../Pages/Dashboard/Freelancers";
import Category from "../Pages/Category/Category";
import SubCategory from "../Pages/Category/subCategory";
import SubSubCategory from "../Pages/Category/subSubCategory";
import ManageCategories from "../Pages/Category/ManageCategories";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <ProtectedRoute><Main /></ProtectedRoute> ,
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
      {
        path: "/add-banner",
        element: <AddBanners />,
      },
      {
        path: "/banners",
        element: <Banners />,
      },
      {
        path: "/update-banner/:id",
        element: <EditBanners />,
      },
      {
        path: "/dashboard/:role/:id",
        element: <User />,
      },
      {
        path: "/manage-categories",
        element: <ManageCategories />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/subCategory",
        element: <SubCategory />,
      },
      {
        path: "/subSubCategory",
        element: <SubSubCategory />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/professionals",
        element: <Vendors />,
      },
      {
        path: "/freelancers",
        element: <Freelancers />,
      },
      {
        path: "/promotion",
        element: <Promotion />,
      },
      {
        path: "/personal-information",
        element: <UserProfile />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },

      {
        path: "/admin",
        element: <Admin />,
      },

      {
        path: "/subscription",
        element: <Subscription />,
      },

      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-condition",
        element: <TermsAndCondition />,
      },
      // {
      //   path: "/edit-terms-and-conditions",
      //   element: <TermsAndCondition />,
      // },
      {
        path: "/press",
        element: <Press />,
      },

      {
        path: "/change-password",
        element: <ChangePassword />,
      },

      // {
      //   path: "/profile",
      //   element: <AdminProfile />,
      // },
      {
        path: "/notification",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
