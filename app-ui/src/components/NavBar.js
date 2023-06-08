import * as React from 'react';
import styled from "styled-components";
import {SiAeromexico} from "react-icons/si";
import {Link} from "react-router-dom";
import demoUser from '../image/demo-user.png'

const StyledNavBar = styled.div`
  display: grid;
  grid-area: navbar;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  background-color: #2d333b;
  color: #cdd9e5;
  border-bottom: 1px solid #444c56;
  padding: 0 20px 0 30px;

  .logo-link{
    width: fit-content;
  }
  
  .nav-bar-profile{
    justify-self: end;
  }
  
  .nav-bar-profile-wrapper{
    display: flex;
    align-items: center;
  }
  
  .nav-bar-profile-name{
    margin-top: 2px;
  }
  
  .nav-bar-profile-image{
    width: 35px;
    height: 30px;
    border-radius: 50px;
  }
`

const NavBarLogo = styled.div`
  display: flex;
  align-items: center;
  
  .logo-icon {
    font-size: 30px;
  }
  
  .logo-text-wrapper {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
  
  :hover{
    color: #c1c1c1;
  }
`

const NavBar = () => {

    return (
        <StyledNavBar>
            <Link className="logo-link" to="/">
                <NavBarLogo>
                    <SiAeromexico className="logo-icon"/>
                    <div className="logo-text-wrapper">
                        <span className="logo-text top-logo-text">Inventory</span>
                        <span>Management</span>
                    </div>
                </NavBarLogo>
            </Link>
            <Link className="nav-bar-profile" to="/">
                <div className="nav-bar-profile-wrapper">
                    <div className="nav-bar-profile-name">demo user</div>
                    <img className="nav-bar-profile-image" src={demoUser}/>
                </div>
            </Link>
        </StyledNavBar>
    )
}

export default NavBar