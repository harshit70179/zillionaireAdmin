import { addMainCategoryApi, getMainCategoryApi, updateMainCategoryApi, updateMainCategoryStatusApi } from "../Components/constant/Api";
import { myApi } from "./api";

export const mainCategoryApi = myApi.injectEndpoints({
  endpoints: (builder) => ({
    getMainCategory: builder.query({
      query: () => ({
        url: getMainCategoryApi,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        return response.status ? response?.data ?? "" :"";
      },
      providesTags: (_) => ["main_category"],
    }),
    setMainCategory: builder.mutation({
        query: (post) => ({
          url: addMainCategoryApi,
          method: "POST",
          body:post
       
        }),
       
        invalidatesTags: (_) => ["main_category","dashboard"],
      }),
      updateMainCategory: builder.mutation({
        query: (post) => ({
          url: updateMainCategoryApi,
          method: "PUT",
          body:post
       
        }),
        invalidatesTags: (_) => ["main_category"],
      }),
      updateMainCategoryStatus: builder.mutation({
        query: (post) => ({
          url: updateMainCategoryStatusApi+"/"+post.id,
          method: "PUT",
        }),
       
        invalidatesTags: (_) => ["main_category"],
      }),
  }),
});

export const {useGetMainCategoryQuery,useSetMainCategoryMutation,useUpdateMainCategoryMutation,useUpdateMainCategoryStatusMutation } = mainCategoryApi;