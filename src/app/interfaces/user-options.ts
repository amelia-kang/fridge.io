export interface UserSignupOptions {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  country: string;
  boxId: string;
}

export interface UserLoginOptions {
  email: string;
  password: string;
}


export interface UserInfo {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  boxId: string;
}
