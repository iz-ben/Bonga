import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../logo.png';
class Header extends React.Component
{
    render()
    {
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

export default Header;