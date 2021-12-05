/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [signupSuccess, setSuccess] = useState(false)

  const navigate = useNavigate()

  const createUser = async () => {
    const { data } = await axios.post('/account/signup', { username, password })
    if (data === 'user signup success') {
      setSuccess(true)
      navigate('../login')
    } else {
      alert('signup error')
    }
  }

  return (
    <>
      <h1>Sign Up</h1>
      <br />
      Username:
      <br />
      <input onChange={e => setUsername(e.target.value)} />
      <br />
      Password:
      <br />
      <input onChange={e => setPassword(e.target.value)} />
      <br />
      <button type="button" onClick={createUser}>signup</button>

      <nav>
        <p>
          Already have an account?
          <Link to="../login"> Login here!</Link>
        </p>
        <br />
        <Link to="/">Home</Link>
      </nav>
    </>
  )
}

export default Signup
