import { useCallback, useState } from "react";

export const useModal = () => {
  const [isOpen, setModalState] = useState(false);

  const toggleModal = useCallback(
    () => setModalState((prev) => !prev),
    [isOpen]
  );

  return { isOpen, toggleModal };
};
