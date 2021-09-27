import * as React from "react";
import { Button } from "reakit/Button";
import {
  useCompositeState,
  Composite,
  CompositeItem,
  CompositeGroup,
  CompositeStateReturn,
} from "reakit/Composite";

const CompositeContext = React.createContext<CompositeStateReturn | null>(null);
const SetCompositeContext = React.createContext<React.Dispatch<
  React.SetStateAction<CompositeStateReturn>
> | null>(null);

const Provider: React.FC = (props) => {
  const [
    composite,
    setCompositeState,
  ] = React.useState<CompositeStateReturn | null>(null);
  return (
    <SetCompositeContext.Provider value={setCompositeState}>
      <CompositeContext.Provider value={composite}>
        {props.children}
      </CompositeContext.Provider>
    </SetCompositeContext.Provider>
  );
};

function Toolbar() {
  const composite = useCompositeState();
  const setCompositeContext = React.useContext(SetCompositeContext);
  React.useEffect(() => setCompositeContext?.(composite));
  return <Composite {...composite} role="toolbar" aria-label="composite" />;
}

function ToolbarItems() {
  const composite = React.useContext(CompositeContext);
  if (!composite) return null;
  return (
    <CompositeGroup {...composite}>
      <CompositeItem {...composite}>Item 1</CompositeItem>
      <CompositeItem {...composite}>Item 2</CompositeItem>
    </CompositeGroup>
  );
}

export default function DrillUpComposite() {
  const [showToolbar, setShowToolbar] = React.useState(true);
  return (
    <Provider>
      {showToolbar && <Toolbar />}
      {showToolbar && <ToolbarItems />}
      <Button onClick={() => setShowToolbar(!showToolbar)}>
        Toggle Toolbar
      </Button>
    </Provider>
  );
}
