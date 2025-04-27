// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define TypeScript types
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  github: string;
  stack: string[];
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
        body: project,
        credentials: "include",
        formData: true,
      }),
    }),
    // Update Project
    updateProject: builder.mutation<Project, Project>({
      query: (project) => ({
        url: `/project/${project.id}`,
        method: "PATCH",
        body: project,
        credentials: "include",
        formData: true,
      }),
    }),
    // Delete Project
    deleteProject: builder.mutation<Project, number>({
      query: (id) => ({
        url: `/project/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

// Correct way to export the generated hooks
export const {
  useGetAllProjectQuery,
  useGetSingleProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
