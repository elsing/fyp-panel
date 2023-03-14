"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

interface IModalContext {
  dataModalStatus: boolean;
  setDataModalStatus: Function;
  configureModalStatus: boolean;
  setConfigureModalStatus: Function;
  deleteModalStatus: boolean;
  setDeleteModalStatus: Function;
  objectID: number;
  setObjectID: Function;
}

const ModalContext = createContext<IModalContext>({
  dataModalStatus: false,
  setDataModalStatus: () => {},
  configureModalStatus: false,
  setConfigureModalStatus: () => {},
  deleteModalStatus: false,
  setDeleteModalStatus: () => {},
  objectID: 0,
  setObjectID: () => {},
});

export const useModalContext = () => useContext(ModalContext);

export default function StatusContext({ children }: PropsWithChildren) {
  const [dataModalStatus, setDataModalStatus] = useState(false);
  const [configureModalStatus, setConfigureModalStatus] = useState(false);
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);
  const [objectID, setObjectID] = useState<number>(0);

  return (
    <ModalContext.Provider
      value={{
        dataModalStatus,
        setDataModalStatus,
        configureModalStatus,
        setConfigureModalStatus,
        deleteModalStatus,
        setDeleteModalStatus,
        objectID,
        setObjectID,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
