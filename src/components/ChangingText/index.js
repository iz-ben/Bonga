import React from 'react';
import {TimelineMax, TweenMax, Back} from 'gsap';
import SplitText from '../../utils/SplitText';
import {SLOGANS} from "../../constants";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {changeSlogan} from "../../modules/bonga";
//import SplitText from "gsap/SplitText";

class ChangingText extends React.Component
{
    changeSlogan()
    {
        const wordPool = SLOGANS;
        const word = Math.floor((Math.random() * (wordPool.length)));
        const slogan = wordPool[word];
        //console.log(wordPool,slogan);
        this.props.changeSlogan(slogan);
        this.animateText();
    }
    animateText()
    {
        if(!this.scene)
            return;
        const words = this.scene.childNodes;
        const mySplitText = new SplitText(words, {type:"words,chars"});
        const tl = new TimelineMax({onComplete:()=> {
                    TweenMax.to(mySplitText.chars, 2, {
                        opacity:0,
                        onComplete:()=>{
                            //console.log(this);
                            this.changeSlogan();
                        }, ease:Back.easeOut
                    });
                }
            }),
            numChars = mySplitText.chars.length;

        for(let i = 0; i < numChars; i++){
            //random value used as position parameter
            tl.from(mySplitText.chars[i], 2, {opacity:0}, Math.random() * 2);
        }
    }
    componentDidMount()
    {
        this.animateText();
    }

    componentDidUpdate()
    {
        this.animateText();
    }
    componentWillUnmount()
    {

    }
    render()
    {
        return (
            <div className="intro-text" ref={c => this.scene = c}><div>{this.props.slogan}</div></div>
        )
    }
}

const mapStateToProps = state => ({
    slogan:state.bonga.slogan
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changeSlogan
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangingText);