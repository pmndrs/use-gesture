import React from 'react'
import { applyVueInReact } from 'veaury'
import VueApp from './VueApp.vue'

const VueInReact = applyVueInReact(VueApp)

export default function App() {
  return (
    <div className="flex fill center">
      <VueInReact />
    </div>
  )
}
