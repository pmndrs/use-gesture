import * as React from "react";
import { Button } from "reakit/Button";
import { Tooltip, TooltipReference, useTooltipState } from "reakit/Tooltip";

import "./style.css";

export default function ButtonWithTooltip() {
  const tooltip = useTooltipState();
  return (
    <>
      <TooltipReference {...tooltip} as={Button}>
        Button
      </TooltipReference>
      <Tooltip {...tooltip}>Tooltip</Tooltip>
    </>
  );
}
