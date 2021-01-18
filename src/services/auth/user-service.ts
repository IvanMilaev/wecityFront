import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { IMainStore, mainStore } from '../../stores/MainStore';


const config: UserManagerSettings = {
    authority: process.env.REACT_APP_AUTHORITY_URL,
    client_id: 'wecity_spa',
    redirect_uri: 'http://localhost:3000/signin-oidc',
    silent_redirect_uri: 'http://localhost:3000/silent-renew.html',
    post_logout_redirect_uri: 'http://localhost:3000/signout-oidc',
    response_type: "code",
    scope: "openid profile email wecityGraphQL",
    filterProtocolClaims: true,
    loadUserInfo: true
}

const userManager = new UserManager(config)

export async function loadUserFromStorage(store: IMainStore) {
  try {
    let user = await userManager.getUser()
    if (!user) { return store.authStore.storeUserError() }
    store.authStore.storeUser(user);
  } catch (e) {
    console.error(`User not found: ${e}`)
    store.authStore.storeUserError();
  }
}

export function signinRedirect() {
  return userManager.signinRedirect()
}

export function signinRedirectCallback() {
  return userManager.signinRedirectCallback()
}

export function signoutRedirect(id_token: string) {
  userManager.clearStaleState()
  userManager.removeUser()
  return userManager.signoutRedirect({ 'id_token_hint': id_token })
}

export function signoutRedirectCallback() {
  userManager.clearStaleState()
  userManager.removeUser()
  return userManager.signoutRedirectCallback()
}

export default userManager;









