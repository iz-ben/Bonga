import React, {Fragment} from 'react';
import Parser from 'html-react-parser';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faClock from '@fortawesome/fontawesome-free-solid/faClock'
import TimeAgo from 'react-timeago';
import autosize from 'autosize';
import ReCAPTCHA from 'react-google-recaptcha';
import {FETCH_STORIES_API_ENDPOINT, RECAPTCHA_KEY} from "../../constants";
import {buildApiUrl} from "../../utils/helpers";
import Comment from "../Comment/Loadable";

export default class DisplayStory extends React.Component
{
    componentDidMount()
    {
        this.props.fetchData(buildApiUrl(FETCH_STORIES_API_ENDPOINT,{
            'in_reply_to':this.props.id,
            'limit':-1
        }));

        autosize(this.replyTextArea);

    }

    render()
    {
        const content = this.props.content;
        const reply = this.props.in_reply_to ? '':<span>{this.props.replies||0} replies . </span>;
        //console.log(this.props.storyReplies)
        return (
            <Fragment>
                <div className="comment">
                    <div className='content'>
                        {Parser(content)}
                    </div>
                    <div className="comment-meta">
                        <div className="posted">{reply}<FontAwesomeIcon icon={faClock}/> Published <TimeAgo date={this.props.posted} /></div>
                    </div>
                </div>
                <div className="reply-comment">
                    <div className="row">
                        <div className="col-sm-9">
                            <div className="form-group">
                                <textarea value={this.props.replyEditorContent} onChange={()=>this.props.typeReply(this.replyTextArea.value)} className="form-control" placeholder={`Write your reply here. Be nice :)`} ref={ta => this.replyTextArea = ta}/>
                            </div>
                            <div className="form-group">
                                <ReCAPTCHA
                                    sitekey={RECAPTCHA_KEY}
                                    onChange={(value)=> this.props.recaptchaChange(value)}
                                    size="normal"
                                />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <button
                                className="btn btn-secondary btn-lg"
                                onClick={()=>this.props.submitReply(this.replyTextArea.value, this.props.id, this.props.recaptcha)}>Reply</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="stories">
                                {this.props.storyReplies.map((story)=><Comment key={story.id} {...story}/>)}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}