import React, { createContext, useState, useContext, useCallback } from "react";
import { useFilterLocalStore } from "../hooks/useFilterLocalStore";
import type { storeProps } from "../components/features/quote/types";
import { DEFAULT_LIMIT, DEFAULT_SKIP } from "../constants";

interface PaginationProps {
  limit: number;
  skip: number;
}

interface FilterContextType {
  store: any;
  setStore: any;
  openModal: (modalKey: string) => void;
  closeModal: () => void;
  toggleModal: (modalKey: string) => void;
  isModalOpen: (modalKey: string) => boolean;
  pagination: PaginationProps;
  setPagination: React.Dispatch<React.SetStateAction<PaginationProps>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const { getFromLocalStorage } = useFilterLocalStore();
  const filters: storeProps = getFromLocalStorage("filterPrefs");

  const [store, setStore] = useState<storeProps>(filters);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = useCallback((modalKey: string) => {
    setActiveModal(modalKey);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    // verify this
    setPagination((prev) => ({ ...prev, skip: DEFAULT_SKIP }));
  }, []);

  const toggleModal = useCallback((modalKey: string) => {
    setActiveModal((prev) => (prev === modalKey ? null : modalKey));
  }, []);

  const isModalOpen = useCallback(
    (modalKey: string) => activeModal === modalKey,
    [activeModal]
  );

  const [pagination, setPagination] = useState<PaginationProps>({
    limit: filters?.limit ? parseInt(filters.limit, 10) : DEFAULT_LIMIT,
    skip: filters?.skip ? parseInt(filters.skip, 10) : DEFAULT_SKIP,
  });

  return (
    <FilterContext
      value={{
        store,
        setStore,
        openModal,
        closeModal,
        toggleModal,
        isModalOpen,
        pagination,
        setPagination,
      }}
    >
      {children}
    </FilterContext>
  );
};

export const useFilterCtx = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error("useFilter must be used within FilterProvider");
  return context;
};
