import { render } from 'react-dom'
import { App } from './App'
import { AuthProvider } from './contexts/AuthContext'

render(
  <AuthProvider>
    <App />
  </AuthProvider>
  , document.getElementById('root'))