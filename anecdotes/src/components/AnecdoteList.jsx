import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={handleClick}>vote</button>
        </div>
      </div>
  )
}

const AnecdoteList = () => {

  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === '' ) {
      return [...anecdotes].sort((a, b) => b.votes - a.votes)
    }
    else {
      return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    }
  })

  return (
    <>
      {anecdotes
        .map(anecdote =>
          <Anecdote
            key={anecdote.id} 
            anecdote={anecdote}
            handleClick={() => {
              dispatch(vote(anecdote.id))
              dispatch(setNotification(`Voted anecdote ${anecdote.content}`))
              setTimeout(() => {
                dispatch(clearNotification())
              }, 5000)
            }}
          />
        )
      }
    </>
  )
}

export default AnecdoteList