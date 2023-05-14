import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://18.191.243.155:8800/api/",
  withCredentials: true,
});

export default newRequest;