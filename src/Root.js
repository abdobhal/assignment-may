import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Login from "./components/Login/Login";
import Search from "./components/Search/Search";

class Root extends React.Component{

    render(){
        return(
            <Router>
                <Route exact path={["/","/login"]} component={Login} />
                <Route exact path={"/search"} component={Search} />
            </Router>
        )
    }
}
export default Root;

