import React, { useState } from "react";
import { Table, Button, Tooltip, Modal, Form, Input, Checkbox } from "antd";
import {
  useAllCategoriesQuery,
  useAllSubCategoriesQuery,
  useAllSubSubCategoriesQuery,
  useDeleteCategoryMutation,
  useDeleteSubCategoryMutation,
  useUpdateCategoryMutation,
  useUpdateSubCategoryMutation,
} from "../../redux/apiSlices/categorySlice";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import bgWhite from "../../assets/whiteBG.png";
import toast from "react-hot-toast";

const ManageCategories = () => {
  const { data: categories, isLoading: isLoadingCategories } =
    useAllCategoriesQuery();
  const { data: subCategories, isLoading: isLoadingSubCategories } =
    useAllSubCategoriesQuery();
  const { data: subSubCategories, isLoading: isLoadingSubSubCategories } =
    useAllSubSubCategoriesQuery();

  const [updateCategory] = useUpdateCategoryMutation();
  const [updateSubCategory] = useUpdateSubCategoryMutation();

  const [deleteCategory] = useDeleteCategoryMutation();
  const [deleteSubCategory] = useDeleteSubCategoryMutation();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [assignType, setAssignType] = useState(null);
  const [imgURL, setImgURL] = useState(bgWhite);
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();

  console.log("dsrgaeg", selectedItem);

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

    // Set the image URL from the record if available
    if (record.image) {
      setImgURL(record.image);
    } else {
      setImgURL(bgWhite);
    }

    setIsEditModalOpen(true);
  };

  const handleDelete = (record) => {
    setSelectedItem(record);
    setIsDeleteModalOpen(true);
  };

  const handleAssign = (record) => {
    setSelectedItem(record);
    setAssignType(record.type);
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
          <p>{record}...</p>
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
            onClick={() => {
              handleAssign(record);
              setAssignType(record.type);
            }}
          >
            Assign
          </Button>
        </div>
      ),
    },
  ];

  // Modal Handlers
  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setImgURL(bgWhite);
    setFile(null);
  };

  const handleFinishEdit = async (values) => {
    console.log(values);
    try {
      const formData = new FormData();
      const data = {
        name: values.name,
      };
      formData.append("data", JSON.stringify(data));
      if (file) {
        formData.append("image", file);
      }

      // Determine if it's a category or subCategory update
      if (selectedItem.type === "category") {
        const response = await updateCategory({
          id: selectedItem._id,
          data: formData,
        }).unwrap();
        if (response.success) {
          toast.success(response?.message);
        }
      } else if (selectedItem.type === "subCategory") {
        const response = await updateSubCategory({
          id: selectedItem._id,
          data: formData,
        }).unwrap();
        if (response.success) {
          toast.success(response?.message);
        }
      }

      setIsEditModalOpen(false);
      setImgURL(bgWhite);
      setFile(null);
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (selectedItem.type === "category") {
        const response = await deleteCategory(selectedItem._id).unwrap();
        if (response.success) {
          toast.success(response.message);
        }
      } else if (selectedItem.type === "subCategory") {
        const response = await deleteSubCategory(selectedItem._id).unwrap();
        if (response.success) {
          toast.success(response.message);
        }
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
      toast.error("Failed to delete item.");
    }
    setIsDeleteModalOpen(false);
  };

  const handleCancelDelete = () => setIsDeleteModalOpen(false);

  const handleCancelAssign = () => setIsAssignModalOpen(false);

  const handleConfirmAssign = (values) => {
    console.log("Assigned:", values, selectedItem);
    setIsAssignModalOpen(false);
  };

  const onChangeImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imgUrl = URL.createObjectURL(selectedFile);
      setImgURL(imgUrl);
      setFile(selectedFile);
    }
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
          dataSource={subCategoryData?.map((item, index) => ({
            ...item,
            key: item._id || index,
          }))}
          columns={columns("Subcategory")}
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
          <div className="flex flex-col items-center mb-4">
            <input
              onChange={onChangeImage}
              type="file"
              id="img"
              style={{ display: "none" }}
            />
            <label
              htmlFor="img"
              className="relative w-full h-80 cursor-pointer border border-gray-300 bg-white bg-cover bg-center shadow-sm hover:shadow-lg transition-shadow duration-300"
              style={{
                backgroundImage: `url(${imgURL})`,
              }}
            >
              {!imgURL && (
                <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <MdOutlineAddPhotoAlternate
                    size={60}
                    className="text-gray-600"
                  />
                </div>
              )}
            </label>
            <p className="mt-2 text-sm text-gray-500">Click to upload image</p>
          </div>
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
                options={
                  assignType === "category"
                    ? subCategoryData?.map((subCat) => ({
                        label: subCat.name,
                        value: subCat._id,
                      }))
                    : subSubCategoryData?.map((subSub) => ({
                        label: subSub.name,
                        value: subSub._id,
                      }))
                }
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
