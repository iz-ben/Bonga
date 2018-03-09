import React from 'react';
import { Helmet } from 'react-helmet';
import styled from "styled-components/";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getCurrentStories, getSelectedStory, getStoryReplies, getVisibleStories} from "../App/selector";
import {
    fetchReplies,
    fetchShares,
    recaptchaChange,
    selectPaginationPage,
    submitReply,
    typeReply
} from "../../modules/bonga";
import {SITE_NAME} from "../../constants";
import {Content} from "../../components/Content";
import DisplayStory from "../../components/DisplayStory";

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

    render()
    {
        //console.log(this.props.storyReplies);
        const content = this.props.selectedStory ? <DisplayStory {...this.props} {...this.props.selectedStory}/>:'<div>Loading story...</div>';

        //console.log(this.props.selectedStory)
        const description = this.props.selectedStory ? this.props.selectedStory.excerpt : '';

        return (
            <div className="about">
                <Helmet>
                    <title>{`${description} - ${SITE_NAME}`}</title>
                    <meta name="description" content={description} />
                </Helmet>
                <StoryWrapper>
                    {content}
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
    pages:Math.ceil(state.bonga.total/state.bonga.perPage),
    replyEditorContent:state.bonga.replyEditorContent,
    recaptcha:state.bonga.recaptcha,
    storyReplies:getStoryReplies(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchData:fetchReplies,
    paginationPage:selectPaginationPage,
    submitReply,
    recaptchaChange,
    typeReply
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StoryPage);
