import * as React from "react";
import { useCompositeState, Composite, CompositeItem } from "reakit/Composite";

export default function VirtualCompositeWithFocusBlur() {
  const composite = useCompositeState({ unstable_virtual: true });
  const [events, setEvents] = React.useState<string[]>([]);
  const onContainerEvent = React.useCallback((event: React.FocusEvent) => {
    const { type, currentTarget, target } = event;
    const isContainer = currentTarget === target;
    const textContent = isContainer ? "" : ` - ${target.textContent}`;
    setEvents((prevEvents) => [
      ...prevEvents,
      `${type} container${textContent}`,
    ]);
  }, []);
  const onItemEvent = React.useCallback((event: React.FocusEvent) => {
    const { type, currentTarget } = event;
    setEvents((prevEvents) => [
      ...prevEvents,
      `${type} ${currentTarget.textContent}`,
    ]);
  }, []);
  return (
    <>
      <Composite
        {...composite}
        as="ul"
        role="listbox"
        aria-label="Items"
        onFocus={onContainerEvent}
        onBlur={onContainerEvent}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <CompositeItem
            {...composite}
            onBlur={onItemEvent}
            onFocus={onItemEvent}
            key={i}
            as="li"
            role="option"
          >{`item-${i}`}</CompositeItem>
        ))}
      </Composite>
      <div role="log">
        <ul>
          {events.map((event, i) => (
            <li key={i}>{event}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
