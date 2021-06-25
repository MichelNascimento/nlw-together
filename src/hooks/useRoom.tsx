import { useEffect, useState } from "react"
import { database } from "../services/firebase"

type QuestionType = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
}

type FirebaseQuestions = Record<string, { // "Record é o mesmo que um objeto"
  author: {
    name: string
    avatar: string
  }
  content: string
  isAnswered: boolean
  isHighlighted: boolean
}>

export function useRoom(roomId: string) {
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    // buscando os registros da base de dados
    roomRef.on('value', room => {
      const databaseRoom = room.val()
      // repassando o valor de questions retornado da base
      // para uma constante que possui a tipagem "FirebaseQuestions"
      const FirebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

      // com o entries, convertemos um Object em Array.
      const parsedQuestions = Object.entries(FirebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered
        }
      })

      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })
  }, [roomId])

  return (
    { questions, title }
  )
}