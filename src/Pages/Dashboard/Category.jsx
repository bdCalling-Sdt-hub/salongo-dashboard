import React, { useState } from "react";
import { Collapse, Input } from "antd";
import { useAllCategoriesQuery } from "../../redux/apiSlices/categorySlice";
import logo from "../../assets/logo.png";

const { Panel } = Collapse;
const { Search } = Input;

const Category = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: categoryData, isLoading } = useAllCategoriesQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={logo} alt="" />
      </div>
    );
  }

  const categories = categoryData?.data?.categories;
  console.log(categories);

  const categoriesData = [
    {
      id: 1,
      name: "Hair Services",
      description:
        "Comprehensive hair care services including cuts, styling, and treatments.",
      subCategories: [
        {
          name: "Men's Haircut",
          description: "Classic and modern haircuts for men.",
        },
        {
          name: "Women's Hair Styling",
          description: "Customized hair styles for women.",
        },
        {
          name: "Color Treatments",
          description: "Hair coloring and highlights services.",
        },
        {
          name: "Spa Treatments",
          description:
            "Relaxing treatments like scalp massage and deep conditioning.",
        },
      ],
    },
    {
      id: 2,
      name: "Nail Services",
      description:
        "Nail care and enhancement services including manicures and pedicures.",
      subCategories: [
        {
          name: "Hand Care",
          description: "Moisturizing and therapeutic hand treatments.",
        },
        {
          name: "Foot Care",
          description: "Includes pedicure and foot massage.",
        },
        {
          name: "Decorative Nails",
          description: "Nail art, embellishments, and gels.",
        },
      ],
    },
    {
      id: 3,
      name: "Beauty Services",
      description:
        "Wide range of beauty services including facials and waxing.",
      subCategories: [
        {
          name: "Skin Care",
          description: "Facials, masks, and skin treatments.",
        },
        {
          name: "Hair Removal",
          description: "Waxing and threading for unwanted hair.",
        },
        {
          name: "Facial Grooming",
          description: "Eyebrow shaping, facial threading, and grooming.",
        },
      ],
    },
    {
      id: 4,
      name: "Wellness Services",
      description: "Services to promote wellness and relaxation.",
      subCategories: [
        {
          name: "Body Massage",
          description: "Various massage techniques for relaxation.",
        },
        {
          name: "Skin Exfoliation",
          description: "Exfoliating treatments for smoother skin.",
        },
      ],
    },
  ];

  const filteredCategories = categoriesData.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.subCategories.some((sub) =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="px-40">
      <h1 className="text-4xl font-bold my-10 text-center">Categories</h1>
      <Search
        placeholder="Search categories or subcategories"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <p className="my-3">
        Total Services:{" "}
        <span className="font-semibold">{categoriesData.length} Items</span>{" "}
        Found
      </p>
      <Collapse accordion>
        {filteredCategories.map((category) => (
          <Panel header={category.name} key={category.id}>
            <p className="text-xl font-semibold border-b-2 pb-2">
              {category.description}
            </p>
            <ul className="my-5 bg-[#f8eeee] p-5 rounded-2xl">
              <h1 className="text-lg font-semibold border-b-2 w-[30%] mb-2">
                Sub - Categories
              </h1>
              {category.subCategories.map((sub, index) => (
                <ul key={index} className="list-disc ml-5">
                  <li>
                    <span className="font-semibold">{sub.name}</span> -{" "}
                    {sub.description}
                  </li>
                </ul>
              ))}
            </ul>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default Category;
