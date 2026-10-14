import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles.css'

const savedTheme = window.localStorage.getItem('portfolio-theme')
const initialTheme = savedTheme === 'light' ? 'light' : 'dark'
document.documentElement.dataset.theme = initialTheme
document.querySelector('meta[name="theme-color"]')?.setAttribute('content', initialTheme === 'dark' ? '#1b1523' : '#fcf9fd')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
