import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect
} from 'react-router-dom'
import { Table } from 'react-bootstrap'
import Anecdote from './components/anecdote';

const AnecdoteList = ({ anecdotes, notification }) => {
  return(
    <div>
     <h2>Anecdotes</h2>
     {notification === '' ? null : <p className='alert alert-success'> {notification} </p>}
     <Table striped>
       <tbody>
         {anecdotes.map(anecdote =>
           <tr key={anecdote.id}>
             <td>
               <Link to={`/anecdotes/${anecdote.id}`}>
                 {anecdote.content}
               </Link>
             </td>
             <td>
              {anecdote.author}
             </td>
           </tr>
         )}
       </tbody>
     </Table>
   </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Content</label>
          <input className='form-control' name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Author</label>
          <input className='form-control' name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Url for more info</label>
          <input className='form-control' name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button className='btn btn-primary'>create</button>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setNotification('')
    }, 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = { padding: 5 }

  return (

    <Router>
      <div className="container">
        <h1>Software anecdotes</h1>
        <div>
          <Link style={padding} to="/">anecdotes</Link>
          <Link style={padding} to="/create-new">create new</Link>
          <Link style={padding} to="/about">about</Link>
        </div>
        <Route exact path="/" render={() =>
          <AnecdoteList
            anecdotes={anecdotes}
            setNotification={setNotification}
            notification={notification}
          />}
        />
        <Route exact path="/anecdotes/:id" render={({ match }) =>
          <Anecdote anecdote={anecdoteById(match.params.id)} />}
        />
        <Route exact path={"/create-new"} render={() =>
          notification === '' ?
          <CreateNew
          addNew={addNew}
          setNotification={setNotification}
          notification={notification}
          />
          :
          <Redirect to={"/"}/>
          }/>
        <Route path="/about" render={() => <About />} />
        <Footer />
      </div>
    </Router>
  )
}

export default App;