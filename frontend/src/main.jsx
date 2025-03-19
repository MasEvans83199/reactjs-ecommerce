import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartProvider.jsx'
import { CurrentUserProvider } from './context/CurrentUserProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CurrentUserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </CurrentUserProvider>
  </StrictMode>
)
