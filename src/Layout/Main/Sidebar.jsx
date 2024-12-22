import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { MdFeaturedPlayList } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { TbUserScreen } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

import { PiUserPlus } from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";
import Cookies from "js-cookie";
import logo from "../../assets/salon-go-logo.png";
import { DiGoogleAnalytics } from "react-icons/di";
import { BiSolidCategoryAlt } from "react-icons/bi";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const [selectedKey, setSelectedKey] = useState("");
  const [openKeys, setOpenKeys] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("refreshToken");
    Cookies.remove("refreshToken");
    navigate("/auth/login");
  };

  const menuItems = [
    {
      key: "/",
      icon: <LuLayoutDashboard size={24} />,
      label: (
        <Link to="/" className="">
          Dashboard
        </Link>
      ),
    },
    {
      key: "/transactions",
      icon: <DiGoogleAnalytics size={24} />,
      label: <Link to="/transactions">Transactions</Link>,
    },
    {
      key: "/banners",
      icon: <MdFeaturedPlayList size={24} />,
      label: <Link to="/banners">Banners</Link>,
    },
    {
      key: "/Salon",
      icon: <BiSolidCategoryAlt size={24} />,
      label: "Salon",
      children: [
        {
          key: "category",
          label: (
            <Link to="/category" className="text-[#6B6B6B] hover:text-white">
              Category
            </Link>
          ),
        },
      ],
    },
    {
      key: "/users",
      icon: <TbUserScreen size={24} />,
      label: <Link to="/users">Users</Link>,
    },
    {
      key: "/subMenuVendors",
      icon: <PiUserPlus size={24} />,
      label: "Barbers",
      children: [
        {
          key: "/professionals",
          label: (
            <Link
              to="/professionals"
              className="text-[#6B6B6B] hover:text-white"
            >
              Professionals
            </Link>
          ),
        },
        {
          key: "/freelancers",
          label: (
            <Link to="/freelancers" className="text-[#6B6B6B] hover:text-white">
              Freelancers
            </Link>
          ),
        },
      ],
    },
    // {
    //   key: "/promotion",
    //   icon: <SlCalender size={24} />,
    //   label: <Link to="/promotion">Promotion</Link>,
    // },

    {
      key: "subMenuSetting",
      icon: <IoSettingsOutline size={24} />,
      label: "Settings",
      children: [
        {
          key: "/personal-information",
          label: (
            <Link
              to="/personal-information"
              className="text-[#6B6B6B] hover:text-white"
            >
              Personal Information
            </Link>
          ),
        },
        {
          key: "/change-password",
          label: (
            <Link to="/change-password" className="text-white hover:text-white">
              Change Password
            </Link>
          ),
        },
        {
          key: "/terms-and-condition",
          label: (
            <Link
              to="/terms-and-condition"
              className="text-white hover:text-white"
            >
              Terms And Condition
            </Link>
          ),
        },
        {
          key: "/privacy-policy",
          label: (
            <Link to="/privacy-policy" className="text-white hover:text-white">
              Privacy Policy
            </Link>
          ),
        },
      ],
    },
    {
      key: "/logout",
      icon: <IoIosLogOut size={24} />,
      label: <p onClick={handleLogout}>Logout</p>,
    },
  ];

  useEffect(() => {
    const selectedItem = menuItems.find(
      (item) =>
        item.key === path || item.children?.some((sub) => sub.key === path)
    );

    if (selectedItem) {
      setSelectedKey(path);

      if (selectedItem.children) {
        setOpenKeys([selectedItem.key]);
      } else {
        const parentItem = menuItems.find((item) =>
          item.children?.some((sub) => sub.key === path)
        );
        if (parentItem) {
          setOpenKeys([parentItem.key]);
        }
      }
    }
  }, [path]);

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <div className="mt-5">
      <div className="px-10">
        <Link
          to={"/"}
          className="mb-10  flex items-center flex-col gap-2 justify-center py-4"
        >
          <img src={logo} alt="" />
          <h1 className="text-xl text-[#5b2579] font-semibold">SALONGO</h1>
        </Link>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        style={{ borderRightColor: "transparent", background: "transparent" }}
        items={menuItems}
      />
    </div>
  );
};

export default Sidebar;
