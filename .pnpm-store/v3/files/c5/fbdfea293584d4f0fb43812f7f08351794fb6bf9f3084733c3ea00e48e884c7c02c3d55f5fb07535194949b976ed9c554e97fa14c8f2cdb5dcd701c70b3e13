import { graphql } from 'gatsby'
import React from 'react'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'

export const pageQuery = graphql`
  query DocPageQuery($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      fields {
        pageType
        title
        editLink
      }
      body
      tableOfContents
    }
  }
`

export default function Page({ data: { mdx } }) {
  return <MDXRenderer>{mdx.body}</MDXRenderer>
}
