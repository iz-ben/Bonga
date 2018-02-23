import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

export default class Footer extends React.Component
{
    render()
    {
        return (
            <footer className="footer">
                <div className="container">
                    <span className="text-muted">&copy;2018 Bonga is a Capital Group initiative</span> <Link to='about'>About</Link>
                </div>
            </footer>
        )
    }
}