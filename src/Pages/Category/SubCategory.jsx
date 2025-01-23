import React, { useState } from "react";
import { Collapse, Input, Modal, Button, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  useAddCategoryMutation,
  useAddSubCategoryMutation,
  useAllSubCategoriesQuery,
} from "../../redux/apiSlices/categorySlice";
import logo from "../../assets/logo.png";
import toast from "react-hot-toast";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import bgWhite from "../../assets/whiteBG.png";

const { Search } = Input;

const SubCategory = () => {
  const [imgURL, setImgURL] = useState();
  const [file, setFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { data: categoryData, isLoading } = useAllSubCategoriesQuery();
  const [addSubCategory] = useAddSubCategoryMutation();

  const handleAddCategory = async (values) => {
    console.log("Submitted values:", values);
    try {
      // Prepare FormData
      const formData = new FormData();
      formData.append("name", values.name);

      // Include the image file as 'image'
      if (file) {
        formData.append("image", file);
      } else {
        message.error("Please upload an image.");
        return;
      }

      const response = await addSubCategory(formData);
      console.log(response);

      if (response.data.success) {
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch {}
    setIsModalOpen(false);
    form.resetFields();
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
  console.log(categories);

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.subSubCategories.some((sub) =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const onChangeImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imgUrl = URL.createObjectURL(selectedFile);
      setImgURL(imgUrl);
      setFile(selectedFile);
    }
  };

  const items = filteredCategories.map((category) => ({
    key: category._id,
    label: category.name,
    children: (
      <div>
        {category?.image && (
          <img
            className="w-[200px] object-cover h-[130px] rounded-2xl shadow-lg"
            src={
              category?.image?.startsWith("http")
                ? category?.image
                : `${import.meta.env.VITE_BASE_URL}${category?.image}`
            }
            alt="categoryImg"
          />
        )}
        {category?.description && (
          <p className="text-xl font-semibold border-b-2 pb-2">
            {category.description}
          </p>
        )}
        <ul className="my-5 bg-[#f8eeee] p-5 rounded-2xl">
          <h1 className="text-lg font-semibold border-b-2 w-[50%] mb-2">
            Sub-Sub Categories
          </h1>
          {category.subSubCategories &&
            category.subSubCategories.map((sub, index) => (
              <li key={index} className="list-disc ml-5">
                <span className="font-semibold">{sub.name}</span>{" "}
                {sub.description}
              </li>
            ))}
        </ul>
      </div>
    ),
  }));

  return (
    <div className="px-40">
      <h1 className="text-4xl font-bold mb-5">Sub Categories</h1>
      <Search
        placeholder="Search Sub-Categories or Sub-Sub-Categories"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <div className="flex justify-between items-center mb-5">
        <p className="my-3">
          Total Sub Categories:{" "}
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
                backgroundImage: `url(${imgURL ? imgURL : bgWhite})`,
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
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Collapse accordion items={items} />
    </div>
  );
};

export default SubCategory;
