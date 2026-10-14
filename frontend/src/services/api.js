import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
  headers: { Accept: 'application/json' },
  timeout: 8000,
})

export async function getPortfolioContent() {
  const resources = ['profile', 'songs', 'destinations', 'surahs', 'gallery', 'quotes']
  const results = await Promise.allSettled(resources.map((resource) => api.get(`/${resource}`)))
  const content = {}
  resources.forEach((resource, index) => {
    if (results[index].status === 'fulfilled') {
      const response = results[index].value.data
      content[resource] = response.data ?? response
    }
  })
  return content
}

export function sendContactMessage(payload) {
  return api.post('/contact', payload)
}
