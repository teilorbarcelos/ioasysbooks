import styles from './styles.module.scss'

interface BookProps {
  imageUrl: string
  title: string
  authors: string[]
  pageCount: number
  publisher: string
  published: number
}

export function BookCard({
  imageUrl,
  authors,
  pageCount,
  published,
  publisher,
  title
}: BookProps) {

  return (
    <div className={styles.container}>
      <img
        src={imageUrl}
        alt={`Capa do livro: ${title}`}
      />

      <div className={styles.bookInfo}>
        <div className={styles.header}>
          <h1>{title}</h1>
          <h2>{
            authors.map((author, index) => {
              if (index === authors.length - 1) {
                return (
                  <span key={index}>{author}.</span>
                )
              }
              return (
                <span key={index}>{author}, </span>
              )
            })
          }</h2>
        </div>

        <div className={styles.moreInfo}>
          <p>{pageCount} páginas</p>
          <p>Editora {publisher}</p>
          <p>Publicado em {published}</p>
        </div>
      </div>
    </div>
  )
}