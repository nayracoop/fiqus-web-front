import React from 'react'
import styled from 'styled-components'
import Wrapper from '../components/common/PageWrapper'
import data from '../content/content.json'

const styles = data.styles

const Culture = () => {
    const content = data.culture

    return (
        <Wrapper>
            <h1>{content.title}</h1>
        </Wrapper>
    );
};

export default Culture;