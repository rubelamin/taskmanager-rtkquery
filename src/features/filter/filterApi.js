import { apiSlice } from "../api/apiSlice";

export const filterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    projectChecked: builder.query({
      query: () => ({
        url: `/projects`,
      }),
    }),
  }),
});

export const { useProjectCheckedQuery } = filterApi;
