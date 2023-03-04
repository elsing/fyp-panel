"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

interface IModalContext {
  dataModalStatus: boolean;
  setDataModalStatus: Function;
  configureModalStatus: boolean;
  setConfigureModalStatus: Function;
  deleteModalStatus: boolean;
  setDeleteModalStatus: Function;
}

const ModalContext = createContext<IModalContext>({
  dataModalStatus: false,
  setDataModalStatus: () => {},
  configureModalStatus: false,
  setConfigureModalStatus: () => {},
  deleteModalStatus: false,
  setDeleteModalStatus: () => {},
});

export const useModalContext = () => useContext(ModalContext);

export default function StatusContext({ children }: PropsWithChildren) {
  const [dataModalStatus, setDataModalStatus] = useState(false);
  const [configureModalStatus, setConfigureModalStatus] = useState(false);
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        dataModalStatus,
        setDataModalStatus,
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
