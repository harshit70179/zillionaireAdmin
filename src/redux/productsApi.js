import {addProductApi, getProductApi, getProductById, updateProductApi } from "../Components/constant/Api";
import { myApi } from "./api";

export const productsApi = myApi.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => ({
        url: getProductApi,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        return response.status ? response?.data ?? [] :[];
      },
      providesTags: (_) => ["products"],
    }),
    setProduct: builder.mutation({
        query: (post) => ({
          url: addProductApi,
          method: "POST",
          body:post,       
        }),
       
        invalidatesTags: (_) => ["products","dashboard"],
      }),
      updateProduct: builder.mutation({
        query: (post) => ({
          url: updateProductApi,
          method: "PUT",
          body:post,       
        }),
        invalidatesTags: (_) => ["products"],
      }),
    getProductById: builder.query({
        query: (post) => ({
          url: getProductById+"/"+post.id,
          method: "GET",
        }),
        transformResponse: (response, meta, arg) => {
          return response.status ? response?.data ?? [] :[];
        },
      }),      
  }),
});

export const {useGetProductQuery,useSetProductMutation,useGetProductByIdQuery,useUpdateProductMutation } = productsApi;