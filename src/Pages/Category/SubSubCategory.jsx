import React, { useState } from "react";
import { Input, Modal, Button, Form, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  useAddCategoryMutation,
  useAddSubSubCategoryMutation,
  useAllSubSubCategoriesQuery,
  useUpdateSubSubCategoryMutation,
} from "../../redux/apiSlices/categorySlice";
import logo from "../../assets/logo.png";
import toast from "react-hot-toast";

const { Search } = Input;

const SubSubCategory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { data: categoryData, isLoading } = useAllSubSubCategoriesQuery();
  const [addSubSubCategory] = useAddSubSubCategoryMutation();
  const [updateSubCategory] = useUpdateSubSubCategoryMutation();

  const handleAddCategory = async (values) => {
    try {
      const response = await addSubSubCategory({ name: values.name });

      if (response.data.success) {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error("Failed to add category.");
    }

    setIsModalOpen(false);
    form.resetFields();
  };

  const handleUpdate = (record) => {
    try {
    } catch {}
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={logo} alt="Loading logo" />
      </div>
    );
  }

  const categories = categoryData?.data || [];
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Index",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: () => (
        <>
          <Button onClick={handleUpdate} type="link" className="bg-secondary">
            Edit
          </Button>
          <Button type="link" className="text-red-500 border-red-500 me-3">
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="px-40">
      <h1 className="text-4xl font-bold mb-5">Sub Sub Categories</h1>
      <Search
        placeholder="Search Sub Sub Categories or Sub Categories"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <div className="flex justify-between items-center mb-5">
        <p className="my-3">
          Total Sub-Sub-Category:{" "}
          <span className="font-semibold">
            {filteredCategories.length} Items
          </span>{" "}
          Found
        </p>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Category
        </Button>
      </div>
      <Modal
        title="Add New Category"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddCategory}>
          <Form.Item
            name="name"
            label="Category Name"
            rules={[
              { required: true, message: "Please enter the category name" },
            ]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={filteredCategories.map((category, index) => ({
          ...category,
          index,
        }))}
        rowKey={(record) => record._id}
        className="bg-white shadow-md rounded-lg"
      />
    </div>
  );
};

export default SubSubCategory;
