import React from 'react';
import styled from 'styled-components'
import data from '../../content/content.json'
import Img from "gatsby-image"
import Tags from '../common/Tags'
import { useIntl, Link } from "gatsby-plugin-react-intl"
import Button from '../common/Button'

const githubIcon = require('../../images/icon_github.svg');
const styles = data.styles

const CaseWrapper = styled.div`
    margin-bottom: 40px;
    max-width: 351px;
    flex-basis: 100%;
    &:last-of-type {
        margin-bottom: 96px;
    }
    @media (min-width: ${styles.breakpoints.l}px) {
        flex-basis: 33%;
        &:last-of-type {
            margin-bottom: 75px;
        }
    }
` 

const LabImage = styled(Img)`
    border-radius: 6px;
    margin-bottom: 15px;
    height: 182px;
    @media (min-width: ${styles.breakpoints.m}px) {
        margin-bottom: 20px;
    }
    @media (min-width: ${styles.breakpoints.l}px) {
        height: 208px;
    }
`
const LabTitle = styled.h3`
    font-size: 2.11em;
    line-height: 42px;
    color: ${styles.colors.greenMain};
    margin-bottom: 15px;    
`
const LabDescription =styled.p`
    font-size: 1em;
    line-height: 1.22em;
    padding-bottom: 22px;
    margin-bottom: 20px;
    color: ${styles.colors.darkMainBg};
    border-bottom: 2px solid ${styles.colors.greenLight};
    @media (min-width: ${styles.breakpoints.l}px) {
        line-height: 1.44em;
    }
`
const TagsTitle = styled.h4`
    margin-bottom: 20px;
    margin-bottom: 22px;
    font-size: .88em;
    font-weight: ${styles.fontWeight.medium};
    color: ${styles.colors.ultraDarkGrey};
`
const TagsContainer =  styled.div`
    padding-bottom: 13px;
    margin-bottom: 20px;
    border-bottom: 2px solid ${styles.colors.greenLight};
    @media (min-width: ${styles.breakpoints.l}px) {
        padding-bottom: 13px;
    }
`
const BtnContainer =  styled.div`
    display: flex;
    flex-wrap: wrap;
`
const BtnGithub =  styled(Button)`
    font-size: .88em;
    padding-left: 10px;
    padding-right: 10px;
    @media (min-width: ${styles.breakpoints.l}px) {
        font-size: 1em;
    }
`
const BtnSite =  styled(Button)`
    font-size: .88em;
    padding-left: 10px;
    padding-right: 10px;
    @media (min-width: ${styles.breakpoints.l}px) {
        font-size: 1em;
    }
`

const SuccessCase = (props) => {
    const lab = props.labData
    const intl = useIntl();

    return (
        <CaseWrapper>
            <LabImage
                fluid={props.fluidImg}
                alt={intl.formatMessage({id: "casos_de_exito.imageAltLine1"}) + lab.frontmatter.title }
            />
            <LabTitle>{lab.frontmatter.title}</LabTitle>
            <LabDescription>{lab.excerpt}</LabDescription>
            <TagsTitle>{intl.formatMessage({id: "casos_de_exito.tagsTitle"})}</TagsTitle>
            <TagsContainer>
                <Tags styles={props.styles} type="labs" tags={lab.frontmatter.tags}></Tags>
            </TagsContainer>
            <BtnContainer>
                { props.labData.frontmatter.website && 
                    <BtnSite
                        type='btnLabeled'
                        theme={styles}
                        isLink
                        target="_blank"
                        href={props.labData.frontmatter.website}
                        btnText={intl.formatMessage({id: "casos_de_exito.btnTextVerMas"})}
                    />
                }
                { props.labData.frontmatter.github && 
                    <BtnGithub
                        type='btnLabeled'
                        theme={styles}
                        isLink
                        src={githubIcon.default}
                        github={true}
                        href={props.labData.frontmatter.github}
                        target="_blank"
                        btnText={intl.formatMessage({id: "casos_de_exito.btnTextGithub"})}
                    />
                }
            </BtnContainer>
        </CaseWrapper>
    );
};

export default SuccessCase;