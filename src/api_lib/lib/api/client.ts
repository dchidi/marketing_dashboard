import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  AxiosError,
  AxiosHeaders,
  // type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import axiosRetry, {
  isNetworkOrIdempotentRequestError,
  exponentialDelay,
} from "axios-retry";

// Augment axios types to include our custom properties
declare module "axios" {
  interface InternalAxiosRequestConfig {
    skipAuth?: boolean;
    noCache?: boolean;
  }
}

export interface ApiConfig<D = any> extends AxiosRequestConfig<D> {
  rawResponse?: boolean;
  signal?: AbortSignal; // ok to keep for ergonomics
  skipAuth?: boolean;
  noCache?: boolean;
}

// Axios instance
export const apiClient: AxiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Idempotent retry (GET/PUT/HEAD/DELETE) + 429 support
axiosRetry(apiClient, {
  retries: 3,
  retryDelay: exponentialDelay,
  retryCondition: (err) =>
    isNetworkOrIdempotentRequestError(err) || err.response?.status === 429,
});

// Token manager (safe for SSR/Node environments)
export const tokenManager = {
  get: (): string | null => {
    try {
      return typeof window !== "undefined"
        ? localStorage.getItem("authToken")
        : null;
    } catch {
      return null;
    }
  },
  clear: () => {
    try {
      if (typeof window !== "undefined") localStorage.removeItem("authToken");
    } catch {}
  },
};

// Interceptor — add auth header and optional cache busting
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // add auth header if not skipped
  if (!config.skipAuth) {
    const token = tokenManager.get();
    if (token) {
      // Ensure headers is an AxiosHeaders and set via the official API
      if (!(config.headers instanceof AxiosHeaders)) {
        config.headers = new AxiosHeaders(config.headers);
      }
      (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
    }
  }

  // optional cache-busting for GETs
  if (config.method?.toUpperCase() === "GET" && config.noCache) {
    config.params = { ...(config.params ?? {}), _t: Date.now() };
  }

  return config; // ✅ returns InternalAxiosRequestConfig
});

// Interceptor — handle 401s
let onUnauthorized: (() => void) | null = null;

export function setUnauthorizedHandler(fn: () => void) {
  onUnauthorized = fn;
}

export function clearUnauthorizedHandler() {
  onUnauthorized = null;
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      tokenManager.clear();
      onUnauthorized?.();
    }

    if (typeof window !== "undefined" && import.meta.env.DEV) {
      // console.error("API Error", {
      //   url: error.config?.url,
      //   method: error.config?.method,
      //   status: error.response?.status,
      //   data: error.response?.data,
      // });
    }

    return Promise.reject(error);
  }
);

// API helpers
export const api = {
  get: <T>(url: string, config?: ApiConfig): Promise<any> =>
    apiClient.get<T>(url, config).then((r) => {
      const wantsRaw = !!config?.rawResponse || config?.responseType === "blob";
      return wantsRaw ? r : r.data; // 👈 keep headers for blob/rawResponse
    }),

  post: <T>(url: string, data?: unknown, config?: ApiConfig): Promise<T> =>
    apiClient.post<T>(url, data, config).then((r) => r.data),

  put: <T>(url: string, data?: unknown, config?: ApiConfig): Promise<T> =>
    apiClient.put<T>(url, data, config).then((r) => r.data),

  patch: <T>(url: string, data?: unknown, config?: ApiConfig): Promise<T> =>
    apiClient.patch<T>(url, data, config).then((r) => r.data),

  delete: <T = void>(url: string, config?: ApiConfig): Promise<T> =>
    apiClient.delete<T>(url, config).then((r) => r.data),
};
