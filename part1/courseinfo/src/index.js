import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>
                {props.part} {props.exer}
            </p>
        </>
    )
}

const Content = (props) => {
    return (
        <>
            <Part part={props.part1} exer={props.exer1} />
            <Part part={props.part2} exer={props.exer2} />
            <Part part={props.part3} exer={props.exer3} />
        </>
    )
}

const Total = (props) => {
    return (
        <>
            <p>Number of exercises {props.exer}</p>
        </>
    )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course = {course} />
      <Content part1={part1} exer1={exercises1} part2={part2} exer2={exercises2}  part3={part3} exer3={exercises3} />
      <Total exer={exercises1+exercises2+exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))