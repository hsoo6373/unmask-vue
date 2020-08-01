import axios from 'axios'

export default() => {
    return axios.create({
        method: 'get',
        baseURL: process.env.VUE_APP_API_HOST,
        auth: {
            username: process.env.VUE_APP_API_USERNAME,
            password: process.env.VUE_APP_API_PASSWORD,
        },
        headers: {
            'Accept': 'application/json',
        },
    })
}