import styles from './styles.module.scss'

interface BookProps {
  id: string
  imageUrl: string
  title: string
  authors: string[]
  pageCount: number
  publisher: string
  published: number
  setBookDetails: React.Dispatch<React.SetStateAction<string>>
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function BookCard({
  id,
  imageUrl,
  authors,
  pageCount,
  published,
  publisher,
  title,
  setBookDetails,
  setModalOpen
}: BookProps) {

  async function handleOpenModalBook() {
    setBookDetails(id)
    setModalOpen(true)
  }

  return (
    <div
      className={styles.container}
      onClick={handleOpenModalBook}
    >
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