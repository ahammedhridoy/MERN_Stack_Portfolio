// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define TypeScript types
interface Project {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    // Get All Projects
    getAllProject: builder.query<Project[], void>({
      query: () => `/project/all`,
    }),
    // Get Single Project
    getSingleProject: builder.query<Project, number>({
      query: (id) => `/project/${id}`,
    }),
    // Create Project
    createProject: builder.mutation<Project, Project>({
      query: (project) => ({
        url: "/project/create",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: project,
      }),
    }),
  }),
});

// Correct way to export the generated hooks
export const {
  useGetAllProjectQuery,
  useGetSingleProjectQuery,
  useCreateProjectMutation,
} = projectApi;
