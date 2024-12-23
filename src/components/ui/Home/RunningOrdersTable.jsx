import { Button, Table, Tooltip } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { useReservationsQuery } from "../../../redux/apiSlices/orderSlice";

const RunningOrdersTable = () => {
  // Dummy data for salon orders
  const dummyOrders = [
    {
      orderId: "ORD001",
      amount: 50,
      preference: "Haircut",
      createdAt: "2024-12-01T10:00:00Z",
    },
    {
      orderId: "ORD002",
      amount: 80,
      preference: "Facial",
      createdAt: "2024-12-03T14:00:00Z",
    },
    {
      orderId: "ORD003",
      amount: 40,
      preference: "Manicure",
      createdAt: "2024-12-05T09:30:00Z",
    },
    {
      orderId: "ORD004",
      amount: 120,
      preference: "Hair Coloring",
      createdAt: "2024-12-06T12:15:00Z",
    },
    {
      orderId: "ORD005",
      amount: 60,
      preference: "Pedicure",
      createdAt: "2024-12-08T08:45:00Z",
    },
  ];

  const { data: reservation, isLoading } = useReservationsQuery();

  const reservationData = reservation?.data?.data;
  console.log(reservationData);

  const data = reservationData.slice(0, 3).map((order, index) => ({
    ...order,
    key: order.orderId || index.toString(),
  }));

  const columns = [
    {
      title: "Order Number",
      dataIndex: "_id",
      key: "orderId",
      render: (text, record) => {
        return (
          <Tooltip title={record?._id}>
            <p className="">{record._id.slice(0, 10)}...</p>
          </Tooltip>
        );
      },
    },
    {
      title: "Budget",
      dataIndex: "amount",
      key: "amount",
      render: (text) => `$${text}`,
    },
    {
      title: "Service",
      dataIndex: ["service", "title"],
      key: "preference",
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("Do MMM, YYYY"),
    },
  ];

  return (
    <div className="border bg-white h-[300px] p-5 rounded-2xl">
      <div className="flex items-center justify-between">
        <h1 className="font-bold mb-2">Running Orders</h1>
        <Link to={"/transactions"}>
          <Button className="bg-[#f6e7ff] border-[#f6e7ff]">View All</Button>
        </Link>
      </div>
      <Table columns={columns} pagination={false} dataSource={data} />
    </div>
  );
};

export default RunningOrdersTable;
