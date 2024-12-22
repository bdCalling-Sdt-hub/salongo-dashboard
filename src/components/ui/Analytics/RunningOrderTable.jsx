import { Table, Input, Tooltip } from "antd";
import { useState, useEffect } from "react";
import moment from "moment";
import rentMeLogo from "../../../assets/navLogo.png";

// Dummy data
const dummyData = [
  {
    _id: "1",
    key: "1",
    orderId: "ORD12345",
    customerId: { name: "John Doe" },
    professionalId: { name: "Beauty Professional A" },
    serviceId: { title: "Haircut" },
    preference: "Standard",
    createdAt: "2024-12-12T08:00:00Z",
    amount: 50.0,
    paymentStatus: "full",
    status: "confirmed",
  },
  {
    _id: "2",
    key: "2",
    orderId: "ORD12346",
    customerId: { name: "Jane Smith" },
    professionalId: { name: "Beauty Professional B" },
    serviceId: { title: "Facial" },
    preference: "Deluxe",
    createdAt: "2024-12-10T10:00:00Z",
    amount: 80.0,
    paymentStatus: "pending",
    status: "ongoing",
  },
  {
    _id: "3",
    key: "3",
    orderId: "ORD12347",
    customerId: { name: "Emily Johnson" },
    professionalId: { name: "Beauty Professional C" },
    serviceId: { title: "Manicure" },
    preference: "Premium",
    createdAt: "2024-12-08T12:00:00Z",
    amount: 40.0,
    paymentStatus: "ongoing",
    status: "rejected",
  },
];

const RunningOrderTable = ({ filterProps }) => {
  const [pageSize, setPageSize] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(dummyData);

  // Set filteredData whenever filterProps changes
  useEffect(() => {
    if (filterProps) {
      const filtered = dummyData.filter(
        (item) =>
          item.professionalId.name
            .toLowerCase()
            .includes(filterProps.toLowerCase()) ||
          item.customerId.name.toLowerCase().includes(filterProps.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(dummyData);
    }
  }, [filterProps]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    // Filter data based on the search text
    const filtered = dummyData.filter((item) =>
      Object.values(item).some((field) =>
        String(field).toLowerCase().includes(value)
      )
    );
    setFilteredData(filtered);
  };

  const truncateWithEllipsis = (text, length = 20) =>
    text.length > length ? `${text.slice(0, length)}...` : text;

  const columns = [
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
      width: 150,
    },
    {
      title: "Customer Name",
      dataIndex: "customerId",
      key: "customerId",
      render: (customerId) => (
        <Tooltip title={customerId?.name}>
          <span>{truncateWithEllipsis(customerId?.name)}</span>
        </Tooltip>
      ),
      width: 150,
    },
    {
      title: "Professional Name",
      dataIndex: "professionalId",
      key: "professionalId",
      render: (professionalId) => (
        <Tooltip title={professionalId?.name}>
          <span>{truncateWithEllipsis(professionalId?.name)}</span>
        </Tooltip>
      ),
      width: 150,
    },
    {
      title: "Service",
      dataIndex: "serviceId",
      key: "serviceId",
      render: (serviceId) => (
        <Tooltip title={serviceId?.title}>
          <span>{truncateWithEllipsis(serviceId?.title)}</span>
        </Tooltip>
      ),
      width: 150,
    },
    {
      title: "Package",
      dataIndex: "preference",
      key: "preference",
      width: 150,
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (date) => moment(date).format("Do MMM, YYYY"),
    },
    {
      title: "Price",
      dataIndex: "amount",
      key: "amount",
      width: 150,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: 150,
      render: (status) => {
        let color;
        if (status === "full") {
          color = "green";
        } else if (status === "pending") {
          color = "orange";
        } else if (status === "ongoing") {
          color = "blue";
        } else {
          color = "black";
        }
        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: "Order Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status) => {
        let color;
        if (status === "confirmed") {
          color = "green";
        } else if (status === "rejected") {
          color = "red";
        } else if (status === "ongoing") {
          color = "blue";
        } else {
          color = "black";
        }
        return <span style={{ color }}>{status}</span>;
      },
    },
  ];

  return (
    <div className="bg-white p-3 rounded-2xl">
      <div className="flex items-center justify-between">
        <h1 className="font-bold">Reservations</h1>
        {/* Search Bar */}
        <Input
          placeholder="Search orders"
          value={searchText}
          onChange={handleSearch}
          className="mb-4 w-[50%]"
        />
      </div>
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
        dataSource={filteredData}
      />
    </div>
  );
};

export default RunningOrderTable;
