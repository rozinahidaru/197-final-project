/* eslint-disable no-alert */
import React, { useState } from 'react'
import axios from 'axios'

const AddPost = props => {
  const [postText, setPostText] = useState('')
  const { setShow } = props

  const addPost = async () => {
    try {
      await axios.post('/posts/add', { postText })
      setShow(false)
    } catch (err) {
      alert('error when adding post')
    }
  }

  const handleClose = () => setShow(false)

  return (
    <>
      <h3>Add a post!</h3>
    </>
  )
}

export default AddPost
