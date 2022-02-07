import React from 'react'
import './SideBar.css'
import StorefrontIcon from '@mui/icons-material/Storefront'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const Navigate = useNavigate()

  return (
    <div className="sidebar">
      <h3 style={{ color: 'white', marginTop: 30, marginBottom: -10 }}>Menu</h3>
      <ul>
        <li onClick={() => Navigate('/')}>
          <PersonOutlineIcon style={{ marginRight: 10 }} />
          User
        </li>
        <li onClick={() => Navigate('/product')}>
          <StorefrontIcon style={{ marginRight: 10 }} /> Product
        </li>
      </ul>
    </div>
  )
}
export default Sidebar
