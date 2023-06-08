import * as React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuClipboardList } from "react-icons/lu";

const StyledLeftToolbar = styled.div`
  display: grid;
  grid-area: sidebar;
  background-color: #2d333b;
  color: #cdd9e5;
  border-right: 1px solid #444c56;
`

const ToolBarMenu = styled.div`
  margin-top: 50px;
  height: fit-content;
  border-bottom: 1px solid #444c56;
`

const ToolBArMenuItem = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #444c56;
  padding: 17px 10px 17px 0;
  
  :hover{
    color: #c1c1c1;
  }

  .toolbar-menu-item-icon{
    margin-left: 30px;
  }
  
  .toolbar-menu-item-text{
    margin-left: 10px;
  }
  
`

const LeftToolbar = () => {
    return (
        <StyledLeftToolbar>
            <ToolBarMenu>
                <Link to="/">
                    <ToolBArMenuItem>
                        <LuLayoutDashboard className="toolbar-menu-item-icon"/>
                        <span className="toolbar-menu-item-text">Dashboard</span>
                    </ToolBArMenuItem>
                </Link>
                <Link to="/products">
                    <ToolBArMenuItem>
                        <LuClipboardList className="toolbar-menu-item-icon"/>
                        <span className="toolbar-menu-item-text">Products</span>
                    </ToolBArMenuItem>
                </Link>
            </ToolBarMenu>
        </StyledLeftToolbar>
    )
}

export default LeftToolbar