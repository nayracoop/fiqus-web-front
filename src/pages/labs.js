import React, {Fragment} from "react"
import { graphql } from 'gatsby';
import styled from 'styled-components'
import Lab from "../components/modules/Lab"
import { useIntl, Link } from "gatsby-plugin-react-intl"
import SectionHeader from "../components/common/SectionHeader"
import {styles} from '../content/content.json'

const PostsMainContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px 20px 109px 20px;
  @media (min-width: ${styles.breakpoints.m}px) {
    padding: 52px 20px 163px 20px;
  }
  @media (min-width: ${styles.breakpoints.xl}px) {
    padding: 52px 0px 168px 0px;
  }
`
const PostsContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 0;
  @media (min-width: ${styles.breakpoints.m}px) {
    max-width: 1140px;
    justify-content: flex-start;
    margin: auto;
    gap: 36px;
    padding: 0;
  };
`
const PostsTitle = styled.h2`
  flex-basis: 100%;
  font-size: 1.72em;
  font-weight: ${styles.fontWeight.medium};
  line-height: 37px;
  text-align: center;
  color: ${styles.colors.darkMainBg};
  margin-bottom: 20px;
  @media (min-width: ${styles.breakpoints.m}px) {
    font-size: 2.83em;
    line-height: 59px;
    margin-bottom: 24px;
  }
`

const Labs = ({data: {allMarkdownRemark: { edges }}}) => {
  const intl = useIntl();

  const Labs = edges.map( 
    edge => {
      const fluidImg = edge.node.frontmatter.image.childImageSharp.fluid 
      const english = edge.node.frontmatter.english;

      if ( (english && intl.locale == 'en') || (!english && intl.locale == 'es')) {
        return(
          <Lab key={edge.node.frontmatter.id} fluidImg={fluidImg} styles={styles} labData={edge.node}></Lab>
        )
      }      
    }
  )
  
  return ( 
    <Fragment>
      <SectionHeader 
        section="labs"
        title={intl.formatMessage({id: 'labs.title'})}
        subtitle={intl.formatMessage({id: 'labs.subtitle'})}
        description={intl.formatMessage({id: 'labs.content'})}
      />
      <PostsMainContainer>
        <PostsContainer>
          <PostsTitle>{intl.formatMessage({id: 'casos_de_exito.title'})}</PostsTitle>
          {Labs}
        </PostsContainer>
      </PostsMainContainer>
    
    </Fragment>
  )

};

export default Labs;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, filter: {frontmatter: {type: {eq: "lab"}}}) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            type
            date(formatString: "MMMM DD, YYYY")
            id
            title
            tags
            image{
              childImageSharp {
                fluid(maxWidth: 1500, quality: 50) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            website
            github
            english
          }
        }
      }
    }
  }
`