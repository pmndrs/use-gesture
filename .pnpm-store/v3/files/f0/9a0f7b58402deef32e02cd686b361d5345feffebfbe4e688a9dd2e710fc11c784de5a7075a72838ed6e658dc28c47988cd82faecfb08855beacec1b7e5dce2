import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { SEO } from './SEO'

const HeadQuery = graphql`
  query HeadQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export function Head({ title }) {
  const data = useStaticQuery(HeadQuery)
  return (
    <SEO
      title={
        title
          ? `${title} - ${data.site.siteMetadata.title}`
          : data.site.siteMetadata.title
      }
    />
  )
}
