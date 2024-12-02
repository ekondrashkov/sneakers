import axios from 'axios'

export interface FavoritesResponse {
  id: number
  itemId: number
}

export const getFavorites = async (): Promise<FavoritesResponse[]> => {
  try {
    const { data } = await axios.get('https://a6449c49dc74267d.mokky.dev/favorites')
    return data as FavoritesResponse[]
  } catch (error) {
    throw new Error('Failed to fetch data', error.message)
  }
}

export const addFavorites = async (id: number): Promise<void> => {
  try {
    await axios.post('https://a6449c49dc74267d.mokky.dev/favorites', {
      itemId: id
    })
  } catch (error) {
    throw new Error('Failed to fetch data', error.message)
  }
}

export const deleteFavorites = async (id: number): Promise<void> => {
  try {
    await axios.delete(`https://a6449c49dc74267d.mokky.dev/favorites/${id}`)
  } catch (error) {
    throw new Error('Failed to fetch data', error.message)
  }
}
