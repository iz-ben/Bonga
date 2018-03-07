import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import styled from 'styled-components';
import ReCAPTCHA from 'react-google-recaptcha';

import TinyMCEEditor from "./TinyMCEEditor";
import {RECAPTCHA_KEY, WHATS_ON_YOUR_MIND} from "../../constants";
import {selectEditor, closeEditor, submitStory, recaptchaChange} from "../../modules/bonga";

import Loader from 'react-loaders'

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

        const overlay = this.props.loading ? <div className={`busy`}><Loader type="ball-clip-rotate-multiple" /></div>:'';
        //const overlay = <div className={`busy`}><Loader type="ball-clip-rotate-multiple" /></div>;
        return (
            <div className="editor">
                {overlay}
                <RichEditor visible={this.props.editorActive}>
                    <TinyMCE>
                        <TinyMCEEditor id={`richEditor`} editorContent={this.props.editorContent}/>
                    </TinyMCE>
                    <PlaceholderEditor visible={true}>
                        <ReCAPTCHA
                            sitekey={RECAPTCHA_KEY}
                            onChange={(value)=> this.props.recaptchaChange(value)}
                            size="normal"
                        />
                    </PlaceholderEditor>

                    <SubmitButton type="button" className="btn btn-secondary" onClick={()=>this.props.submitStory(this.props.editorContent, this.props.recaptcha)}>Bonga</SubmitButton>
                    <button typeof="button"  className="btn btn-default btn-sm" onClick={this.props.closeEditor}>Cancel</button>

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
    editorContent:state.bonga.editorContent,
    loading:state.bonga.loading,
    recaptcha:state.bonga.recaptcha
});

const mapDispatchToProps = dispatch => bindActionCreators({
    selectEditor,
    closeEditor,
    submitStory,
    recaptchaChange
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Editor);