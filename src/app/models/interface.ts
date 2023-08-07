export interface Credentials {
    mobile: string;
    password: string;
  }


export interface registerResponse{
     message:string;
    status:Boolean;
}

export interface loginResponse{
  message:string;
  token:string;
 status:Boolean;
}