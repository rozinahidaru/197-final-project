/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Profile from './Profile'

const Home = () => {
  const [data, setData] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  const navigate = useNavigate()

  const isLoggedIn = async () => {
    await axios.post('/account/').then(response => {
      if (response.data === 'no user logged in') {
        setLoggedIn(false)
      } else {
        setLoggedIn(true)
        const user = response.data.split(' ')[0]
        setUsername(user)
      }
    })

    return loggedIn
  }

  useEffect(async () => {
    const intervalID = setInterval(async () => {
      try {
        const { data: posts } = await axios.get('/posts/')
        setData(posts)
        isLoggedIn()
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  const logoutUser = async () => {
    // eslint-disable-next-line no-shadow
    const { data } = await axios.post('/account/logout')
    if (data === 'user is logged out') {
      setLoggedIn(false)
    } else {
      alert('error when logging user out')
    }
  }

  const goToProfile = () => <Profile username={username} />

  return (
    <>
      <h1>Post Your Photos</h1>

      <div className="topright">
        <p>{loggedIn ? `Hi ${username}` : ''}</p>
        {loggedIn
          ? (
            <>
              <button type="button" onClick={goToProfile}>Go to your profile</button>
              <br />
              <br />
              <button type="button" onClick={logoutUser}>Logout</button>
            </>
          )
          : null}
      </div>

      {loggedIn
        ? <button type="button">Add a post</button>
        : <button type="button" onClick={() => navigate('/login')}>Log in to add a post</button>}

      <h2>Posts</h2>
    </>
  )
}

export default Home
