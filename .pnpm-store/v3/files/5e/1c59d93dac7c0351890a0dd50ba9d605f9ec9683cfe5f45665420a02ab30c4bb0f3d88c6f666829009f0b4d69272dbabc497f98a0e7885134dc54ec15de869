import * as React from "react";
import { useCompositeState, Composite, CompositeItem } from "reakit/Composite";

type Props<T = any> = React.HTMLAttributes<T> & {
  setEvents: React.Dispatch<React.SetStateAction<string[]>>;
};

function mergeEvent<
  E extends React.SyntheticEvent,
  T extends React.EventHandler<E>
>(handler: T, htmlHandler?: T) {
  return (event: E) => {
    htmlHandler?.(event);
    handler(event);
  };
}

function getLabel(element: Element) {
  return element.getAttribute("aria-label") || element.textContent;
}

function onEvent(setEvents: React.Dispatch<React.SetStateAction<string[]>>) {
  return (event: React.SyntheticEvent | React.KeyboardEvent) => {
    const { type } = event;
    const target = event.target as HTMLElement;
    const label =
      target !== event.currentTarget
        ? `${getLabel(event.currentTarget)} - ${getLabel(target)}`
        : getLabel(target);

    const key = "key" in event ? ` (${event.key})` : "";
    setEvents((prevEvents) => [...prevEvents, `${type} ${label}${key}`]);
  };
}

const CustomContainer = React.forwardRef<HTMLDivElement, Props<HTMLDivElement>>(
  ({ setEvents, ...props }, ref) => (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={ref}
      {...props}
      onKeyDown={mergeEvent(onEvent(setEvents), props.onKeyDown)}
      onKeyUp={mergeEvent(onEvent(setEvents), props.onKeyUp)}
      onFocus={mergeEvent(onEvent(setEvents), props.onFocus)}
      onBlur={mergeEvent(onEvent(setEvents), props.onBlur)}
    />
  )
);

const CustomItem = React.forwardRef<
  HTMLButtonElement,
  Props<HTMLButtonElement>
>(({ setEvents, ...props }, ref) => (
  <button
    ref={ref}
    {...props}
    onKeyDown={mergeEvent(onEvent(setEvents), props.onKeyDown)}
    onKeyUp={mergeEvent(onEvent(setEvents), props.onKeyUp)}
    onFocus={mergeEvent(onEvent(setEvents), props.onFocus)}
    onBlur={mergeEvent(onEvent(setEvents), props.onBlur)}
  />
));

export default function CompositeVirtualAsProp() {
  const composite = useCompositeState({ unstable_virtual: true });
  const [events, setEvents] = React.useState<string[]>([]);
  return (
    <>
      <Composite
        {...composite}
        role="listbox"
        aria-label="composite"
        as={CustomContainer}
        setEvents={setEvents}
      >
        <CompositeItem
          {...composite}
          as={CustomItem}
          role="option"
          setEvents={setEvents}
        >
          Item 1
        </CompositeItem>
        <CompositeItem
          {...composite}
          as={CustomItem}
          role="option"
          setEvents={setEvents}
        >
          Item 2
        </CompositeItem>
        <CompositeItem
          {...composite}
          as={CustomItem}
          role="option"
          setEvents={setEvents}
        >
          Item 3
        </CompositeItem>
      </Composite>
      <ul aria-label="events">
        {events.map((event, i) => (
          <li key={i}>{event}</li>
        ))}
      </ul>
    </>
  );
}
