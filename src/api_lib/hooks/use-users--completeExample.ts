// hooks/use-users.ts Current implementation moved this hook into service but it can be a stand alone
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  userService,
  type User,
  type CreateUser,
  useList,
  useItem,
  useCreate,
  useDelete,
} from "../services/user-service";

// Enhanced hooks with additional functionality
export const useUsers = () => {
  const { data: users, isLoading, error, refetch } = useList();

  return {
    users,
    isLoading,
    error,
    refetch,
    isEmpty: !isLoading && !error && users?.length === 0,
  };
};

export const useUser = (id?: number) => {
  const { data: user, isLoading, error, refetch } = useItem(id);

  return {
    user,
    isLoading,
    error,
    refetch,
    exists: !!user && !isLoading && !error,
  };
};

export const useUserCreation = () => {
  const createUser = useCreate();
  const queryClient = useQueryClient();

  const createUserWithOptimistic = async (userData: CreateUser) => {
    const previousUsers = queryClient.getQueryData<User[]>([
      "users",
      "list",
      {},
    ]);

    // Optimistic update
    if (previousUsers) {
      const tempId = Date.now(); // Temporary ID for optimistic update
      const optimisticUser: User = {
        ...userData,
        id: tempId,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<User[]>(["users", "list", {}], (old) =>
        old ? [...old, optimisticUser] : [optimisticUser]
      );
    }

    try {
      const newUser = await createUser.mutateAsync(userData);
      return newUser;
    } catch (error) {
      // Rollback on error
      if (previousUsers) {
        queryClient.setQueryData(["users", "list", {}], previousUsers);
      }
      throw error;
    }
  };

  return {
    ...createUser,
    createUser: createUserWithOptimistic,
  };
};

export const useUserDeletion = () => {
  const deleteUser = useDelete();
  const queryClient = useQueryClient();

  const deleteUserWithOptimistic = async (userId: number) => {
    const previousUsers = queryClient.getQueryData<User[]>([
      "users",
      "list",
      {},
    ]);

    // Optimistic update
    if (previousUsers) {
      queryClient.setQueryData<User[]>(["users", "list", {}], (old) =>
        old ? old.filter((user) => user.id !== userId) : []
      );
    }

    try {
      await deleteUser.mutateAsync(userId);
    } catch (error) {
      // Rollback on error
      if (previousUsers) {
        queryClient.setQueryData(["users", "list", {}], previousUsers);
      }
      throw error;
    }
  };

  return {
    ...deleteUser,
    deleteUser: deleteUserWithOptimistic,
  };
};

// Custom search hook with debouncing
export const useUserSearch = (query: string, debounceMs: number = 300) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [query, debounceMs]);

  return useQuery({
    queryKey: ["users", "search", debouncedQuery],
    queryFn: ({ signal }) => userService.search(debouncedQuery, { signal }),
    enabled: debouncedQuery.length > 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUserProfile = () =>
  useQuery({
    queryKey: ["users", "profile"],
    queryFn: ({ signal }) => userService.getProfile({ signal }),
  });
