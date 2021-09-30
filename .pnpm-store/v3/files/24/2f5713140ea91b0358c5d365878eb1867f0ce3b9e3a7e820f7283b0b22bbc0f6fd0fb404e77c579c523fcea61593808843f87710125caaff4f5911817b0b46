import * as React from "react";
import { usePopoverState, Popover, PopoverDisclosure } from "reakit/Popover";
import { data } from "./data";
import BlockList from "./BlockList";
import ArrowDown from "./ArrowDown";
import "./style.css";

export default function ComboboxListGridWithPopover() {
  const popover = usePopoverState({ placement: "bottom-start", gutter: 8 });
  return (
    <>
      <PopoverDisclosure {...popover}>
        Blocks <ArrowDown />
      </PopoverDisclosure>
      <Popover {...popover} aria-label="Blocks">
        {popover.visible && <BlockList initialItems={data} />}
      </Popover>
    </>
  );
}
