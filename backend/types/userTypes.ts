export interface UserType {
  username: string;
  email:string;
  password:string;
  isAdmin:boolean;
  resetPasswordToken: String;
  resetPasswordExpires: Date;
}

export interface UserReturntype {
  _id: string,
  username: string,
  email: string,
  isAdmin: boolean,
  token: string
}