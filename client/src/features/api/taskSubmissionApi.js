// features/api/taskSubmissionApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:8080/api/v1/task-submission";

export const taskSubmissionApi = createApi({
  reducerPath: "taskSubmissionApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
  tagTypes: ["TaskSubmission"],
  endpoints: (builder) => ({
    submitTask: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["TaskSubmission"],
    }),
    getSubmissionsByTask: builder.query({
      query: (taskId) => `/?taskId=${taskId}`,
      providesTags: ["TaskSubmission"],
    }),
    getSubmissionById: builder.query({
      query: (id) => `/${id}`,
    }),
    gradeSubmission: builder.mutation({
      query: ({ id, grade }) => ({
        url: `/${id}/grade`,
        method: "PATCH",
        body: { grade },
      }),
      invalidatesTags: ["TaskSubmission"],
    }),
  }),
});

export const {
  useSubmitTaskMutation,
  useGetSubmissionsByTaskQuery,
  useGetSubmissionByIdQuery,
  useGradeSubmissionMutation,
} = taskSubmissionApi;
