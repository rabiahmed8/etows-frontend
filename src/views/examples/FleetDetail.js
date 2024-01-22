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
    // Button,
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
// export default class FleetDetail extends React.Component {
function FleetDetail(props) {

    const [key, setKey] = useState('home');
    const [activeTab, setactiveTab] = useState('1')
    const location = useLocation();
    const [openVOModal, setOpenVOModal] = useState(false);
    const [openTowLicModal, setOpenTowLicModal] = useState(false);
    const [openCVORModal, setOpenCVORModal] = useState(false);
    const [openAnnualSafteyModal, setOpenAnnualSafteyModal] = useState(false);
    const [openTruckOwnerModal, setOpenTruckOwnerModal] = useState(false);
    const [openInsuranceInfoModal, setOpenInsuranceInfoModal] = useState(false);

    const [dataVehicle, setDataVehicle] = useState([]);
    const [dataTowLic, setDataTowLic] = useState([]);
    const [dataCSOR, setDataCSOR] = useState([]);
    const [dataAnnualSaftey, setDataAnnualSaftey] = useState([]);
    const [dataTruckOwr, setDataTruckOwr] = useState([]);
    const [dataInsuranceInfo, setDataInsuranceInfo] = useState([]);

    const [dataVehicleOwnership, setDataUpdateVehicle] = useState([]);
    const [dataUpdateTowLic, setDataUpdateTowLic] = useState([]);
    const [dataUpdateCSOR, setDataUpdateCSOR] = useState([]);
    const [dataUpdateAnnualSaftey, setDataUpdateAnnualSaftey] = useState([]);
    const [dataUpdateTruckOwr, setDataUpdateTruckOwr] = useState([]);
    const [dataUpdateInsuranceInfo, setDataUpdateInsuranceInfo] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const setItem = location.state;
    console.log("location", location);

    const [deleteModal, setDeletToggle] = useState(false);
    const [fileData, setFileData] = useState('');
    const Deletetoggle = (item) => {
        setFileData(item)
        setDeletToggle(!deleteModal)
    }
    const deleteAPI = () => {
        console.log("fileData", fileData);
        setIsLoader(true)
        try {
            singleDeleteFile(fileData, async (res) => {
                console.log("adasdasd", res)
                if (res.sucess) {
                    setDeletToggle(!deleteModal)
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
                    setIsLoader(false)
                    successAlert(res.sucess.messages[0].message)
                } else {
                    errorAlert(res.sucess.messages[0].message)
                    setIsLoader(false)
                    setDeletToggle(!deleteModal)
                }
            });
        } catch (error) {
            errorAlert(error)
            setIsLoader(false)
            setDeletToggle(!deleteModal)
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

    const toggleUpdateVehicleOwnership = (item) => {
        if (item) {
            setDataUpdateVehicle(item)
            setOpenVOModal(!openVOModal)
        }
        else {
            //   setModalUpdate(!modalUpdate);
            //   setItemData('');
        }
    }
    const toggleUpdateTowLicence = (item) => {
        if (item) {
            //   setModalUpdate(!modalUpdate);
            setDataUpdateTowLic(item)
            setOpenTowLicModal(!openTowLicModal)
        }
        else {
            //   setModalUpdate(!modalUpdate);
            //   setItemData('');
        }
    }
    const toggleUpdateCVOR = (item) => {
        if (item) {
            //   setModalUpdate(!modalUpdate);
            setDataUpdateCSOR(item)
            setOpenCVORModal(!openCVORModal)
        }
        else {
            //   setModalUpdate(!modalUpdate);
            //   setItemData('');
        }
    }
    const toggleUpdateAnnualSafety = (item) => {
        if (item) {
            //   setModalUpdate(!modalUpdate);
            setDataUpdateAnnualSaftey(item)
            setOpenAnnualSafteyModal(!openAnnualSafteyModal)
        }
        else {
            //   setModalUpdate(!modalUpdate);
            //   setItemData('');
        }
    }
    const toggleUpdateTruckOwnership = (item) => {
        if (item) {
            //   setModalUpdate(!modalUpdate);
            setDataUpdateTruckOwr(item)
            setOpenTruckOwnerModal(!openTruckOwnerModal)
        }
        else {
            //   setModalUpdate(!modalUpdate);
            //   setItemData('');
        }
    }
    const toggleUpdateInsuranceInformation = (item) => {
        if (item) {
            //   setModalUpdate(!modalUpdate);
            setDataUpdateInsuranceInfo(item)
            setOpenInsuranceInfoModal(!openInsuranceInfoModal)
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
        // const obj = {
        //   type: item?.agencyType,
        //   id: item?.id
        // }
        // try {
        //   getUploadData(obj, async (res) => {
        //     console.log("adasdasd", res)
        //     if (res.sucess) {
        //       console.log("res.sucess.fileInfoList[0].url", res.sucess.fileInfoList[0].url)
        //       setImageLink(res.sucess.fileInfoList[0].url);
        //       ViewImagetoggle();
        //     } else {
        //       console.log("errrrr");
        //       // ViewImagetoggle();
        //     }
        //   });
        // } catch (error) {
        //   console.log("error", error)
        // }
    }
    const VehicleOwnershipCallback = (InvoiceData) => {
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
            if (Object.keys(dataVehicleOwnership).length !== 0) {
                formData.append('id', dataVehicleOwnership.id);
            }
            formData.append('refId', setItem.id);
            for (var key of formData.entries()) {
                console.log(key[0] + ", " + key[1]);
            }

            UploadContractsApi(formData, async (res) => {
                if (res.sucess) {
                    console.log("UPP", res.sucess)
                    await getDataFiles("VehicleOwnership")
                    setIsLoader(false)
                    successAlert(res.sucess.response.messages[0].message)
                    setOpenVOModal(false)
                    setDataUpdateVehicle([])

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
    const TowLicenceCallback = (ContractData) => {
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
            if (Object.keys(dataUpdateTowLic).length !== 0) {
                formData.append('id', dataUpdateTowLic.id);
            }
            formData.append('refId', setItem.id);
            for (var key of formData.entries()) {
                console.log(key[0] + ", " + key[1]);
            }

            UploadContractsApi(formData, async (res) => {
                if (res.sucess) {
                    console.log("UPP", res.sucess)
                    await getDataFiles("TowLicence")
                    setIsLoader(false)
                    successAlert(res.sucess.response.messages[0].message)
                    setOpenTowLicModal(false)
                    setDataUpdateTowLic([])

                    // setModalUpdate(!modalUpdate)
                } else {
                    console.log("errrrr")
                    setIsLoader(false)
                    errorAlert(res.sucess.response.messages[0].message)
                }
            });
        } catch (error) {
            console.log("error", error)
            setIsLoader(false)
            errorAlert(error)
        }
        // console.log("contractData", contractData);
        // setContractData(contractData)
        // setOpenContractModal(false)
    }
    const CVORCallback = (feeAgrementData) => {
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
            if (Object.keys(dataUpdateCSOR).length !== 0) {
                formData.append('id', dataUpdateCSOR.id);
            }
            formData.append('refId', setItem.id);
            for (var key of formData.entries()) {
                console.log(key[0] + ", " + key[1]);
            }

            UploadContractsApi(formData, async (res) => {
                if (res.sucess) {
                    console.log("UPP", res.sucess)
                    await getDataFiles("CVOR")
                    setIsLoader(false)
                    setOpenCVORModal(false)
                    successAlert(res.sucess.response.messages[0].message)
                    setDataUpdateCSOR([])

                    // setModalUpdate(!modalUpdate)
                } else {
                    console.log("errrrr")
                    setIsLoader(false)
                    errorAlert(res.sucess.response.messages[0].message)
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
    const AnnualSafetyCallback = (feeAgrementData) => {
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
            if (Object.keys(dataUpdateAnnualSaftey).length !== 0) {
                formData.append('id', dataUpdateAnnualSaftey.id);
            }
            formData.append('refId', setItem.id);
            for (var key of formData.entries()) {
                console.log(key[0] + ", " + key[1]);
            }

            UploadContractsApi(formData, async (res) => {
                if (res.sucess) {
                    console.log("UPP", res.sucess)
                    await getDataFiles("AnnualSafety")
                    setOpenAnnualSafteyModal(false)
                    setIsLoader(false)
                    successAlert(res.sucess.response.messages[0].message)
                    setDataUpdateAnnualSaftey([])

                    // setModalUpdate(!modalUpdate)
                } else {
                    console.log("errrrr")
                    setIsLoader(false)
                    errorAlert(res.sucess.response.messages[0].message)
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
    const TruckOwnershipCallback = (feeAgrementData) => {
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
            if (Object.keys(dataUpdateTruckOwr).length !== 0) {
                formData.append('id', dataUpdateTruckOwr.id);
            }
            formData.append('refId', setItem.id);
            for (var key of formData.entries()) {
                console.log(key[0] + ", " + key[1]);
            }

            UploadContractsApi(formData, async (res) => {
                if (res.sucess) {
                    console.log("UPP", res.sucess)
                    await getDataFiles("TruckOwnership")
                    setOpenTruckOwnerModal(false)
                    setIsLoader(false)
                    successAlert(res.sucess.response.messages[0].message)
                    setDataUpdateTruckOwr([])
                    // setModalUpdate(!modalUpdate)
                } else {
                    console.log("errrrr")
                    setIsLoader(false)
                    errorAlert(res.sucess.response.messages[0].message)
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
    const InsuranceInformationCallback = (feeAgrementData) => {
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
            if (Object.keys(dataUpdateInsuranceInfo).length !== 0) {
                formData.append('id', dataUpdateInsuranceInfo.id);
            }
            formData.append('refId', setItem.id);
            for (var key of formData.entries()) {
                console.log(key[0] + ", " + key[1]);
            }

            UploadContractsApi(formData, async (res) => {
                if (res.sucess) {
                    console.log("UPP", res.sucess)
                    await getDataFiles("InsuranceInformation")
                    setOpenInsuranceInfoModal(false)
                    setIsLoader(false)
                    successAlert(res.sucess.response.messages[0].message)
                    setDataUpdateInsuranceInfo([])
                    // setModalUpdate(!modalUpdate)
                } else {
                    console.log("errrrr")
                    setIsLoader(false)
                    errorAlert(res.sucess.response.messages[0].message)
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
        const obj = {
            id: setItem.id,
            subType: type,
            type: type
        }
        try {
            UploadGetContractsApi(obj, async (res) => {
                console.log("adasdasd", res)
                if (res.sucess) {
                    if (type == "VehicleOwnership") {
                        setDataVehicle(res.sucess.list);
                        setIsLoader(false)
                        return
                    }
                    if (type == "TowLicence") {
                        setDataTowLic(res.sucess.list);
                        setIsLoader(false)
                        return
                    }
                    if (type == "CVOR") {
                        setDataCSOR(res.sucess.list);
                        setIsLoader(false)
                        return
                    }
                    if (type == "AnnualSafety") {
                        setDataAnnualSaftey(res.sucess.list);
                        setIsLoader(false)
                        return
                    }
                    if (type == "TruckOwnership") {
                        setDataTruckOwr(res.sucess.list);
                        setIsLoader(false)
                        return
                    }
                    if (type == "InsuranceInformation") {
                        setDataInsuranceInfo(res.sucess.list);
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
    useEffect(() => {
        if (activeTab == '2') {
            getDataFiles("VehicleOwnership")
        }
        if (activeTab == '3') {
            getDataFiles("TowLicence")
        }
        if (activeTab == '4') {
            getDataFiles("CVOR")
        }
        if (activeTab == '5') {
            getDataFiles("AnnualSafety")
        }
        if (activeTab == '6') {
            getDataFiles("TruckOwnership")
        }
        if (activeTab == '7') {
            getDataFiles("InsuranceInformation")
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
                            Fleet Information
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Vehicle Ownership
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => { toggle('3'); }}
                        >
                            Tow Licence
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '4' })}
                            onClick={() => { toggle('4'); }}
                        >
                            CVOR
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '5' })}
                            onClick={() => { toggle('5'); }}
                        >
                            Annual Safety inspections
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '6' })}
                            onClick={() => { toggle('6'); }}
                        >
                            Truck ownership info
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '7' })}
                            onClick={() => { toggle('7'); }}
                        >
                            Insurance Information
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
                                            <span className="text-sm">ID</span>
                                            <span className="text-sm">{setItem?.id}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.companyId ? (
                                        <div className="listUi">
                                            <span className="text-sm">Company Id</span>
                                            <span className="text-sm">{setItem?.companyId}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.name ? (
                                        <div className="listUi">
                                            <span className="text-sm">Name</span>
                                            <span className="text-sm">{setItem?.name}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.type ? (
                                        <div className="listUi">
                                            <span className="text-sm">Type</span>
                                            <span className="text-sm">{setItem?.type}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.description ? (
                                        <div className="listUi">
                                            <span className="text-sm">Description</span>
                                            <span className="text-sm">{setItem?.description}</span>
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
                                            <h3 className="mb-0">Vehicle Ownership</h3>
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
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            {/* <h3 style={{ position: "absolute", right: 20, top: 25, }} className="mb-0">Keep Scrolling ►</h3> */}
                                            <Button style={{ position: "absolute", right: 20, top: -7, }} onClick={() => { setOpenVOModal(!openVOModal) }} className="my-4 p-btm" color="primary" type="button">
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
                                            {dataVehicle?.length > 0 ? (
                                                <>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">File</th>
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
                                                        {dataVehicle.map((item) => {
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
                                                                                    onClick={() => { toggleUpdateVehicleOwnership(item) }}
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
                    <TabPane tabId="3">
                        <Row className="row1">
                            <div className="col">
                                <Card className="shadow">
                                    <CardHeader className="border-0">
                                        <Row>
                                            <h3 className="mb-0">Tow Licence</h3>
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
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            {/* <h3 style={{ position: "absolute", right: 20, top: 25, }} className="mb-0">Keep Scrolling ►</h3> */}
                                            <Button style={{ position: "absolute", right: 20, top: -7, }} onClick={() => { setOpenTowLicModal(!openTowLicModal) }} className="my-4 p-btm" color="primary" type="button">
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
                                            {dataTowLic?.length > 0 ? (
                                                <>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">File</th>
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
                                                        {dataTowLic.map((item) => {
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
                                                                                    onClick={() => { toggleUpdateTowLicence(item) }}
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
                    <TabPane tabId="4">
                        <Row className="row1">
                            <div className="col">
                                <Card className="shadow">
                                    <CardHeader className="border-0">
                                        <Row>
                                            <h3 className="mb-0">CVOR</h3>
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
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            {/* <h3 style={{ position: "absolute", right: 20, top: 25, }} className="mb-0">Keep Scrolling ►</h3> */}
                                            <Button style={{ position: "absolute", right: 20, top: -7, }} onClick={() => { setOpenCVORModal(!openCVORModal) }} className="my-4 p-btm" color="primary" type="button">
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
                                            {dataCSOR?.length > 0 ? (
                                                <>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">File</th>
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
                                                        {dataCSOR.map((item) => {
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
                                                                                    onClick={() => { toggleUpdateCVOR(item) }}
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
                    <TabPane tabId="5">
                        <Row className="row1">
                            <div className="col">
                                <Card className="shadow">
                                    <CardHeader className="border-0">
                                        <Row>
                                            <h3 className="mb-0">Annual Safety inspections</h3>
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
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            {/* <h3 style={{ position: "absolute", right: 20, top: 25, }} className="mb-0">Keep Scrolling ►</h3> */}
                                            <Button style={{ position: "absolute", right: 20, top: -7, }} onClick={() => { setOpenAnnualSafteyModal(!openAnnualSafteyModal) }} className="my-4 p-btm" color="primary" type="button">
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
                                            {dataAnnualSaftey?.length > 0 ? (
                                                <>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">File</th>
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
                                                        {dataAnnualSaftey.map((item) => {
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
                                                                                    onClick={() => { toggleUpdateAnnualSafety(item) }}
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
                    <TabPane tabId="6">
                        <Row className="row1">
                            <div className="col">
                                <Card className="shadow">
                                    <CardHeader className="border-0">
                                        <Row>
                                            <h3 className="mb-0">Truck ownership info </h3>
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
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            {/* <h3 style={{ position: "absolute", right: 20, top: 25, }} className="mb-0">Keep Scrolling ►</h3> */}
                                            <Button style={{ position: "absolute", right: 20, top: -7, }} onClick={() => { setOpenTruckOwnerModal(!openTruckOwnerModal) }} className="my-4 p-btm" color="primary" type="button">
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
                                            {dataTruckOwr?.length > 0 ? (
                                                <>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">File</th>
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
                                                        {dataTruckOwr.map((item) => {
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
                                                                                    onClick={() => { toggleUpdateTruckOwnership(item) }}
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
                    <TabPane tabId="7">
                        <Row className="row1">
                            <div className="col">
                                <Card className="shadow">
                                    <CardHeader className="border-0">
                                        <Row>
                                            <h3 className="mb-0">Insurance Information</h3>
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
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                            {/* <h3 style={{ position: "absolute", right: 20, top: 25, }} className="mb-0">Keep Scrolling ►</h3> */}
                                            <Button style={{ position: "absolute", right: 20, top: -7, }} onClick={() => { setOpenInsuranceInfoModal(!openInsuranceInfoModal) }} className="my-4 p-btm" color="primary" type="button">
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
                                            {dataInsuranceInfo?.length > 0 ? (
                                                <>
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th scope="col">ID</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">File</th>
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
                                                        {dataInsuranceInfo.map((item) => {
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
                                                                                    onClick={() => { toggleUpdateInsuranceInformation(item) }}
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
                <UploadModal modal={openVOModal} data={dataVehicleOwnership} title='Vehicle Ownership' parentCallback={VehicleOwnershipCallback} />
                <UploadModal modal={openTowLicModal} data={dataUpdateTowLic} title='Tow Licence' parentCallback={TowLicenceCallback} />
                <UploadModal modal={openCVORModal} data={dataUpdateCSOR} title='CVOR' parentCallback={CVORCallback} />
                <UploadModal modal={openAnnualSafteyModal} data={dataUpdateAnnualSaftey} title='Annual Safety' parentCallback={AnnualSafetyCallback} />
                <UploadModal modal={openTruckOwnerModal} data={dataUpdateTruckOwr} title='Truck Ownership' parentCallback={TruckOwnershipCallback} />
                <UploadModal modal={openInsuranceInfoModal} data={dataUpdateInsuranceInfo} title='Insurance Information' parentCallback={InsuranceInformationCallback} />
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

export default FleetDetail;