import React, { useState } from "react";
import { Table, Button, Space, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { FaStar } from "react-icons/fa6";
import randomImg from "../../assets/salon-go-logo.png";
import logo from "../../assets/navLogo.png";
import { useProfessionalsQuery } from "../../redux/apiSlices/userSlice";

const Vendors = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);

  const { data: professionals, isLoading } = useProfessionalsQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={logo} alt="" />
      </div>
    );
  }

  const data = professionals?.data?.data;

  console.log(data);

  const dummyData = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      address: {
        street: "123 Main St",
        city: "Springfield",
        state: "IL",
        zip: "62704",
        country: "USA",
      },
      vendor: {
        totalReviews: 15,
        rating: 4.5,
      },
      status: "Active",
      createdAt: "2022-11-05T14:48:00.000Z",
      profileImg: randomImg,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      address: {
        street: "456 Oak St",
        city: "Lincoln",
        state: "NE",
        zip: "68508",
        country: "USA",
      },
      vendor: {
        totalReviews: 20,
        rating: 3.8,
      },
      status: "Inactive",
      createdAt: "2023-01-12T09:23:00.000Z",
      profileImg: randomImg,
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      address: {
        street: "789 Maple Ave",
        city: "Madison",
        state: "WI",
        zip: "53703",
        country: "USA",
      },
      vendor: {
        totalReviews: 12,
        rating: 4.2,
      },
      status: "Pending",
      createdAt: "2023-03-25T16:10:00.000Z",
      profileImg: randomImg,
    },
    {
      id: 4,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      address: {
        street: "101 Pine St",
        city: "Columbus",
        state: "OH",
        zip: "43215",
        country: "USA",
      },
      vendor: {
        totalReviews: 30,
        rating: 5.0,
      },
      status: "Active",
      createdAt: "2024-05-07T08:45:00.000Z",
      profileImg: randomImg,
    },
    {
      id: 5,
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      address: {
        street: "202 Cedar Dr",
        city: "Denver",
        state: "CO",
        zip: "80202",
        country: "USA",
      },
      vendor: {
        totalReviews: 8,
        rating: 3.5,
      },
      status: "Inactive",
      createdAt: "2023-12-01T11:30:00.000Z",
      profileImg: randomImg,
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
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
      title: "Vendor Since",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("Do MMM, YYYY"),
    },
    {
      title: "Total Reviews",
      dataIndex: ["vendor", "totalReviews"],
      key: "totalReviews",
      align: "center",
      sorter: (a, b) => a.vendor.totalReviews - b.vendor.totalReviews,
    },
    {
      title: "Rating",
      dataIndex: ["vendor", "rating"],
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
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "Active":
            color = "green";
            break;
          case "Inactive":
            color = "red";
            break;
          case "Pending":
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
          <Link to={`/user/profile/${record.id}`}>
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
      rowKey={(record) => record.id}
      rowSelection={rowSelection}
    />
  );
};

export default Vendors;
