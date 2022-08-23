import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const cryptoApiHeaders = {
  'X-RapidAPI-Key': '8a814c58c8mshc297649c198fe4bp152c4djsn4ee863d9bf9f',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl =  'https://coinranking1.p.rapidapi.com'

const createRequest = (url) => ({ url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }), 
    getCryptoDetails: builder.query({
      query: (coinId) => {
        return createRequest(`/coin/${coinId}`) }
    })
  })

})
//redux token creates a hook that can be called instantly
export const {
  useGetCryptosQuery,useGetCryptoDetailsQuery
} = cryptoApi