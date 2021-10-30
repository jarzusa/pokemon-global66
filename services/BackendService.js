import axios from 'axios'

const api = axios.create({
  baseURL: process.env.backendUrl,
})

api.interceptors.response.use(null, function (error) {
  if (error.response.status === 401) {
    console.log('Error - Bad Request')
  }
  return Promise.reject(error)
})

export default {
  async getAllPokemons() {
    return await api.get('/api/v2/pokemon')
  },
  async searchPokemon(name) {
    return await api.get('/api/v2/pokemon/' + name)
  },

}