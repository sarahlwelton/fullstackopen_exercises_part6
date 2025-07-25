import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateVotes } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const queryClient = useQueryClient()

  const updateVotesMutation = useMutation({
    mutationFn: updateVotes,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      )

      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
    }
  })

  const handleVote = (anecdote) => {
    updateVotesMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: 1
    }
  )
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>Loading anecdotes...</div>
  }

  if ( result.isError ) {
    return <div>Anecdote service not available due to a problem with the server</div>
  }

  const anecdotes = result.data

  return(
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
