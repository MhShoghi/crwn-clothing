import React from 'react';

import './App.css';
import {Route, Switch,Redirect} from "react-router-dom";
import Header from "./components/header/header.component";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import {auth,createUserProfileDocument} from "../src/firebase/firebase.utils"
import SignInAndSignUpPage from "./pages/signInAndSignUpPage/SignInAndSignUp.component";
import {connect} from "react-redux";
import {setCurrentUser} from "./redux/user/user.actions";
class App extends React.Component{



    unsubscribeFromAuth = null;


    componentDidMount() {

        const {setCurrentUser} = this.props;

       this.unsubscribeFromAuth =  auth.onAuthStateChanged(async userAuth => {
          if(userAuth){
              const userRef = await createUserProfileDocument(userAuth);

              userRef.onSnapshot(snapshot => {


                  setCurrentUser({
                      id: snapshot.id,
                      ...snapshot.data()
                  })

              })

          }


          setCurrentUser(userAuth)
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();

        console.log(this.unsubscribeFromAuth)
    }


    render(){
          return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/shop" component={ShopPage}/>
                    <Route exact path="/signin" render={() => this.props.currentUser ?  (<Redirect to="/"/>) : <SignInAndSignUpPage/> }  />
                </Switch>
                </div>
          );
    }
}

const mapStateToDispatch = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(
    mapStateToProps,
    mapStateToDispatch
                )(App);