import { changePasswordApi, loginApi } from "../constant/Api";
import * as opsService from "./Ops";
import config from "../constant/Config";

  export const logIn = async (data) => {
    let result = await opsService.postdata(
      loginApi,data,  
    );
    return result;
  };
  export const changePassword=async(data)=>{
    let result = await opsService.postdata(changePasswordApi, data, config);
    return result;
  }
