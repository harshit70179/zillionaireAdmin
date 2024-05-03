import { addSubCategoryApi, getSubCategoryApi, updateSubCategoryApi, updateSubCategoryStatusApi } from "../Components/constant/Api";
import { myApi } from "./api";

export const subCategoryApi = myApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubCategory: builder.query({
      query: () => ({
        url: getSubCategoryApi,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        return response.status ? response?.data ?? "" :"";
      },
      providesTags: (_) => ["sub_category"],
    }),
    setSubCategory: builder.mutation({
        query: (post) => ({
          url: addSubCategoryApi,
          method: "POST",
          body:post
       
        }),
       
        invalidatesTags: (_) => ["sub_category","main_category","category","dashboard"],
      }),
      updateSubCategory: builder.mutation({
        query: (post) => ({
          url: updateSubCategoryApi,
          method: "PUT",
          body:post
       
        }),
        invalidatesTags: (_) => ["sub_category"],
      }),
      updateSubCategoryStatus: builder.mutation({
        query: (post) => ({
          url: updateSubCategoryStatusApi+"/"+post.id,
          method: "PUT",
        }),
       
        invalidatesTags: (_) => ["sub_category"],
      }),
  }),
});

export const {useGetSubCategoryQuery,useSetSubCategoryMutation,useUpdateSubCategoryMutation,useUpdateSubCategoryStatusMutation } = subCategoryApi;