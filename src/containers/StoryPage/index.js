import React from 'react';
import { Helmet } from 'react-helmet';
import {getCurrentStories, getSelectedStory, getVisibleStories} from "../App/selector";
import {fetchShares, selectPaginationPage, submitReply} from "../../modules/bonga";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {SITE_NAME} from "../../constants";
import {Content} from "../../components/Content";
import styled from "styled-components/";
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
        const content = this.props.selectedStory ? <DisplayStory {...this.props} {...this.props.selectedStory}/>:'<div>Loading story...</div>';

        //console.log(this.props.selectedStory)

        return (
            <div className="about">
                <Helmet>
                    <title>{`Story - ${SITE_NAME}`}</title>
                    <meta name="description" content="" />
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
    pages:Math.ceil(state.bonga.total/state.bonga.perPage)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchData:fetchShares,
    paginationPage:selectPaginationPage,
    submitReply
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StoryPage);
