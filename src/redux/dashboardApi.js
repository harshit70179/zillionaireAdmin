import {getDashboardApi} from "../Components/constant/Api";
import { myApi } from "./api";

export const dashboardApi = myApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => ({
        url: getDashboardApi,
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        return response.status ? response?.data[0] ?? "" :"";
      },
      providesTags: (_) => ["dashboard"],
    }),
  }),
});

export const {useGetDashboardQuery } = dashboardApi;