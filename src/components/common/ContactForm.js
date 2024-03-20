import React, { useState, useEffect } from 'react';
import Button from '../common/Button'
import styled from 'styled-components'
import data from '../../content/content.json'
import { useIntl, Link } from "gatsby-plugin-react-intl"
import { useForm } from "react-hook-form";
import axios from 'axios'


const styles = data.styles

const ContactMainContainer = styled.div`
    position: relative;
    background: ${styles.colors.purplePrimary};
    min-height: 725px;
    padding-left: 20px;
    padding-right: 20px;
    @media (min-width: ${styles.breakpoints.m}px) {
        min-height: 210px;
    }
`
const ContactWrapper = styled.div`
    text-align: center;
    justify-content: center;
    position: absolute;
    top: -115px;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    padding: 35px 17px;
    margin: auto;
    margin-bottom: 12px;
    max-width: 320px;
    border: 3px solid ${styles.colors.darkMainBg};
    box-shadow:  0px 4px 0px ${styles.colors.darkMainBg};
    border-radius: 13px;
    background: ${styles.colors.white};
    @media (min-width: ${styles.breakpoints.m}px) {
        top: -163px;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 37px 92px 39px 94px;
        margin: auto;
        max-width: calc(100% - 40px);
    }
    @media (min-width: ${styles.breakpoints.l}px) {
        max-width: 800px;
    }
`
const ContactHeading = styled.h2`
    font-size: 2.38em;
    font-weight:${styles.fontWeight.bold};
    text-align: center;
    @media (min-width: ${styles.breakpoints.m}px) {
        font-size: 3.33em;
        line-height: 64px;
        flex-basis: 100%;
    }
`
const ContactInfoBlock = styled.div`
    margin-top: 65px;
    @media (min-width: ${styles.breakpoints.m}px) {
        margin-top: 28px;
    }
`
const Email = styled(Link)`}
    &::before {
        content: url("${require('../../images/email.svg').default}");
        display: inline-block;
        width: 25px; 
        margin-right: 10px;
        margin-top: 3px;
        margin-left: 2px;
    }
    display: flex;
    align-self: flex-start;
    align-items: center;
    flex-direction: row;
    font-size: .88em;
    font-weight:${styles.fontWeight.bold};
    margin-bottom: 10px;
    text-decoration: none;
    color: ${styles.colors.darkMainBg};
    @media (min-width: ${styles.breakpoints.m}px) {
        font-size: 1em;
        margin-bottom: 7px;
    }
`
const OfficeList = styled.ul`
    margin-left: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`
const OfficeListItem = styled.li`
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    font-size: .88em;
    list-style-type: none;
    margin-bottom: 10px;
    line-height: 22px;
    &:last-of-type {
        margin-bottom: 0;
    }
    @media (min-width: ${styles.breakpoints.m}px) {
        font-size: 1em;
        line-height: 26px;
    }
    &::before {
        content: url("${require('../../images/pin.svg').default}");
        display: inline-block;
        width: 25px; 
        margin-top: 3px;
    }
`

const ContactForm = () => {
    const intl = useIntl();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [emailSent, setEmailSent] = useState(false);
    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [message, setText] = useState("")

    const onSubmit = async () => {
        try {
            setEmailSent(true);

            // aca deberían copiar el endpoint de la app que elijan para recibir los mails
            await axios.post("https://getform.io/f/a021d0d9-180f-4d03-8df0-462bc7ab9429", {
                name,
                mail,
                message
            })

        } catch (error) {
            setEmailSent(false)
            console.log(error)
        }
    }

    useEffect(() => {
        reset()
        setTimeout(()=>{setEmailSent(false)},5000)
      }, [emailSent])



    return (
        <ContactMainContainer>
            <ContactWrapper>
                <ContactHeading>
                    {intl.formatMessage({ id: 'contactForm.title' })}
                </ContactHeading>

                <ContactInfoBlock>
                    <Email>{intl.formatMessage({ id: 'contactForm.email' })}</Email>
                    <OfficeList>
                        <OfficeListItem>{intl.formatMessage({ id: 'contactForm.office1' })}</OfficeListItem>
                        <OfficeListItem>{intl.formatMessage({ id: 'contactForm.office2' })}</OfficeListItem>
                    </OfficeList>
                </ContactInfoBlock>
            </ContactWrapper>
        </ContactMainContainer>
    );
};

export default ContactForm;