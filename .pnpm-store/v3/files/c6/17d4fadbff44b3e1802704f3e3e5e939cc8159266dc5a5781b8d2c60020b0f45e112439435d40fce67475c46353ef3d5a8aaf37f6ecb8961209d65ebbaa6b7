import React, { useMemo, useState, useEffect, useRef } from 'react'
import { useDrag } from 'react-use-gesture'
import { debounce } from '../../utils'
import { FolderTitleProps } from '../Folder'
import { Chevron } from '../UI'
import { StyledFilterInput, StyledTitleWithFilter, TitleContainer, Icon, FilterWrapper } from './StyledFilter'

type FilterProps = { setFilter: (value: string) => void; toggle: (flag?: boolean) => void }

const FilterInput = React.forwardRef<HTMLInputElement, FilterProps>(({ setFilter, toggle }, ref) => {
  const [value, set] = useState('')
  const debouncedOnChange = useMemo<FilterProps['setFilter']>(() => debounce(setFilter, 250), [setFilter])
  const clear = () => {
    setFilter('')
    set('')
  }

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.currentTarget.value
    toggle(true)
    set(v)
  }

  useEffect(() => {
    debouncedOnChange(value)
  }, [value, debouncedOnChange])

  return (
    <>
      <StyledFilterInput
        ref={ref}
        value={value}
        placeholder="[Open filter with CMD+SHIFT+L]"
        onPointerDown={(e) => e.stopPropagation()}
        onChange={_onChange}
      />
      <Icon onClick={() => clear()} style={{ visibility: value ? 'visible' : 'hidden' }}>
        <svg xmlns="http://www.w3.org/2000/svg" height="14" width="14" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      </Icon>
    </>
  )
})

export type TitleWithFilterProps = FilterProps &
  FolderTitleProps & {
    onDrag: (point: { x?: number | undefined; y?: number | undefined }) => void
    title: React.ReactNode
    drag: boolean
    filterEnabled: boolean
  }

export function TitleWithFilter({
  setFilter,
  onDrag,
  toggle,
  toggled,
  title,
  drag,
  filterEnabled,
}: TitleWithFilterProps) {
  const [filterShown, setShowFilter] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (filterShown) inputRef.current?.focus()
    else inputRef.current?.blur()
  }, [filterShown])

  const bind = useDrag(({ offset: [x, y] }) => onDrag({ x, y }), { filterTaps: true })

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.key === 'L' && event.shiftKey && event.metaKey) {
        setShowFilter((f) => !f)
      }
    }
    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  return (
    <>
      <StyledTitleWithFilter mode={drag ? 'drag' : undefined}>
        <Icon active={!toggled} onClick={() => toggle()}>
          <Chevron toggled={toggled} width={12} height={8} />
        </Icon>
        <TitleContainer {...(drag ? bind() : {})} drag={drag} filterEnabled={filterEnabled}>
          {title === undefined && drag ? (
            <svg width="20" height="10" viewBox="0 0 28 14" xmlns="http://www.w3.org/2000/svg">
              <circle cx="2" cy="2" r="2" />
              <circle cx="14" cy="2" r="2" />
              <circle cx="26" cy="2" r="2" />
              <circle cx="2" cy="12" r="2" />
              <circle cx="14" cy="12" r="2" />
              <circle cx="26" cy="12" r="2" />
            </svg>
          ) : (
            title
          )}
        </TitleContainer>
        {filterEnabled && (
          <Icon active={filterShown} onClick={() => setShowFilter((f) => !f)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 20 20">
              <path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z"
                clipRule="evenodd"
              />
            </svg>
          </Icon>
        )}
      </StyledTitleWithFilter>
      <FilterWrapper toggled={filterShown}>
        <FilterInput ref={inputRef} setFilter={setFilter} toggle={toggle} />
      </FilterWrapper>
    </>
  )
}
