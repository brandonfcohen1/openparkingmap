import React, { Dispatch, ReactNode, SetStateAction } from "react";

export const CheckBox = ({
  children,
  isChecked,
  setIsChecked,
}: {
  children: ReactNode;
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
}) => (
  <div
    className="cursor-pointer"
    onClick={() => setIsChecked((isChecked) => !isChecked)}
  >
    <input
      type="checkbox"
      className="mb-3 cursor-pointer"
      checked={isChecked}
    />
    <label className="text-blue-500 m-3 select-none cursor-pointer">
      {children}
    </label>
  </div>
);
