"use client";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { FilePenLine } from "lucide-react";

function AlertDialogEditButton(props: { alertId: number }) {
  const router = useRouter();

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = async (itemId: number) => {
    try {
   
      router.push(`/edit/${itemId}`);
    
      close();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button
        onClick={open}
        className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        <FilePenLine className="ml-2 h-6 w-6" />
      </Button>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="data-[closed]:transform-[scale(95%)] w-full max-w-md rounded-xl bg-white/10 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:opacity-0">
              <DialogTitle>
                <img
                  src="https://res.cloudinary.com/satjay/image/upload/v1705293483/ptzmq3vg2zb4i9wqi8xy.jpg"
                  alt=""
                  className="h-12 w-12 rounded-md"
                />
              </DialogTitle>
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-black/80"
              >
                คุณต้องการแก้ไข ID {props.alertId}?
              </DialogTitle>

              <p className="mt-2 text-sm/6 text-black/80">
                แก้ไขข้อมูลการบันทึกที่เลือกไว้ที่นี่!
                !!!
              </p>
              <div className="mt-4 gap-3 space-x-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                  onClick={() => handleEdit(props.alertId)}
                >
                  แก้ไข
                </Button>

                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-black/20 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                  onClick={close}
                >
                    ยกเลิก
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default AlertDialogEditButton;
