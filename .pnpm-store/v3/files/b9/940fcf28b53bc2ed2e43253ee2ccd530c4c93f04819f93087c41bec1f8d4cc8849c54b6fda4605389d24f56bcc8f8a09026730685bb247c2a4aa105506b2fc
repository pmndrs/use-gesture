import { graphql } from 'gatsby'
import React from 'react'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'

export const pageQuery = graphql`
  query PagePageQuery($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      fields {
        pageType
        title
      }
      body
    }
  }
`

export default function Page({ data: { mdx } }) {
  return <MDXRenderer>{mdx.body}</MDXRenderer>
}
