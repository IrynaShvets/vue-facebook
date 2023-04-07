import axios from "axios";

const BASE_URL = "http://localhost:80/api";

export const getPosts = (token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}/post/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};
