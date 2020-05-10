import React, { useState } from "react";
import "./Login.css";
import { connect } from 'react-redux';

const Login = (props) => {
    const [loginErrorStatus, setLoginErrStatus] = useState(false);

    const loginClickHandler = async event => {
        event.preventDefault();
        try {
            if(props.userNameFromStore.trim().length && props.pwdFromStore.trim().length){
                const userData = await login();

                if (userData) {
                    console.log("Logged in");
                    sessionStorage.isLoggedIn = true;
                    props.history.push('/search');
                }
                else{
                    setLoginErrStatus(true);
                }
            }
        } catch(err) {
            console.log('error from async',err);
        }
    }

    const login = async (page = 1) => {
        let userData;
        await fetch(`https://swapi.dev/api/people/?page=${page}`)
            .then(res => res.json())
            .then((data)=>{
                if(data){
                    userData = data.results.find(user => {
                        return user.name.toLowerCase() === props.userNameFromStore.toLowerCase() && user.birth_year === props.pwdFromStore
                    });

                    if(userData){
                        return userData;
                    } else if(data.next !== null){
                        userData = login(++page);
                    } else {
                        return userData;
                    }
                }
            })

         return userData;
    }

    

    return(
        <div className="container login-container">
            <form onSubmit={loginClickHandler}>
                <h1>Sign In</h1>
                <div className="login-email">
                    <label htmlFor="username" className="placeholder"> Enter Star Wars Character name</label>
                    <input type="text" required onChange={(event) => props.handleUsername(event)} id="username" placeholder="Username"  className="form-control" />
                </div>
                <div className="login-pwd">
                    <label htmlFor="password" className="placeholder">Enter Password - YOB</label>
                    <input type="password" required onChange={(event) => props.handlePassword(event)} id="password" placeholder="Password" className="form-control" />
                    {
                        loginErrorStatus ? <p className="error">Login Failed, Please try again !!</p> : null                        
                    }
                </div>
                <div className="submit-btn">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
    
}

const mapStateToProps = (state) => {
    return {
        userNameFromStore: state.userName,
        pwdFromStore: state.password  
    } 
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleUsername: (event) => dispatch({type: 'USERNAME', event}),
        handlePassword: (event) => dispatch({type: 'PASSWORD', event})
    }  
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);