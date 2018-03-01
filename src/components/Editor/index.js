import React from 'react';
import {WHATS_ON_YOUR_MIND} from "../../constants";
import {selectEditor, closeEditor} from "../../modules/bonga";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import TinyMCEEditor from "./TinyMCEEditor";
import styled from 'styled-components';

const RichEditor = styled.div`
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
    passiveEditor()
    {
        return <input onClick={this.props.selectEditor} type="text" placeholder={WHATS_ON_YOUR_MIND} name=''/>;
    }

    tinyMCE()
    {
        return (
            <div>
                <RichEditor>
                    <TinyMCEEditor id={`richEditor`}/>
                </RichEditor>
                <SubmitButton type="button" className="btn btn-primary btn-sm">Submit</SubmitButton>
            </div>
        )
    }
    render()
    {
        //console.log(this.props);
        const editor = this.props.editorActive ? this.tinyMCE():this.passiveEditor();

        return (
            <div className="editor">
                {editor}
                <hr/>
                <div>
                    {this.props.editorContent}
                </div>
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