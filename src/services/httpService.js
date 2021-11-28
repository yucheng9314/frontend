import axios from "axios";

axios.interceptors.response.use(null, (error) => {
  //表示预估的客户端错误status(400~500)
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;

  //不可预估的错误，非客户端
  if (!expectedError) {
    console.log("网络延迟或错误，请重试...");
  }
  //客户端错误返回一个异步的拒绝promise
  return Promise.reject(error);
});

//使用axios时把所有的客户端发送请求都把jwtToken包裹在header里发送给终端
function setJwt(jwt) {
  //这个头部名称必须与终端中的一致headers.common["x-auth-token"]
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

export default http;
