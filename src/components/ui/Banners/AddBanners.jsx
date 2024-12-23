import { Card, Form, Input, Switch, Button, message } from "antd";
import { useState } from "react";
import whiteBg from "../../../assets/whiteBG.png";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useAddBannerMutation } from "../../../redux/apiSlices/banenrSlice";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import logo from "../../../assets/salon-go-logo.png";

const AddBanners = () => {
  const [imgURL, setImgURL] = useState();
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [addBanner, { isLoading }] = useAddBannerMutation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={logo} alt="" />
      </div>
    );
  }

  const onChangeImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imgUrl = URL.createObjectURL(selectedFile);
      setImgURL(imgUrl);
      setFile(selectedFile);
    }
  };

  const onFinish = async (values) => {
    try {
      // Prepare FormData
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("link", values.link);
      formData.append("btnText", values.btnText);
      formData.append("isActive", values.isActive ? "true" : "false");

      // Include the image file as 'image'
      if (file) {
        formData.append("image", file);
      } else {
        message.error("Please upload an image.");
        return;
      }

      const response = await addBanner(formData);

      if (response.data) {
        toast.success(response?.data?.message);
        navigate("/banners");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Card title="Add Banner" style={{ width: 600, margin: "0 auto" }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ isActive: true }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input placeholder="Enter banner title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea placeholder="Enter banner description" />
        </Form.Item>

        <Form.Item
          name="link"
          label="Link"
          rules={[{ required: true, message: "Please input the link!" }]}
        >
          <Input placeholder="Enter banner link" />
        </Form.Item>

        <Form.Item
          name="btnText"
          label="Button Text"
          rules={[{ required: true, message: "Please input the button text!" }]}
        >
          <Input placeholder="Enter button text" />
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
              backgroundImage: `url(${imgURL ? imgURL : whiteBg})`,
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

        <Form.Item name="isActive" label="Active Now" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button type="primary" className="bg-[#5c2579cc]" htmlType="submit">
            Add Banner
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddBanners;
