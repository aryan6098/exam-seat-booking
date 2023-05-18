import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const examDataApi = createApi({
  reducerPath: "examDataApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://mock-api-repo.netlify.app/api/getExam.json/",
  }),
  endpoints: (builder) => ({
    getExamData: builder.query({
      query: () => "",
    }),

  }),
});

export const { useGetExamDataQuery } = examDataApi;
