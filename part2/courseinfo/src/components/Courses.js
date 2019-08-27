import React from 'react'

const Header = (props) => <h1>{props.name}</h1>

const Content = (props) => (<div>
  {props.parts.map(part => (<p key={part.id}>
    <Part part={part} />
  </p>))}
  <b>total of <Total part={props.parts} /> exercises</b>
</div>)


const Part = ({part}) => (<>{part.name} {part.exercises}</>)

const Total = ({part}) => part.reduce((x, y) => x + y.exercises, 0)

const Course = ({course}) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

const Courses = ({courses}) => courses.map(x => {
  return (
    <div key={x.id}>
    <Course course={x} />
    </div>
  )
})

export default Courses