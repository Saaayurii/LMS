// features/api/learningTaskApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:8080/api/v1/learning-task";

export const learningTaskApi = createApi({
  reducerPath: "learningTaskApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
  tagTypes: ["LearningTask"],
  endpoints: (builder) => ({
    createLearningTask: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["LearningTask"],
    }),
    getLearningTasksByCourse: builder.query({
      query: (courseId) => `/?courseId=${courseId}`,
      providesTags: ["LearningTask"],
    }),
    getLearningTaskById: builder.query({
      query: (id) => `/${id}`,
    }),
    updateLearningTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["LearningTask"],
    }),
    deleteLearningTask: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LearningTask"],
    }),
  }),
});

export const {
  useCreateLearningTaskMutation,
  useGetLearningTasksByCourseQuery,
  useGetLearningTaskByIdQuery,
  useUpdateLearningTaskMutation,
  useDeleteLearningTaskMutation,
} = learningTaskApi;
