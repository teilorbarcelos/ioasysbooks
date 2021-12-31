import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { api } from "../../services/api"
import { BookCard } from "../BookCard"
import { Pagination } from "../Pagination"

import styles from './styles.module.scss'

interface BookProps {
  id: string
  authors: string[]
  imageUrl: string
  pageCount: number
  published: number
  publisher: string
  title: string
}

interface BooksReponseProps {
  data: BookProps[]
  totalPages: number
}

export function BooksPage() {
  const { user, logOut } = useAuth()
  const [page, setPage] = useState(1)
  const [books, setBooks] = useState<BookProps[]>([])
  const [totalPages, setTotalPages] = useState(0)

  async function getBooksList() {
    try {

      await api.get<BooksReponseProps>(`/books?page=${page}`)
        .then(response => {
          setTotalPages(response.data.totalPages)
          setBooks(response.data.data)
        })
    } catch (error) {
      logOut()
    }
  }

  useEffect(() => {
    getBooksList()
  }, [page])

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

      <section className={styles.booksList}>
        {
          books.length > 0 ?
            books.map(book => (
              <BookCard
                key={book.id}
                imageUrl={book.imageUrl}
                authors={book.authors}
                pageCount={book.pageCount}
                published={book.published}
                publisher={book.publisher}
                title={book.title}
              />
            ))
            :
            <h1>Nenhum livro nesta lista.</h1>
        }
      </section>

      <Pagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </main>
  )
}