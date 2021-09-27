import React from 'react';
import { FolderTitleProps } from '../Folder';
declare type FilterProps = {
    setFilter: (value: string) => void;
    toggle: (flag?: boolean) => void;
};
export declare type TitleWithFilterProps = FilterProps & FolderTitleProps & {
    onDrag: (point: {
        x?: number | undefined;
        y?: number | undefined;
    }) => void;
    title: React.ReactNode;
    drag: boolean;
    filterEnabled: boolean;
};
export declare function TitleWithFilter({ setFilter, onDrag, toggle, toggled, title, drag, filterEnabled, }: TitleWithFilterProps): JSX.Element;
export {};
