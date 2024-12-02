// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'vue-app-dc02d.firebaseapp.com',
  projectId: 'vue-app-dc02d',
  storageBucket: 'vue-app-dc02d.appspot.com',
  messagingSenderId: 'SENDER_ID',
  appId: 'APP_ID'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
