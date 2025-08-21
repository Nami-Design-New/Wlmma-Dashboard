import { useLayoutEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import axiosInstance from "../../utils/axiosInstance";

export default function useAuth() {
  const [cookies, , removeCookie] = useCookies(["token"]);
  const token = cookies.token;
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          removeCookie("token", { path: "/" });
          navigate("/login", { replace: true });

          return Promise.reject(error);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [token, removeCookie, navigate]);

  return {
    isAuthed: !!token,
  };
}
