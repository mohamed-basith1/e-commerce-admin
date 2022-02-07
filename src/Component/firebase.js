import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBS5CDVb2K1v9CK3H9gWQySHSTYnxZP6Jg',
  authDomain: 'admin-panel-9f44b.firebaseapp.com',
  projectId: 'admin-panel-9f44b',
  storageBucket: 'admin-panel-9f44b.appspot.com',
  messagingSenderId: '1089337516743',
  appId: '1:1089337516743:web:26f83fb0ac1d36b3a294e2',
  measurementId: 'G-DVDFGTH2LQ',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
