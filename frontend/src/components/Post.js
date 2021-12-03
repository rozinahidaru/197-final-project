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

  // const updateLikes (add as bonus feature)

  return (
    <>
      <h3><i>{post.postText}</i></h3>
      <img src={post.photo} alt="" />
      <div style={{ marginLeft: 8 }}>
        <h4>
          Author:
          {' '}
          <span style={{ fontWeight: 'normal' }}>
            {post.author}
          </span>
        </h4>
        <h4>
          Comment:
          <span style={{ fontWeight: 'normal' }}>
            {' '}
            {post.comment}
          </span>
        </h4>
      </div>
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
    </>
  )
}

export default Post
