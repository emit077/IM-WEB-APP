import axios from "axios";
import urls from "./urls";
import project from "./project-config";

const axios_instance = axios.create({
  baseURL: urls[project.NAME][project.ENV],
  timeout: 50000,
});
export default axios_instance;
