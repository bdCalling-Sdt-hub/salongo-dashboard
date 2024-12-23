import { Button, Space, Table, message, Modal } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import logo from "../../assets/salon-go-logo.png";
import moment from "moment";
import { useAllBannerQuery } from "../../redux/apiSlices/banenrSlice";

const Banners = () => {
  const [pageSize, setPageSize] = useState(5);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: banners, isLoading } = useAllBannerQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={logo} alt="" />
      </div>
    );
  }

  const bannersData = banners?.data;
  console.log(bannersData);

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this banner?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          setIsDeleting(true);
          // Simulate a delete operation
          toast.success("Banner deleted successfully!");
          // You might want to remove the banner from the local state here as well
        } catch (error) {
          toast.error("Failed to delete banner.");
        } finally {
          setIsDeleting(false);
        }
      },
    });
  };

  const bannerData = bannersData.map((banner) => ({
    ...banner,
    key: banner._id,
  }));

  const columns = [
    {
      title: "Image",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (img) => (
        <img
          src={`${import.meta.env.VITE_BASE_URL}${img}`}
          alt="Banner Image"
          className="rounded-2xl w-32 h-20"
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (link) => (
        <a
          className="font-bold text-blue-600 underline"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Link
        </a>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => <span>{moment(date).format("DD-MM-YYYY")}</span>,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <span style={{ color: isActive ? "green" : "red" }}>
          {isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Link to={`/update-banner/${record._id}`}>
            <Button className="border-none">
              <FaEdit className="w-6 h-6" />
            </Button>
          </Link>
          <Button
            className="border-none"
            onClick={() => handleDelete(record._id)}
            loading={isDeleting}
          >
            <MdDelete className="w-6 h-6" />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex justify-between mb-5 items-center">
        <h1 className=" text-2xl font-semibold">Manage Banners</h1>
        <Link to={`/add-banner`}>
          <button className="bg-[#5c2579cc] h-10 text-white px-4 rounded-md">
            + Add Banner
          </button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={bannerData}
        pagination={{
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15"],
          onShowSizeChange: (current, size) => setPageSize(size),
          position: ["bottomCenter"],
        }}
      />
    </div>
  );
};

export default Banners;
