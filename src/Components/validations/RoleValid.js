import {
  Emailpattern,
  Mobilepattern,
  Namepattern,
  Passwordpattern,
} from "../pattern/Pattern";

export const RoleValid = (name, value,id) => {
  let error = "";
  if (name === "email") {
    if (value === "") {
      error = "This field is required";
      return error;
    }
    if (!Emailpattern.test(value)) {
      error = "Please enter  valid email address";
      return error;
    }
    return error;
  }
  if (name === "name") {
    if (value === "") {
      error = "This field is required";
      return error;
    }
    if (!Namepattern.test(value)) {
      error = "Please enter  valid name";
      return error;
    }
    return error;
  }
  if (name === "mobileNo") {
    if (value === "") {
      error = "This field is required";
      return error;
    }
    if (!Mobilepattern.test(value)) {
      error = "Please enter  valid mobile number";
      return error;
    }
    return error;
  }
  if (name === "password") {
    if(!id){
      if (value === "") {
        error = "This field is required";
        return error;
      }
    }
    if (!Passwordpattern.test(value) && value) {
      error = "Please enter  valid password";
      return error;
    }

   
    return error;
  }
};
