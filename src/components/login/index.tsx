import { FormEvent, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Tolltip } from '../Tooltip'
import styles from './styles.module.scss'

export function Login() {
  const { signIn, loginError } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    signIn({ email, password })

  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>ioasys <span>Books</span></h1>

        <form onSubmit={handleSubmit}>
          <div className={`${styles.input} ${styles.inputEmail}`}>
            <label htmlFor="email">Email</label>
            <input
              name='email'
              type="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className={`${styles.input} ${styles.inputPassword}`}>
            <div>
              <label htmlFor="password">Senha</label>

              <input
                name='password'
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <button type='submit'>Entrar</button>

          </div>
        </form>

        <div className={styles.tooltip}>
          <Tolltip visible={!!loginError} />
        </div>
      </div>
    </div>
  )
}