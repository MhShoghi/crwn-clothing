import React from "react";

import "./sign-in.styles.scss"
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {SignInWithGoogle} from "../../firebase/firebase.utils";

class SignIn extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event){
        event.preventDefault();


        this.setState({email: '', password:''})
    }
    handleChange = (event) => {
        const {value, name} = event.target;

        this.setState({
            [name] : value
        })


}

    render() {
        return (
            <div className="sign-in">


                <h1>I already have an account !!! </h1>
                <span className="title">Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>


                    <FormInput
                        type="email"
                        name="email"
                        label="email"
                        value={this.state.email}
                        handleChange={this.handleChange}/>

                    <FormInput
                        type="password"
                        name="password"
                        label="password"
                        value={this.state.password}
                        handleChange={this.handleChange}/>


                   <div className="buttons">
                       <CustomButton >submit</CustomButton>
                       <CustomButton onClick={SignInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
                   </div>
                </form>
            </div>
        );
    }
}


export default SignIn;