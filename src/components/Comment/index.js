import React from 'react';
import TimeAgo from 'react-timeago';
import Parser from 'html-react-parser';
import {Link} from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faClock from '@fortawesome/fontawesome-free-solid/faClock'

export default class Comment extends React.Component
{
    render()
    {
        const reply = this.props.in_reply_to ? '':<span>{this.props.replies} replies . </span>
        return (
            <div className="comment">
                <div className='content'>
                    {Parser(this.props.content)}
                </div>
                <div className="comment-meta">
                    <div className="reply"><Link to={this.props.slug} className="btn btn-secondary">Reply</Link></div>
                    <div className="posted">{reply} <FontAwesomeIcon icon={faClock}/> Published <TimeAgo date={this.props.posted} /></div>
                </div>
            </div>
        )
    }
}