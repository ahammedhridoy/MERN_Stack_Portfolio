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
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (builder) => ({
    // Get All Projects
    getAllProjects: builder.query<Project[], void>({
      query: () => `/products`,
    }),
  }),
});

// Correct way to export the generated hooks
export const { useGetAllProjectsQuery } = projectApi;
