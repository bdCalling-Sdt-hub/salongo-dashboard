import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import Title from "../../components/common/Title";
import logo from "../../assets/salon-go-logo.png";
import toast from "react-hot-toast";
import {
  usePrivacyPolicyQuery,
  useUpdatePricyPolicyMutation,
} from "../../redux/apiSlices/privacyPolicySlice";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [selectedTab, setSelectedTab] = useState("USER");

  useEffect(() => {
    setContent(content);
  }, [selectedTab]);

  const {
    data: privacyPolicy,
    isLoading,
    refetch,
  } = usePrivacyPolicyQuery(selectedTab);

  const [updatePricyPolicy] = useUpdatePricyPolicyMutation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={logo} alt="" />
      </div>
    );
  }

  const privacyPolicyData = privacyPolicy?.content;

  const termsDataSave = async () => {
    const data = {
      content: content,
      userType: selectedTab,
    };

    try {
      const res = await updatePricyPolicy(data).unwrap();
      if (res.success) {
        toast.success("Privacy Policy updated successfully");
        setContent(res.data.content);
        refetch();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed. Please try again.");
    }
  };

  const tabContent = {
    USER: privacyPolicyData,
    PROFESSIONAL: privacyPolicyData,
  };

  return (
    <div>
      <Title className="mb-4">Privacy Policy</Title>

      <div className="flex justify-center gap-4 mb-4">
        <button
          className={`px-4 rounded-2xl py-2 ${
            selectedTab === "USER" ? "bg-[#5c2579cc] text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("USER")}
        >
          Users
        </button>
        <button
          className={`px-4 rounded-2xl py-2 ${
            selectedTab === "PROFESSIONAL"
              ? "bg-[#5c2579cc] text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("PROFESSIONAL")}
        >
          Professional
        </button>
      </div>

      <JoditEditor
        ref={editor}
        value={tabContent[selectedTab]}
        onChange={(newContent) => {
          setContent(newContent);
        }}
      />

      <div className="flex items-center justify-center mt-5">
        <button
          onClick={termsDataSave}
          type="submit"
          className="bg-[#5c2579cc] text-white w-[160px] h-[42px] rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
