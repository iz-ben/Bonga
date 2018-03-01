import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    justify-content:center;
    flex-direction: column;
    align-items:center;
    flex:1;
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

export default class Home extends React.Component
{
    render()
    {
        return (
            <Wrapper>
                <p>Sema</p>
                <p>Talk about whatever's weighing on your mind here, anonymously.</p>
                <p>
                    <StartButton to='share'>Start Here</StartButton>
                </p>
            </Wrapper>
        )
    }
}