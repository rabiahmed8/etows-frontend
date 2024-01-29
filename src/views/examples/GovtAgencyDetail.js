import React, { useEffect, useState } from "react";

import {
    TabContent, TabPane, Nav, NavItem, NavLink, Button,
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Label,
    Container,
    Alert,
    Row,
    Col,
    Spinner,
    UncontrolledTooltip,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Input,
    CardBody,
    Form,
    FormGroup
} from "reactstrap";
import toast, { Toaster } from 'react-hot-toast';
import classnames from 'classnames';
import Header from "components/Headers/Header.js";
import AllUsers from "./AllUsers";
import config from "config";
import { useLocation } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UploadModal from "component/UploadModal";
import { UploadContractsApi } from "APIstore/apiCalls";
import { errorAlert } from "Theme/utils";
import { successAlert } from "Theme/utils";
import { UploadGetContractsApi } from "APIstore/apiCalls";
import { singleDeleteFile } from "APIstore/apiCalls";
import ViewImageModal from "component/ViewImageModal";
// export default class GovtAgencyDetail extends React.Component {
var localAccessData = null
var logData1 = {}
function GovtAgencyDetail(props) {

    const [key, setKey] = useState('home');
    const [activeTab, setactiveTab] = useState('1')
    const location = useLocation();
    const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
    const [openContractModal, setOpenContractModal] = useState(false);
    const [openfeeAgrementModal, setOpenFeeAgrementModal] = useState(false);
    const [InvoiceData, setInvoiceData] = useState(false);
    const [ContractData, setContractData] = useState(false);
    const [feeAgrementData, setFeeAgrementData] = useState(false);
    const [dataInvoices, setDataInvoices] = useState([]);
    const [dataContract, setDataContracts] = useState([]);
    const [dataAgrement, setDataAgrement] = useState([]);
    const [dataUpdate, setDataUpdate] = useState([]);
    const [dataUpdateContract, setDataUpdateContract] = useState([]);
    const [dataUpdateAgrement, setDataUpdateAgrement] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [openViewImageModal, setViewImageModal] = useState(false);
    const [imageData, setDataImage] = useState();
    const [logInfo, setLogInfo] = useState('');
    const setItem = location.state;
    console.log("location", location);
    const [deleteModal, setDeletToggle] = useState(false);
    const [fileData, setFileData] = useState('');
    const Deletetoggle = (item) => {
        setFileData(item)
        setDeletToggle(!deleteModal)
    }
    const deleteAPI = () => {
        setIsLoader(true)
        console.log("fileData", fileData);
        try {
            singleDeleteFile(fileData, async (res) => {
                console.log("adasdasd", res)
                if (res.sucess) {
                    setDeletToggle(!deleteModal)
                    if (activeTab == '2') {
                        getDataFiles("Invoices")
                    }
                    if (activeTab == '3') {
                        getDataFiles("Contracts")
                    }
                    if (activeTab == '4') {
                        getDataFiles("FeesAgreement")
                    }
                    // try {
                    //     singleAllAgency('', async (res) => {
                    //         console.log("singleAllAgency", res)
                    //         if (res.sucess) {
                    //             setData(res.sucess.list);
                    //             console.log("res.sucess.list", res.sucess.list);
                    //             setDeletToggle(!deleteModal)
                    //         } else {
                    //             console.log("errrrr")
                    //             setDeletToggle(!deleteModal)
                    //         }
                    //     });
                    // } catch (error) {
                    //     console.log("error", error)
                    //     setDeletToggle(!deleteModal)
                    // }
                    successAlert(res.sucess.messages[0].message)
                    setIsLoader(false)
                } else {
                    errorAlert(res.sucess.messages[0].message)
                    setDeletToggle(!deleteModal)
                    setIsLoader(false)
                }
            });
        } catch (error) {
            errorAlert(error)
            setDeletToggle(!deleteModal)
            setIsLoader(false)
        }
    }

    const ChangeStatusJob = (status) => {
        // console.log("fff", data);
        // console.log("fff", status);
        // if (status == 'Police') {
        //   let result = data.filter(el => el.agencyType === status);
        //   setData(result)
        // }
        // else {
        //   try {
        //     getAgencies('', async (res) => {
        //       if (res.sucess) {
        //         console.log("res.sucess", res.sucess)
        //         setData(res.sucess.list)
        //       } else {
        //         console.log("errrrr")
        //       }
        //     });
        //   } catch (error) {
        //     console.log("error", error)
        //   }
        // }
        // setStatusData(status)
    }
    const toggleUpdate = (item) => {
        // if (item) {
        //   setModalUpdate(!modalUpdate);
        //   setItemData(item)
        // }
        // else {
        //   setModalUpdate(!modalUpdate);
        //   setItemData('');
        // }
    }
    const toggleUpdateInvoices = (item) => {
        if (item) {
            //   setModalUpdate(!modalUpdate);
            setDataUpdate(item)
            setOpenInvoiceModal(!openInvoiceModal)
        }
        else {
            //   setModalUpdate(!modalUpdate);
            //   setItemData('');
        }
    }
    const toggleUpdateContract = (item) => {
        if (item) {
            //   setModalUpdate(!modalUpdate);
            setDataUpdateContract(item)
            setOpenContractModal(!openContractModal)
        }
        else {
            //   setModalUpdate(!modalUpdate);
            //   setItemData('');
        }
    }
    const toggleUpdateAgreement = (item) => {
        if (item) {
            //   setModalUpdate(!modalUpdate);
            setDataUpdateAgrement(item)
            setOpenFeeAgrementModal(!openfeeAgrementModal)
        }
        else {
            //   setModalUpdate(!modalUpdate);
            //   setItemData('');
        }
    }
    const toggle = (tab) => {
        if (activeTab !== tab) {
            setactiveTab(tab)

        }
    }
    const ViewImage = (item) => {
        setDataImage(item)
        setViewImageModal(!openViewImageModal)
    }
    const invoiceCallback = (InvoiceData) => {
        console.log("InvoiceDataInvoiceData", InvoiceData);
        setIsLoader(true)
        try {
            const formData = new FormData();
            if (InvoiceData) {
                for (let i = 0; i < InvoiceData.length; i++) {
                    formData.append(`file`, InvoiceData[i].files);
                    formData.append('type', InvoiceData[i].imageType);
                    formData.append('subType', InvoiceData[i].imageType);
                    formData.append('issueDate', InvoiceData[i].issueDate);
                    formData.append('expiryDate', InvoiceData[i].expDate);
                    formData.append('comments', InvoiceData[i].comments ? InvoiceData[i].comments : '');
                }
            }

            // formData.append('id', setItem.id);
            if (Object.keys(dataUpdate).length !== 0) {
                formData.append('id', dataUpdate.id);
            }
            formData.append('refId', setItem.id);
            for (var key of formData.entries()) {
                console.log(key[0] + ", " + key[1]);
            }

            UploadContractsApi(formData, async (res) => {
                if (res.sucess) {
                    console.log("UPP", res.sucess)
                    await getDataFiles("Invoices")
                    successAlert(res.sucess.response.messages[0].message)
                    setOpenInvoiceModal(false)
                    setIsLoader(false)
                    setDataUpdate([])
                    // setModalUpdate(!modalUpdate)
                } else {
                    console.log("errrrr")
                    setIsLoader(false)
                    errorAlert(res.sucess.response.messages[0].message)
                }
            });
        } catch (error) {
            errorAlert(error)
            setIsLoader(false)
            console.log("error", error)
        }

        // console.log("invoiceData", invoiceData);
        // setInvoiceData(invoiceData)

    }
    const contractCallback = (ContractData) => {
        setIsLoader(true)
        try {
            const formData = new FormData();
            if (ContractData) {
                for (let i = 0; i < ContractData.length; i++) {
                    formData.append(`file`, ContractData[i].files);
                    formData.append('type', ContractData[i].imageType);
                    formData.append('subType', ContractData[i].imageType);
                    formData.append('issueDate', ContractData[i].issueDate);
                    formData.append('expiryDate', ContractData[i].expDate);
                    formData.append('comments', ContractData[i].comments ? ContractData[i].comments : '');
                }
            }
            if (Object.keys(dataUpdateContract).length !== 0) {
                formData.append('id', dataUpdateContract.id);
            }
            formData.append('refId', setItem.id);
            for (var key of formData.entries()) {
                console.log(key[0] + ", " + key[1]);
            }

            UploadContractsApi(formData, async (res) => {
                if (res.sucess) {
                    console.log("UPP", res.sucess)
                    await getDataFiles("Contracts")
                    successAlert(res.sucess.response.messages[0].message)
                    setOpenContractModal(false)
                    setIsLoader(false)
                    setDataUpdateContract([])
                    // setModalUpdate(!modalUpdate)
                } else {
                    console.log("errrrr")
                    setIsLoader(false)
                    errorAlert(res.sucess.response.messages[0].message)
                }
            });
        } catch (error) {
            setIsLoader(false)
            console.log("error", error)
            errorAlert(error)
        }
        // console.log("contractData", contractData);
        // setContractData(contractData)
        // setOpenContractModal(false)
    }
    const feeAgrementCallback = (feeAgrementData) => {
        setIsLoader(true)
        try {
            const formData = new FormData();

            if (feeAgrementData) {
                for (let i = 0; i < feeAgrementData.length; i++) {
                    formData.append(`file`, feeAgrementData[i].files);
                    formData.append('type', feeAgrementData[i].imageType);
                    formData.append('subType', feeAgrementData[i].imageType);
                    formData.append('issueDate', feeAgrementData[i].issueDate);
                    formData.append('expiryDate', feeAgrementData[i].expDate);
                    formData.append('comments', feeAgrementData[i].comments ? feeAgrementData[i].comments : '');
                }
            }
            if (Object.keys(dataUpdateAgrement).length !== 0) {
                formData.append('id', dataUpdateAgrement.id);
            }
            formData.append('refId', setItem.id);
            for (var key of formData.entries()) {
                console.log(key[0] + ", " + key[1]);
            }

            UploadContractsApi(formData, async (res) => {
                if (res.sucess) {
                    console.log("UPP", res.sucess)
                    await getDataFiles("FeesAgreement")
                    setOpenFeeAgrementModal(false)
                    setIsLoader(false)
                    successAlert(res.sucess.response.messages[0].message)
                    setDataUpdateAgrement([])
                    // setModalUpdate(!modalUpdate)
                } else {
                    console.log("errrrr")
                    setIsLoader(false)
                    errorAlert(res.sucess.messages[0].message)
                }
            });
        } catch (error) {
            console.log("error", error)
            setIsLoader(false)
            errorAlert(error)
        }
        // console.log("feeAgrement", feeAgrement);
        // setFeeAgrementData(feeAgrement)
        // setOpenFeeAgrementModal(false)
    }
    const getDataFiles = (type) => {
        setIsLoader(true)
        let obj
        if (localAccessData == null) {
            obj = {
                id: setItem.id,
                subType: type,
                type: type
            }
        }
        else {
            obj = {
                id: logData1.role == 'POLICE_ADMIN' ? setItem?.id : logData1?.companyId,
                subType: type,
                type: type,
                comId: logData1.role == 'POLICE_ADMIN' ? setItem?.id : logData1?.companyId
            }
        }

        try {
            UploadGetContractsApi(obj, async (res) => {
                console.log("adasdasd", res)
                if (res.sucess) {
                    if (type == "Invoices") {
                        setDataInvoices(res.sucess.list);
                        setIsLoader(false)
                        return
                    }
                    if (type == "Contracts") {
                        setDataContracts(res.sucess.list);
                        setIsLoader(false)
                        return
                    }
                    if (type == "FeesAgreement") {
                        setDataAgrement(res.sucess.list);
                        setIsLoader(false)
                        return
                    }
                } else {
                    console.log("errrrr")
                    setIsLoader(false)
                }
            });
        } catch (error) {
            console.log("error", error)
            setIsLoader(false)
        }
    }
    const getLoggedData = async () => {
        let logData;
        const storedData = await localStorage.getItem('accessData')
        if (storedData) {
            const getdata = await localStorage.getItem('accessData')
            logData = JSON.parse(getdata)
            localAccessData = logData

        }
        else {
            const getdata = await localStorage.getItem('loggedData')
            logData = JSON.parse(getdata)
        }
        console.log("parsedDataparsedData", localAccessData);
        setLogInfo(logData)
        setLogInfo((state) => {
            logData1 = state;
        });
    }
    useEffect(() => {
        getLoggedData()
        if (activeTab == '2') {
            getDataFiles("Invoices")
        }
        if (activeTab == '3') {
            getDataFiles("Contracts")
        }
        if (activeTab == '4') {
            getDataFiles("FeesAgreement")
        }
    }, [activeTab])
    return (
        <>
            {/* {activeTab === '1' && ()} */}
            <div className="header pb-8 pt-5 pt-md-8" style={{ background: 'green' }}>

                <Container fluid>
                    <div className="header-body">
                        <span style={{ position: "absolute", top: 35, fontSize: 16, fontWeight: 600, color: "#fff" }}>
                            {setItem?.corporateName}
                        </span>
                    </div>
                </Container>
            </div>
            <div >
                <Nav tabs className="nav--links" style={{}} >
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Agency/Corp
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Invoices
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => { toggle('3'); }}
                        >
                            Contracts
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '4' })}
                            onClick={() => { toggle('4'); }}
                        >
                            Fees Agreement
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row className="dflex-class">
                            <Col sm="11">
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    {setItem?.id ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">ID</span>
                                            <span className="text-sm">{setItem?.id}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.companyId ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Company ID</span>
                                            <span className="text-sm">{setItem?.companyId}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.agencyName ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Agency Name</span>
                                            <span className="text-sm">{setItem?.agencyName}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.agencyType ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Agency Type</span>
                                            <span className="text-sm">{setItem?.agencyType}</span>
                                        </div>
                                    ) : null}
                                    {/* <>
                                        {(setItem?.primaryName || setItem?.primaryPhone) || (setItem?.secondaryName || setItem?.secondaryPhone) ? (
                                            <div style={{ width: "100%" }}>
                                                <h3 style={{ marginTop: 7 }}>Contact Information</h3>
                                            </div>
                                        ):null}
                                    </> */}
                                    {setItem?.primaryName ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Contact Primary Name</span>
                                            <span className="text-sm">{setItem?.primaryName}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primaryPosition ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Contact Primary Position</span>
                                            <span className="text-sm">{setItem?.primaryPosition}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primaryPhone ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Contact Primary Phone</span>
                                            <span className="text-sm">{setItem?.primaryPhone}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primaryAddress ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Contact Primary Address</span>
                                            <span className="text-sm">{setItem?.primaryAddress}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondaryName ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Contact Secondary Name</span>
                                            <span className="text-sm">{setItem?.secondaryName}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondaryPosition ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Contact Secondary Position</span>
                                            <span className="text-sm">{setItem?.secondaryPosition}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondaryPhone ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Contact Secondary Phone</span>
                                            <span className="text-sm">{setItem?.secondaryPhone}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondaryAddress ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Contact Secondary Address</span>
                                            <span className="text-sm">{setItem?.secondaryAddress}</span>
                                        </div>
                                    ) : null}




                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row className="row1">
                            <div className="col">
                                <Card className="shadow">
                                    <CardHeader className="border-0">
                                        <Row>
                                            <h3 className="mb-0">Invoices</h3>
                                            <UncontrolledDropdown style={{ marginLeft: 10 }}>
                                                <DropdownToggle
                                                    className="btn-icon-only text-light"

                                                    role="button"
                                                    size="sm"
                                                    color=""
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    <i className="fas fa-ellipsis-v" />
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-arrow" right>
                                                    <DropdownItem

                                                        onClick={() => { ChangeStatusJob('All') }}
                                                    >
                                                        All
                                                    </DropdownItem>
                                                    <DropdownItem

                                                        onClick={() => { ChangeStatusJob('IssuedDate') }}
                                                    >
                                                        {config.IssuedDate}
                                                    </DropdownItem>
                                                    <DropdownItem

                                                        onClick={() => { ChangeStatusJob('PaidDate') }}
                                                    >
                                                        {config.PaidDate}
                                                    </DropdownItem>
                                                    <DropdownItem

                                                        onClick={() => { ChangeStatusJob('Outstanding') }}
                                                    >
                                                        {config.Outstanding}
                                                    </DropdownItem>

                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            {/* <h3 style={{ position: "absolute", right: 20, top: 25, }} className="mb-0">Keep Scrolling ►</h3> */}
                                            <Button style={{ position: "absolute", right: 20, top: -7, }} onClick={() => {
                                                setDataUpdate([])
                                                setOpenInvoiceModal(!openInvoiceModal)
                                            }} className="my-4 p-btm" color="primary" type="button">
                                                Add New
                                            </Button>
                                        </Row>

                                    </CardHeader>
                                    {isLoader ? (
                                        <div className="SpinnerClass">
                                            <Spinner className="loader" children={true} />
                                        </div>
                                    ) :
                                        <Table className="align-items-center table-flush" responsive>
                                            {dataInvoices?.length > 0 ? (
                                                <>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            {/* <th scope="col">Name</th> */}
                                                            <th scope="col">File</th>
                                                            <th scope="col">Status</th>
                                                            <th scope="col">Comments</th>
                                                            <th scope="col">Issued Date</th>
                                                            <th scope="col">Paid Date</th>
                                                            {/* <th>
                                              <Button onClick={() => { toggleUpdate() }} className="my-4 p-btm" color="primary" type="button">
                                                  Add
                                              </Button>
                                          </th> */}
                                                            <th scope="col" />
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {dataInvoices.map((item) => {
                                                            return (
                                                                <tr>
                                                                    <td className="text-sm">{item?.id}</td>
                                                                    {/* <td className="text-sm">{item.name.length > 20 ?
                                                                        `${item.name.substring(0, 20)}...` : item.name
                                                                    }</td> */}
                                                                    <td className="text-sm">
                                                                        <Button onClick={() => { ViewImage(item) }} className="my-4 p-btm" color="primary" type="button">
                                                                            View
                                                                        </Button>
                                                                    </td>

                                                                    <td className="text-sm">
                                                                        {item?.issueDate && item?.expiryDate ? "Paid" : "Unpaid"}
                                                                    </td>
                                                                    <td className="text-sm">
                                                                        {item?.comments}
                                                                    </td>
                                                                    <td className="text-sm">
                                                                        {item?.issueDate}
                                                                    </td>
                                                                    <td className="text-sm">
                                                                        {item?.expiryDate}
                                                                    </td>
                                                                    <td className="text-right">
                                                                        <UncontrolledDropdown>
                                                                            <DropdownToggle
                                                                                className="btn-icon-only text-light"
                                                                                href="#pablo"
                                                                                role="button"
                                                                                size="sm"
                                                                                color=""
                                                                                onClick={e => e.preventDefault()}
                                                                            >
                                                                                <i className="fas fa-ellipsis-v" />
                                                                            </DropdownToggle>
                                                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                                                {/* <DropdownItem

                            onClick={() => { toggleUpdate() }}
                          >
                            Add
                          </DropdownItem> */}
                                                                                <DropdownItem
                                                                                    onClick={() => { toggleUpdateInvoices(item) }}
                                                                                >
                                                                                    Update
                                                                                </DropdownItem>
                                                                                <DropdownItem
                                                                                    onClick={() => { Deletetoggle(item) }}
                                                                                >
                                                                                    Delete
                                                                                </DropdownItem>
                                                                            </DropdownMenu>
                                                                        </UncontrolledDropdown>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}

                                                    </tbody>
                                                </>
                                            ) : (
                                                <div className="text-center">
                                                    <h3>No Record Found</h3>
                                                </div>
                                            )}
                                        </Table>}

                                    <CardFooter className="py-4">
                                        <nav aria-label="...">
                                            <Pagination
                                                className="pagination justify-content-end mb-0"
                                                listClassName="justify-content-end mb-0"
                                            >
                                                <PaginationItem className="disabled">
                                                    <PaginationLink
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                        tabIndex="-1"
                                                    >
                                                        <i className="fas fa-angle-left" />
                                                        <span className="sr-only">Previous</span>
                                                    </PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem className="active">
                                                    <PaginationLink
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        1
                                                    </PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem>
                                                    <PaginationLink
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        2 <span className="sr-only">(current)</span>
                                                    </PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem>
                                                    <PaginationLink
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        3
                                                    </PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem>
                                                    <PaginationLink
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fas fa-angle-right" />
                                                        <span className="sr-only">Next</span>
                                                    </PaginationLink>
                                                </PaginationItem>
                                            </Pagination>
                                        </nav>
                                    </CardFooter>
                                </Card>
                            </div>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row className="row1">
                            <div className="col">
                                <Card className="shadow">
                                    <CardHeader className="border-0">
                                        <Row>
                                            <h3 className="mb-0">Contracts</h3>
                                            <UncontrolledDropdown style={{ marginLeft: 10 }}>
                                                <DropdownToggle
                                                    className="btn-icon-only text-light"

                                                    role="button"
                                                    size="sm"
                                                    color=""
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    <i className="fas fa-ellipsis-v" />
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-arrow" right>
                                                    <DropdownItem

                                                        onClick={() => { ChangeStatusJob('All') }}
                                                    >
                                                        All
                                                    </DropdownItem>
                                                    <DropdownItem

                                                        onClick={() => { ChangeStatusJob('Police') }}
                                                    >
                                                        {config.police}
                                                    </DropdownItem>
                                                    <DropdownItem

                                                        onClick={() => { ChangeStatusJob('By Law') }}
                                                    >
                                                        {config.byLaw}
                                                    </DropdownItem>
                                                    <DropdownItem

                                                        onClick={() => { ChangeStatusJob('others') }}
                                                    >
                                                        {config.others}
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            {/* <h3 style={{ position: "absolute", right: 20, top: 25, }} className="mb-0">Keep Scrolling ►</h3> */}
                                            <Button style={{ position: "absolute", right: 20, top: -7, }} onClick={() => {
                                                setDataUpdateContract([])
                                                setOpenContractModal(!openContractModal)
                                            }} className="my-4 p-btm" color="primary" type="button">
                                                Add New
                                            </Button>
                                        </Row>

                                    </CardHeader>
                                    {isLoader ? (
                                        <div className="SpinnerClass">
                                            <Spinner className="loader" children={true} />
                                        </div>
                                    ) :
                                        <Table className="align-items-center table-flush" responsive>
                                            {dataContract?.length > 0 ? (
                                                <>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">File</th>
                                                            <th scope="col">Comments</th>
                                                            <th scope="col">Issued Date</th>
                                                            <th scope="col">Expiry Date</th>
                                                            {/* <th>
                                        <Button onClick={() => { toggleUpdate() }} className="my-4 p-btm" color="primary" type="button">
                                            Add
                                        </Button>
                                    </th> */}
                                                            <th scope="col" />
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {dataContract.map((item) => {
                                                            return (
                                                                <tr>
                                                                    <td className="text-sm">{item?.id}</td>
                                                                    <td className="text-sm">{item.name.length > 20 ?
                                                                        `${item.name.substring(0, 20)}...` : item.name
                                                                    }</td>
                                                                    <td className="text-sm">
                                                                        <Button onClick={() => { ViewImage(item) }} className="my-4 p-btm" color="primary" type="button">
                                                                            View
                                                                        </Button>
                                                                    </td>

                                                                    <td className="text-sm">
                                                                        {item?.comments}
                                                                    </td>
                                                                    <td className="text-sm">
                                                                        {item?.issueDate}
                                                                    </td>
                                                                    <td className="text-sm">
                                                                        {item?.expiryDate}
                                                                    </td>
                                                                    <td className="text-right">
                                                                        <UncontrolledDropdown>
                                                                            <DropdownToggle
                                                                                className="btn-icon-only text-light"
                                                                                href="#pablo"
                                                                                role="button"
                                                                                size="sm"
                                                                                color=""
                                                                                onClick={e => e.preventDefault()}
                                                                            >
                                                                                <i className="fas fa-ellipsis-v" />
                                                                            </DropdownToggle>
                                                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                                                {/* <DropdownItem

                      onClick={() => { toggleUpdate() }}
                    >
                      Add
                    </DropdownItem> */}
                                                                                <DropdownItem
                                                                                    onClick={() => { toggleUpdateContract(item) }}
                                                                                >
                                                                                    Update
                                                                                </DropdownItem>
                                                                                <DropdownItem
                                                                                    onClick={() => { Deletetoggle(item) }}
                                                                                >
                                                                                    Delete
                                                                                </DropdownItem>
                                                                            </DropdownMenu>
                                                                        </UncontrolledDropdown>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}

                                                    </tbody>
                                                </>
                                            ) : (
                                                <div className="text-center">
                                                    <h3>No Record Found</h3>
                                                </div>
                                            )}
                                        </Table>}

                                    <CardFooter className="py-4">
                                        <nav aria-label="...">
                                            <Pagination
                                                className="pagination justify-content-end mb-0"
                                                listClassName="justify-content-end mb-0"
                                            >
                                                <PaginationItem className="disabled">
                                                    <PaginationLink
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                        tabIndex="-1"
                                                    >
                                                        <i className="fas fa-angle-left" />
                                                        <span className="sr-only">Previous</span>
                                                    </PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem className="active">
                                                    <PaginationLink
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        1
                                                    </PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem>
                                                    <PaginationLink
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        2 <span className="sr-only">(current)</span>
                                                    </PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem>
                                                    <PaginationLink
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        3
                                                    </PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem>
                                                    <PaginationLink
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fas fa-angle-right" />
                                                        <span className="sr-only">Next</span>
                                                    </PaginationLink>
                                                </PaginationItem>
                                            </Pagination>
                                        </nav>
                                    </CardFooter>
                                </Card>
                            </div>
                        </Row>
                    </TabPane>
                    <TabPane tabId="4">
                        <Row className="row1">
                            <div className="col">
                                <Card className="shadow">
                                    <CardHeader className="border-0">
                                        <Row>
                                            <h3 className="mb-0">Fees Agreement</h3>
                                            <UncontrolledDropdown style={{ marginLeft: 10 }}>
                                                <DropdownToggle
                                                    className="btn-icon-only text-light"

                                                    role="button"
                                                    size="sm"
                                                    color=""
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    <i className="fas fa-ellipsis-v" />
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-arrow" right>
                                                    <DropdownItem

                                                        onClick={() => { ChangeStatusJob('All') }}
                                                    >
                                                        All
                                                    </DropdownItem>
                                                    <DropdownItem

                                                        onClick={() => { ChangeStatusJob('Police') }}
                                                    >
                                                        {config.police}
                                                    </DropdownItem>
                                                    <DropdownItem

                                                        onClick={() => { ChangeStatusJob('By Law') }}
                                                    >
                                                        {config.byLaw}
                                                    </DropdownItem>
                                                    <DropdownItem

                                                        onClick={() => { ChangeStatusJob('others') }}
                                                    >
                                                        {config.others}
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            {/* <h3 style={{ position: "absolute", right: 20, top: 25, }} className="mb-0">Keep Scrolling ►</h3> */}
                                            <Button style={{ position: "absolute", right: 20, top: -7, }} onClick={() => {
                                                setDataUpdateAgrement([])
                                                setOpenFeeAgrementModal(!openfeeAgrementModal)
                                            }} className="my-4 p-btm" color="primary" type="button">
                                                Add New
                                            </Button>
                                        </Row>

                                    </CardHeader>
                                    {isLoader ? (
                                        <div className="SpinnerClass">
                                            <Spinner className="loader" children={true} />
                                        </div>
                                    ) :
                                        <Table className="align-items-center table-flush" responsive>
                                            {dataAgrement?.length > 0 ? (
                                                <>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">File</th>
                                                            <th scope="col">Comments</th>
                                                            <th scope="col">Issued Date</th>
                                                            <th scope="col">Expiry Date</th>
                                                            {/* <th>
                                          <Button onClick={() => { toggleUpdate() }} className="my-4 p-btm" color="primary" type="button">
                                              Add
                                          </Button>
                                      </th> */}
                                                            <th scope="col" />
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {dataAgrement.map((item) => {
                                                            return (
                                                                <tr>
                                                                    <td className="text-sm">{item?.id}</td>
                                                                    <td className="text-sm">{item.name.length > 20 ?
                                                                        `${item.name.substring(0, 20)}...` : item.name
                                                                    }</td>
                                                                    <td className="text-sm">
                                                                        <Button onClick={() => { ViewImage(item) }} className="my-4 p-btm" color="primary" type="button">
                                                                            View
                                                                        </Button>
                                                                    </td>

                                                                    <td className="text-sm">
                                                                        {item?.comments}
                                                                    </td>
                                                                    <td className="text-sm">
                                                                        {item?.issueDate}
                                                                    </td>
                                                                    <td className="text-sm">
                                                                        {item?.expiryDate}
                                                                    </td>
                                                                    <td className="text-right">
                                                                        <UncontrolledDropdown>
                                                                            <DropdownToggle
                                                                                className="btn-icon-only text-light"
                                                                                href="#pablo"
                                                                                role="button"
                                                                                size="sm"
                                                                                color=""
                                                                                onClick={e => e.preventDefault()}
                                                                            >
                                                                                <i className="fas fa-ellipsis-v" />
                                                                            </DropdownToggle>
                                                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                                                {/* <DropdownItem

                        onClick={() => { toggleUpdate() }}
                      >
                        Add
                      </DropdownItem> */}
                                                                                <DropdownItem
                                                                                    onClick={() => { toggleUpdateAgreement(item) }}
                                                                                >
                                                                                    Update
                                                                                </DropdownItem>
                                                                                <DropdownItem
                                                                                    onClick={() => { Deletetoggle(item) }}
                                                                                >
                                                                                    Delete
                                                                                </DropdownItem>
                                                                            </DropdownMenu>
                                                                        </UncontrolledDropdown>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}

                                                    </tbody>
                                                </>
                                            ) : (
                                                <div className="text-center">
                                                    <h3>No Record Found</h3>
                                                </div>
                                            )}
                                        </Table>
                                    }
                                    <CardFooter className="py-4">
                                        <nav aria-label="...">
                                            <Pagination
                                                className="pagination justify-content-end mb-0"
                                                listClassName="justify-content-end mb-0"
                                            >
                                                <PaginationItem className="disabled">
                                                    <PaginationLink
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                        tabIndex="-1"
                                                    >
                                                        <i className="fas fa-angle-left" />
                                                        <span className="sr-only">Previous</span>
                                                    </PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem className="active">
                                                    <PaginationLink
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        1
                                                    </PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem>
                                                    <PaginationLink
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        2 <span className="sr-only">(current)</span>
                                                    </PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem>
                                                    <PaginationLink
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        3
                                                    </PaginationLink>
                                                </PaginationItem>
                                                <PaginationItem>
                                                    <PaginationLink
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fas fa-angle-right" />
                                                        <span className="sr-only">Next</span>
                                                    </PaginationLink>
                                                </PaginationItem>
                                            </Pagination>
                                        </nav>
                                    </CardFooter>
                                </Card>
                            </div>
                        </Row>
                    </TabPane>
                </TabContent>

                {/* delete */}
                <Modal isOpen={deleteModal} toggle={() => { Deletetoggle() }} className={props.className}>
                    <ModalHeader toggle={() => { Deletetoggle() }}>Delete</ModalHeader>
                    <ModalBody>
                        Are you sure want to delete?
                    </ModalBody>
                    <ModalFooter>
                        <Button className="my-4 p-btm" color="primary" onClick={() => { deleteAPI() }}>Yes</Button>{' '}
                        <Button className="my-4 s-btm" color="secondary" onClick={() => { Deletetoggle() }}>No</Button>
                    </ModalFooter>
                </Modal>
                <UploadModal modal={openInvoiceModal} data={dataUpdate} title='Invoices' parentCallback={invoiceCallback} />
                <UploadModal modal={openContractModal} data={dataUpdateContract} title='Contracts' parentCallback={contractCallback} />
                <UploadModal modal={openfeeAgrementModal} data={dataUpdateAgrement} title='Fees Agreement' parentCallback={feeAgrementCallback} />
                <ViewImageModal modal={openViewImageModal} itemData={imageData} />
            </div>
            <Toaster
                toastOptions={{
                    success: {
                        style: {
                            background: 'green',
                        },
                    },
                    error: {
                        style: {
                            background: 'red',
                        },
                    },
                }}
            />
        </>
    );
}

export default GovtAgencyDetail;