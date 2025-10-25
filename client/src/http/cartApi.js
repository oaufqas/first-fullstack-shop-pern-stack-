import { $authHost } from "./index.js";


export const getBasket = async (userId) => {
    const {data} = await $authHost.get('cart?userId=' + userId)
    return data
}


export const addToBasket = async (cartData) => {
    const data = await $authHost.post('cart', cartData)
    return data
}


export const delPositionInBasket = async (basketId, ProductId) => {
    const {data} = await $authHost.delete('cart?basketId=' + basketId + '&ProductId=' + ProductId)
    return data
}

export const clearBasket = async (basketId) => {
    const {data} = await $authHost.delete('cart/' + basketId)
    return data
}




// async getBasket(req, res, next) {
// const {userId} = req.query


// async addToBasket(req, res, next) {
// let {basketId, ProductId, quantity = 1, plus, minus} = req.body


// async delPosition(req, res, next) {
// let {basketId, ProductId} = req.query


//  async clearBasket(req, res, next) {
//  let basketId = req.params.basketId