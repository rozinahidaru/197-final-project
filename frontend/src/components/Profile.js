/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Post from './Post'

const Profile = props => {
  // const { loggedIn, user } = props
  const { username, setShowProfile } = props
  const [data, setData] = useState([])
  const [userPosts, setUserPosts] = useState([])

  // const modal = document.getElementById('myModal')

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

  const handleClose = () => setShowProfile(false)

  // const showModal = () => {
  //   modal.style.display = 'block'
  // }

  // const closeModal = () => {
  //   modal.style.display = 'none'
  // }

  return (
    <>
      <>
        {/* <button type="button" id="myBtn" onClick={showModal}>Open Modal</button>

        <div id="myModal" className="modal">

          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h3>
              {username}
              {'\'s '}
              posts
            </h3>

            {userPosts.map(p => (
              <Post post={p} key={p._id} />
            ))}
          </div>

        </div> */}
        <h3>
          {username}
          {'\'s '}
          posts
        </h3>

        {userPosts.map(p => (
          <Post post={p} key={p._id} />
        ))}
        {/* <button type="button" onClick={handleClose}>Close</button> */}
      </>
    </>
  )
}

export default Profile
