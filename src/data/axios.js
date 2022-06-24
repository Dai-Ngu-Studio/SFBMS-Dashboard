import axios from "axios";

const customFetch = axios.create({
  baseURL: "http://localhost:8000/odata",
});

export default customFetch;
