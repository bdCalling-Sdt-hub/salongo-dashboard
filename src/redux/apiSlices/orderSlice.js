import { api } from "../api/baseApi";

const orderSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    reservations: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/reservations",
        };
      },
    }),
    orderProgress: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/order-progress",
        };
      },
    }),
  }),
});

export const { useReservationsQuery, useOrderProgressQuery } = orderSlice;
