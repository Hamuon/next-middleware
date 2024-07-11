import http from "./http";

type LoginData = {
  email: string;
  password: string;
};

type SignupData = {
  fullName: string;
  email: string;
  password: string;
};

export function login(data: LoginData) {
  return http.post("/login", data);
}

export function signup(data: SignupData) {
  return http.post("/signup", data);
}
