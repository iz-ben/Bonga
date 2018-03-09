import React, {Fragment} from 'react';
import { Helmet } from 'react-helmet';
import {FETCH_STORIES_API_ENDPOINT, SHARE_TITLE, SITE_NAME} from "../../constants";
import {Content} from "../../components/Content";
import Editor from "../../components/Editor";
import styled from 'styled-components';
import {fetchShares, selectPaginationPage} from "../../modules/bonga";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ReactPaginate from 'react-paginate';
import Comment from "../../components/Comment";
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faAngleLeft from '@fortawesome/fontawesome-free-solid/faAngleLeft'
import faAngleRight from '@fortawesome/fontawesome-free-solid/faAngleRight'
import {getCurrentStories, getVisibleStories} from "../App/selector";
import {buildApiUrl} from "../../utils/helpers";


const ShareWrapper = styled(Content)`
padding-top:50px;
position:relative;
`;

class Share extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handlePaginationChange = this.handlePaginationChange.bind(this);
    }
    componentDidMount()
    {
        this.props.fetchData();
    }

    handlePaginationChange({selected})
    {
        const page = selected+1;
        this.props.paginationPage(page);
        this.props.fetchData(buildApiUrl(FETCH_STORIES_API_ENDPOINT,{'page':page}));
    }
    render()
    {
        //console.log(this.props.stories)
        //console.log(this.props.pages);
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
                    <div id="react-paginate">
                        {this.props.pages > 1 ? <ReactPaginate previousLabel={<FontAwesomeIcon icon={faAngleLeft}/>}
                                            nextLabel={<FontAwesomeIcon icon={faAngleRight}/>}
                                            breakLabel={<a href="">...</a>}
                                            breakClassName={"break-me"}
                                            pageCount={this.props.pages}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={this.handlePaginationChange}
                                            subContainerClassName={"pages pagination"}
                                            activeClassName={"active"} />
                            :''
                        }
                    </div>
                </ShareWrapper>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    items:getVisibleStories(state),
    stories:getCurrentStories(state),
    loading:state.bonga.loading,
    pages:Math.ceil(state.bonga.total/state.bonga.perPage)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchData:fetchShares,
    paginationPage:selectPaginationPage
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Share);
