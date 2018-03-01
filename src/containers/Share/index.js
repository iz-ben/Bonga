import React, {Fragment} from 'react';
import { Helmet } from 'react-helmet';
import {SHARE_TITLE, SITE_NAME} from "../../constants";
import {Content} from "../../components/Content";
import Editor from "../../components/Editor";
import styled from 'styled-components';

const ShareWrapper = styled(Content)`

padding-top:50px;
`;

class Share extends React.Component
{
    render()
    {
        return (
            <Fragment>
                <Helmet>
                    <title>{`${SHARE_TITLE} - ${SITE_NAME}`}</title>
                    <meta name="description" content="" />
                </Helmet>
                <ShareWrapper>
                    <Editor/>
                </ShareWrapper>
            </Fragment>
        )
    }
}

export default Share;