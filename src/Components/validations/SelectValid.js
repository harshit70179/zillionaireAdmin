export const SelectValid = (name, value) => {
    let error = "";
  
    if (value === "") {
      error = `Please select the ${name}`;
      return error;
    }
  
    return error;
  };
  