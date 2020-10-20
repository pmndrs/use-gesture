import React from 'react'
import styled, { th, down, css } from '@xstyled/styled-components'

const Specs = styled.box`
  color: on-background-light;
  opacity: 0.6;
  font-size: 0.85em;
  margin-top: ${th.px(-9)};
  overflow-x: scroll;
  border-left: 3px solid;
  border-left-color: layout-border;
  padding-left: 10px;
  ${down(
    'sm',
    css`
      margin-left: -16px;
    `
  )}
`

const Row = styled.box`
  &:first-child {
    margin-bottom: 10px;
  }
  display: flex;
  white-space: pre;
  padding: 0 4px;
  > div:first-child {
    width: 80px;
    font-weight: 600;
    margin-right: 10px;
    flex-shrink: 0;
  }
  ul {
    margin: 0;
    font-size: inherit;
    padding-left: 0;
    li {
      margin: 0;
    }
  }
  code {
    background: none;
    padding: none;
    color: inherit;
  }
`

export default function ({ types, defaultValue }) {
  const t = Array.isArray(types) ? types : [types]
  const l = t.join('').length
  return (
    <Specs>
      <Row>
        <div>Type{t.length > 1 && 's'}</div>
        {l < 50 ? (
          t.join(' | ')
        ) : (
          <ul>
            {t.map(v => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        )}
      </Row>
      <Row>
        <div>Default</div>
        <div>{defaultValue}</div>
      </Row>
    </Specs>
  )
}
