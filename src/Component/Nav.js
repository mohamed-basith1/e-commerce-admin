import { Avatar } from '@mui/material'
import React from 'react'
import './Nav.css'
const Nav = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img
          style={{ width: 40, height: 40, marginLeft: 15 }}
          src="logo2.png"
          alt=""
        />
        <p style={{ fontWeight: 600 }}>Admin Panel</p>
      </div>
      <div className="center"> </div>
      <div className="avator">
        <Avatar />
      </div>
    </div>
  )
}

export default Nav
