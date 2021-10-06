import React, {Fragment} from "react"
import { graphql } from 'gatsby';
import styled from 'styled-components'
import Lab from "../components/modules/Lab"

import {styles, labs} from '../content/content.json'

const PostsContainer = styled.div`

`

const Labs = ({data: {allMarkdownRemark: { edges }}}) => {

  const Labs = edges.map( 
    edge => {
      const fluidImg = edge.node.frontmatter.image.childImageSharp.fluid 
      console.log(fluidImg)
      return(
        <Lab fluidImg={fluidImg} styles={styles} labData={edge.node}></Lab>
  )})
  
  return <PostsContainer>{Labs}</PostsContainer>

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
            title
            tags
            image{
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`