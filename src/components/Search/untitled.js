import React from "react";
import axios from "axios";
import "./Login.css";

class Login extends React.Component{
    constructor(){
        super()
        this.state= {
            user: {},
            loginError: false
        }
    }

    handleUsername = (event) =>{
        this.setState({
            user:{
                ...this.state.user,
                email:  event.target.value
            }
        })

    }

    handlePassword = (event) =>{
        this.setState({
            user:{
                ...this.state.user,
                password:  event.target.value
            }
        })
    }

    login = (page = 1)=>{
           //return new Promise(resolve => {
                let getData, flag = false;
                axios(`https://swapi.dev/api/people/?page=${page}`)
                .then((response)=>{
                    if(response){
                        getData = response.data.results.find(user => {
                            return user.name === this.state.user.email && user.birth_year === this.state.user.password
                        })
                        //console.log("getData = ", getData)
                        if(getData){
                            flag = true;
                            return getData;
                            //resolve("resolved");
                        } else if(response.data.next !== null){
                            getData = this.login(++page);
                        } else {
                            flag = true;
                            return getData;
                        }
                        
                        //getData ? resolve("resolved") : reject("rejected");

                       //sessionStorage.isLoggedIn = true;
                        //this.props.history.push('/users');
                    }
                 
                },(error) => {
                    this.setState({
                        loginError: true
                    })
                    console.log("response error login", error)
                })

                if (flag) {return getData;}

           
        

    }

    loginClickHandler = (event) => {
         console.log("called login", this.state.user);
         var prom = this.login();
         prom.then((userData)=>{
            console.log('user Data', userData)
             if (userData) {
                console.log("Logged in");
                this.props.history.push('/search');

             } else {
                this.setState({
                    loginError: true
                })
                console.log("response error login");
            }
        }).catch((err)=>{
            console.log('rejcet',err);
        })
         

    }

    

    render(){
        let errorField=null;
        if(this.state.loginError) {
            errorField = <p className="error">Login Failed, Please try again !!</p>
        }
        return(
        <div className="container login-container">
            <h1>Sign In</h1>
            <div className="login-email">
                <label htmlFor="email" className="placeholder"> Enter Email</label>
                <input type="text" onChange={this.handleEmail} id="email" placeholder="Email"  className="form-control" />
            </div>
            <div className="login-pwd">
                <label htmlFor="password" className="placeholder">Enter Password</label>
                <input type="password" onChange={this.handlePassword} id="password" placeholder="Password" className="form-control" />
                {errorField}
            </div>
            <div className="submit-btn">
                <button onClick={this.loginClickHandler} type="button">Login</button>
            </div>
        </div>
        )
    }
}

export default Login;