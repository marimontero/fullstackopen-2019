import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
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
      <Part content={props.content[0]}/>
      <Part content={props.content[1]}/>
      <Part content={props.content[2]}/>
    </div>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}</p>
  )
}

const App = (props) => {
  const course = 'Half Stack application development'

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }

  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }

  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content content={[part1, part2, part3]}/>
      <Total total={[part1, part2, part3]}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));