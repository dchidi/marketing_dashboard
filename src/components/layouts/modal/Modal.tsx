import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { MdClose } from "react-icons/md";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  hasCloseBtn?: boolean;
  allowKeyCloseEvent?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  hasCloseBtn = true,
  allowKeyCloseEvent = true,
  className,
}) => {
  // Get the modal root element from the document.
  const modalRoot = document.getElementById("modal-root");

  // Escape key handler to close the modal.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && allowKeyCloseEvent === true) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    // Cleanup the event listener on component unmount or when modal is closed.
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Render nothing if the modal is not open or if no modal root is found.
  if (!isOpen || !modalRoot) {
    return null;
  }

  return createPortal(
    <div
      className={styles.modalOverlay}
      onClick={allowKeyCloseEvent ? onClose : () => {}}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      {/* Stop propagation to prevent closing modal when clicking inside content */}
      <div
        className={`${styles.modalContent} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {hasCloseBtn && (
          <MdClose
            className={styles.modalClose}
            onClick={onClose}
            aria-label="Close modal"
          />
        )}
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
