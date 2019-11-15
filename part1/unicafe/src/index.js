import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistic = ({ text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, bad, neutral}) => {
  const all = good + bad + neutral

  const getAverageScore = () => {
    if (all > 0) {
      return (good - bad) / all;
    }
    return 0
  }

  const getPositivePercentage = () => {
    if (good > 0 ) {
      return ((( good / all ) * 100 )+'%')
    }
    return 0
  }

  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <tbody>
        <Statistic text='Good' value={good} />
        <Statistic text='Neutral' value={neutral} />
        <Statistic text='Bad' value={bad} />
        <Statistic text='All' value={all} />
        <Statistic text='Average' value={getAverageScore()} />
        <Statistic text='Positive' value={getPositivePercentage()} />
      </tbody>
    </table>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2><strong>Give feedback</strong></h2>
      <Button onClick={() => setGood(good + 1)} text='Good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='Neutral' />
      <Button onClick={() => setBad(bad + 1)} text='Bad' />
      <h2><strong>Statistics</strong></h2>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)