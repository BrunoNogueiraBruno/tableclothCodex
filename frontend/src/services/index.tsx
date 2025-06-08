import axios from "axios"

const baseApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
})

export default baseApi