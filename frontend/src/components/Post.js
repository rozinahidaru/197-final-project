/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Post = props => {
  const [data, setData] = useState([])
  const [comment, setComment] = useState('')
  const [likes, setLikes] = useState(0)
  const { loggedIn, post } = props

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
    const currLikes = post.likes
    // if (currLikes === null) {
    //   currLikes = 0
    // }
    setLikes(currLikes + 1)

    try {
      await axios.post('posts/like', { _id: post._id, likes })
    } catch (err) {
      alert('error when adding like')
    }
  }

  return (
    <>
      <h3><i>{post.author}</i></h3>
      <img src={post.photo} alt="" width="400" height="250" />
      <div style={{ marginLeft: 8 }}>
        {/* <h4>
          Author:
          {' '}
          <span style={{ fontWeight: 'normal' }}>
            {post.author}
          </span>
        </h4> */}
        <p>{post.postText}</p>
        {(post.likes)
          ? (
            <p>
              {post.likes}
              {' '}
              likes
            </p>
          )
          : (
            <p>0 likes</p>
          )}
        <button type="button" onClick={updateLikes}>Like</button>
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
    </>
  )
}

export default Post
