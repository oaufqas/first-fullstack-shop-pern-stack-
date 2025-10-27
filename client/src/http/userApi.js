import { $authHost, $host } from "./index.js";
import {jwtDecode} from "jwt-decode"

export const login = async (email, password) => {
    const {data} = await $host.post('/api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}


export const registration = async (email, password) => {
    console.log(email, password)
    const {data} = await $host.post('/api/user/registration', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}


export const check = async () => {
    try {
        const {data} = await $authHost.get('/api/user/auth')
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
        
    } catch (e) {
        localStorage.removeItem('token')
        throw e
    }
}


export const deleteUser = async (email, password) => {
    const {data} = await $host.delete('user', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}


export const putchUser = async (email, password) => {
    const {data} = await $host.patch('user', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}