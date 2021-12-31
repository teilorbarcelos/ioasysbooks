import styles from './styles.module.scss'

interface PaginationProps {
  page: number
  totalPages: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export function Pagination({
  page,
  totalPages,
  setPage
}: PaginationProps) {
  return (
    <div className={styles.container}>
      <p className={styles.desktop}>Página <span>{page}</span> de <span>{totalPages}</span></p>

      <div className={styles.pageButtons}>
        <div
          className={page > 1 ? styles.active : ''}
          onClick={page > 1 ? () => setPage(page - 1) : () => { }}
        >{'<'}</div>

        <p className={styles.mobile}>Página <span>{page}</span> de <span>{totalPages}</span></p>

        <div
          className={page < totalPages ? styles.active : ''}
          onClick={page < totalPages ? () => setPage(page + 1) : () => { }}
        >{'>'}</div>
      </div>
    </div>
  )
}