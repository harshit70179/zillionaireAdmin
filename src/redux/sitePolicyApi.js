import {
    addUpdateSitePolicyApi,
    getSitePolicyApi,
  } from "../Components/constant/Api";
  import { myApi } from "./api";
  
  export const sitePolicyApi = myApi.injectEndpoints({
    endpoints: (builder) => ({
      getSitePolicy: builder.query({
        query: () => ({
          url: getSitePolicyApi,
          method: "GET",
        }),
        transformResponse: (response, meta, arg) => {
          return response.status ? response?.data[0] ?? {} : {};
        },
        providesTags: (_) => ["sitePolicy"],
      }),
      setSitePolicy: builder.mutation({
        query: (post) => ({
          url: addUpdateSitePolicyApi,
          method: "POST",
          body: post,
        }),
  
        invalidatesTags: (_) => ["sitePolicy"],
      }),
    }),
  });
  
  export const { useSetSitePolicyMutation, useGetSitePolicyQuery } =sitePolicyApi;