import React from 'react';

const CourseName = (props) => {
  return (
    <h2>{props.name}</h2>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return props.parts.map(
    part => <Part key={part.id} name={part.name} exercises={part.exercises}/>
  )
}

const Total = (props) => {
  const sum = props.parts.reduce( (sum, part) => {
    return sum + part.exercises
  }, 0)

  return (
    <strong>Total of {sum}</strong>
  )
}

const Courses = (props) => {
  return props.courses.map(course =>
    <div key={course.id}>
      <CourseName name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default Courses