import React, { useEffect, useState } from 'react'
import Sidebar from '../Component/Sidebar'
import './Product.css'
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router-dom'
import axios from '../Component/axios'

const Product = () => {
  const Navigate = useNavigate()
  const [state, setState] = useState([])

  useEffect(() => {
    const getinformation = async () => {
      const response = await axios.get('/product')
      setState(response.data)
    }
    getinformation()
  }, [])
  console.log(state)

  const Edit = (data) => {
    Navigate('/productedit')
    const Data = JSON.stringify(data.row)
    window.localStorage.setItem('file', Data)
    console.log(Data)
  }

  //delete the product from mongodb
  const Delete = (data) => {
    console.log(data.row.id)

    const delid = async () => {
      const response = await axios.delete(`/product/${data.row.id}`)
      console.log(response.data)
    }
    delid()
    window.location.reload()
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    {
      field: 'products',
      headerName: 'Products',
      width: 300,
      renderCell: (params) => {
        return (
          <div className="products">
            <img className="productimage" src={params.row.image} alt="" />
            {params.row.products}
          </div>
        )
      },
    },
    { field: 'categories', headerName: 'Categories', width: 150 },
    {
      field: 'stack',
      headerName: 'Stack',
      width: 150,
      renderCell: (params) => {
        return (
          <div
            className={`${
              params.row.stack === 'instack' ? 'instack' : 'outofstack'
            }`}
          >
            <p>{params.row.stack}</p>
          </div>
        )
      },
    },
    { field: 'price', headerName: 'Price', width: 200 },
    {
      field: 'Action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="action">
            <button className="editbutton" onClick={() => Edit(params)}>
              edit
            </button>
            <DeleteIcon
              onClick={() => Delete(params)}
              style={{ color: 'red', marginLeft: 20, cursor: 'pointer' }}
            />
          </div>
        )
      },
    },
  ]

  return (
    <div className="product">
      <Sidebar />
      <div className="table2">
        <h2 style={{ color: 'white' }}>Products List</h2>
        <div
          onClick={() => Navigate('/productcreate')}
          className="createproduct"
        >
          Create
        </div>

        <div style={{ height: 400, width: '1200px' }}>
          <DataGrid
            rows={state}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  )
}

export default Product
