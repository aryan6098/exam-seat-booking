import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const examDataApi = createApi({
  reducerPath: "examDataApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://3a178515-5a1f-4da4-b47b-b9e825f92625.mock.pstmn.io/getExam/",
  }),
  endpoints: (builder) => ({
    getExamData: builder.query({
      query: () => "",
    }),
    getExamDataById: builder.query({
      query: (id) => `${id}`,
    }),
  }),
});

export const { useGetExamDataQuery, useLazyGetExamDataByIdQuery } = examDataApi;
