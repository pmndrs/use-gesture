import * as React from "react";
import {
  unstable_useComboboxListGridState as useComboboxListGridState,
  unstable_Combobox as Combobox,
  unstable_ComboboxList as ComboboxList,
  unstable_ComboboxGridRow as ComboboxGridRow,
  unstable_ComboboxGridCell as ComboboxGridCell,
} from "reakit/Combobox";
import Block from "./Block";
import BlockGrid from "./BlockGrid";
import { data } from "./data";

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "list"> & {
  initialItems: typeof data;
};

function getValues(items: typeof data) {
  return items.map((item) => item.title);
}

function getIconFromValue(items: typeof data, value: string) {
  return items.find((item) => item.title === value)?.icon;
}

function onOptionClick(event: React.MouseEvent) {
  event.preventDefault();
}

export default function BlockList({ initialItems, ...props }: Props) {
  const ref = React.useRef<HTMLInputElement>(null);
  const initialValues = React.useMemo(() => getValues(initialItems), [
    initialItems,
  ]);
  const combobox = useComboboxListGridState({
    values: initialValues,
    limit: false,
    columns: 3,
    autoSelect: true,
    wrap: "horizontal",
    shift: true,
    minValueLength: 1,
  });
  return (
    <>
      <Combobox
        {...combobox}
        {...props}
        ref={ref}
        aria-label="Block search"
        placeholder="Search for a block"
      />
      {combobox.inputValue ? (
        combobox.matches.length ? (
          <ComboboxList {...combobox} aria-label="Block suggestions">
            {combobox.matches.map((values, i) => (
              <ComboboxGridRow {...combobox} key={i}>
                {values.map((val) => (
                  <ComboboxGridCell
                    {...combobox}
                    as={Block}
                    key={val}
                    value={val}
                    title={val}
                    icon={getIconFromValue(initialItems, val)}
                    onClick={onOptionClick}
                  />
                ))}
              </ComboboxGridRow>
            ))}
          </ComboboxList>
        ) : (
          <span>No results found</span>
        )
      ) : (
        <BlockGrid
          aria-label="Blocks"
          items={data}
          onKeyDown={(event) => {
            const { key } = event;
            if (key && key.length === 1) {
              ref.current?.focus();
            }
          }}
        />
      )}
      <footer>
        💡 Move through items with arrow keys. Press any character to search.
      </footer>
    </>
  );
}
