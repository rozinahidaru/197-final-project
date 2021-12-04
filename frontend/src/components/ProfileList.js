import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Profile from './Profile'

const ProfileList = () => {
  const [data, setData] = useState([])
  const [showProfile, setShowProfile] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const modal = document.getElementById('myModal')

  const isLoggedIn = async () => {
    await axios.post('/account/').then(response => {
      if (response.data === 'no user logged in') {
        setLoggedIn(false)
      } else {
        setLoggedIn(true)
      }
    })

    return loggedIn
  }

  const showModal = () => {
    setShowProfile(true)
    modal.style.display = 'block'
  }

  const closeModal = () => {
    modal.style.display = 'none'
    setShowProfile(false)
  }

  useEffect(async () => {
    const intervalID = setInterval(async () => {
      try {
        const { data: users } = await axios.get('/account/all/')
        setData(users)
        // isLoggedIn()
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  return (
    <>
      <h1>Discover people</h1>

      <div className="topright">
        <Link to="/">Home</Link>
      </div>

      {/* <div>
        {data.map(user => (
          <>
            <h3>{user.username}</h3>
            <button type="button" onClick={showModal(user.username)}>
              {`See ${user.username}'s profile`}
            </button>
            {showProfile
              ? (
                <>
                  <div id="myModal" className="modal">
                    <div className="modal-content">
                      <Profile username={user.username} setShowProfile={setShowProfile} />
                      <button type="button" onClick={closeModal}>Close</button>
                    </div>
                  </div>
                </>
              )
              : null}
          </>
        ))}
      </div> */}

      {data.map(user => (
        <Profile username={user.username} setShowProfile={false} key={user._id} />
      ))}
    </>
  )
}

export default ProfileList
