import * as React from "react";
import { Checkbox as BaseCheckbox, useCheckboxState } from "reakit/Checkbox";

import "./style.css";

export default function Checkbox() {
  const checkbox = useCheckboxState();

  return (
    <label className="checkbox">
      <BaseCheckbox
        {...checkbox}
        as="button"
        type="button"
        className="checkbox-control"
        aria-labelledby="checkbox-label"
      >
        <CheckIcon className="checkbox-check-icon" aria-hidden />
      </BaseCheckbox>
      <span id="checkbox-label">Checkbox</span>
    </label>
  );
}

type CheckIconProps = {
  className?: string;
};

function CheckIcon({ className }: CheckIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      width="1em"
      height="1em"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
