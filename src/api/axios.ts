import axios from "axios";
import { message } from "antd";
import { handleSuccess, handleError } from "./handler";
// import { SERVER_URL } from "@/utils";

const SERVER_URL = process.env.REACT_APP_BASE_URL;
const BASE_PATH = "/yeo";

const instance = axios.create({
  baseURL: SERVER_URL + BASE_PATH,
  timeout: 8000,
  withCredentials: true,
});

instance.interceptors.request.use(
  function (config) {
    const n = localStorage.getItem("nickname");
    config.headers = {
      "x-requested-with": encodeURIComponent(n || ""),
    };
    return config;
  },
  function (error) {
    // return Promise.reject(error);
    return handleError(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // if (response.headers["x-show-msg"] === "zxzk_msg_200") {
    //   message.success(response.data.msg, 2);
    // }
    // return response.data.result;
    return handleSuccess(response);
  },
  function (error) {
    // const { response } = error;
    // if (response.status === 404) {
    //   message.error("请求资源未发现");
    // } else if (response.status === 403) {
    //   message.error(response.data.msg, () => {
    //     window.location.href = "/admin/user/login";
    //     localStorage.clear();
    //   });
    // } else {
    //   message.error(response.data.msg);
    // }
    // return Promise.reject(error);
    handleError(error);
  }
);

export default instance;
