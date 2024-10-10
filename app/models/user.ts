export interface IUser {
    username: string;
    role: ERole;
    display_name: string;
    password?: string;
  }
  
  export enum ERole {
    ADMIN = "admin",
    USER = "user",
  }
  