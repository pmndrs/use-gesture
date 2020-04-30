import React from 'react'
import styled from 'styled-components'
import { a } from 'react-spring'
import InfiniteSlider from './Slider'
import items from './items'

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: #171720;
  overflow: hidden;
  position: fixed;
`

const Main = styled.div`
  height: 400px;
`

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 70px 100px;
`

const Marker = styled.span`
  color: white;
  position: absolute;
  top: 0px;
  left: 140px;
  font-family: monospace;
`

const Image = styled(a.div)`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
`

export default function InfiniteSlideshow() {
  return (
    <Wrapper>
      <Main>
        <InfiniteSlider items={items} width={700} visible={3}>
          {({ css }: { css: string }, i: number) => (
            <Content>
              <Marker>{String(i).padStart(2, '0')}</Marker>
              <Image style={{ backgroundImage: css }} />
            </Content>
          )}
        </InfiniteSlider>
      </Main>
    </Wrapper>
  )
}
