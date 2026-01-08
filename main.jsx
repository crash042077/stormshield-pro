import React from 'react'
import ReactDOM from 'react-dom/client'
// This tells the app the 'Brain' is still inside the src folder
import App from './src/App.jsx' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
