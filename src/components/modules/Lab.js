import React from 'react';
import styled from 'styled-components'
import Img from "gatsby-image"
import Tags from '../common/Tags'

const CaseWrapper = styled.div`

` 

const LabTitle = styled.h3`

`

const LabImage = styled.img`

`
const LabDescription =styled.p`

`


const SuccessCase = (props) => {
    const lab = props.labData
    return (
        <CaseWrapper>
            <Img fluid={props.fluidImg}></Img>
            <LabTitle>{lab.frontmatter.title}</LabTitle>
            <Tags styles={props.styles} type="labs" tags={lab.frontmatter.tags}></Tags>
            <LabDescription>{lab.excerpt}</LabDescription>
        </CaseWrapper>
    );
};

export default SuccessCase;