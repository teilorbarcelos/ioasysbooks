import styles from './styles.module.scss'

interface Props {
  visible?: boolean
}

export function Tolltip({ visible = false }: Props) {
  return (
    <div className={`${styles.container} ${visible ? styles.visible : ''}`}>
      <div className={styles.tooltip}>
        <p>Email e/ou senha incorretos.</p>
      </div>
    </div>
  )
}