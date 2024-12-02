import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  validatePassword
} from 'firebase/auth'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { auth } from '../src/firebase/firebase.js'
import { createUser, getUserByEmail } from '../src/api/users.js'

export interface AuthStatus {
  id?: number
  email?: string
  loggedInAt?: string
}

interface AuthStore {
  status: AuthStatus
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logOff: () => Promise<void>
}

export const useAuthStore = defineStore('authentication', (): AuthStore => {
  const status = reactive<AuthStatus>({})

  const signUp = async (email: string, password: string): Promise<void> => {
    try {
      const passwordStatus = await validatePassword(auth, password)
      if (!passwordStatus.isValid) {
        throw new Error('Invalid password')
      }

      // Create user in Firebase
      await createUserWithEmailAndPassword(auth, email, password)
      // Create user on backend
      await createUser(email)

      await signIn(email, password)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const logOff = async (): Promise<void> => {
    try {
      await signOut(auth)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userInfo = await getUserByEmail(user.email)
      status.id = userInfo[0].id
      status.email = user.email
      status.loggedInAt = new Date().toISOString()
    } else {
      status.id = undefined
      status.email = undefined
      status.loggedInAt = undefined
    }
  })

  return { status, signUp, signIn, logOff }
})
