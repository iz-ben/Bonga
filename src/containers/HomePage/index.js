import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {HOME_TITLE, SITE_NAME} from "../../constants";
import {Content} from "../../components/Content";

class HomePage extends React.Component
{
    render()
    {
        return (
            <div className="home">
                <Helmet>
                    <title>{`${HOME_TITLE} - ${SITE_NAME}`}</title>
                    <meta name="description" content="" />
                </Helmet>
                <Content>
                    Home page
                </Content>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    bonga: () => {}
}, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(HomePage);