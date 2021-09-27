import * as React from "react";
import kebabCase from "lodash/kebabCase";
import {
  unstable_useGridState as useGridState,
  unstable_Grid as Grid,
  unstable_GridRow as GridRow,
  unstable_GridCell as GridCell,
} from "reakit/Grid";
import { data } from "./data";
import Block from "./Block";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  items: typeof data;
  "aria-label": string;
};

function groupItemsByCategory(items: typeof data) {
  const categories = [] as Array<{ title: string; items: typeof data }>;
  for (const item of items) {
    const category = categories.find((cat) => cat.title === item.category);
    if (category) {
      category.items = [...category.items, item];
    } else {
      categories.push({ title: item.category, items: [item] });
    }
  }
  return categories;
}

function chunk<T>(array: T[], columns = 1) {
  return Array.from({ length: Math.ceil(array.length / columns) }, (_, i) =>
    array.slice(i * columns, i * columns + columns)
  );
}

function getId(baseId: string, token: string) {
  return `${baseId}-${kebabCase(token)}`;
}

export default function BlockGrid({ items, ...props }: Props) {
  const grid = useGridState({ wrap: "horizontal", shift: true });
  const categories = React.useMemo(() => groupItemsByCategory(items), [items]);
  return (
    <Grid {...grid} {...props}>
      {categories.map((category) => {
        const titleId = getId(grid.baseId, category.title);
        return (
          <div role="rowgroup" key={category.title} aria-labelledby={titleId}>
            <h3 id={titleId}>{category.title}</h3>
            {chunk(category.items, 3).map((row, i) => (
              <GridRow {...grid} key={i}>
                {row.map((item, j) => (
                  <GridCell
                    {...grid}
                    as={Block}
                    key={item.title}
                    id={getId(grid.baseId, item.title)}
                    title={item.title}
                    icon={item.icon}
                    isTabbable={i + j === 0}
                  />
                ))}
              </GridRow>
            ))}
          </div>
        );
      })}
    </Grid>
  );
}
