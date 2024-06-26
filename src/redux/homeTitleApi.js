import { addHomeProduct, addHomeTitleApi, deleteHomeTitleApi, getHomeTitleApi, getHomeTitleByIdApi, updateHomeTitleApi, updateHomeTitleStatusApi } from "../Components/constant/Api";
import { myApi } from "./api";

export const homeTitleApi = myApi.injectEndpoints({
    endpoints: (builder) => ({
        getHomeTitle: builder.query({
            query: () => ({
                url: getHomeTitleApi,
                method: "GET",
            }),
            transformResponse: (response, meta, arg) => {
                return response.status ? response?.data ?? "" : "";
            },
            providesTags: (_) => ["homeTitle"],
        }),
        setHomeTitle: builder.mutation({
            query: (post) => ({
                url: addHomeTitleApi,
                method: "POST",
                body: post

            }),

            invalidatesTags: (_) => ["homeTitle","dashboard"],
        }),
        updateHomeTitleStatus: builder.mutation({
            query: (post) => ({
                url: updateHomeTitleStatusApi + "/" + post.id,
                method: "PUT",
            }),

            invalidatesTags: (_) => ["homeTitle"],
        }),
        updateHomeTitle: builder.mutation({
            query: (post) => ({
                url: updateHomeTitleApi,
                method: "PUT",
                body: post
            }),

            invalidatesTags: (_) => ["homeTitle"],
        }),
        deleteHomeTitle: builder.mutation({
            query: (post) => ({
                url: deleteHomeTitleApi + "/" + post.id,
                method: "DELETE",
            }),

            invalidatesTags: (_) => ["homeTitle","dashboard"],
        }),
        setProductHomeTitle: builder.mutation({
            query: (post) => ({
                url: addHomeProduct,
                method: "POST",
                body:post
            }),

            invalidatesTags: (_) => ["homeTitle"],
        }),
        getHomeTitleById: builder.mutation({
            query: (post) => ({
                url: getHomeTitleByIdApi + "/" + post.id,
                method: "Get",
            }),
            transformResponse: (response, meta, arg) => {
                return response.status ? response?.data ?? "" : "";
            },
        }),
    }),
});

export const { useGetHomeTitleQuery, useSetHomeTitleMutation, useUpdateHomeTitleMutation, useUpdateHomeTitleStatusMutation, useDeleteHomeTitleMutation,useSetProductHomeTitleMutation,useGetHomeTitleByIdMutation } = homeTitleApi;