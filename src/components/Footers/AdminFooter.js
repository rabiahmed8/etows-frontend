
import React from "react";

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import config from "config";
class Footer extends React.Component {
  currentYear = new Date().getFullYear();

  render() {
    return (
      <footer className="footer" style={{marginTop:"7%"}}>
        <Row className="align-items-center justify-content-xl-between ft-class">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © {this.currentYear+" "}
              <a
                className="font-weight-bold ml-1"
                // href="https://www.creative-tim.com?ref=adr-admin-footer"
                rel="noopener noreferrer"
                target="_blank"
              >
                {config.appName}
              </a>
            </div>
          </Col>

          <Col xl="6">
            <Nav className="nav-footer justify-content-center justify-content-xl-end">
              <NavItem>
                <NavLink
                  // href="https://www.creative-tim.com?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {config.appName}
                </NavLink>
              </NavItem>

              {/* <NavItem>
                <NavLink
                  // href="https://www.creative-tim.com/presentation?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  About Us
                </NavLink>
              </NavItem> */}

              {/* <NavItem>
                <NavLink
                  // href="http://blog.creative-tim.com?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Blog
                </NavLink>
              </NavItem> */}

              {/* <NavItem>
                <NavLink
                  // href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  MIT Licence
                </NavLink>
              </NavItem> */}
            </Nav>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
