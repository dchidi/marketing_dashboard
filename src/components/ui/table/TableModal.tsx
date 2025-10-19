import Modal from "../../layouts/modal/Modal";
import { Loading } from "../loading/Loading";
import Table from "./Table";

interface TableModalProps {
  modalState: boolean;
  closeModal: () => void;
  closeEvent: boolean;
  isFetching?: boolean;
  hasRequested?: boolean;
  isError?: boolean;
  error?: any;
  isSuccess?: boolean;
  data: any;
  columns: any;
  downloadHandler: any;
  paginationHandler: any;
}

export const TableModal: React.FC<TableModalProps> = ({
  modalState = false,
  closeModal,
  closeEvent = false,
  isFetching,
  hasRequested,
  isError,
  error,
  data,
  isSuccess,
  columns,
  downloadHandler,
  paginationHandler,
}) => {
  const showPrompt = !hasRequested && !isFetching && !isSuccess && !isError;
  return (
    <Modal
      isOpen={modalState}
      onClose={closeModal}
      allowKeyCloseEvent={closeEvent}
    >
      {showPrompt && <p>Click "View Data" to load details…</p>}

      {isFetching && <Loading />}

      {isError && (
        <p role="alert">
          Failed to load data: {String((error as any)?.message ?? error)}
        </p>
      )}

      {isSuccess && data && (
        <Table
          columns={columns}
          enableSorting
          enableFiltering
          downloadSourceData={downloadHandler}
          paramQueryFn={paginationHandler}
          isFetching={isFetching}
          {...data}
        />
      )}
    </Modal>
  );
};

