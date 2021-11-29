/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Profile = props => {
  // const { loggedIn, user } = props
  const { username } = props
  // const [username, setUsername] = useState('')
  const [data, setData] = useState([])
  const [userPosts, setUserPosts] = useState([])

  useEffect(async () => {
    const intervalID = setInterval(async () => {
      try {
        const { data: posts } = await axios.get('/posts/')
        setData(posts)
        const uPosts = []
        for (let i = 0; i < posts.length; i++) {
          if (posts[i].author === username) {
            uPosts.push(posts[i])
          }
        }
        setUserPosts(uPosts)
        // isLoggedIn()
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
      // setLoggedIn(false)
    } else {
      alert('error when logging user out')
    }
  }

  return (
    <>
      <h2>
        Your profile:
        {' '}
        {username}
      </h2>

      {/* <div className="topright">
        <p>{loggedIn ? `Hi ${username}` : ''}</p>
        {loggedIn ? <button type="button" onClick={logoutUser}>Logout</button> : <p />}
      </div> */}
    </>
  )
}

export default Profile
