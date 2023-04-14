import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBz53PP1Gzl8fVzfrE-ThQu3QwgnEnqikw',
  authDomain: 'twitter-clone-781e6.firebaseapp.com',
  projectId: 'twitter-clone-781e6',
  storageBucket: 'twitter-clone-781e6.appspot.com',
  messagingSenderId: '798638769966',
  appId: '1:798638769966:web:3664216cf32b1c08849cbf',
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export { db, storage }

export default app
