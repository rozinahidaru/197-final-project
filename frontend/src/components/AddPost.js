/* eslint-disable no-alert */
import React, { useState } from 'react'
import axios from 'axios'

const AddPost = props => {
  const [postText, setPostText] = useState('')
  const [photo, setPhoto] = useState('')
  const { setShow } = props

  const addPost = async () => {
    try {
      await axios.post('/posts/add', { postText, photo })
      setShow(false)
    } catch (err) {
      alert('error when adding post')
    }
  }

  const handleClose = () => setShow(false)

  return (
    <>
      <h3>Add a post!</h3>
      <p>Add your photo</p>
      <input onChange={e => setPhoto(e.target.value)} />
      <p>Add a caption</p>
      <input onChange={e => setPostText(e.target.value)} />
      <br />
      <button type="button" onClick={addPost} style={{ marginRight: 8 }}>Post</button>
      <button type="button" onClick={handleClose}>Cancel</button>
    </>
  )
}

export default AddPost
