import React, { useEffect, useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Container, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Header from "components/Headers/Header.js";
import AllUsers from "./AllUsers";

import { useLocation } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// export default class CompanyDetail extends React.Component {
function CompanyDetail(props) {
    // constructor(props) {
    //     super(props);

    //     this.toggle = this.toggle.bind(this);
    //     this.state = {
    //         activeTab: '1'
    //     };
    // }
    const [key, setKey] = useState('home');
    const [activeTab, setactiveTab] = useState('1')
    const location = useLocation();
    const setItem = location.state;
    console.log("location", location);
    const toggle = (tab) => {
        if (activeTab !== tab) {
            setactiveTab(tab)
            // this.setState({
            //     activeTab: tab
            // });
        }
    }
    return (
        <>
            {/* {activeTab === '1' && ()} */}
            <div className="header pb-8 pt-5 pt-md-8" style={{ background: 'green' }}>

                <Container fluid>
                    <div className="header-body">
                        <span style={{ position: "absolute", top: 35, fontSize: 16, fontWeight: 600, color:"#fff" }}>
                            {setItem?.corporateName}
                        </span>
                    </div>
                </Container>
            </div>
            <div style={{ marginLeft: 40 }}>
                <Nav tabs className="nav--links">
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Company Information
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Users
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    {setItem?.corporateName ? (
                                        <div className="listUi">
                                            <span className="text-sm">Legal Name</span>
                                            <span className="text-sm">{setItem?.corporateName}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.corporateAddress ? (
                                        <div className="listUi">
                                            <span className="text-sm">Corporate Address</span>
                                            <span className="text-sm">{setItem?.corporateAddress}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.companyName ? (
                                        <div className="listUi">
                                            <span className="text-sm">Operating Name</span>
                                            <span className="text-sm">{setItem?.companyName}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.companyAddress ? (
                                        <div className="listUi">
                                            <span className="text-sm">Company Address</span>
                                            <span className="text-sm">{setItem?.companyAddress}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.companyType ? (
                                        <div className="listUi">
                                            <span className="text-sm">Company Type</span>
                                            <span className="text-sm">{setItem?.companyType}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.additionalInformation ? (
                                        <div className="listUi">
                                            <span className="text-sm">Additional Information</span>
                                            <span className="text-sm">{setItem?.additionalInformation}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primarybadgeId ? (
                                        <div className="listUi">
                                            <span className="text-sm">Badge/ID</span>
                                            <span className="text-sm">{setItem?.primarybadgeId}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primaryName ? (
                                        <div className="listUi">
                                            <span className="text-sm">Name</span>
                                            <span className="text-sm">{setItem?.primaryName}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primaryContact ? (
                                        <div className="listUi">
                                            <span className="text-sm">Contact</span>
                                            <span className="text-sm">{setItem?.primaryContact}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primaryRankPositionTitle ? (
                                        <div className="listUi">
                                            <span className="text-sm">Rank Position/Title</span>
                                            <span className="text-sm">{setItem?.primaryRankPositionTitle}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primaryDepartment ? (
                                        <div className="listUi">
                                            <span className="text-sm">Department</span>
                                            <span className="text-sm">{setItem?.primaryDepartment}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primaryEmail ? (
                                        <div className="listUi">
                                            <span className="text-sm">Email</span>
                                            <span className="text-sm">{setItem?.primaryEmail}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primaryAddress ? (
                                        <div className="listUi">
                                            <span className="text-sm">Address</span>
                                            <span className="text-sm">{setItem?.primaryAddress}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondarybadgeId ? (
                                        <div className="listUi">
                                            <span className="text-sm">Badge/ID</span>
                                            <span className="text-sm">{setItem?.secondarybadgeId}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondaryName ? (
                                        <div className="listUi">
                                            <span className="text-sm">Name</span>
                                            <span className="text-sm">{setItem?.secondaryName}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondaryContact ? (
                                        <div className="listUi">
                                            <span className="text-sm">Contact</span>
                                            <span className="text-sm">{setItem?.secondaryContact}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondaryRankPositionTitle ? (
                                        <div className="listUi">
                                            <span className="text-sm">Rank Position/Title</span>
                                            <span className="text-sm">{setItem?.secondaryRankPositionTitle}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondaryDepartment ? (
                                        <div className="listUi">
                                            <span className="text-sm">Department</span>
                                            <span className="text-sm">{setItem?.secondaryDepartment}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondaryEmail ? (
                                        <div className="listUi">
                                            <span className="text-sm">Email</span>
                                            <span className="text-sm">{setItem?.secondaryEmail}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondaryAddress ? (
                                        <div className="listUi">
                                            <span className="text-sm">Address</span>
                                            <span className="text-sm">{setItem?.secondaryAddress}</span>
                                        </div>
                                    ) : null}



                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <AllUsers data={'2'} idData={setItem.id} typeData={setItem?.companyType} />
                        {/* <Row>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                        </Row> */}
                    </TabPane>
                </TabContent>
            </div>
        </>
    );
}

export default CompanyDetail;