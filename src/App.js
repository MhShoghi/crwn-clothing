import React from 'react';

import './App.css';
import {Route, Switch} from "react-router-dom";
import Header from "./components/header/header.component";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignIn from "./components/sign-in/sign-in.component";
import {auth} from "../src/firebase/firebase.utils"

class App extends React.Component{

    constructor() {
        super();
        this.state = {
            currentUser:''
        }
    }


    unsubscribeFromAuth = null;


    componentDidMount() {
       this.unsubscribeFromAuth =  auth.onAuthStateChanged(user => {
            this.setState({
                currentUser: user
            })
            console.log(user)
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();

        console.log(this.unsubscribeFromAuth)
    }


    render(){
          return (
            <div>
                <Header currentUser={this.state.currentUser}/>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/shop" component={ShopPage}/>
                    <Route path="/signin" component={SignIn}/>
                </Switch>
                </div>
          );
    }
}

export default App;