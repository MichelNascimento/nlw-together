import { useParams } from 'react-router-dom'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/Question'

import { useRoom } from '../hooks/useRoom'

import logoImg from '../assets/images/logo.svg'

import '../styles/room.scss'

type RoomParams = {
  id: string
}

export function AdminRoom() {
  const params = useParams<RoomParams>()

  // pegando o id da rota, que está vindo na rota
  const roomId = params.id

  // quando uma lógica é compartilhada em mais
  // de um componente, podemos criar um hook
  const { questions, title } = useRoom(roomId)

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={params.id} />
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

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