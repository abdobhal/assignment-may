import React, {useState} from "react";
import "./Login.css";

const Login = (props) => {
    const [userDetails, setUser] = useState({user: {username: null, password: null}});
    const [loginErrorStatus, setLoginErrStatus] = useState({loginError: false});

    const handleUsername = (event) => {
        setUser({
            user:{
                password: userDetails.user.password,
                username:  event.target.value
            }
        })

    }

    const handlePassword = (event) =>{
        setUser({
            user:{
                username: userDetails.user.username,
                password: event.target.value
            }
        })
    }

    const loginClickHandler = async event => {
        event.preventDefault();
        try {
            if(userDetails.user.username.trim().length && userDetails.user.password.trim().length){
                const userData = await login();

                    if (userData) {
                    console.log("Logged in");
                    sessionStorage.isLoggedIn = true;
                    props.history.push('/search');
                    }
                    else{
                    setLoginErrStatus({
                        loginError: true
                    })
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
                        return user.name.toLowerCase() === userDetails.user.username.toLowerCase() && user.birth_year === userDetails.user.password
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
                    <input type="text" required onChange={handleUsername} id="username" placeholder="Username"  className="form-control" />
                </div>
                <div className="login-pwd">
                    <label htmlFor="password" className="placeholder">Enter Password - YOB</label>
                    <input type="password" required onChange={handlePassword} id="password" placeholder="Password" className="form-control" />
                    {
                        loginErrorStatus.loginError ? <p className="error">Login Failed, Please try again !!</p> : null                        
                    }
                </div>
                <div className="submit-btn">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
    
}

export default Login;