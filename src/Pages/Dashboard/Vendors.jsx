import React, { useState } from "react";
import { Table, Button, Space, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { FaStar } from "react-icons/fa6";
import randomImg from "../../assets/salon-go-logo.png";
import logo from "../../assets/salon-go-logo.png";
import { useProfessionalsQuery } from "../../redux/apiSlices/userSlice";

const Vendors = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);

  const { data: professionals, isLoading } = useProfessionalsQuery(false);

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

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (text, record) => {
        return <p className="">{record._id.slice(0, 10)}...</p>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        const name = record?.auth?.name;
        const imgUrl = record.profile || randomImg;
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
            <Button className="bg-[#FFF4E3] text-[#F3B806] border-none">
              Details
            </Button>
          </Link>

          <Button
            className="border border-red-600 text-red-700 "
            onClick={() => handleRestrict(record.id)}
          >
            Restrict
          </Button>
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
    <>
      <h1 className="text-3xl font-semibold mb-5">Professionals</h1>
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
    </>
  );
};

export default Vendors;
