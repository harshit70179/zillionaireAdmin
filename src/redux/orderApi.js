import { getOrderApi, updateOrderStatusApi } from "../Components/constant/Api";
  import { myApi } from "./api";
  
  export const orderApi = myApi.injectEndpoints({
    endpoints: (builder) => ({
      getOrder: builder.mutation({
        query: (post) => ({
          url: getOrderApi+ "/" + post.status,
          method: "GET",
        }),
        transformResponse: (response, meta, arg) => {
          return response.status ? response?.data ?? "" : "";
        },
        providesTags: (_) => ["order","dashboard"],
      }),
      updateOrderStatus: builder.mutation({
        query: (post) => ({
          url:updateOrderStatusApi,
          method: "PUT",
          body:post
        }),
        invalidatesTags: (_) => ["order","dashboard"],
      }),
    }),
  });
  
  export const {
     useGetOrderMutation,
     useUpdateOrderStatusMutation
  } = orderApi;
  