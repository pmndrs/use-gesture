import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types'
import * as React from 'react'
import { levaStore } from '../../src'

const DefaultStory = (Story: () => StoryFnReactReturnType) => {
  const [_, set] = React.useState(false)
  React.useEffect(() => {
    levaStore.dispose()
    set(true)
  }, [])
  return _ ? <Story /> : <></>
}

export default DefaultStory
