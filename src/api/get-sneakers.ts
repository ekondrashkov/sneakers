import axios from 'axios'

export interface ItemsResponse {
  id: number
  name: string
  imageUrl: string
  price: number
}

export const enum SortBy {
  NAME = 'name',
  PRICE_ACS = 'price',
  PRICE_DESC = '-price'
}

interface GetSneakersListParams {
  name?: string
  sortBy: SortBy
}

export const getSneakersList = async (query: string, sortBy: SortBy): Promise<ItemsResponse[]> => {
  const params: Readonly<GetSneakersListParams> = {
    name: query ? `*${query}` : undefined,
    sortBy: sortBy
  }

  try {
    const { data } = await axios.get('https://a6449c49dc74267d.mokky.dev/items', {
      params
    })
    return data as ItemsResponse[]
  } catch (error) {
    throw new Error('Failed to fetch data', error.message)
  }
}
