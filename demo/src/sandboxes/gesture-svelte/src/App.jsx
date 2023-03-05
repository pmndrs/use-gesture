import React from 'react'
import toReact from 'svelte-adapter/react'
import SvelteApp from './SvelteApp.svelte'

const SvelteInReact = toReact(SvelteApp, {}, 'div')

export default function App() {
  return (
    <div className="flex fill center">
      <SvelteInReact />
    </div>
  )
}
