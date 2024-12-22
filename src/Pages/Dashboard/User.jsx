import React from "react";
import { ConfigProvider, Input, Tabs } from "antd";
import { Link, useParams } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import RunningOrderTable from "../../components/ui/Analytics/RunningOrderTable";
import { useUserByIdQuery } from "../../redux/apiSlices/userSlice";

const User = () => {
  const { role, id } = useParams();
  const roleParams = role === "USER" ? "CUSTOMER" : "PROFESSIONAL";

  const { data: userDetails, isLoading } = useUserByIdQuery({
    role: roleParams,
    id,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const userData = userDetails?.data;

  console.log(userData);

  // Sample user data
  // const user = {
  //   id: id,
  //   admin: {
  //     name: "John Doe",
  //     email: "john.doe@example.com",
  //     role: "Administrator",
  //     address: {
  //       city: "Springfield",
  //       country: "USA",
  //     },
  //     profileImg: "https://example.com/randomProfile.jpg",
  //   },
  //   vendor: {
  //     name: "Jane's Salon",
  //     address: {
  //       city: "Lincoln",
  //       country: "USA",
  //     },
  //   },
  //   customer: {
  //     name: "Alice Johnson",
  //     email: "alice.johnson@example.com",
  //     role: "Customer",
  //     address: {
  //       city: "Madison",
  //       country: "USA",
  //     },
  //   },
  // };

  const imgUrl =
    userData?.profile ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmtj40PvvTQ1g64pgKZ2oKEk-tqT9rA4CXSA&s";

  return (
    <div>
      <div className="">
        <div className="flex gap-3 items-center ">
          <img
            className="rounded-full w-16 h-16"
            src={
              imgUrl?.startsWith("http")
                ? imgUrl
                : `${import.meta.env.VITE_BASE_URL}${imgUrl}`
            }
            alt="img"
          />
          <div>
            <h1 className="text-2xl font-bold">
              {userData?.auth?.name || "unknown"}
            </h1>
            <p className="text-sm text-gray-400">User ID: {userData._id} </p>
          </div>
        </div>
        <div className="grid my-5 grid-cols-2 gap-5 w-[70%]">
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Name
            </h1>
            <p className="text-lg my-2">{userData?.auth?.name}</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Email
            </h1>
            <p className="text-lg my-2">{userData?.auth?.email}</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Role
            </h1>
            <p className="text-lg my-2">{userData?.auth?.role}</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Address
            </h1>
            <p className="text-lg my-2">{userData?.auth?.address || "N/A"}</p>
          </div>
        </div>
      </div>
      <div>
        <RunningOrderTable filterProps={userData?.auth?.name} />
      </div>
    </div>
  );
};

export default User;
