import React, {Fragment} from 'react';
import { Helmet } from 'react-helmet';
import {SHARE_TITLE, SITE_NAME} from "../../constants";
import {Content} from "../../components/Content";
import Editor from "../../components/Editor";
import styled from 'styled-components';
import {fetchShares} from "../../modules/bonga";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ReactPaginate from 'react-paginate';
import Comment from "../../components/Comment";

const ShareWrapper = styled(Content)`

padding-top:50px;
`;

class Share extends React.Component
{
    componentDidMount()
    {
        this.props.fetchData(1);
    }
    render()
    {
        console.log(this.props.stories)
        return (
            <Fragment>
                <Helmet>
                    <title>{`${SHARE_TITLE} - ${SITE_NAME}`}</title>
                    <meta name="description" content="" />
                </Helmet>
                <ShareWrapper>
                    <Editor/>
                    <div className={`stories`}>
                        {this.props.stories.map((story)=><Comment key={story.id} {...story}/>)}
                    </div>

                    <ReactPaginate previousLabel={"previous"}
                                   nextLabel={"next"}
                                   breakLabel={<a href="">...</a>}
                                   breakClassName={"break-me"}
                                   pageCount={120}
                                   marginPagesDisplayed={2}
                                   pageRangeDisplayed={5}
                                   onPageChange={()=>{}}
                                   containerClassName={"pagination"}
                                   subContainerClassName={"pages pagination"}
                                   activeClassName={"active"} />
                </ShareWrapper>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    stories:state.bonga.shares
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchData:(page) => dispatch(fetchShares(page))
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Share);
