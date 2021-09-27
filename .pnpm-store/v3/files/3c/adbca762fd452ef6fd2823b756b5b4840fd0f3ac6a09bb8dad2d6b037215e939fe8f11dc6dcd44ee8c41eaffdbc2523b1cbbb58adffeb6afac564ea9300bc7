import styled from '@xstyled/styled-components'

export const Input = styled.input`
  appearance: none;
  background-color: control-background;
  border-radius: control;
  border-style: solid;
  border-width: control;
  border-color: control-border;
  line-height: control;
  padding: 1 2;
  color: control-on;
  transition: control;

  &::placeholder {
    color: control-placeholder;
  }

  &:hover {
    border-color: control-border-hover;
  }

  &:focus {
    outline: none;
    box-shadow: control-focus;
    border-color: control-border-active;
  }
`

export const InputGroup = styled.div`
  display: inline-flex;
  color: control-placeholder;
  transition: control;
  position: relative;

  &:focus-within {
    color: control-on;
  }

  > ${Input} {
    flex: 1 1 auto;
    width: 1%;
    min-width: 0;
    padding-left: 32;
  }

  > .algolia-autocomplete {
    flex: 1 1 auto;
    width: 1%;
    min-width: 0;

    > ${Input} {
      padding-left: 32;
    }
  }
`

export const InputGroupIcon = styled.div`
  display: flex;
  position: absolute;
  padding: 1 2;
  height: 100%;
  align-items: center;
  user-select: none;
  pointer-events: none;
  z-index: 1;
`
