import * as React from "react";
import { render, focus, click, press } from "reakit-test-utils";
import { Tab, TabList, TabPanel, useTabState } from "..";

test("first tab is selected", () => {
  const Test = () => {
    const tab = useTabState();
    return (
      <>
        <TabList {...tab} aria-label="tablist">
          <Tab {...tab}>tab1</Tab>
          <Tab {...tab}>tab2</Tab>
          <Tab {...tab}>tab3</Tab>
        </TabList>
        <TabPanel {...tab}>tabpanel1</TabPanel>
        <TabPanel {...tab}>tabpanel2</TabPanel>
        <TabPanel {...tab}>tabpanel3</TabPanel>
      </>
    );
  };
  const { getByText: $ } = render(<Test />);
  expect($("tabpanel1")).toBeVisible();
  expect($("tabpanel2")).not.toBeVisible();
  expect($("tabpanel3")).not.toBeVisible();
});

test("first tab is selected with tablist below", () => {
  const Test = () => {
    const tab = useTabState();
    return (
      <>
        <TabPanel {...tab}>tabpanel1</TabPanel>
        <TabPanel {...tab}>tabpanel2</TabPanel>
        <TabPanel {...tab}>tabpanel3</TabPanel>
        <TabList {...tab} aria-label="tablist">
          <Tab {...tab}>tab1</Tab>
          <Tab {...tab}>tab2</Tab>
          <Tab {...tab}>tab3</Tab>
        </TabList>
      </>
    );
  };
  const { getByText: $ } = render(<Test />);
  expect($("tabpanel1")).toBeVisible();
  expect($("tabpanel2")).not.toBeVisible();
  expect($("tabpanel3")).not.toBeVisible();
});

test("focusing tab reveals the panel", () => {
  const Test = () => {
    const tab = useTabState();
    return (
      <>
        <TabList {...tab} aria-label="tablist">
          <Tab {...tab}>tab1</Tab>
          <Tab {...tab}>tab2</Tab>
          <Tab {...tab}>tab3</Tab>
        </TabList>
        <TabPanel {...tab}>tabpanel1</TabPanel>
        <TabPanel {...tab}>tabpanel2</TabPanel>
        <TabPanel {...tab}>tabpanel3</TabPanel>
      </>
    );
  };
  const { getByText: $ } = render(<Test />);
  expect($("tabpanel2")).not.toBeVisible();
  focus($("tab2"));
  expect($("tabpanel1")).not.toBeVisible();
  expect($("tabpanel2")).toBeVisible();
  expect($("tabpanel3")).not.toBeVisible();
});

test("focusing tab does not reveal the panel when manual is true", () => {
  const Test = () => {
    const tab = useTabState({ manual: true });
    return (
      <>
        <TabList {...tab} aria-label="tablist">
          <Tab {...tab}>tab1</Tab>
          <Tab {...tab}>tab2</Tab>
          <Tab {...tab}>tab3</Tab>
        </TabList>
        <TabPanel {...tab}>tabpanel1</TabPanel>
        <TabPanel {...tab}>tabpanel2</TabPanel>
        <TabPanel {...tab}>tabpanel3</TabPanel>
      </>
    );
  };
  const { getByText: $ } = render(<Test />);
  expect($("tabpanel2")).not.toBeVisible();
  focus($("tab2"));
  expect($("tabpanel2")).not.toBeVisible();
});

test("clicking on tab reveals the panel", () => {
  const Test = () => {
    const tab = useTabState();
    return (
      <>
        <TabList {...tab} aria-label="tablist">
          <Tab {...tab}>tab1</Tab>
          <Tab {...tab}>tab2</Tab>
          <Tab {...tab}>tab3</Tab>
        </TabList>
        <TabPanel {...tab}>tabpanel1</TabPanel>
        <TabPanel {...tab}>tabpanel2</TabPanel>
        <TabPanel {...tab}>tabpanel3</TabPanel>
      </>
    );
  };
  const { getByText: $ } = render(<Test />);
  expect($("tabpanel3")).not.toBeVisible();
  click($("tab3"));
  expect($("tabpanel3")).toBeVisible();
});

test("clicking on tab reveals the panel when manual is true", () => {
  const Test = () => {
    const tab = useTabState({ manual: true });
    return (
      <>
        <TabList {...tab} aria-label="tablist">
          <Tab {...tab}>tab1</Tab>
          <Tab {...tab}>tab2</Tab>
          <Tab {...tab}>tab3</Tab>
        </TabList>
        <TabPanel {...tab}>tabpanel1</TabPanel>
        <TabPanel {...tab}>tabpanel2</TabPanel>
        <TabPanel {...tab}>tabpanel3</TabPanel>
      </>
    );
  };
  const { getByText: $ } = render(<Test />);
  expect($("tabpanel3")).not.toBeVisible();
  click($("tab3"));
  expect($("tabpanel3")).toBeVisible();
});

test("tab is selected based on the value of selectedId", () => {
  const Test = () => {
    const tab = useTabState({ selectedId: "tab2" });
    return (
      <>
        <TabList {...tab} aria-label="tablist">
          <Tab {...tab}>tab1</Tab>
          <Tab {...tab} id="tab2">
            tab2
          </Tab>
          <Tab {...tab}>tab3</Tab>
        </TabList>
        <TabPanel {...tab}>tabpanel1</TabPanel>
        <TabPanel {...tab}>tabpanel2</TabPanel>
        <TabPanel {...tab}>tabpanel3</TabPanel>
      </>
    );
  };
  const { getByText: $ } = render(<Test />);
  expect($("tabpanel1")).not.toBeVisible();
  expect($("tabpanel2")).toBeVisible();
  expect($("tabpanel3")).not.toBeVisible();
});

test("tab is selected based on the value of selectedId with tablist below", () => {
  const Test = () => {
    const tab = useTabState({ selectedId: "tab2" });
    return (
      <>
        <TabPanel {...tab}>tabpanel1</TabPanel>
        <TabPanel {...tab}>tabpanel2</TabPanel>
        <TabPanel {...tab}>tabpanel3</TabPanel>
        <TabList {...tab} aria-label="tablist">
          <Tab {...tab}>tab1</Tab>
          <Tab {...tab} id="tab2">
            tab2
          </Tab>
          <Tab {...tab}>tab3</Tab>
        </TabList>
      </>
    );
  };
  const { getByText: $ } = render(<Test />);
  expect($("tabpanel1")).not.toBeVisible();
  expect($("tabpanel2")).toBeVisible();
  expect($("tabpanel3")).not.toBeVisible();
});

test("no tab is selected if selectedId is null", () => {
  const Test = () => {
    const tab = useTabState({ selectedId: null });
    return (
      <>
        <TabList {...tab} aria-label="tablist">
          <Tab {...tab}>tab1</Tab>
          <Tab {...tab}>tab2</Tab>
          <Tab {...tab}>tab3</Tab>
        </TabList>
        <TabPanel {...tab}>tabpanel1</TabPanel>
        <TabPanel {...tab}>tabpanel2</TabPanel>
        <TabPanel {...tab}>tabpanel3</TabPanel>
      </>
    );
  };
  const { getByText: $ } = render(<Test />);
  expect($("tabpanel1")).not.toBeVisible();
  expect($("tabpanel2")).not.toBeVisible();
  expect($("tabpanel3")).not.toBeVisible();
});

test("select the last selected tab when the current one is unmounted", () => {
  const Test = ({ renderTab2 = false }) => {
    const tab = useTabState();
    return (
      <>
        <TabList {...tab} aria-label="tablist">
          <Tab {...tab}>tab1</Tab>
          {renderTab2 && <Tab {...tab}>tab2</Tab>}
          <Tab {...tab}>tab3</Tab>
          <Tab {...tab}>tab4</Tab>
        </TabList>
        <TabPanel {...tab}>tabpanel1</TabPanel>
        {renderTab2 && <TabPanel {...tab}>tabpanel2</TabPanel>}
        <TabPanel {...tab}>tabpanel3</TabPanel>
        <TabPanel {...tab}>tabpanel4</TabPanel>
      </>
    );
  };
  const { getByText: $, rerender } = render(<Test renderTab2 />);
  expect($("tabpanel1")).toBeVisible();
  click($("tab4"));
  expect($("tabpanel4")).toBeVisible();
  click($("tab2"));
  expect($("tabpanel2")).toBeVisible();
  rerender(<Test />);
  expect($("tabpanel4")).toBeVisible();
});

test("select the last selected tab when the current one is unmounted with tablist below", () => {
  const Test = ({ renderTab2 = false }) => {
    const tab = useTabState();
    return (
      <>
        <TabPanel {...tab}>tabpanel1</TabPanel>
        {renderTab2 && <TabPanel {...tab}>tabpanel2</TabPanel>}
        <TabPanel {...tab}>tabpanel3</TabPanel>
        <TabPanel {...tab}>tabpanel4</TabPanel>
        <TabList {...tab} aria-label="tablist">
          <Tab {...tab}>tab1</Tab>
          {renderTab2 && <Tab {...tab}>tab2</Tab>}
          <Tab {...tab}>tab3</Tab>
          <Tab {...tab}>tab4</Tab>
        </TabList>
      </>
    );
  };
  const { getByText: $, rerender } = render(<Test renderTab2 />);
  expect($("tabpanel1")).toBeVisible();
  click($("tab4"));
  expect($("tabpanel4")).toBeVisible();
  click($("tab2"));
  expect($("tabpanel2")).toBeVisible();
  rerender(<Test />);
  expect($("tabpanel4")).toBeVisible();
});

test("select the last selected tab when the current one is unmounted when manual is true", () => {
  const Test = ({ renderTab2 = false }) => {
    const tab = useTabState({ manual: true });
    return (
      <>
        <TabList {...tab} aria-label="tablist">
          <Tab {...tab}>tab1</Tab>
          {renderTab2 && <Tab {...tab}>tab2</Tab>}
          <Tab {...tab}>tab3</Tab>
          <Tab {...tab}>tab4</Tab>
        </TabList>
        <TabPanel {...tab}>tabpanel1</TabPanel>
        {renderTab2 && <TabPanel {...tab}>tabpanel2</TabPanel>}
        <TabPanel {...tab}>tabpanel3</TabPanel>
        <TabPanel {...tab}>tabpanel4</TabPanel>
      </>
    );
  };
  const { getByText: $, rerender } = render(<Test renderTab2 />);
  expect($("tabpanel1")).toBeVisible();
  click($("tab4"));
  expect($("tabpanel4")).toBeVisible();
  click($("tab2"));
  expect($("tabpanel2")).toBeVisible();
  rerender(<Test />);
  expect($("tabpanel4")).toBeVisible();
});

test("select the last selected tab when the current one is unmounted when id is passed", () => {
  const Test = ({ renderTab2 = false }) => {
    const tab = useTabState({ manual: true });
    return (
      <>
        <TabList {...tab} id="base" aria-label="tablist">
          <Tab {...tab}>tab1</Tab>
          {renderTab2 && <Tab {...tab}>tab2</Tab>}
          <Tab {...tab}>tab3</Tab>
          <Tab {...tab}>tab4</Tab>
        </TabList>
        <TabPanel {...tab}>tabpanel1</TabPanel>
        {renderTab2 && <TabPanel {...tab}>tabpanel2</TabPanel>}
        <TabPanel {...tab}>tabpanel3</TabPanel>
        <TabPanel {...tab}>tabpanel4</TabPanel>
      </>
    );
  };
  const { getByText: $, rerender } = render(<Test renderTab2 />);
  expect($("tabpanel1")).toBeVisible();
  click($("tab4"));
  expect($("tabpanel4")).toBeVisible();
  click($("tab2"));
  expect($("tabpanel2")).toBeVisible();
  rerender(<Test />);
  expect($("tabpanel4")).toBeVisible();
});

test("can't select disabled tab", () => {
  const Test = () => {
    const tab = useTabState();
    return (
      <>
        <TabList {...tab} id="base" aria-label="tablist">
          <Tab {...tab}>tab1</Tab>
          <Tab {...tab} disabled>
            tab2
          </Tab>
          <Tab {...tab}>tab3</Tab>
        </TabList>
        <TabPanel {...tab}>tabpanel1</TabPanel>
        <TabPanel {...tab}>tabpanel2</TabPanel>
        <TabPanel {...tab}>tabpanel3</TabPanel>
      </>
    );
  };
  const { getByText: $ } = render(<Test />);
  click($("tab2"));
  expect($("tab2")).not.toHaveFocus();
  expect($("tabpanel2")).not.toBeVisible();
  press.Tab();
  expect($("tab1")).toHaveFocus();
  expect($("tabpanel1")).toBeVisible();
  press.ArrowRight();
  expect($("tab2")).toHaveFocus();
  expect($("tabpanel2")).not.toBeVisible();
});

test("tab panel with tabId different order", () => {
  const Test = () => {
    const tab = useTabState({ baseId: "base" });
    return (
      <>
        <TabList {...tab} aria-label="tablist">
          <Tab {...tab} id="tab1">
            tab1
          </Tab>
          <Tab {...tab}>tab2</Tab>
          <Tab {...tab}>tab3</Tab>
        </TabList>
        <TabPanel {...tab}>tabpanel2</TabPanel>
        <TabPanel {...tab} tabId="tab1">
          tabpanel1
        </TabPanel>
        <TabPanel {...tab}>tabpanel3</TabPanel>
      </>
    );
  };
  const { container } = render(<Test />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        aria-label="tablist"
        id="base"
        role="tablist"
      >
        <button
          aria-controls="base-5"
          aria-selected="true"
          id="tab1"
          role="tab"
          tabindex="0"
        >
          tab1
        </button>
        <button
          aria-controls="base-4"
          aria-selected="false"
          id="base-2"
          role="tab"
          tabindex="-1"
        >
          tab2
        </button>
        <button
          aria-controls="base-6"
          aria-selected="false"
          id="base-3"
          role="tab"
          tabindex="-1"
        >
          tab3
        </button>
      </div>
      <div
        aria-labelledby="base-2"
        hidden=""
        id="base-4"
        role="tabpanel"
        style="display: none;"
        tabindex="0"
      >
        tabpanel2
      </div>
      <div
        aria-labelledby="tab1"
        id="base-5"
        role="tabpanel"
        style=""
        tabindex="0"
      >
        tabpanel1
      </div>
      <div
        aria-labelledby="base-3"
        hidden=""
        id="base-6"
        role="tabpanel"
        style="display: none;"
        tabindex="0"
      >
        tabpanel3
      </div>
    </div>
  `);
});
