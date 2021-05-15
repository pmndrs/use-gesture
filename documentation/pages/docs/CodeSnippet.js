import React from 'react'
import { Tabs, TabList as TL, Tab as T, TabPanels, TabPanel as TP } from '@reach/tabs'
import { Observe } from 'mdx-observable'
import styled from '@xstyled/styled-components'
import { Article } from 'smooth-doc/components'

import '@reach/tabs/styles.css'

export function TabPanel({ as = Article, ...props }) {
  return <TP as={as} {...props} />
}

const TabList = styled(TL)`
  background: transparent;
  font-weight: bold;
`

const Tab = styled(T)`
  padding: 1rem;
  border-width: 3px;
  &:focus {
    outline: none;
  }
  &[data-selected] {
    color: on-background-primary;
    border-color: on-background-primary;
  }
`

export function CodeSnippet({ children }) {
  return (
    <Observe>
      {({ setState, ...state }) => (
        <Tabs index={state.activeTabIndex} onChange={(newIndex) => setState({ activeTabIndex: newIndex })}>
          <TabList>
            <Tab>React</Tab>
            <Tab>Vanilla JS</Tab>
          </TabList>
          <TabPanels>{children}</TabPanels>
        </Tabs>
      )}
    </Observe>
  )
}
