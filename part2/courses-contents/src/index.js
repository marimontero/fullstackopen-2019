import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <h1>Web development curriculum</h1>
  )
}

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

const Course = (props) => {
  return props.courses.map(course =>
    <div key={course.id}>
      <CourseName name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Header />
      <Course courses={courses} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
