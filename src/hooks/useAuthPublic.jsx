import axios from "axios";


const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})

const useAuthPublic = () => {
    return axiosPublic;
}

export default useAuthPublic