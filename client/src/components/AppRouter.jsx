import React, { useContext } from "react";
import {Routes, Route, Navigate} from 'react-router-dom'
import { authRoutes, publicRoutes, secure } from "../routes.js";
import { Context } from "../main.jsx";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
    const {user} = useContext(Context)

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}

            {user.isAuth && user.user?.role === 'admin' && secure.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}

            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}

            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
    )
})

export default AppRouter