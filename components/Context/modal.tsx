"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

interface IModalContext {
  configureModalStatus: boolean;
  setConfigureModalStatus: Function;
  deleteModalStatus: boolean;
  setDeleteModalStatus: Function;
}

const ModalContext = createContext<IModalContext>({
  configureModalStatus: false,
  setConfigureModalStatus: () => {},
  deleteModalStatus: false,
  setDeleteModalStatus: () => {},
});

export const useModalContext = () => useContext(ModalContext);

export default function StatusContext({ children }: PropsWithChildren) {
  const [configureModalStatus, setConfigureModalStatus] = useState(false);
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        configureModalStatus,
        setConfigureModalStatus,
        deleteModalStatus,
        setDeleteModalStatus,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
