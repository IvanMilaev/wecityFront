import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import { Home } from './pages/Home';
import TopBar from './components/TopBar';
import SigninOidc from './pages/signin-oidc';
import SignoutOidc from './pages/signout-oidc';
import userManager, { loadUserFromStorage } from './services/auth/user-service';
import {  useStores } from './stores/MainStore';
import AuthProvider from './utils/AuthProvider';



function App() {

  const store = useStores();
  useEffect(() => {
    loadUserFromStorage(store);
  }, []);

  return (
    <AuthProvider manager={userManager} store={store}>
      <Router>
        <Switch>
          <Route path="/" exact >
            <Redirect to="/home"/>
          </Route>
          <Route path="/login" component={Login}/>
          <Route path="/home" component={Home}/>
          <Route path="/signin-oidc" component={SigninOidc}/>
          <Route path="/signout-oidc" component={SignoutOidc}/>
        </Switch>
      </Router>
    </AuthProvider>
      
  );
}


export default App;
