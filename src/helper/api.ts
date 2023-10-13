"use client";
import axios from "axios";
import { BASEURL } from "ledger/pages/api/api";

export const api = axios.create({
  baseURL: BASEURL,
});

export function saveTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

export function getTokens() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return { accessToken, refreshToken };
}

export function removeTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

export function removeLoginInfo() {
  removeTokens();
  localStorage.removeItem("userInfo");
  // localStorage.removeItem("name");
  // localStorage.removeItem("id");
  // localStorage.removeItem("role");
}

api.interceptors.request.use(
  (config) => {
    const { accessToken } = getTokens();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest._retry) {
      removeTokens();
      window.location.href = "/login";
    }

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = getTokens();
        const response = await axios.post(`${BASEURL}/user/generaterefresh`, {
          refreshToken,
        });
        const { accessToken } = response.data;

        saveTokens(accessToken, response.data.refreshToken);
        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
      }
    }

    return Promise.reject(error);
  }
);
