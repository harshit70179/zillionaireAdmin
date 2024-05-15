import { addExploreApi, deleteExploreApi, getExploreApi, updateExploreApi } from "../Components/constant/Api";
import { myApi } from "./api";

export const exploreApi = myApi.injectEndpoints({
  endpoints: (builder) => ({
    getExplore: builder.query({
      query: () => ({
        url: getExploreApi,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        return response.status ? response?.data ?? "" :"";
      },
      providesTags: (_) => ["explore"],
    }),
    setExplore: builder.mutation({
        query: (post) => ({
          url: addExploreApi,
          method: "POST",
          body:post
       
        }),
       
        invalidatesTags: (_) => ["explore"],
      }),
      updateExplore: builder.mutation({
        query: (post) => ({
          url: updateExploreApi+"/"+post.id,
          method: "PUT",
          // body:post
       
        }),
       
        invalidatesTags: (_) => ["explore"],
      }),
      deleteExplore: builder.mutation({
        query: (post) => ({
          url: deleteExploreApi+"/"+post.id,
          method: "DELETE",
          // body:post
       
        }),
       
        invalidatesTags: (_) => ["explore"],
      }),
  }),
});

export const {useGetExploreQuery,useSetExploreMutation,useUpdateExploreMutation,useDeleteExploreMutation } = exploreApi;