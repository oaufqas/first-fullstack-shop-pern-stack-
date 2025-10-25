import React, { useContext, useEffect, useState } from "react"
import { BrowserRouter } from "react-router-dom"
import AppRouter from "./components/AppRouter.jsx"
import NavBar from "./components/navBar/NavBar.jsx"
import { observer } from "mobx-react-lite"
import { Context } from "./main.jsx"
import { check } from "./http/userApi.js"
import { Spinner } from "react-bootstrap"
import { getBasket } from "./http/cartApi.js"

const App = observer(() => {
  const {user, product} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const gtCart = async () => {
      try {
        const data = await getBasket(user.user.id);
        product.setCart(data);

      } catch (e) {
        console.error(e);
      }
    };


    const checkAuth = async () => {
      try {
        const userData = await check()

        user.setIsAuth(true)
        user.setUser(userData)
        gtCart();

      } catch(e) {
        
        user.setIsAuth(false)
        user.setUser({})
        localStorage.removeItem('token')

      } finally{
        setLoading(false)
      }}

      checkAuth()

    }, [])

  if (loading) {
    return(
    <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }
  return(
    <BrowserRouter>
    <NavBar/>
    <AppRouter/>
    </BrowserRouter>
  )
})

export default App
