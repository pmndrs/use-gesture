import React from 'react'
import styled from '@xstyled/styled-components'
import { AppHeader } from './AppHeader'
import { Head } from './Head'

const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`

const Main = styled.main`
  background-color: background;
  flex: 1;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

export function PageLayout({ children, title }) {
  return (
    <>
      <Head title={title} />
      <Container>
        <StickyHeader>
          <AppHeader />
        </StickyHeader>
        <Main id="main">{children}</Main>
      </Container>
    </>
  )
}
