"use client";

import { Label, Modal } from "flowbite-react";
import React from "react";

export default function CreateFlow() {
  return (
    <div className="border border-black h-screen w-screen absolute left-0 right-0 top-0 justify-center flex items-center ">
      {/* <div className="bg-blue-400 m-8 p-8">
        <h1>Create flow</h1>
        <h2>testing</h2>
      </div> */}

      <React.Fragment>
        <Modal
          show={false}
          size="md"
          popup={true}
          //   dismissable={true}
          // onClose=
        >
          <Modal.Header />
          <Modal.Body>
            <div className="bg-blue-400 m-8 p-8">
              <h1>Create flow</h1>
            </div>
            <div>
              <Label htmlFor="name" value="Name" />
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </div>
  );
}
