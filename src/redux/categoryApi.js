import { addCategoryApi, getCategoryApi, updateCategoryApi } from "../Components/constant/Api";
import { myApi } from "./api";

export const categoryApi = myApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => ({
        url: getCategoryApi,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        return response.status ? response?.data ?? "" :"";
      },
      providesTags: (_) => ["category"],
    }),
    setCategory: builder.mutation({
        query: (post) => ({
          url: addCategoryApi,
          method: "POST",
          body:post
       
        }),
       
        invalidatesTags: (_) => ["category","main_category","dashboard"],
      }),
      updateCategory: builder.mutation({
        query: (post) => ({
          url: updateCategoryApi,
          method: "PUT",
          body:post
       
        }),
        invalidatesTags: (_) => ["category"],
      }),
  }),
});

export const {useGetCategoryQuery,useSetCategoryMutation,useUpdateCategoryMutation } = categoryApi;