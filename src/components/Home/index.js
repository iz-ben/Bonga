import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import logoWhiteBackground from '../../logo-white-bg.png';
import ChangingText from "../ChangingText/Loadable";
import {connect} from "react-redux";

const Wrapper = styled.div`
    display: flex;
    justify-content:center;
    flex-direction: column;
    align-items:center;
    flex:1;
    p{
        font-size:18px;
    }
`;

const StartButton = styled(Link)`
    background-color:#41c7f4;
    color:#FFF;
    display:block;
    padding:10px 20px;
    &:hover
    {
        text-decoration:none;
    }
`;

class Home extends React.Component
{
    render()
    {
        return (
            <Wrapper>
                <p>
                    <img src={logoWhiteBackground} alt="Bonga"/>
                </p>
                <ChangingText slogan="Bonga"/>
                <p>Talk about whatever's weighing heavily on your mind here, anonymously.</p>
                <p>
                    <StartButton to='share'>Start Here</StartButton>
                </p>
            </Wrapper>
        )
    }
}

const mapStateToProps = null

const mapDispatchToProps = null;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);