import {getRoleApi, addRoleApi, deleteRoleApi, getRoleByIdApi, updateRoleApi } from "../Components/constant/Api";
import { myApi } from "./api";

export const RoleApi = myApi.injectEndpoints({
  endpoints: (builder) => ({
    getRole: builder.query({
      query: () => ({
        url: getRoleApi,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        return response.status ? response?.data ?? [] :[];
      },
      providesTags: (_) => ["role"],
    }),
    getRoleById: builder.query({
      query: (post) => ({
        url: getRoleByIdApi+"/"+post.id,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        return response.status ? response?.data[0] ?? {} :{};
      },
    }),
    setRole: builder.mutation({
        query: (post) => ({
          url: addRoleApi,
          method: "POST",
          body:post
       
        }),
       
        invalidatesTags: (_) => ["role"],
      }),
      updateRole: builder.mutation({
        query: (post) => ({
          url: updateRoleApi,
          method: "PUT",
          body:post
       
        }),
       
        invalidatesTags: (_) => ["role"],
      }),
      deleteRole: builder.mutation({
        query: (post) => ({
          url: deleteRoleApi+"/"+post.id,
          method: "DELETE",
       
        }),
       
        invalidatesTags: (_) => ["role"],
      }),
  }),
});

export const {useGetRoleQuery,useSetRoleMutation,useDeleteRoleMutation,useGetRoleByIdQuery,useUpdateRoleMutation} = RoleApi;