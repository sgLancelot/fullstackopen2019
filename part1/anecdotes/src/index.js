import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Random = () => {
    return Math.floor(Math.random()*6)
}

const MostVotes = (props) => {
    const indexOfMaxValue = props.points.indexOf(Math.max(...props.points))
    return (
        <>
            {props.anecdotes[indexOfMaxValue]}<br/>
            has {props.points[indexOfMaxValue]} votes
        </>
    )
}

const App = (props) => {  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0,0,0,0,0,0])

  const handlePoints = () => {
      const copy = [...points]
      copy[selected] += 1
      setPoints(copy)
  }
  
  return (
    <div>
        <h1>Anecdote of the day</h1>
        {props.anecdotes[selected]}<br/>
        has {points[selected]} votes<br/>
        <button onClick={()=>{handlePoints()}}>vote</button>
        <button onClick={()=>{setSelected(Random())}}>next anecdote</button>
        <h1>Anecdote with most votes</h1>
        <MostVotes points={points} selected={selected} anecdotes={anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />,document.getElementById('root'))