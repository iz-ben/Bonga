import React, {Fragment} from 'react';
import { Switch, Route} from 'react-router-dom';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HomePage from "../HomePage/Loadable";
import About from "../About/Loadable";
import Share from "../Share/Loadable";
import StoryPage from "../StoryPage/Loadable";
import NotFound from "../NotFound/Loadable";

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return (
        <Fragment>
            <Header/>
            <div className="main-content">
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/share" component={Share}/>
                    <Route exact path="/story/:uuid" component={StoryPage} />
                    <Route component={NotFound}/>
                </Switch>
            </div>
            <Footer/>
        </Fragment>
    );
  }
}

export default App;
