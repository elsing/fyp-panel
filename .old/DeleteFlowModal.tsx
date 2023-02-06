"use client";

import { Modal, Button, Label } from "flowbite-react";

export default function DeleteFlowModal({
  status,
  setStatus,
  deleteFlow,
}: {
  status: boolean;
  setStatus: Function;
  deleteFlow: Function;
}) {
  function onClose() {
    setStatus(false);
  }

  return (
    <Modal title="Delete Flow" show={status} onClose={onClose}>
      <Modal.Body>
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-24 h-24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>

          <Label className="text-xl font-bold">
            Are you sure you want to delete this flow?
          </Label>
        </div>
        <br />
        <div className="flex justify-center gap-4">
          <Button onClick={onClose} color="purple">
            No, whoops
          </Button>
          <Button
            onClick={() => deleteFlow()}
            color="failure"
            className="font-bold italic"
          >
            Yes, goodbye
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
