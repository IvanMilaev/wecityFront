import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useStore } from "../stores/MainStore";



function ProtectedRoute({children, component: Component, ...rest}: any) {
    const user= useStore('authStore').user;
    return user
    ? (<Route {...rest} component={Component} />)
    : (<Redirect to={'/login'} />)

}


export default ProtectedRoute;