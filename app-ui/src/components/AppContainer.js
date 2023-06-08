import * as React from 'react';
import styled from "styled-components";
import LeftToolbar from "./LeftToolbar";
import NavBar from "./NavBar";
import PageContent from "./PageContent";

const StyledAppContainer = styled.div`
  background-color: #22272e;
  color: #768390;
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: 50px minmax(calc(100vh - 50px), 100%);
  grid-template-areas: 
    "navbar navbar navbar navbar navbar navbar"
    "sidebar page page page page page";

  .modal {
    //border: 1px solid red;
    display: flex;
    position: absolute;
    width: 100vw;
    height: 50px;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
  }

  .modal-message {
    color: #cdd9e5;
    font-size: 20px;
  }

  .modal-error {
    background-color: #c25353;
  }

  .modal-success {
    background-color: rgba(82, 141, 82, 0.91);
  }
`

const AppContainer = ({children}) => {
    return (
        <StyledAppContainer>
            <LeftToolbar/>
            <NavBar/>
            <PageContent>
                {children}
            </PageContent>
        </StyledAppContainer>
    )
}

export default AppContainer