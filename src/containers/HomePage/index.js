import React from 'react';
import { Helmet } from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {HOME_TITLE, SITE_NAME} from "../../constants";
import {Content} from "../../components/Content";
import Home from "../../components/Home/Loadable";
class HomePage extends React.Component
{
    render()
    {
        return (
            <div className="home">
                <Helmet>
                    <title>{`${HOME_TITLE} - ${SITE_NAME}`}</title>
                    <meta name="description" content="Speak your mind" />
                </Helmet>
                <Content>
                    <Home {...this.props}/>
                </Content>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);