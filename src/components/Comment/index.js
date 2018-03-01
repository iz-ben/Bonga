import React from 'react';
import {Link} from 'react-router-dom';
import TimeAgo from 'react-timeago';
import Parser from 'html-react-parser';

export default class Comment extends React.Component
{
    render()
    {
        return (
            <div className="comment">
                <div className='content'>
                    {Parser(this.props.content)}
                </div>
                <div>
                    <TimeAgo date={this.props.posted} />
                </div>
            </div>
        )
    }
}