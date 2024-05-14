import axios from "axios";

const apiConfig = axios.create({
  baseURL: "https://cloud.leonardo.ai/api/rest/v1",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    authorization: `Bearer ${process.env.REACT_APP_LEONARDO_API_KEY}`,
  },
});

export default apiConfig;
