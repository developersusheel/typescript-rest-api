export interface UserType {
  username: string;
  email:string;
  password:string;
  isAdmin:boolean;
  resetPasswordToken: String;
  resetPasswordExpires: Date;
}
