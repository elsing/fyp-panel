"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

interface IModalContext {
  deltaModalStatus: boolean;
  setDeltaModalStatus: Function;
  flowModalStatus: boolean;
  setFlowModalStatus: Function;
  deleteModalStatus: boolean;
  setDeleteModalStatus: Function;
}

const ModalContext = createContext<IModalContext>({
  deltaModalStatus: false,
  setDeltaModalStatus: () => {},
  flowModalStatus: false,
  setFlowModalStatus: () => {},
  deleteModalStatus: false,
  setDeleteModalStatus: () => {},
});

export const useModalContext = () => useContext(ModalContext);

export default function StatusContext({ children }: PropsWithChildren) {
  const [deltaModalStatus, setDeltaModalStatus] = useState(false);
  const [flowModalStatus, setFlowModalStatus] = useState(false);
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        deltaModalStatus,
        setDeltaModalStatus,
        flowModalStatus,
        setFlowModalStatus,
        deleteModalStatus,
        setDeleteModalStatus,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
