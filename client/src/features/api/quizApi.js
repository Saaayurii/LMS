// features/api/quizApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:8080/api/v1/quiz";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
  tagTypes: ["Quiz"],
  endpoints: (builder) => ({
    createQuiz: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quiz"],
    }),
    getQuizzesByCourse: builder.query({
      query: (courseId) => `/?courseId=${courseId}`,
      providesTags: ["Quiz"],
    }),
    getQuizById: builder.query({
      query: (id) => `/${id}`,
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quiz"],
    }),
  }),
});

export const {
  useCreateQuizMutation,
  useGetQuizzesByCourseQuery,
  useGetQuizByIdQuery,
  useDeleteQuizMutation,
} = quizApi;
