import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import "./header.scss";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = localStorage.user ? JSON.parse(localStorage.user) : null;
  const type = user?.type;
  const toggle = () => setIsOpen(!isOpen);
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    <div>
      <Navbar dark expand="md">
        <NavbarBrand href="/">
          <img
            src="https://libertyhospitalfoundation.org/wp-content/uploads/2018/04/FinalAsset-1.png"
            alt=""
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="nav-options">
          <Nav navbar>
            <NavbarText>
              <Link to="/">Home</Link>
            </NavbarText>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Scholarship
              </DropdownToggle>
              <DropdownMenu right>
                {type === "user" ? (
                  <DropdownItem>
                    <Link to="/scholarship">New Application</Link>
                  </DropdownItem>
                ) : null}
                <DropdownItem>
                  <Link to="/scholarship/applications">
                    Review Applications
                  </Link>
                </DropdownItem>
                <DropdownItem divider />
                {type === "user" ? (
                  <DropdownItem>
                    <Link to="/scholarship/status">Check Status</Link>
                  </DropdownItem>
                ) : null}
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Grants
              </DropdownToggle>
              <DropdownMenu right>
                {type == "user" ? (
                  <DropdownItem>
                    <Link to="/grant">New Application</Link>
                  </DropdownItem>
                ) : null}
                <DropdownItem>
                  <Link to="/grant/applications">Review Applications</Link>
                </DropdownItem>
                <DropdownItem divider />
                {type == "user" ? (
                  <DropdownItem>
                    <Link to="/grant/status">Check Status</Link>
                  </DropdownItem>
                ) : null}
              </DropdownMenu>
            </UncontrolledDropdown>
            {type !== "user" ? (
              <NavbarText>
                <Link to="/programs">Program Management</Link>
              </NavbarText>
            ) : null}

            <NavbarText onClick={logout}>Logout</NavbarText>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
