
export const BASE_URL = process.env.NEXT_PUBLIC_API_HOST

//const BASE_URL = "http://localhost:3001/api"

export const API_ENDPOINT = {
  AUTH: {
    INDEX: `${BASE_URL}/auth`,
    AUTH_ME: `${BASE_URL}/auth/me`,
  },
   ROLE: {
    INDEX: `${BASE_URL}/roles`
  }
}