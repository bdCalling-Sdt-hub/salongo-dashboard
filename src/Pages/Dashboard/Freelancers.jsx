import React, { useState } from "react";
import { Table, Button, Space, Avatar, Tooltip } from "antd";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { FaStar } from "react-icons/fa6";
import randomImg from "../../assets/salon-go-logo.png";
import logo from "../../assets/salon-go-logo.png";
import {
  useProfessionalsQuery,
  useRestrictUserMutation,
} from "../../redux/apiSlices/userSlice";
import toast from "react-hot-toast";

const Freelancers = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);

  const {
    data: professionals,
    isLoading,
    refetch,
  } = useProfessionalsQuery(true);
  const [restrictUser] = useRestrictUserMutation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={logo} alt="" />
      </div>
    );
  }

  const data = professionals?.data?.data;

  // console.log(data);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleRestrictUser = async (id) => {
    try {
      const res = await restrictUser(id).unwrap();
      console.log(res);
      if (res.success) {
        refetch();
        toast.success("User status changed successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (text, record) => {
        return (
          <Tooltip title={record._id}>
            <p className="">{record._id.slice(0, 10)}...</p>
          </Tooltip>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        const name = record?.auth?.name;
        const imgUrl = record?.auth?.profile || randomImg;
        const fullImgUrl = imgUrl?.startsWith("http")
          ? imgUrl
          : `${import.meta.env.VITE_BASE_URL}${imgUrl}`;
        return (
          <Space>
            <Avatar src={fullImgUrl} alt={name} size="large" />
            <span>{name}</span>
          </Space>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => {
        return (
          <Space>
            <span>{record?.auth?.email}</span>
          </Space>
        );
      },
    },
    {
      title: "Address",
      key: "address",
      render: (record) => {
        const { city, street, state, zip, country } = record.address || {};
        return (
          <span>
            {city ? `${street}, ${city}, ${state}, ${zip}, ${country}` : "N/A"}
          </span>
        );
      },
    },
    {
      title: "Professional Since",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("Do MMM, YYYY"),
    },
    {
      title: "Total Reviews",
      dataIndex: "totalReviews",
      key: "totalReviews",
      align: "center",
      sorter: (a, b) => a.vendor.totalReviews - b.vendor.totalReviews,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      sorter: (a, b) => a.vendor.rating - b.vendor.rating,
      render: (rating) => (
        <span className="flex items-center jus gap-1">
          <FaStar />
          <p>{rating}</p>
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: ["auth", "status"],
      key: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "active":
            color = "green";
            break;
          case "inactive":
            color = "red";
            break;
          case "pending":
            color = "orange";
            break;
          default:
            color = "gray";
        }
        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (text, record) => (
        <Space>
          <Link
            to={`/dashboard/${record?.auth?.role.toLowerCase()}/${record._id}`}
          >
            <Button className="bg-[#ffd08a] text-black border-none">
              Details
            </Button>
          </Link>

          {record?.auth?.status === "active" ? (
            <Button
              className="border-red-600 text-red-700"
              onClick={() => handleRestrictUser(record.auth?._id)}
            >
              Restrict
            </Button>
          ) : (
            <Button
              className="border-green-600 text-green-700"
              onClick={() => handleRestrictUser(record.auth?._id)}
            >
              Activate
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 === 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 !== 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const handleRestrict = (id) => {
    console.log(`Restrict clicked for user with id: ${id}`);
  };

  return (
    <Table
      className="bg-white"
      pagination={{
        pageSize: pageSize,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "15"],
        onShowSizeChange: (current, size) => setPageSize(size),
        position: ["bottomCenter"],
      }}
      columns={columns}
      dataSource={data}
      rowKey={(record) => record._id}
      rowSelection={rowSelection}
    />
  );
};

export default Freelancers;
