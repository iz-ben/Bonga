import React from 'react';
import { Helmet } from 'react-helmet';
import {NOT_FOUND_TITLE, SITE_NAME} from "../../constants";

class NotFound extends React.Component
{
    render()
    {
        return (
            <div className="about">
                <Helmet>
                    <title>{`${NOT_FOUND_TITLE} - ${SITE_NAME}`}</title>
                    <meta name="description" content="Not found" />
                </Helmet>
                <p>Page not found</p>
            </div>
        )
    }
}

export default NotFound;