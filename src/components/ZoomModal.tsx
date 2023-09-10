import { useRef } from "react";
import { Dialog } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ZoomModalProps } from "@/types/ZoomModalProps";

export default function Modal({
  showZoomModal,
  setShowZoomModal,
}: ZoomModalProps) {
  const cancelButtonRef = useRef(null);

  return (
    <Dialog
      as="div"
      className="relative z-100"
      initialFocus={cancelButtonRef}
      onClose={() => setShowZoomModal(false)}
      open={showZoomModal}
    >
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Zoom In
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Zoom in to view parking data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
