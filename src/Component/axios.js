import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://e-commerce-2000.herokuapp.com',
})

export default instance
