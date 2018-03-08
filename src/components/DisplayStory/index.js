import React, {Fragment} from 'react';
import Parser from 'html-react-parser';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faClock from '@fortawesome/fontawesome-free-solid/faClock'
import TimeAgo from 'react-timeago';
import autosize from 'autosize';

export default class DisplayStory extends React.Component
{
    componentDidMount()
    {
        autosize(this.replyTextArea);
    }

    render()
    {
        const content = this.props.content;
        const reply = this.props.in_reply_to ? '':<span>{this.props.replies||0} replies . </span>;
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
                                <textarea className="form-control" placeholder={`Write your reply here. Be nice :)`} ref={ta => this.replyTextArea = ta}/>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <button
                                className="btn btn-secondary btn-lg"
                                onClick={()=>this.props.submitReply(this.replyTextArea.value, this.props.id)}>Reply</button>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}