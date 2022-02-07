import React, { useEffect, useState, useRef } from 'react'
import Sidebar from '../Component/Sidebar'
import './ProductEdit.css'
import { storage } from '../Component/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage'
import axios from '../Component/axios'
import { useNavigate } from 'react-router-dom'

const ProductEdit = () => {
  const [state, setState] = useState([])
  const [product, setProduct] = useState('')
  const [categories, setcatagories] = useState('')
  const [stack, setStack] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [progress, setProgress] = useState('')
  const [imageurl, setImageurl] = useState('')
  const [description, setDescription] = useState('')

  const upload = useRef(null)
  const navigate = useNavigate()

  const Imagesubmit = (e) => {
    e.preventDefault()
    console.log(image.name)
    const storageref = ref(storage, `/image/${image.name}`)
    const uploadTask = uploadBytesResumable(storageref, image)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        )
        setProgress(prog)
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => setImageurl(url))
      },
    )
  }

  const handlesubmit = (e) => {
    e.preventDefault()
    console.log('form data clicked')
    console.log(imageurl)
    const product1 = product === '' ? state.products : product
    const categories1 = categories === '' ? state.categories : categories
    const stack1 = stack === '' ? state.stack : stack
    const price1 = price === '' ? state.price : price
    const image1 = image === '' ? state.image : imageurl
    const description1 = description === '' ? state.description : description
    const id = state.id

    const data = {
      products: product1,
      categories: categories1,
      stack: stack1,
      price: price1,
      image: image1,
      description: description1,
    }
    console.log(data)

    const editpage = async () => {
      const response = await axios.put(`/product/${id}`, data)
      console.log(response)
      navigate('/product')
    }
    editpage()
  }

  const uploadclick = () => {
    upload.current.click()
  }

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('file'))
    setState(data)
  }, [])

  return (
    <div className="productedit">
      <Sidebar />
      <div className="editscreen">
        <h2 style={{ color: 'white' }}>Edit</h2>
        <div className="contant" style={{ height: 550, width: '1200px' }}>
          <div>
            <img
              className="editimage"
              style={{ objectFit: 'contain' }}
              src={`${state.image}`}
              alt=""
            />
          </div>
          <form className="imageform" onSubmit={Imagesubmit}>
            <div className="selectimage" onClick={() => uploadclick()}>
              select image
            </div>
            <input
              ref={upload}
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => setImage(e.target.files[0])}
              className="imageinput"
            />
            <button className="uploadbutton" type="submit">
              upload
            </button>

            {progress}
          </form>
          <div className="editform">
            <form onSubmit={handlesubmit}>
              product name
              <div className="input">
                <input
                  defaultValue={state.products}
                  onChange={(e) => setProduct(e.target.value)}
                />
              </div>
              categories
              <div className="input">
                <input
                  defaultValue={state.categories}
                  onChange={(e) => setcatagories(e.target.value)}
                />
              </div>
              stack
              <div className="input">
                <input
                  defaultValue={state.stack}
                  onChange={(e) => setStack(e.target.value)}
                />
              </div>
              description
              <div className="input">
                <textarea
                  style={{ width: '100%', border: 'none', outline: 'none' }}
                  defaultValue={state.description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              Price
              <div className="input">
                <input
                  defaultValue={state.price}
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <button type="submit">submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductEdit
