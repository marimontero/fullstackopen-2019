import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Results = ({ name, total}) => (
  <p>{name} {total}</p>
)

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1)
  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleClickBad = () => {
    setBad(bad + 1)
  }

  const getAverageScore = () => {
    let all = good + bad + neutral
    if (all > 0) {
      return (good - bad) / all;
    }
    return 0
  }

  const getPositivePercentage = () => {
    let all = good + bad + neutral
    if (good > 0 ) {
      return ((( good / all ) * 100 )+'%')
    }
    return 0
  }

  return (
    <div>
      <h2><strong>Give feedback</strong></h2>
      <Button onClick={handleClickGood} text='Good' />
      <Button onClick={handleClickNeutral} text='Neutral' />
      <Button onClick={handleClickBad} text='Bad' />
      <h2><strong>Stadistics</strong></h2>
      <Results name='Good' total={good} />
      <Results name='Neutral' total={neutral} />
      <Results name='Bad' total={bad} />
      <Results name='All' total={good + neutral + bad} />
      <Results name='Average' total={getAverageScore()} />
      <Results name='Positive' total={getPositivePercentage()} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)