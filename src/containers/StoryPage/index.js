import React from 'react';
import { Helmet } from 'react-helmet';
import {getCurrentStories, getSelectedStory, getVisibleStories} from "../App/selector";
import {fetchShares, selectPaginationPage} from "../../modules/bonga";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {SITE_NAME} from "../../constants";
import {Content} from "../../components/Content";
import styled from "styled-components/";
import Parser from 'html-react-parser';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faClock from '@fortawesome/fontawesome-free-solid/faClock'
import TimeAgo from 'react-timeago';
import autosize from 'autosize';

const StoryWrapper = styled(Content)`
padding-top:50px;
position:relative;

.comment
{
    padding: 30px;
    border-bottom: #d4d4d4 solid 1px;
    margin-bottom: 30px;
    position: relative;
    .comment-meta
    {
      position: absolute;
      bottom: 0;
      left:0;
      right: 0;
      padding: 15px;
      font-size:11px;

      .posted
      {
        float:right;
        color: #848484;
      }

      .reply
      {
        position: absolute;
        bottom: -1px;
        left:30px;
        .btn
        {
          border-radius: 0;
          border: none;
        }
      }
    }
}
`;

class StoryPage extends React.Component
{
    componentDidMount()
    {
        autosize(this.replyTextArea);
    }
    render()
    {
        const content = this.props.selectedStory ? this.props.selectedStory.content:'';
        const reply = this.props.selectedStory && this.props.selectedStory.in_reply_to ? '':<span>{this.props.selectedStory.replies} replies . </span>
        return (
            <div className="about">
                <Helmet>
                    <title>{`Story - ${SITE_NAME}`}</title>
                    <meta name="description" content="" />
                </Helmet>
                <StoryWrapper>
                    <div className="comment">
                        <div className='content'>
                            {Parser(content)}
                        </div>
                        <div className="comment-meta">
                            <div className="posted">{reply}<FontAwesomeIcon icon={faClock}/> Published <TimeAgo date={this.props.selectedStory.posted} /></div>
                        </div>
                    </div>
                    <div className="reply-comment">
                        <div className="row">
                            <div className="col-sm-9">
                                <div className="form-group">
                                    <textarea className="form-control" placeholder={`Write your reply here. Be nice :)`} ref={ta => this.replyTextArea = ta}/>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <button className="btn btn-secondary btn-lg">Reply</button>
                            </div>
                        </div>
                    </div>
                </StoryWrapper>
            </div>
        )
    }
}


const mapStateToProps = (state, props) => ({
    items:getVisibleStories(state),
    stories:getCurrentStories(state),
    selectedStory:getSelectedStory(props.match.params.uuid)(state),
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
)(StoryPage);
