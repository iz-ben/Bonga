import React from "react";

import tinymce from 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/table';
import 'tinymce/plugins/paste/plugin';
import 'tinymce/plugins/link/plugin';
import 'tinymce/plugins/autoresize/plugin';
import 'tinymce/plugins/advlist/plugin';
import 'tinymce/plugins/lists/plugin';

import 'tinymce/skins/lightgray/skin.min.css'
import 'tinymce/skins/lightgray/content.min.css'
import {typeText} from "../../modules/bonga";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class TinyMCEEditor extends React.Component {
    constructor(props)
    {
        super(props);

        this.editor  = null;
    }

    renderRichText()
    {
        tinymce.remove(`#${this.props.id}`);

        this.editor = tinymce.init({
            selector: `#${this.props.id}`,
            //skin_url: `${process.env.PUBLIC_URL}/skins/lightgray`,
            plugins: ['paste', 'link', 'autoresize','wordcount','table', 'lists','advlist'],
            skin: false,
            menubar: false,
            toolbar:'undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | link',
            setup: editor => {
                //this.setState({ editor });
                editor.on('keyup change', () => {
                    const content = editor.getContent();
                    this.props.typeText(content);
                    //console.log(content);
                });

                editor.on('init',(e) => {
                    e.target.setContent(this.props.editorContent);
                });
            }
        });
    }

    shouldComponentUpdate(nextProps, nextState)
    {
        return true;
    }

    componentDidMount()
    {
        this.renderRichText();
    }

    componentDidUpdate(prevProps, prevState)
    {
        this.renderRichText();
    }

    componentWillUnmount() {
        //tinymce.remove(this.state.editor);
    }

    render() {
        //console.log(this.editor);
        return (
            <textarea
                id={this.props.id}
                value={this.props.editorContent}
                onChange={(e)=>this.props.typeText(e.target.value)}
            />
        );
    }
}

const mapStateToProps = state => ({
    editorActive: state.bonga.editorActive,
    editorContent:state.bonga.editorContent
});

const mapDispatchToProps = dispatch => bindActionCreators({
    typeText
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TinyMCEEditor);