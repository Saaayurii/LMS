// features/api/courseMaterialApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:8080/api/v1/course-material";

export const courseMaterialApi = createApi({
  reducerPath: "courseMaterialApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
  tagTypes: ["CourseMaterial"],
  endpoints: (builder) => ({
    uploadMaterial: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CourseMaterial"],
    }),
    getMaterialsByCourse: builder.query({
      query: (courseId) => `/?courseId=${courseId}`,
      providesTags: ["CourseMaterial"],
    }),
    deleteMaterial: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CourseMaterial"],
    }),
  }),
});

export const {
  useUploadMaterialMutation,
  useGetMaterialsByCourseQuery,
  useDeleteMaterialMutation,
} = courseMaterialApi;
