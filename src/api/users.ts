import axios from 'axios'

interface UserDetails {
  id?: number
  email: string
  fullName?: string
  phone?: string
  address?: string
  createdAt: string
}

export const createUser = async (email: string): Promise<UserDetails> => {
  const params: UserDetails = {
    email,
    createdAt: new Date().toISOString()
  }

  try {
    const { data } = await axios.post('https://a6449c49dc74267d.mokky.dev/users', params)
    return data
  } catch (error) {
    throw new Error('Failed to create user', error.message)
  }
}

export const getUserByEmail = async (email: string): Promise<Readonly<UserDetails[]>> => {
  try {
    const { data } = await axios.get('https://a6449c49dc74267d.mokky.dev/users', {
      params: {
        email
      }
    })
    return data
  } catch (error) {
    throw new Error('Failed to get user', error.message)
  }
}
