import { useAuth } from "../../hooks/useAuth"

import styles from './styles.module.scss'

export function BooksPage() {
  const { user, logOut } = useAuth()
  return (
    <main className={styles.container}>
      <header>
        <h1>ioasys <span>Books</span></h1>

        <div className={styles.loggedUser}>
          <p className={styles.userWelcome}>Bem vind{user?.gender === 'M' ? 'o' : 'a'}, {user?.name}!</p>

          <img
            src="/logoutButton.svg"
            onClick={logOut}
            alt="Botão de logout"
            title="Sair"
          />
        </div>
      </header>
    </main>
  )
}