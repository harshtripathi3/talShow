import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://13.58.87.111:8800/api/",
  withCredentials: true,
});

export default newRequest;