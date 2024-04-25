import { Emailpattern } from "../pattern/Pattern"

export const LoginValid=(name,value)=>{
    let error=""
    if(name==="email"){

       if(value===""){
       error="This field is required"
          return error
       }
       if(!Emailpattern.test(value)){
          error="Please enter  valid email address"
          return error
       }
       return error
    }
    if(name==="password"){

      if(value===""){
         error="This field is required"
            return error
         }
        
         return error
    }
}