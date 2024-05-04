import {addSocialMediaApi, deleteSocialMediaApi, getSocialMediaApi, updateSocialMediaApi } from "../Components/constant/Api";
  import { myApi } from "./api";
  
  export const socialmediaApi = myApi.injectEndpoints({
    endpoints: (builder) => ({
      getSocialMedia: builder.query({
        query: () => ({
          url: getSocialMediaApi,
          method: "GET",
        }),
        transformResponse: (response, meta, arg) => {
          return response.status ? response?.data ?? "" : "";
        },
        providesTags: (_) => ["socialmedia"],
      }),
      setSocialMedia: builder.mutation({
        query: (post) => ({
          url: addSocialMediaApi,
          method: "POST",
          body: post,
        }),
        invalidatesTags: (_) => ["socialmedia"],
      }),
      deleteSocialMedia: builder.mutation({
        query: (post) => ({
          url: deleteSocialMediaApi + "/" + post.id,
          method: "DELETE",
        }),
        invalidatesTags: (_) => ["socialmedia"],
      }),
        updateSocialMedia: builder.mutation({
          query: (post) => ({
            url: updateSocialMediaApi,
            method: "PUT",
            body:post
          }),
          invalidatesTags: (_) => ["socialmedia"],
        }),
    }),
  });
  
  export const {
    useGetSocialMediaQuery,
    useSetSocialMediaMutation,
    useDeleteSocialMediaMutation,
    useUpdateSocialMediaMutation,
  } = socialmediaApi;
  