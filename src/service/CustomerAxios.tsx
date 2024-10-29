import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5268",
});

export default instance;
