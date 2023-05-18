import { useRef } from "react";
import { Dialog } from "@headlessui/react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

import React from "react";

const GithubIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="24"
    height="24"
    {...props}
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.636 11.636 0 0 1 12 5.067c1.02.004 2.04.137 3-.407 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.625-5.475 5.925.42.36.81 1.096.81 2.22 0 1.604-.015 2.896-.015 3.286 0 .32.21.694.825.577C20.565 22.097 24 17.6 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedinIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
  >
    <path d="M4.98 3.5C3.79 3.5 3 4.29 3 5.5s.79 2 1.98 2C6.21 7.5 7 6.71 7 5.5S6.21 3.5 4.98 3.5zM4 12.9h3V21H4v-8.1zM9 12.9h3v1.548c.502-.828 1.838-2.029 3.96-2.029 4.22 0 5 2.936 5 6.758V21H18v-7.274c0-1.845-.396-3.267-2.63-3.267-1.398 0-2.37.994-2.768 1.845-.143.35-.18.84-.18 1.331V21H9V12.9z" />
  </svg>
);

interface ModalProps {
  showInfoModal: boolean;
  setShowInfoModal: (showZoomModal: boolean) => void;
}

const Link = ({ href, children }: { href: string; children: any }) => (
  <a
    className="text-blue-600 hover:text-blue-800"
    href={href}
    target="_blank"
    rel="noreferrer"
  >
    {children}
  </a>
);

export default function InfoModal({
  showInfoModal,
  setShowInfoModal,
}: ModalProps) {
  const cancelButtonRef = useRef(null);

  return (
    <Dialog
      as="div"
      className="relative z-100"
      initialFocus={cancelButtonRef}
      onClose={() => setShowInfoModal(false)}
      open={showInfoModal}
    >
      <div className="fixed inset-0 z-100 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    OpenParkingMap
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="text-sm text-gray-500">
                      {` This project was inspired by reading `}
                      <Link href="https://www.amazon.com/High-Cost-Free-Parking-Updated/dp/193236496X">
                        {` The High Cost of Free Parking`}
                      </Link>
                      {`, by Donald Shoup. From the description:`}
                      <br />
                      <br />
                      <blockquote className="pl-4 border-l-2 border-gray-400">
                        {`Planners mandate free parking to alleviate
                            congestion but end up distorting transportation
                            choices, debasing urban design, damaging the
                            economy, and degrading the environment. Ubiquitous
                            free parking helps explain why our cities sprawl on
                            a scale fit more for cars than for people, and why
                            American motor vehicles now consume one-eighth of
                            the world's total oil production. But it doesn't
                            have to be this way.`}
                      </blockquote>
                      <br />
                      <Link href="https://www.nytimes.com/2023/03/07/business/fewer-parking-spots.html">
                        {`Here's`}
                      </Link>{" "}
                      {`a good recent NYT article on the subject. Also, check out `}
                      <a
                        className="text-blue-600 hover:text-blue-800"
                        href="https://parkingreform.org/"
                        target="_blank"
                        rel="noreferrer noopener"
                      ></a>
                      <Link href="https://parkingreform.org/">
                        {`The Parking Reform Network`}
                      </Link>
                      {"."}
                      <br />
                      <br />
                      {`Get in touch with me below.`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <Link href="mailto:brandon@openparkingmap.com">
                <div className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  <EnvelopeIcon className="w-5 h-5" />
                </div>
              </Link>
              <Link href="https://github.com/brandonfcohen1/openparkingmap/">
                <div className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 mr-2">
                  <GithubIcon className="w-5 h-5" />
                </div>
              </Link>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
