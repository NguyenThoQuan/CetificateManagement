// src/repositories/RepositoryBase.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class RepositoryBase<T> {
  protected readonly httpClient: AxiosInstance;

  constructor(baseURL: string) {
    this.httpClient = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Attach interceptor to handle token
    this.httpClient.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Handle token refresh on 401 error
    this.httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const newToken = await this.refreshToken();
          if (newToken) {
            localStorage.setItem("token", newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return this.httpClient(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // handle Refresh Token
  private async refreshToken(): Promise<string | null> {
    try {
      const response = await axios.post<{ token: string }>(
        `${this.httpClient.defaults.baseURL}/auth/refresh`,
        {},
        { withCredentials: true }
      );
      return response.data.token;
    } catch (error) {
      console.error("Failed to refresh token", error);
      return null;
    }
  }

  async get(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.httpClient.get(url, config);
    return response.data;
  }

  async post(url: string, data: T, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.httpClient.post(
      url,
      data,
      config
    );
    return response.data;
  }

  async put(url: string, data: T, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.httpClient.put(
      url,
      data,
      config
    );
    return response.data;
  }

  async delete(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.httpClient.delete(
      url,
      config
    );
    return response.data;
  }
}
