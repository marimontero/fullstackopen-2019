import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.content.name} {props.content.exercises}
    </p>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part content={props.content.parts[0]}/>
      <Part content={props.content.parts[1]}/>
      <Part content={props.content.parts[2]}/>
    </div>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.total.parts[0].exercises + props.total.parts[1].exercises + props.total.parts[2].exercises}</p>
  )
}

const App = (props) => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content content={course}/>
      <Total total={course}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
