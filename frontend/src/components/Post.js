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
    } catch (err) {
      alert('Error when commenting')
    }
  }

  // const updateLikes (add as bonus feature)

  return (
    <>
      <h3>the post</h3>
    </>
  )
}

export default Post
