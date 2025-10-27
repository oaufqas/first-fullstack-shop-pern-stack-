import { $authHost, $host } from "./index.js";


export const createType = async (type) => {
    const {data} = await $authHost.post('type/', type)
    return data
}


export const getTypes = async () => {
    const {data} = await $host.get('/api/type/')
    return data
}


export const deleteType = async (name) => {
    const {data} = await $authHost.delete('type/' + name)
    return data
}




export const createProduct = async (product) => {
    const {data} = await $authHost.post('product/', product)
    return data
}


export const getAllProduct = async (typeProductId = '') => {
    if (typeProductId) {
        const {data} = await $host.get('product?typeProductId=' + typeProductId)
        return data
    } else {
        const {data} = await $host.get('product/')
        return data
    }
}


export const getOneProducts = async (id) => {
    const {data} = await $host.get('product/' + id)
    return data
}


export const patchProducts = async (productData) => {
    const {data} = await $authHost.patch('product/', productData)
    return data
}


export const deleteProducts = async (name) => {
    const {data} = await $authHost.delete('product/' + name)
    return data
}