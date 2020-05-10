import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import Login from "./container/Login/Login";
import Search from "./container/Search/Search";

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

