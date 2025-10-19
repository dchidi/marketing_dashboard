import { createCrud } from "../lib/api/crud-factory";
import { api, type ApiConfig } from "../lib/api/client";

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export type CreateUser = Omit<User, "id" | "createdAt">;
export type UpdateUser = Partial<CreateUser>;

// Create base CRUD operations
export const userCrud = createCrud<User, CreateUser, UpdateUser>(
  "/users",
  "users"
);

// Extend with custom methods
export const userService = {
  ...userCrud.service,

  // Custom endpoints
  search: (query: string, config?: ApiConfig): Promise<User[]> =>
    api.get<User[]>("/users/search", { ...config, params: { q: query } }),

  getProfile: (config?: ApiConfig): Promise<User> =>
    api.get<User>("/users/profile", config),

  uploadAvatar: (
    userId: number,
    file: File,
    config?: ApiConfig
  ): Promise<User> => {
    const formData = new FormData();
    formData.append("avatar", file);
    return api.patch<User>(`/users/${userId}/avatar`, formData, {
      ...config,
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

// Export hooks
export const { useList, useItem, useCreate, useUpdate, useDelete } = userCrud;
