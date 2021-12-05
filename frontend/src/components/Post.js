/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import Profile from './Profile'

const Post = props => {
  const [data, setData] = useState([])
  const [comment, setComment] = useState('')
  const [likes, setLikes] = useState(0)
  const { loggedIn, post } = props

  const [showProfile, setShowProfile] = useState(false)

  useEffect(async () => {
    const { data: posts } = await axios.get('/posts/')
    setData(posts)
  }, [])

  const addComment = async () => {
    try {
      await axios.post('posts/comment', { _id: post._id, comment })
      setComment('')
    } catch (err) {
      alert('Error when commenting')
    }
  }

  // (add as bonus feature)
  const updateLikes = async () => {
    let currLikes = post.likes
    currLikes++
    setLikes(currLikes)

    try {
      await axios.post('posts/like', { _id: post._id, likes: currLikes })
    } catch (err) {
      alert('error when adding like')
    }
  }

  const showModal = () => {
    setShowProfile(true)
  }

  return (
    <>
      <div className="post" style={{ borderStyle: 'outset', borderRadius: 25, display: 'inline-block' }}>
        <div syle={{ display: 'inline-block' }}>
          <h3><i>{post.author}</i></h3>
          {/* <button type="button" className="profileButton">{post.author}</button>
        <br /> */}
          {/* <button type="button" onClick={showModal}>See Profile</button> */}
        </div>

        {/* {showProfile ? <Profile username={post.author} setShowProfile={setShowProfile} />
          : null } */}

        <img src={post.photo} alt="" width="400" height="250" />
        <div style={{ marginLeft: 8 }}>

          <p>{post.postText}</p>

          <p>
            {post.likes}
            {' '}
            likes
          </p>
          {(loggedIn) ? <button type="button" onClick={updateLikes}>Like</button>
            : null }
          <h4>
            Comment:
            <span style={{ fontWeight: 'normal' }}>
              {' '}
              {post.comment}
            </span>
          </h4>
          {(loggedIn)
            ? (
              <>
                <p>Add a comment</p>
                <input onChange={e => setComment(e.target.value)} value={comment} />
                <br />
                <button type="button" onClick={addComment}>Comment</button>
              </>
            )
            : null}
        </div>
      </div>
    </>
  )
}

export default Post
