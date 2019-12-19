/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import cn from 'classnames'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import Hero from './Hero'
import styles from './styles.module.css'

const features = [
  {
    title: 'Gestures made simple',
    imageUrl: 'img/tools.svg',
    description: (
      <>
        React use gesture allows you to implement advanced UI interactions with
        just a few lines of code.
      </>
    )
  },
  {
    title: 'Configurable to your needs',
    imageUrl: 'img/compass.svg',
    description: (
      <>
        Gestures can be customized with advanced options that should answer most
        common usecases.
      </>
    )
  },
  {
    title: 'Plays well with React spring!',
    imageUrl: 'img/game.svg',
    description: (
      <>
        React use gesture is part of the React spring ecosystem and operates
        nicely with both React spring and React three fiber.
      </>
    )
  }
]

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl)
  return (
    <div className={cn('col col--4', styles.feature)}>
      {imgUrl && (
        <div className={styles.featureImage}>
          <img src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  const baseUrl = useBaseUrl('/')

  return (
    <Layout
      title={`${siteConfig.title} - Documentation`}
      description="React use gesture allows you to implement advanced UI interactions with
        just a few lines of code."
    >
      <header className={cn('hero hero--primary', styles.heroBanner)}>
        <Hero />
      </header>
      <main>
        <div className={cn('text--center', styles.linkWrapper)}>
          <Link
            to={`${baseUrl}docs/introduction`}
            className="button button--primary button--lg"
          >
            Read the docs!
          </Link>
        </div>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {features.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default Home
