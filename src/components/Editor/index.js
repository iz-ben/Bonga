import React from 'react';
import {WHATS_ON_YOUR_MIND} from "../../constants";
import {selectEditor, closeEditor} from "../../modules/bonga";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import TinyMCEEditor from "./TinyMCEEditor";
import styled from 'styled-components';

const RichEditor = styled.div`
    margin-bottom:10px;
    display: ${props => props.visible ? 'block' : 'none'};
`;

const PlaceholderEditor = styled.div`
    margin-bottom:10px;
    display: ${props => props.visible ? 'block' : 'none'};
`;

const TinyMCE = styled.div`
 margin-bottom:10px;
`;

const SubmitButton = styled.button`
    padding: .25rem .5rem;
    font-size: .875rem;
    line-height: 1.5;
    border-radius: .2rem;
    margin-right:10px !important;
`;

class Editor extends React.Component
{
    render()
    {
        return (
            <div className="editor">
                <RichEditor visible={this.props.editorActive}>
                    <TinyMCE>
                        <TinyMCEEditor id={`richEditor`}/>
                    </TinyMCE>
                    <SubmitButton type="button" className="btn btn-primary btn-sm">Submit</SubmitButton>
                    <button typeof="button"  className="btn btn-secondary btn-sm" onClick={this.props.closeEditor}>Cancel</button>
                </RichEditor>
                <PlaceholderEditor visible={!this.props.editorActive}>
                    <input onClick={this.props.selectEditor} type="text" placeholder={WHATS_ON_YOUR_MIND} name=''/>
                </PlaceholderEditor>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    editorActive: state.bonga.editorActive,
    replyTo: state.bonga.replyTo,
    editorContent:state.bonga.editorContent
});

const mapDispatchToProps = dispatch => bindActionCreators({
    selectEditor,
    closeEditor
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Editor);