import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

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
      return anecdotes
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
            handleClick={() => dispatch(vote(anecdote.id))}
          />
        )
        .sort((a, b) => b.votes - a.votes)
      }
    </>
  )
}

export default AnecdoteList