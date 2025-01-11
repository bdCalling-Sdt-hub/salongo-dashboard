import React, { useState } from "react";
import { Table, Button, Tooltip, Modal, Form, Input, Checkbox } from "antd";
import {
  useAllCategoriesQuery,
  useAllSubCategoriesQuery,
  useAllSubSubCategoriesQuery,
} from "../../redux/apiSlices/categorySlice";

const ManageCategories = () => {
  const { data: categories, isLoading: isLoadingCategories } =
    useAllCategoriesQuery();
  const { data: subCategories, isLoading: isLoadingSubCategories } =
    useAllSubCategoriesQuery();
  const { data: subSubCategories, isLoading: isLoadingSubSubCategories } =
    useAllSubSubCategoriesQuery();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form] = Form.useForm();

  if (
    isLoadingCategories ||
    isLoadingSubCategories ||
    isLoadingSubSubCategories
  ) {
    return (
      <div className="flex justify-center items-center my-20 text-lg text-[#f6e7ff]">
        Loading...
      </div>
    );
  }

  const categoryData = categories?.data || [];
  const subCategoryData = subCategories?.data || [];
  const subSubCategoryData = subSubCategories?.data || [];

  // Action handlers
  const handleEdit = (record) => {
    setSelectedItem(record);
    form.setFieldsValue({ name: record.name });
    setIsEditModalOpen(true);
  };

  const handleDelete = (record) => {
    setSelectedItem(record);
    setIsDeleteModalOpen(true);
  };

  const handleAssign = (record) => {
    setSelectedItem(record);
    setIsAssignModalOpen(true);
  };

  // Columns
  const columns = (type) => [
    {
      title: "Index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: `${type} ID`,
      dataIndex: "_id",
      key: "_id",
      render: (record) => (
        <Tooltip title={record}>
          <p>{record.slice(0, 10)}...</p>
        </Tooltip>
      ),
    },
    {
      title: `${type} Name`,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="space-x-2">
          <Button
            type="primary"
            size="small"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button danger size="small" onClick={() => handleDelete(record)}>
            Delete
          </Button>
          <Button
            type="default"
            size="small"
            onClick={() => handleAssign(record)}
          >
            Assign
          </Button>
        </div>
      ),
    },
  ];

  // Modal Handlers
  const handleCancelEdit = () => setIsEditModalOpen(false);
  const handleCancelDelete = () => setIsDeleteModalOpen(false);
  const handleCancelAssign = () => setIsAssignModalOpen(false);

  const handleFinishEdit = (values) => {
    console.log("Edited:", { ...selectedItem, ...values });
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    console.log("Deleted:", selectedItem);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmAssign = (values) => {
    console.log("Assigned:", values, selectedItem);
    setIsAssignModalOpen(false);
  };

  return (
    <div className="space-y-10">
      {/* Categories */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <Table
          dataSource={categoryData.map((item, index) => ({
            ...item,
            key: item._id || index,
          }))}
          columns={columns("Category")}
          pagination={{ pageSize: 5 }}
        />
      </div>

      {/* Subcategories */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Subcategories</h2>
        <Table
          dataSource={subCategoryData.map((item, index) => ({
            ...item,
            key: item._id || index,
          }))}
          columns={columns("Subcategory")}
          pagination={{ pageSize: 5 }}
        />
      </div>

      {/* Sub-Subcategories */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Sub-Subcategories</h2>
        <Table
          dataSource={subSubCategoryData.map((item, index) => ({
            ...item,
            key: item._id || index,
          }))}
          columns={columns("SubSubcategory")}
          pagination={{ pageSize: 5 }}
        />
      </div>

      {/* Edit Modal */}
      <Modal
        title="Edit"
        open={isEditModalOpen}
        onCancel={handleCancelEdit}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinishEdit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        title="Confirm Delete"
        open={isDeleteModalOpen}
        onCancel={handleCancelDelete}
        onOk={handleConfirmDelete}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        Are you sure you want to delete {selectedItem?.name}?
      </Modal>

      {/* Assign Modal */}
      <Modal
        title="Assign"
        open={isAssignModalOpen}
        onCancel={handleCancelAssign}
        footer={null}
      >
        <p className="text-2xl text-center my-10">{selectedItem?.name}</p>
        <Form onFinish={handleConfirmAssign}>
          <div className="flex gap-4">
            <Form.Item className="w-full">
              <Checkbox.Group
                options={categoryData.map((cat) => ({
                  label: cat.name,
                  value: cat._id,
                }))}
              />
            </Form.Item>
            <Form.Item className="w-full">
              <Checkbox.Group
                options={subSubCategoryData.map((subSub) => ({
                  label: subSub.name,
                  value: subSub._id,
                }))}
              />
            </Form.Item>
          </div>
          <Button type="primary" htmlType="submit" className="mt-4">
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageCategories;
