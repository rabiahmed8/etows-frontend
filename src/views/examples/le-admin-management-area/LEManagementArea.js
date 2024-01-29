import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Container, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import { useLocation } from 'react-router-dom';
import CorpDetail from "../CorpDetail";
import Staff from "../ManagmentArea/Staff";
import Fleet from "../ManagmentArea/Fleet";
import ContractRepo from "./ContractRepo";
import Pounds from "./Pounds";
import OtherStaff from "../ManagmentArea/OtherStaff";

function LEManagementArea(props) {
    const [activeTab, setactiveTab] = useState('1')
    const location = useLocation();
    const setItem = location.state;
    console.warn("setItem: ",setItem);
    const toggle = (tab) => {
        if (activeTab !== tab)
            setactiveTab(tab)
    }
    return (
        <>
            <div className="header pb-8 pt-5 pt-md-8" style={{ background: 'green' }}>
                <Container fluid>
                    <div className="header-body">
                        <span style={{ position: "absolute", top: 35, fontSize: 16, fontWeight: 600, color: "#fff" }}>
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
                            onClick={() => { toggle('1'); }}>
                            Company Information
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}>
                            Corporate Detail
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => { toggle('3'); }}>
                            Tow Driver
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '7' })}
                            onClick={() => { toggle('7'); }}>
                            Other Staff
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '4' })}
                            onClick={() => { toggle('4'); }}>
                            Fleet
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '5' })}
                            onClick={() => { toggle('5'); }}>
                            Contract Repository
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '6' })}
                            onClick={() => { toggle('6'); }}>
                            Pounds
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
                                            <span className="text-sm" style={{width:"20% !important"}}>Legal Name</span>
                                            <span className="text-sm">{setItem?.corporateName}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.corporateAddress ? (
                                        <div className="listUi">
                  <span className="text-sm listUiItem">Corporate Address</span>
                                            <span className="text-sm">{setItem?.corporateAddress}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.companyName ? (
                                        <div className="listUi">
                  <span className="text-sm listUiItem">Operating Name</span>
                                            <span className="text-sm">{setItem?.companyName}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.companyAddress ? (
                                        <div className="listUi">
                                            <span className="text-sm" style="width:20%">Company Address</span>
                                            <span className="text-sm">{setItem?.companyAddress}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.companyType ? (
                                        <div className="listUi">
                  <span className="text-sm listUiItem">Company Type</span>
                                            <span className="text-sm">{setItem?.companyType}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.additionalInformation ? (
                                        <div className="listUi">
                  <span className="text-sm listUiItem">Additional Information</span>
                                            <span className="text-sm">{setItem?.additionalInformation}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primarybadgeId ? (
                                        <div className="listUi">
                  <span className="text-sm listUiItem">Badge/ID</span>
                                            <span className="text-sm">{setItem?.primarybadgeId}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primaryName ? (
                                        <div className="listUi">
                  <span className="text-sm listUiItem">Name</span>
                                            <span className="text-sm">{setItem?.primaryName}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primaryContact ? (
                                        <div className="listUi">
                  <span className="text-sm listUiItem">Contact</span>
                                            <span className="text-sm">{setItem?.primaryContact}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primaryRankPositionTitle ? (
                                        <div className="listUi">
                  <span className="text-sm listUiItem">Rank Position/Title</span>
                                            <span className="text-sm">{setItem?.primaryRankPositionTitle}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primaryDepartment ? (
                                        <div className="listUi">
                  <span className="text-sm listUiItem">Department</span>
                                            <span className="text-sm">{setItem?.primaryDepartment}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primaryEmail ? (
                                        <div className="listUi">
                  <span className="text-sm listUiItem">Email</span>
                                            <span className="text-sm">{setItem?.primaryEmail}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primaryAddress ? (
                                        <div className="listUi">
                  <span className="text-sm listUiItem">Address</span>
                                            <span className="text-sm">{setItem?.primaryAddress}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondarybadgeId ? (
                                        <div className="listUi">
                  <span className="text-sm listUiItem">Badge/ID</span>
                                            <span className="text-sm">{setItem?.secondarybadgeId}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondaryName ? (
                                        <div className="listUi">
                  <span className="text-sm listUiItem">Name</span>
                                            <span className="text-sm">{setItem?.secondaryName}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondaryContact ? (
                                        <div className="listUi">
                  <span className="text-sm listUiItem">Contact</span>
                                            <span className="text-sm">{setItem?.secondaryContact}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondaryRankPositionTitle ? (
                                        <div className="listUi">
                  <span className="text-sm listUiItem">Rank Position/Title</span>
                                            <span className="text-sm">{setItem?.secondaryRankPositionTitle}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondaryDepartment ? (
                                        <div className="listUi">
                  <span className="text-sm listUiItem">Department</span>
                                            <span className="text-sm">{setItem?.secondaryDepartment}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondaryEmail ? (
                                        <div className="listUi">
                  <span className="text-sm listUiItem">Email</span>
                                            <span className="text-sm">{setItem?.secondaryEmail}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondaryAddress ? (
                                        <div className="listUi">
                  <span className="text-sm listUiItem">Address</span>
                                            <span className="text-sm">{setItem?.secondaryAddress}</span>
                                        </div>
                                    ) : null}



                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <CorpDetail />
                    </TabPane>
                    <TabPane tabId="3">
                        <Staff />
                    </TabPane>
                    <TabPane tabId="7">
                        <OtherStaff />
                    </TabPane>
                    <TabPane tabId="4">
                        <Fleet dataItem={setItem}/>
                    </TabPane>
                    <TabPane tabId="5">
                    <ContractRepo dataItem={setItem}/>
                    </TabPane>
                    <TabPane tabId="6">
                        <Pounds dataItem={setItem}/>
                    </TabPane>
                </TabContent>
            </div>
        </>
    );
}

export default LEManagementArea;