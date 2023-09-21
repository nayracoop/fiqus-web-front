import React from 'react';


const ShowcaseContainer = styled.div`
    position: relative;
    background: ${styles.colors.greenLight};
    display: flex; 
    justify-content: center;
    padding: 0px 20px 35px 20px;
    margin-bottom: 0px;
    background: ${styles.colors.purplePrimary};
    @media (min-width: ${styles.breakpoints.m}px) {
        margin-bottom: 0px;
        padding-top: 0px;
        padding-bottom: 90px;
    }
    `
const Showcase = () => {
    return (
        <ShowcaseContainer/>
    );
};

export default Showcase;