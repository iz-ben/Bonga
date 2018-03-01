import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../logo.png';
import {connect} from "react-redux";
import {makeSelectPathname} from "../../containers/App/selector";
class Header extends React.Component
{
    checkClass()
    {
        const body = document.body;
        const isHome = this.props.location==='/';

        if(isHome)
        {
            if (body.classList) {
                body.classList.add('home');
            } else {
                body.className += ' home';
            }
        }else
        {
            if (body.classList) {
                body.classList.remove('home');
            } else {
                body.className = body.className.replace( 'home', '' );
            }
        }
    }
    render()
    {
        this.checkClass();
        const isHome = this.props.location==='/';
        //console.log(isHome,this.props.location);
        const logo = !isHome ? (
            <div className="logo">
                <Link to="/">
                    <img src={Logo} alt="Bonga"/>
                </Link>
            </div>):'';
        return (
            <div className="masthead">
                <div className="branding">
                    {logo}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    location: makeSelectPathname(state)
    //location: state.route.get('location').get('pathname')
});

export default connect(
    mapStateToProps,
    null
)(Header);