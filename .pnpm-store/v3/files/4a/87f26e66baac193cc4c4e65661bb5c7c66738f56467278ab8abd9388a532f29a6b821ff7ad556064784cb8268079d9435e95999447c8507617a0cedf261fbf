import styled, { up, css } from '@xstyled/styled-components'

export const TableContainer = styled.div`
  overflow-y: auto;
  margin: 3 0 2;

  ${up(
    'lg',
    css`
      max-height: 480;
    `,
  )}
`

export const Table = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  font-size: 90%;

  tr {
    background-color: transparent;
  }

  td,
  th {
    padding: 2 3;
  }

  th {
    color: on-background-light;
    background-color: background-light;
    font-weight: 600;
    z-index: 20;
    position: sticky;
    top: 0;
  }

  td {
    font-size: 85%;
    border-top: 1;
    border-bottom: 1;
    border-color: layout-border;
  }
`
