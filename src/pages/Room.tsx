import { useState, useEffect, FormEvent } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/Question'

import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'

import { database } from '../services/firebase'

import logoImg from '../assets/images/logo.svg'

import '../styles/room.scss'

type RoomParams = {
  id: string
}

export function Room() {
  const params = useParams<RoomParams>()
  const { user } = useAuth()

  // pegando o id da rota, que está vindo na rota
  const roomId = params.id

  // quando uma lógica é compartilhada em mais
  // de um componente, podemos criar um hook
  const { questions, title } = useRoom(roomId)

  // pegando os parâmetros que são repassados na rota
  const [newQuestion, setNewQuestion] = useState('')

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault()

    if (newQuestion.trim() === '') {
      return
    }

    if (!user) {
      throw new Error('You must be logged in')
    }

    // pegando as informações da pergunta
    // realizada pelo usuário
    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user.avatar
      },
      isHighlighter: false,
      isAnswer: false
    }

    // criando registro da pergunta no DB, indicando
    // qual a sala através do "roomId"
    await database.ref(`rooms/${roomId}/questions`).push(question)

    setNewQuestion('')
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={params.id} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login</button></span>
            )}
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              />
            )
          })}
        </div>
      </main>
    </div >
  )
}