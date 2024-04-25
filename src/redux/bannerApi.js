import { getBannerApi, addBannerApi, updateBannerApi, deleteBannerApi } from "../Components/constant/Api";
import { myApi } from "./api";

export const bannerApi = myApi.injectEndpoints({
  endpoints: (builder) => ({
    getBanner: builder.query({
      query: () => ({
        url: getBannerApi,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        return response.status ? response?.data ?? "" :"";
      },
      providesTags: (_) => ["banner"],
    }),
    setBanner: builder.mutation({
        query: (post) => ({
          url: addBannerApi,
          method: "POST",
          body:post
       
        }),
       
        invalidatesTags: (_) => ["banner","dashboard"],
      }),
      updateBanner: builder.mutation({
        query: (post) => ({
          url: updateBannerApi+"/"+post.id+"/"+post.show_banner,
          method: "PUT",
          // body:post
       
        }),
       
        invalidatesTags: (_) => ["banner"],
      }),
      deleteBanner: builder.mutation({
        query: (post) => ({
          url: deleteBannerApi+"/"+post.id,
          method: "DELETE",
          // body:post
       
        }),
       
        invalidatesTags: (_) => ["banner","dashboard"],
      }),
  }),
});

export const {useGetBannerQuery,useSetBannerMutation,useUpdateBannerMutation,useDeleteBannerMutation } = bannerApi;