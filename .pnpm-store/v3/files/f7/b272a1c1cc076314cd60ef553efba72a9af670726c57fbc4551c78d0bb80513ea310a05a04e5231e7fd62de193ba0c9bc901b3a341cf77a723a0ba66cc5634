import React, { useState, useRef, useLayoutEffect } from 'react'
import { FolderTitle } from './FolderTitle'
import { StyledFolder, StyledWrapper, StyledContent } from './StyledFolder'
import { isInput } from '../Leva/tree'
import { join } from '../../utils'
import { Control } from '../Control'
import { useToggle } from '../../hooks'
import { useStoreContext } from '../../context'
import type { Tree } from '../../types'
import { useTh } from '../../styles'

type FolderProps = { name: string; path?: string; tree: Tree }

const Folder = ({ name, path, tree }: FolderProps) => {
  const store = useStoreContext()
  const newPath = join(path, name)
  const { collapsed, color } = store.getFolderSettings(newPath)
  const [toggled, setToggle] = useState(!collapsed)

  const folderRef = useRef<HTMLDivElement>(null)

  const widgetColor = useTh('colors', 'folderWidgetColor')
  const textColor = useTh('colors', 'folderTextColor')

  useLayoutEffect(() => {
    folderRef.current!.style.setProperty('--leva-colors-folderWidgetColor', color || widgetColor)
    folderRef.current!.style.setProperty('--leva-colors-folderTextColor', color || textColor)
  }, [color, widgetColor, textColor])

  return (
    <StyledFolder ref={folderRef}>
      <FolderTitle name={name!} toggled={toggled} toggle={() => setToggle((t) => !t)} />
      <TreeWrapper parent={newPath} tree={tree} toggled={toggled} />
    </StyledFolder>
  )
}

type TreeWrapperProps = {
  isRoot?: boolean
  fill?: boolean
  flat?: boolean
  parent?: string
  tree: Tree
  toggled: boolean
}

export const TreeWrapper = React.memo(
  ({ isRoot = false, fill = false, flat = false, parent, tree, toggled }: TreeWrapperProps) => {
    const { wrapperRef, contentRef } = useToggle(toggled)
    return (
      <StyledWrapper ref={wrapperRef} isRoot={isRoot} fill={fill} flat={flat}>
        <StyledContent ref={contentRef} isRoot={isRoot} toggled={toggled}>
          {Object.entries(tree).map(([key, value]) =>
            isInput(value) ? (
              // @ts-expect-error
              <Control key={value.path} valueKey={value.valueKey} path={value.path} />
            ) : (
              <Folder key={key} name={key} path={parent} tree={value as Tree} />
            )
          )}
        </StyledContent>
      </StyledWrapper>
    )
  }
)
