import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface ParkingSearchProps {
  handleParkingSearch: () => void;
  loading: boolean;
}

export const Window = ({
  handleParkingSearch,
  loading,
}: ParkingSearchProps) => {
  return (
    <div className="fixed py-1 px-1 z-10">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md w-80">
        <h2 className="text-2xl font-semibold mb-4 text-blue-500">
          OpenParkingMap
        </h2>

        {loading ? (
          <div className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">
            loading
          </div>
        ) : (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
            onClick={handleParkingSearch}
          >
            View Surface Parking
          </button>
        )}

        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-500 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                <span>Details</span>
                <ChevronDownIcon
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-blue-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                Coming soon
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-500 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 mt-4">
                <span>More Information</span>
                <ChevronDownIcon
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-blue-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                Coming soon
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};
