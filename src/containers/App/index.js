import React, {Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HomePage from "../HomePage/Loadable";
import About from "../About/Loadable";

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return (
        <Fragment>
            <Router>
                <div>
                    <Header/>
                    <Switch>
                        <div className="main-content">
                            <Route exact path="/" component={HomePage}/>
                            <Route exact path="/about" component={About}/>
                        </div>
                    </Switch>
                    <Footer/>
                </div>
            </Router>
        </Fragment>
    );
  }
}

export default App;
