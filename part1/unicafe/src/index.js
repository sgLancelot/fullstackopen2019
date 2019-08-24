import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (good,neutral,bad) => {
  if ((good+neutral+bad)===0) {
    return (<>No feedback given</>)
  }
  const average = (good-bad)/(good+neutral+bad)
  const all = good+neutral+bad
  const positive = (good/(good+neutral+bad)*100)
  return (
    <>
    <table>
      <tbody>
      <Statistic text="good" value={good}/>
      <Statistic text="neutral" value={neutral}/>
      <Statistic text="bad" value={bad}/>
      <Statistic text="all" value={all}/>
      <Statistic text="average" value={average}/>
      <Statistic text="positive" value={positive}/>
      </tbody>
    </table>
    </>
  )
}

const Statistic = (props) => {
  if (props.text==="positive") 
  return (
    <>
    <tr><td>{props.text}</td><td>{props.value}</td><td>%</td></tr>
    </>
  )
  return (
    <>
    <tr><td>{props.text}</td><td>{props.value}</td></tr>
    </>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.handleClick}>{props.text}</button>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <>
      <h1>give feedback</h1>
      <Button text='good' handleClick={()=>{setGood(good+1)}} />
      <Button text='neutral' handleClick={()=>{setNeutral(neutral+1)}} />
      <Button text='bad' handleClick={()=>{setBad(bad+1)}} />
      <h1>statistics</h1>{Statistics(good,neutral,bad)}
    </>
  )
}
ReactDOM.render(<App />,document.getElementById('root'))