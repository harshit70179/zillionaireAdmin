import * as opsService from "./Ops";
import config from "../constant/Config";
import { getMatchBySeriesIdApi } from "../constant/Api";


export const getMatchBySeriesId = async (data) => {
  let result = await opsService.postdata(getMatchBySeriesIdApi, data, config);
  return result;
};
