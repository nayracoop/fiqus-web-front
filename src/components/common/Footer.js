import React, { Fragment } from 'react';
import styled from 'styled-components'
import data from '../../content/content.json'
import { useIntl } from 'gatsby-plugin-react-intl'
import ContactForm from './ContactForm'

const styles = data.styles
const licenseLogo = require('../../images/icon_cc_heart.png')

const FooterContainer = styled.footer`
    background:${styles.colors.purplePrimary};
    color:${styles.colors.white};
    font-size: .77em;
    line-height: 18px;
    padding: 20px;
    @media (min-width: ${styles.breakpoints.m}px) {
        padding-top: 0;
    }
`
const FooterWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: auto;
    max-width: 320px;
    @media (min-width: ${styles.breakpoints.m}px) {
        justify-content: space-between; 
        align-items: center;
        max-width: calc(100% - 40px);
    }
    @media (min-width: ${styles.breakpoints.l}px) {
        max-width: 946px;
    }

`
const FooterLicense = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    @media (min-width: ${styles.breakpoints.s}px) {
        width: auto;
    }    
`
const FooterLicenseName = styled.span`
    font-weight:${styles.fontWeight.bold};
`
const FooterCopyright = styled.div`
      @media (min-width: ${styles.breakpoints.l}px) {
          margin-top: 0;
        }
`
const FooterCoopName = styled.a`
    font-weight:${styles.fontWeight.bold};
    text-transform: uppercase;
    text-decoration: none;
    color: ${styles.colors.white};
    &:hover {
        color: ${styles.colors.greenMain}!important;
    }
`
const FooterLicenseContent = styled.p`
      max-width: 342px;
      margin-bottom: 25px;
      @media (min-width: ${styles.breakpoints.m}px) {
          max-width: 360px;
          margin-bottom: 0px;
      }
`
const FooterLicenseIcon = styled.img`
      width: 38px;
      height: 33px;
      margin-right: 6px;
`

const Footer = () => {
    const intl = useIntl();

    return (
        <Fragment>
            <ContactForm/>
            <FooterContainer>
                <FooterWrapper>
                    <FooterLicense>
                        <FooterLicenseIcon src={licenseLogo.default} alt={intl.formatMessage({id: "footer.licenseIconAlt" })} />
                        <FooterLicenseContent>
                            {intl.formatMessage({id: "footer.disclaimer" })}  <FooterLicenseName>{intl.formatMessage({id: "footer.licenseName" })}</FooterLicenseName>
                        </FooterLicenseContent>
                    </FooterLicense>
                    <FooterCopyright>
                        {intl.formatMessage({id: "footer.designby" })}{" "}
                        <FooterCoopName
                            type="link"
                            isLink={true}
                            href={intl.formatMessage({ id: "footer.coopName1Path" })}
                            target="_blank"
                        >
                        {intl.formatMessage({ id: "footer.coopName1" })}
                        </FooterCoopName>
                    {" "}{intl.formatMessage({ id: "footer.preposition" })}{" "}
                        <FooterCoopName
                            type="link"
                            isLink={true}
                            href={intl.formatMessage({ id: "footer.coopName2Path" })}
                            target="_blank"
                        >
                        {intl.formatMessage({ id: "footer.coopName2" })}
                        </FooterCoopName>
                    </FooterCopyright>
                </FooterWrapper>
            </FooterContainer>
        </Fragment>
    );
};

export default Footer;