import React from 'react'
import { MDXProvider as BaseMDXProvider } from '@mdx-js/react'
import { Code } from './Code'
import { CarbonAd } from './CarbonAd'
import { Table, TableContainer } from './Table'

function transformCode({ children, className, ...props }) {
  const lang = className && className.split('-')[1]
  return (
    <Code lang={lang} {...props}>
      {children}
    </Code>
  )
}

function getCodeChild(children) {
  const childrenArray = React.Children.toArray(children)
  if (childrenArray.length !== 1) return null
  const [firstChild] = childrenArray
  if (firstChild.props.mdxType !== 'code') return null
  return firstChild
}

export const mdxComponents = {
  'carbon-ad': () => <CarbonAd />,
  pre: ({ children }) => {
    const codeChild = getCodeChild(children)
    return codeChild ? transformCode(codeChild.props) : <pre>{children}</pre>
  },
  table: ({ children }) => {
    return (
      <TableContainer>
        <Table>{children}</Table>
      </TableContainer>
    )
  },
}

export function MDXProvider({ children, components }) {
  return (
    <BaseMDXProvider components={{ ...mdxComponents, ...components }}>
      {children}
    </BaseMDXProvider>
  )
}
