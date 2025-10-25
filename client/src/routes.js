import Admin from './pages/AdminPage.jsx'
import Basket from './pages/basketPage/BasketPage.jsx'
import Product from './pages/ProductPage/ProductPage.jsx'
import Auth from './pages/auth/AuthPage.jsx'
import Shop from './pages/ShopPage.jsx'
import Type from './pages/typePage/TypeProdPage.jsx'
import {ADMIN_ROUTE, BASKET_ROUTE, PRODUCT_ROUTE, SHOP_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from './utils/consts.js'


export const secure = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }
]


export const authRoutes = [
    {
        path: BASKET_ROUTE,
        Component: Basket
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: Product
    },
    {
        path: PRODUCT_ROUTE,
        Component: Type
    }
]