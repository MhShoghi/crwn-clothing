import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import {auth,createUserProfileDocument} from "../../firebase/firebase.utils";

import './sign-up.styles.scss'

class SignUp extends React.Component{
    constructor() {
        super();

        this.state = {
            displayName:'',
            email : '',
            password: '',
            confirmPassword: ''
        }
    }


    handleSubmit = async (event) => {
        event.preventDefault();

        const {displayName, email, password, confirmPassword} = this.state;

        if(password !== confirmPassword){
            alert("passwords don't match")
        }
        try{

            const {user} = auth.createUserWithEmailAndPassword(email,password);

            await createUserProfileDocument(user, {displayName});

            this.setState({
                displayName:'',
                email:'',
                password:'',
                confirmPassword:''
            })

        }catch (e) {
            console.log("Error : " + e)
        }



    }


    handleChange = (event) => {
        const {name , value} = event.target;

        this.setState({
            [name] : value
        })
    };
    render() {

        const {displayName, email , password, confirmPassword} = this.state;
        return(
            <div className="sign-up">
                <h2>I do not have an account</h2>
                <span>Sign up with your email and password </span>


                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        handleChange={this.handleChange}
                        label="display name"
                        name="displayName"
                        value={displayName}
                    />

                    <FormInput
                        type="email"
                        handleChange={this.handleChange}
                        label="email"
                        name="email"
                        value={email}
                    />

                    <FormInput
                        type="text"
                        handleChange={this.handleChange}
                        label="password"
                        name="password"
                        value={password}
                    />

                    <FormInput
                        type="password"
                        handleChange={this.handleChange}
                        label="confirm password"
                        name="confirmPassword"
                        value={confirmPassword}
                    />

                    <CustomButton type="submit">Submit</CustomButton>
                </form>


            </div>
        )
    }
}


export default SignUp;