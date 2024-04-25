import {getAllUserApi,} from "../Components/constant/Api";
import { myApi } from "./api";

export const UserApi = myApi.injectEndpoints({
  endpoints: (builder) => ({
    getallUser: builder.query({
      query: () => ({
        url: getAllUserApi,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        return response.status ? response?.data ?? [] : [];
      },
      providesTags: (_) => ["user"],
    }),
  }),
});

export const {useGetallUserQuery} = UserApi;
