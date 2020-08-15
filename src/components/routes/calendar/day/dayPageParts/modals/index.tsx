import React, { useState, useCallback } from "react";

import AddPastoralVisitForm from "./AddPastoralVisitForm";
import UpdatePastoralVisitForm from "./UpdatePastoralVisitForm";
import EditAssignedStreetsFormModal from "./EditAssignedStreetsFormModal";

interface Props {
  children: (handlers: {
    openAddPastoralVisitModal: () => void;
    openAssignedStreetsModal: () => void;
    openUpdatePastoralVisitModal: (id: string) => void;
  }) => void;
}

export enum ModalType {
  CLOSED,
  ASSIGNED_STREETS,
  UPDATE_PASTORAL_VISIT,
  ADD_PASTORAL_VISIT,
}

export type ModalState =
  | {
      type: ModalType.CLOSED;
    }
  | {
      type: ModalType.ASSIGNED_STREETS;
    }
  | {
      type: ModalType.ADD_PASTORAL_VISIT;
    }
  | {
      type: ModalType.UPDATE_PASTORAL_VISIT;
      payload: { id: string };
    };

const DayModals: React.FC<Props> = ({ children }) => {
  const [modal, setModal] = useState<ModalState>({ type: ModalType.CLOSED });

  const handleModalClose = useCallback(
    () => setModal({ type: ModalType.CLOSED }),
    []
  );
  const handleAssignedStreetsModalOpen = useCallback(
    () => setModal({ type: ModalType.ASSIGNED_STREETS }),
    []
  );

  const handleAddPastoralVisitModalOpen = useCallback(
    () => setModal({ type: ModalType.ADD_PASTORAL_VISIT }),
    []
  );
  const handleUpdatePastoralVisitModalOpen = useCallback((id: string) => {
    console.log(id);
    return setModal({ type: ModalType.UPDATE_PASTORAL_VISIT, payload: { id } });
  }, []);

  //IEFE
  const modalElement = (() => {
    switch (modal.type) {
      case ModalType.ADD_PASTORAL_VISIT:
        return <AddPastoralVisitForm onModalClose={handleModalClose} />;

      case ModalType.UPDATE_PASTORAL_VISIT:
        return (
          <UpdatePastoralVisitForm
            pastoralVisitId={modal.payload.id}
            onModalClose={handleModalClose}
          />
        );

      case ModalType.ASSIGNED_STREETS:
        return <EditAssignedStreetsFormModal onModalClose={handleModalClose} />;

      default:
        return null;
    }
  })();

  return (
    <>
      {modalElement}
      {children({
        openAddPastoralVisitModal: handleAddPastoralVisitModalOpen,
        openAssignedStreetsModal: handleAssignedStreetsModalOpen,
        openUpdatePastoralVisitModal: handleUpdatePastoralVisitModalOpen,
      })}
    </>
  );
};

export default DayModals;
