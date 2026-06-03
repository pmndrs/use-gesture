import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

import './index.css'

// window.screenLog.init()

const rootElement = document.getElementById('root')
const root = createRoot(rootElement!)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
