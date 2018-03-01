import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../logo.png';
import {connect} from "react-redux";
import styled from 'styled-components';
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
        return (
            <div className="masthead">
                <div className="branding">
                    <div className="logo">
                        <Link to="/">
                            <img src={Logo} alt="Bonga"/>
                        </Link>
                    </div>
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