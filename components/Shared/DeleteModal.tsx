"use client";

import { useModalContext } from "@/components/Context/modal";
import { Modal, Button, Label } from "flowbite-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import useAPI from "../Hooks/useAPI";

export default function DeleteModal({
  status,
  setStatus,
  role,
  role_key,
  url,
}: {
  status: boolean;
  setStatus: Function;
  role: string;
  role_key: number | undefined;
  url: string;
}) {
  const { trigger, isMutating, data, error } = useAPI(`${role}/${role_key}`);
  const { setConfigureModalStatus } = useModalContext();

  function onClose() {
    setStatus(false);
  }

  async function handleDelete() {
    await trigger(["DELETE", {}]);
    setStatus(false);
    setConfigureModalStatus(false);
    mutate(`https://api.singer.systems/${url}`);
    if (data?.success) {
      toast.success(`${data.json.message}`);
    } else {
      toast.error(`${data?.json.message}`);
    }
  }

  return (
    <Modal show={status} onClose={onClose}>
      <Modal.Body>
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
          {/* Show a differnt label depending on the role of the modal. */}
          <Label className="text-l font-bold">
            {role === "deltas"
              ? "Are you sure you want to delete this Delta (including all Rivers and Streams)?"
              : role === "rivers"
              ? "Are you sure you want to delete this River (including all Streams)?"
              : role === "flows"
              ? "Are you sure you want to delete this Flow?"
              : role === "streams" &&
                "Are you sure you want to delete this Stream?"}
          </Label>
          <Label className="text-xl italic">
            This could cause a lot of problems.
          </Label>
        </div>
        <br />
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => handleDelete()}
            color="failure"
            className="font-bold italic"
          >
            Yes, goodbye
          </Button>
          <Button onClick={onClose} color="purple">
            No, close one
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
