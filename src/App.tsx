import { BooksPage } from './components/BooksPage'
import { Login } from './components/login'
import { useAuth } from './hooks/useAuth'
import './styles/global.scss'

export function App() {
  const { user } = useAuth()

  return (
    <>
      {
        !user ?
          <Login /> :
          <BooksPage />
      }
    </>
  )
}
