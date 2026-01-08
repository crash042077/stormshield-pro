import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './src/App' 
import './src/index.css' // This is the "Paint Brush" line you need!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
