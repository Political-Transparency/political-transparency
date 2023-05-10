import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["Bills", "Votes", "BillsByKnessetNum"],
  endpoints: (build) => ({
    getBills: build.query({
      query: () => "general/bills",
      providesTags: ["Bills"],
    }),
    getVotes: build.query({
      query: (billId) => ({
        url: `database/votes`,
        method: "GET",
        params: { billId },
      }),
      providesTags: ["Votes"],
    }),
    getBillsByKnessetNum: build.query({
      query: ({ page, pageSize, knessetNum }) => ({
        url: "general/billsByKnessetNum",
        method: "GET",
        params: { page, pageSize, knessetNum },
      }),
      providesTags: ["BillsByKnessetNum"],
    }),
  }),
});

export const {
  useGetBillsQuery,
  useGetVotesQuery,
  useGetBillsByKnessetNumQuery,
} = api;
