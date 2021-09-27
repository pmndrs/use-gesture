import * as React from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  icon?: JSX.Element;
  isTabbable?: boolean;
};

function Block(
  { title, icon, isTabbable, ...props }: Props,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div {...props} ref={ref} tabIndex={isTabbable ? 0 : props.tabIndex}>
      {icon}
      {title}
    </div>
  );
}

export default React.forwardRef(Block);
