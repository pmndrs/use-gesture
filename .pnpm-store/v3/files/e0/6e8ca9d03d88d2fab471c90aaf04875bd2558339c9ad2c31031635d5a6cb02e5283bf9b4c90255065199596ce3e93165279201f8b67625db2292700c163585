import styled, { createGlobalStyle } from 'styled-components'

const Global = createGlobalStyle<{ color: string }>`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    overflow: hidden;
  }

  #root {
    overflow: auto;
  }

  body {
    position: fixed;
    overflow: hidden;
    overscroll-behavior-y: none;
    font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif;
    color: black;
    background: ${props => props.color};
  }
`

const Box = styled.div<{ size: number; color: string }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${props => props.color};
  transition: 0.5s;
  cursor: pointer;
  border-radius: 7px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-auto-rows: 20px;
  font-variant-numeric: tabular-nums;
  padding: 20px;
  color: white;
`

const ScrollArea = styled.div<{ size: number | string; color: string }>`
  width: ${props => props.size};
  height: ${props => props.size};
  background-color: ${props => props.color};
  overflow: auto;
  margin-left: auto;
  margin-right: auto;
  border-radius: 7px;
`

const ScrollContent = styled.div`
  width: 1000px;
  height: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export { Global, Box, ScrollArea, ScrollContent }
