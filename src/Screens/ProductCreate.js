import React, { useState, useRef } from 'react'
import Sidebar from '../Component/Sidebar'
import './ProductCreate.css'
import { storage } from '../Component/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage'
import axios from '../Component/axios'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

const ProductCreate = () => {
  const [product, setProduct] = useState('')
  const [catagories, setcatagories] = useState('')
  const [stack, setStack] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [progress, setProgress] = useState('')
  const [imageurl, setImageurl] = useState('')

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
  console.log(imageurl)

  const handlesubmit = (e) => {
    e.preventDefault()
    const ids = uuidv4()
    console.log('form data clicked')
    const data = {
      id: ids,
      products: product,
      categories: catagories,
      image: imageurl,
      stack: stack,
      price: price,
      description: description,
    }
    console.log(data)
    axios.post('/product', data).then((res) => console.log(res))
    navigate('/product')
  }

  const uploadclick = () => {
    upload.current.click()
  }

  return (
    <div className="productcreate">
      <Sidebar />
      <div className="editscreen">
        <h2 style={{ color: 'white' }}>Create</h2>
        <div className="contant" style={{ height: 550, width: '1200px' }}>
          <div>
            <img
              className="editimage"
              style={{ objectFit: 'contain' }}
              src={` ${imageurl ? imageurl : 'upload.png'} `}
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
                <input onChange={(e) => setProduct(e.target.value)} />
              </div>
              categories
              <div className="input">
                <input onChange={(e) => setcatagories(e.target.value)} />
              </div>
              stack
              <div className="input">
                <input onChange={(e) => setStack(e.target.value)} />
              </div>
              description
              <div className="input">
                <textarea
                  style={{ width: '100%', border: 'none', outline: 'none' }}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              Price
              <div className="input">
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
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

export default ProductCreate
