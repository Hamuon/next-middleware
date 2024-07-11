import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

const app = axios.create({
  baseURL: BASE_URL,
});

const http = {
  get: app.get,
  post: app.post,
  delete: app.delete,
  put: app.put,
  patch: app.patch,
};

export default http;
