import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { api } from '../../services/api'
import styles from './styles.module.scss'

interface BookProps {
  authors: string[]
  imageUrl: string
  pageCount: number
  published: number
  publisher: string
  title: string
  language: string
  description: string
  isbn10: string
  isbn13: string
}

interface ModalBookProps {
  modalOpen: boolean
  id: string
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function ModalBook({ id, modalOpen = false, setModalOpen }: ModalBookProps) {
  const { logOut } = useAuth()
  const [book, setBook] = useState<BookProps>({} as BookProps)

  async function getBookInfo() {
    if (id !== '') {
      try {
        await api.get<BookProps>(`/books/${id}`)
          .then(response => {
            setBook(response.data)
          })
      } catch (error) {
        logOut()
      }
    }
  }

  async function handleCloseModal() {
    setBook({} as BookProps)
    setModalOpen(false)
  }

  useEffect(() => {
    getBookInfo()
  }, [id])

  return (
    <section className={`${styles.container} ${modalOpen ? styles.visible : ''}`}>
      <div
        className={styles.closeButton}
        title='Fechar'
        onClick={handleCloseModal}
      >
        X
      </div>

      <div className={styles.bookInfoBox}>
        <img src={book.imageUrl} alt={`Capa do livro ${book.title}`} />

        <div className={styles.bookInfo}>
          <h1>{book.title}</h1>

          <p className={styles.authors}>{book.authors?.map((author, index) => {
            if (index === book.authors.length - 1) {
              return (
                <span key={index}>{author}.</span>
              )
            }
            return (
              <span key={index}>{author}, </span>
            )
          })}</p>

          <h2>INFORMAÇÕES</h2>

          <div className={styles.bookDetails}>
            <div>
              <p>Páginas</p>
              <p>{book.pageCount} páginas</p>
            </div>

            <div>
              <p>Editora</p>
              <p>Editora {book.publisher}</p>
            </div>

            <div>
              <p>Publicação</p>
              <p>{book.published}</p>
            </div>

            <div>
              <p>Idioma</p>
              <p>{book.language}</p>
            </div>

            <div>
              <p>Título Original</p>
              <p>{book.title}</p>
            </div>

            <div>
              <p>ISBN-10</p>
              <p>{book.isbn10}</p>
            </div>

            <div>
              <p>ISBN-13</p>
              <p>{book.isbn13}</p>
            </div>
          </div>

          <h3>Resenha da editora</h3>

          <div className={styles.description}>
            <p><span>&ldquo;</span>{book.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}