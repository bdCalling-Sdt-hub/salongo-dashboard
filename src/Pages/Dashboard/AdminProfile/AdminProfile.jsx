import { ConfigProvider, Tabs } from "antd";
import React from "react";
import UserProfile from "./UserProfile";
import Title from "../../../components/common/Title";

const AdminProfile = () => {
  const items = [
    {
      key: "1",
      label: "Edit Profile",
      children: <UserProfile />,
    },
    {
      key: "2",
      label: "Change Password ",
      children: <ChangePassword />,
    },
  ];

  return (
    <div>
      <Title className="mb-4">Profile</Title>
      <div className=" bg-white p-5 px-10 rounded-xl ">
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                itemActiveColor: "#007BA5",
                itemSelectedColor: "#007BA5",
                inkBarColor: "#007BA5",
                itemHoverColor: "#007BA5",
              },
            },
          }}
        >
          <Tabs defaultActiveKey="1" items={items} />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default AdminProfile;
