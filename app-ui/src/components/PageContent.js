import * as React from 'react';
import styled from "styled-components";

const StyledPageContent = styled.div`
  grid-area: page;
`

const PageContent = ({children}) => {
    return (
        <StyledPageContent>
            {children}
        </StyledPageContent>
    )
}

export default PageContent