import { Table, Input, Tooltip } from "antd";
import { useState, useEffect } from "react";
import moment from "moment";
import { useReservationsQuery } from "../../../redux/apiSlices/orderSlice";

const dummyData = [
  {
    _id: "1",
    key: "1",
    orderId: "ORD12345",
    customer: { auth: { name: "John Doe" } },
    professional: { auth: { name: "Beauty Professional A" } },
    service: { title: "Haircut" },
    duration: 2,
    createdAt: "2024-12-12T08:00:00Z",
    amount: 50.0,
    status: "confirmed",
  },
];

const RunningOrderTable = ({ filterProps }) => {
  const { data: reservations, isLoading } = useReservationsQuery();
  const reservationData = reservations?.data?.data || [];

  const [pageSize, setPageSize] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(dummyData);

  useEffect(() => {
    const sourceData = reservationData.length ? reservationData : dummyData;

    const updatedData = sourceData.map((item) => ({
      ...item,
      key: item._id,
    }));

    const filtered = filterProps
      ? updatedData.filter(
          (item) =>
            item?.customer?.auth?.name
              .toLowerCase()
              .includes(filterProps.toLowerCase()) ||
            item?.professional?.auth?.name
              .toLowerCase()
              .includes(filterProps.toLowerCase())
        )
      : updatedData;

    setFilteredData(filtered);
  }, [reservationData, filterProps]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const sourceData = reservationData.length ? reservationData : dummyData;
    const filtered = sourceData.filter((item) =>
      Object.values(item).some((field) =>
        String(field).toLowerCase().includes(value)
      )
    );

    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "Order Id",
      dataIndex: "_id",
      key: "orderId",
      width: 150,
      render: (id) => (
        <Tooltip title={id}>
          <span className="truncate w-[80px] inline-block">{id}</span>
        </Tooltip>
      ),
    },
    {
      title: "Customer Name",
      dataIndex: ["customer", "auth", "name"],
      key: "customerId",
      width: 150,
    },
    {
      title: "Professional Name",
      dataIndex: ["professional", "auth", "name"],
      key: "professionalId",
      width: 150,
    },
    {
      title: "Service",
      dataIndex: ["service", "title"],
      key: "serviceId",
      width: 150,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      width: 150,
      render: (record) => `${record} Hour`,
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status) => {
        let color = "black";
        if (status === "completed") color = "green";
        else if (status === "pending") color = "orange";
        else if (status === "confirmed") color = "blue";
        return <span style={{ color }}>{status}</span>;
      },
    },
  ];

  return (
    <div className="bg-white p-3 rounded-2xl">
      <div className="flex items-center justify-between">
        <h1 className="font-bold">Reservations</h1>
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
        loading={isLoading}
      />
    </div>
  );
};

export default RunningOrderTable;
