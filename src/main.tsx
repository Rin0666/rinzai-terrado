import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import './styles.css'

const root = document.getElementById('root')!
const app = <StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>
document.documentElement.classList.remove('no-js')
const currentPath = window.location.pathname.replace(/\/$/, '') || '/'

if (root.querySelector('main') && root.dataset.renderedPath === currentPath) hydrateRoot(root, app)
else createRoot(root).render(app)
