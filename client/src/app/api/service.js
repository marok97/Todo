import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;

const responseBody = (response) => response.data;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.interceptors.response.use(async (response) => {
  await sleep();
  return response;
});

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
};

const Todo = {
  getTodos: () => requests.get("todos"),
};

const Auth = {
  login: (username, password) =>
    requests.post("auth/token", { username, password }),
};
const service = {
  Todo,
};

export default service;
