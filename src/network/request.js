import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL:'http://106.54.54.237:8000/api/hy',
        timeout:20000
    })
    return instance(config)
}
