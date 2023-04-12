import axios from "axios";

const BASE_URL = "http://localhost:80/api";

export const login = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/login`, {
        ...data,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const register = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/register`, {
        ...data,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const logout = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/logout`)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

