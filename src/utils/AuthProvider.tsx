import { User, UserManager } from "oidc-client";
import React, { useEffect, useRef } from "react";
import { IMainStore } from "../stores/MainStore";
import { setAuthHeader } from "./headers";

interface Props {
    children: any,
    store: IMainStore,
    manager: UserManager
}



export default function AuthProvider({ manager, store, children }:Props) {
    const userManager = useRef<UserManager>(manager);

    useEffect(() => {

        userManager.current = manager;

        const onUserLoaded = (user: User) => {
            console.log(`user loaded: ${user}`)
            store.authStore.storeUser(user);
          };
      
          const onUserUnloaded = () => {
            setAuthHeader(null)
            console.log(`user unloaded`)
          };
      
          const onAccessTokenExpiring = () => {
            console.log(`user token expiring`)
          };
      
          const onAccessTokenExpired = () => {
            console.log(`user token expired`)
          };
          const onUserSignedOut = () => {
            console.log(`user signed out`)
          };

        userManager.current.events.addUserLoaded(onUserLoaded);
        userManager.current.events.addUserUnloaded(onUserUnloaded);
        userManager.current.events.addAccessTokenExpiring(onAccessTokenExpiring);
        userManager.current.events.addAccessTokenExpired(onAccessTokenExpired);
        userManager.current.events.addUserSignedOut(onUserSignedOut);

        return () => {
            
        }
    }, [manager, store])

    return (
        React.Children.only(children)
    )
}