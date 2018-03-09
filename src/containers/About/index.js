import React from 'react';
import { Helmet } from 'react-helmet';
import {ABOUT_TITLE, SITE_NAME} from "../../constants";

class About extends React.Component
{
    render()
    {
        return (
            <div className="about">
                <Helmet>
                    <title>{`${ABOUT_TITLE} - ${SITE_NAME}`}</title>
                    <meta name="description" content="Mental Health Campaign" />
                </Helmet>
            </div>
        )
    }
}

export default About;