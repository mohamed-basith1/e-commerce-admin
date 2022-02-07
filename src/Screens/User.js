import React, { useEffect, useState } from 'react'
import Sidebar from '../Component/Sidebar'
import './User.css'
import { DataGrid } from '@mui/x-data-grid'
import axios from '../Component/axios'

const User = () => {
  const [state, setState] = useState([])

  const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'username', headerName: 'User Name', width: 300 },
    { field: 'email', headerName: 'Email', width: 300 },
  ]

  useEffect(() => {
    const getuser = async () => {
      const response = await axios.get('/user')
      console.log(response.data)
      setState(response.data)
    }
    getuser()
  }, [])
  return (
    <div className="user">
      <Sidebar />
      <div className="table">
        <h2>User List</h2>
        <div style={{ height: 400, width: '1000px' }}>
          <DataGrid
            rows={state}
            columns={columns}
            pageSize={7}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>{' '}
      </div>
    </div>
  )
}

export default User
