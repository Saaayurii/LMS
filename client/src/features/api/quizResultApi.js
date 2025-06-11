// features/api/quizResultApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/quiz-result`;

export const quizResultApi = createApi({
  reducerPath: "quizResultApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
  tagTypes: ["QuizResult"],
  endpoints: (builder) => ({
    submitQuizResult: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["QuizResult"],
    }),
    getQuizResultsByQuiz: builder.query({
      query: (quizId) => `/?quizId=${quizId}`,
      providesTags: ["QuizResult"],
    }),
    getQuizResultById: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const {
  useSubmitQuizResultMutation,
  useGetQuizResultsByQuizQuery,
  useGetQuizResultByIdQuery,
} = quizResultApi;
