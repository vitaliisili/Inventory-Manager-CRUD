import * as React from 'react';
import styled from "styled-components";

const Styled404Page = styled.div`
  background-color: #252525;
  font-weight: bolder;
  font-size: 30em;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #768390;
  
`

const NotFound404 = () => {

    return (
        <Styled404Page>
            <div>404</div>
        </Styled404Page>
    )
}

export default NotFound404