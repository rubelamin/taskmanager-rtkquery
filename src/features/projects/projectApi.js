import { apiSlice } from "../api/apiSlice";

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: `/projects`,
      }),
    }),
  }),
});

export const { useGetProjectsQuery } = projectApi;
