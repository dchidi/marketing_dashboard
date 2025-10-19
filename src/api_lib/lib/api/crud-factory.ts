// lib/api/endpoint-factory.ts
import {
  useQuery,
  type UseQueryOptions,
  type QueryKey,
  keepPreviousData,
} from "@tanstack/react-query";
import { api, type ApiConfig } from "./client";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type Def = { method: Method; path: string; key?: string };

export function createEndpoints<
  TDefs extends Record<string, Def>,
  TReturn = any
>(namespace: string, keyRoot: string, defs: TDefs) {
  const service = {} as {
    [K in keyof TDefs]: (params?: any, config?: ApiConfig) => Promise<TReturn>;
  };

  const hooks = {} as {
    [K in keyof TDefs as TDefs[K]["method"] extends "GET"
      ? `use${Capitalize<string & K>}`
      : never]: (
      params?: any,
      // allow passing any useQuery options except queryKey/queryFn
      options?: Omit<
        UseQueryOptions<TReturn, unknown, TReturn, QueryKey>,
        "queryKey" | "queryFn"
      >,
      // service (axios) config
      serviceConfig?: ApiConfig
    ) => ReturnType<typeof useQuery<TReturn>>;
  };

  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  (Object.keys(defs) as (keyof TDefs)[]).forEach((name) => {
    const { method, path, key } = defs[name];
    const url = `${namespace}${path}`;

    // service function
    (service as any)[name] = (params?: any, config?: ApiConfig) => {
      switch (method) {
        case "GET":
          return api.get(url, { ...config, params });
        case "POST":
          return api.post(url, params, config);
        case "PUT":
          return api.put(url, params, config);
        case "PATCH":
          return api.patch(url, params, config);
        case "DELETE":
          return api.delete(url, config);
      }
    };

    // GET hook with options
    if (method === "GET") {
      (hooks as any)[`use${cap(name as string)}`] = (
        params?: any,
        options?: any,
        serviceConfig?: ApiConfig
      ) =>
        useQuery<TReturn>({
          queryKey: [keyRoot, key ?? name, params],
          queryFn: ({ signal }: { signal?: AbortSignal }) =>
            (service as any)[name](params, { ...serviceConfig, signal }),
          placeholderData: keepPreviousData,
          ...(options ?? {}),
        });
    }
  });
  return { service, hooks } as const;
}
