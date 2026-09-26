import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GameProvider } from './game/GameProvider.jsx'
import './index.css'

/* eslint-disable no-undef */
// Printed on boot so there is never any doubt about which build is running.
console.log(`Among Us Dobble v${__APP_VERSION__} — built ${__BUILD_TIME__}`)

// NOTE: React.StrictMode is intentionally omitted.
// StrictMode double-invokes effects in development, which would create and
// immediately destroy the peer connections (and therefore the game code) twice.
ReactDOM.createRoot(document.getElementById('root')).render(
  <GameProvider>
    <App />
  </GameProvider>
)
