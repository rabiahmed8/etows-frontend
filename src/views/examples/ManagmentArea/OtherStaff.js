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
import classnames from 'classnames';
import Header from "components/Headers/Header.js";
import config from "config";
import { useLocation } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UploadModal from "component/UploadModal";
import { UploadContractsApi } from "APIstore/apiCalls";
import { UploadGetContractsApi } from "APIstore/apiCalls";
import { successAlert } from "Theme/utils";
import { errorAlert } from "Theme/utils";
import { singleDeleteFile } from "APIstore/apiCalls";
import ViewImageModal from "component/ViewImageModal";
// export default class OtherStaff extends React.Component {
var logData1 = {}
function OtherStaff(props) {

  const [key, setKey] = useState('home');
  const [activeTab, setactiveTab] = useState('2')
  const location = useLocation();
  const [openCGLIModal, setOpenCGLIModal] = useState(false);
  const [openALIModal, setOpenALIModal] = useState(false);
  const [openGLIModal, setOpenGLIModal] = useState(false);
  const [openWSIBModal, setOpenWSIBModal] = useState(false);
  const [deleteModal, setDeletToggle] = useState(false);
  const [dataCGLI, setDataCGLI] = useState([]);
  const [dataALI, setDataALI] = useState([]);
  const [dataGLI, setDataGLI] = useState([]);
  const [dataWSIB, setDataWSIB] = useState([]);
  const [openViewImageModal, setViewImageModal] = useState(false);
  const [imageData, setDataImage] = useState();
  const [dataCGLIUpdate, setDataCGLIUpdate] = useState([]);
  const [dataALIUpdate, setDataALIUpdate] = useState([]);
  const [dataGLIUpdate, setDataGLIUpdate] = useState([]);
  const [dataWSIBUpdate, setDataWSIBUpdate] = useState([]);
  const [fileData, setFileData] = useState('');
  const [logInfo, setLogInfo] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const setItem = location.state;
  
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
          
          setIsLoader(false)
          successAlert(res.sucess.messages[0].message)
        } else {
          setIsLoader(false)
          errorAlert(res.sucess.messages[0].message)
          setDeletToggle(!deleteModal)
        }
      });
    } catch (error) {
      setIsLoader(false)
      errorAlert(error)
      setDeletToggle(!deleteModal)
    }
  }
  const getDataFiles = async (type) => {
    let logData;
    const storedData = await localStorage.getItem('accessData')
    if (storedData) {
      const getdata = await localStorage.getItem('accessData')
      logData = JSON.parse(getdata)
    }
    else {
      const getdata = await localStorage.getItem('loggedData')
      logData = JSON.parse(getdata)
    }
    setIsLoader(true)
    const obj = {
      id: logData?.companyId,
      subType: type,
      type: type
    }
    try {
      UploadGetContractsApi(obj, async (res) => {
        if (res.sucess) {
          if (type == "ContractorServiceProvider") {
            setDataCGLI(res.sucess.list);
            setIsLoader(false)
            return
          }
          if (type == "PersonalHistoryChecks") {
            setDataALI(res.sucess.list);
            setIsLoader(false)
            return
          }
          if (type == "TrainingRequirementsStaff") {
            setDataGLI(res.sucess.list);
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
    getLoggedData()
    if (activeTab == '4') {
      getDataFiles("TrainingRequirementsStaff")
    }
    if (activeTab == '3') {
      getDataFiles("PersonalHistoryChecks")
    }
    if (activeTab == '2') {
      getDataFiles("ContractorServiceProvider")
    }
  }, [activeTab])
  const getLoggedData = async () => {
    let logData;
    const storedData = await localStorage.getItem('accessData')
    if (storedData) {
      const getdata = await localStorage.getItem('accessData')
      logData = JSON.parse(getdata)
    }
    else {
      const getdata = await localStorage.getItem('loggedData')
      logData = JSON.parse(getdata)
    }
    setLogInfo(logData)
    setLogInfo((state) => {
      console.log("asd", state); // "React is awesome!"

      logData1 = state;
    });
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
  const toggleUpdateCGLI = (item) => {
    if (item) {
      setOpenCGLIModal(!openCGLIModal);
      setDataCGLIUpdate(item)
    }
    else {
      // setOpenCGLIModal(!openCGLIModal);
      // setDataCGLIUpdate('')
    }
  }
  const toggleUpdateALI = (item) => {
    if (item) {
      setOpenALIModal(!openALIModal);
      setDataALIUpdate(item)
    }
    else {
      // setOpenALIModal(!openALIModal);
      // setDataALIUpdate('')
    }
  }
  const toggleUpdateGLI = (item) => {
    if (item) {
      setOpenGLIModal(!openGLIModal);
      setDataGLIUpdate(item)
    }
    else {
      // setOpenGLIModal(!openGLIModal);
      // setDataGLIUpdate('')
    }
  }
  const toggleUpdateWSIB = (item) => {
    console.log("asd", item);
    if (item) {
      setOpenWSIBModal(!openWSIBModal);
      setDataWSIBUpdate(item)
    }
    else {
      // setOpenWSIBModal(!openWSIBModal);
      // setDataWSIBUpdate('')
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
  const CGLICallback = (feeAgrementData) => {
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
      if (Object.keys(dataCGLIUpdate).length !== 0) {
        formData.append('id', dataCGLIUpdate.id);
      }
      formData.append('refId', logData1?.companyId);
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      UploadContractsApi(formData, async (res) => {
        if (res.sucess) {
          console.log("UPP", res.sucess)
          setOpenCGLIModal(false)
          await getDataFiles("CommercialGeneralLiabilityInsurance")
          setIsLoader(false)
          successAlert(res.sucess.response.messages[0].message)
          setDataCGLIUpdate([])

        } else {
          errorAlert(res.sucess.response.messages[0].message)
          setIsLoader(false)
        }
      });
    } catch (error) {
      successAlert(error)
      setIsLoader(false)
    }
    // console.log("contractData", contractData);
    // setContractData(contractData)
    // setOpenContractModal(false)
  }
  const ALICallback = (feeAgrementData) => {
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
      if (Object.keys(dataALIUpdate).length !== 0) {
        formData.append('id', dataALIUpdate.id);
      }
      formData.append('refId', logData1?.companyId);
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      UploadContractsApi(formData, async (res) => {
        if (res.sucess) {
          console.log("UPP", res.sucess)
          setOpenALIModal(false)
          // setModalUpdate(!modalUpdate)
          await getDataFiles("AutomobileLiabilityInsurance")
          setIsLoader(false)
          successAlert(res.sucess.response.messages[0].message)
          setDataALIUpdate([])
        } else {
          errorAlert(res.sucess.response.messages[0].message)
          setIsLoader(false)
        }
      });
    } catch (error) {
      successAlert(error)
      setIsLoader(false)
    }
    // console.log("feeAgrement", feeAgrement);
    // setFeeAgrementData(feeAgrement)
    // setOpenFeeAgrementModal(false)
  }
  const GLICallback = (feeAgrementData) => {
    setIsLoader(true)
    try {
      const formData = new FormData();

      if (feeAgrementData) {
        for (let i = 0; i < feeAgrementData.length; i++) {
          formData.append(`file`, feeAgrementData[i].files);
          formData.append('type', feeAgrementData[i].imageType+"Staff");
          formData.append('subType', feeAgrementData[i].imageType+"Staff");
          formData.append('issueDate', feeAgrementData[i].issueDate);
          formData.append('expiryDate', feeAgrementData[i].expDate);
          formData.append('comments', feeAgrementData[i].comments ? feeAgrementData[i].comments : '');
        }
      }
      if (Object.keys(dataGLIUpdate).length !== 0) {
        formData.append('id', dataGLIUpdate.id);
      }
      formData.append('refId', logData1?.companyId);
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      UploadContractsApi(formData, async (res) => {
        if (res.sucess) {
          console.log("UPP", res.sucess)
          setOpenGLIModal(false)
          // setModalUpdate(!modalUpdate)
          await getDataFiles("GarageLiablitlyInsurance")
          setIsLoader(false)
          successAlert(res.sucess.response.messages[0].message)
          setDataGLIUpdate([])
        } else {
          errorAlert(res.sucess.response.messages[0].message)
          setIsLoader(false)
        }
      });
    } catch (error) {
      setIsLoader(false)
      error(error)
    }
    // console.log("feeAgrement", feeAgrement);
    // setFeeAgrementData(feeAgrement)
    // setOpenFeeAgrementModal(false)
  }
  const WSIBCallback = (feeAgrementData) => {

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
      if (Object.keys(dataWSIBUpdate).length !== 0) {
        formData.append('id', dataWSIBUpdate.id);
      }
      formData.append('refId', logData1?.companyId);
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      UploadContractsApi(formData, async (res) => {
        if (res.sucess) {
          console.log("UPP", res.sucess)
          setOpenWSIBModal(false)
          // setModalUpdate(!modalUpdate)
          await getDataFiles("WSIB")
          successAlert(res.sucess.response.messages[0].message)
        } else {
          errorAlert(res.sucess.response.messages[0].message)
        }
      });
    } catch (error) {
      successAlert(error)
    }
    // console.log("feeAgrement", feeAgrement);
    // setFeeAgrementData(feeAgrement)
    // setOpenFeeAgrementModal(false)
  }

  return (
    <>
      {/* {activeTab === '1' && ()} */}
      {/* <div className="header pb-8 pt-5 pt-md-8" style={{ background: 'green' }}>

        <Container fluid>
          <div className="header-body">
            <span style={{ position: "absolute", top: 35, fontSize: 16, fontWeight: 600, color: "#fff" }}>
              {setItem?.corporateName}
            </span>
          </div>
        </Container>
      </div> */}
      {logData1.role != "POLICE_ADMIN" && (
        <div className="header pb-8 pt-5 pt-md-8" style={{ background: 'green' }}>
          <Container fluid>
            <div className="header-body">
              <span style={{ position: "absolute", top: 35, fontSize: 16, fontWeight: 600, color: "#fff" }}>
                {setItem?.corporateName}
              </span>
            </div>
          </Container>
        </div>
      )}
      <div >
        <Nav tabs className="nav--links" style={{}} >

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { toggle('2'); }}
            >
              Contractor Service Provider
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => { toggle('3'); }}
            >
              Personal History Checks
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '4' })}
              onClick={() => { toggle('4'); }}
            >
              Training Requirements
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>

          <TabPane tabId="2">
            <Row className="row1">
              <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <Row>
                      <h3 className="mb-0">Contractor Service Provider</h3>
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

                            onClick={() => { ChangeStatusJob('') }}
                          >
                            {config.all}
                          </DropdownItem>
                          <DropdownItem

                            onClick={() => { ChangeStatusJob('') }}
                          >
                            Issued Date
                          </DropdownItem>
                          <DropdownItem

                            onClick={() => { ChangeStatusJob('') }}
                          >
                            Expiry Date
                          </DropdownItem>

                        </DropdownMenu>
                      </UncontrolledDropdown>
                      {/* <h3 style={{ position: "absolute", right: 20, top: 25, }} className="mb-0">Keep Scrolling ►</h3> */}
                      {logData1.role !== 'POLICE_ADMIN' && (
                        <Button style={{ position: "absolute", right: 20, top: -7, }} onClick={() => {
                          setDataCGLIUpdate([])
                          setOpenCGLIModal(!openCGLIModal)
                        }} className="my-4 p-btm" color="primary" type="button">
                          Add New
                        </Button>
                      )}
                    </Row>

                  </CardHeader>
                  {isLoader ? (
                    <div className="SpinnerClass">
                      <Spinner className="loader" children={true} />
                    </div>
                  ) :
                    <Table className="align-items-center table-flush" responsive>
                      {dataCGLI?.length > 0 ? (
                        <>
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Name</th>
                              {/* <th scope="col">Status</th> */}
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
                            {dataCGLI.map((item) => {
                              return (
                                <tr>
                                  <td className="text-sm">{item?.id}</td>
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
                                    {logData1.role !== 'POLICE_ADMIN' && (
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
                                            onClick={() => { toggleUpdateCGLI(item) }}
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
                                    )}
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
                      <h3 className="mb-0">
                        Personal History Checks</h3>
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

                            onClick={() => { ChangeStatusJob('') }}
                          >
                            {config.all}
                          </DropdownItem>
                          <DropdownItem

                            onClick={() => { ChangeStatusJob('') }}
                          >
                            Issued Date
                          </DropdownItem>
                          <DropdownItem

                            onClick={() => { ChangeStatusJob('') }}
                          >
                            Expiry Date
                          </DropdownItem>

                        </DropdownMenu>
                      </UncontrolledDropdown>
                      {/* <h3 style={{ position: "absolute", right: 20, top: 25, }} className="mb-0">Keep Scrolling ►</h3> */}
                      {logData1.role !== 'POLICE_ADMIN' && (
                        <Button style={{ position: "absolute", right: 20, top: -7, }} onClick={() => {
                          setDataALIUpdate([])
                          setOpenALIModal(!openALIModal)
                        }} className="my-4 p-btm" color="primary" type="button">
                          Add New
                        </Button>
                      )}
                    </Row>

                  </CardHeader>
                  {isLoader ? (
                    <div className="SpinnerClass">
                      <Spinner className="loader" children={true} />
                    </div>
                  ) :
                    <Table className="align-items-center table-flush" responsive>
                      {dataALI?.length > 0 ? (
                        <>
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Name</th>
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
                            {dataALI.map((item) => {
                              return (
                                <tr>
                                  <td className="text-sm">{item?.id}</td>
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
                                    {logData1.role !== 'POLICE_ADMIN' && (
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
                                            onClick={() => { toggleUpdateALI(item) }}
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
                                    )}
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
                      <h3 className="mb-0">Training Requirements</h3>
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

                            onClick={() => { ChangeStatusJob('') }}
                          >
                            {config.all}
                          </DropdownItem>
                          <DropdownItem

                            onClick={() => { ChangeStatusJob('') }}
                          >
                            Issued Date
                          </DropdownItem>
                          <DropdownItem

                            onClick={() => { ChangeStatusJob('') }}
                          >
                            Expiry Date
                          </DropdownItem>

                        </DropdownMenu>
                      </UncontrolledDropdown>
                      {/* <h3 style={{ position: "absolute", right: 20, top: 25, }} className="mb-0">Keep Scrolling ►</h3> */}
                      {logData1.role !== 'POLICE_ADMIN' && (
                        <Button style={{ position: "absolute", right: 20, top: -7, }} onClick={() => {
                          setDataGLIUpdate([])
                          setOpenGLIModal(!openGLIModal)
                        }} className="my-4 p-btm" color="primary" type="button">
                          Add New
                        </Button>
                      )}
                    </Row>

                  </CardHeader>
                  {isLoader ? (
                    <div className="SpinnerClass">
                      <Spinner className="loader" children={true} />
                    </div>
                  ) :
                    <Table className="align-items-center table-flush" responsive>
                      {dataGLI?.length > 0 ? (
                        <>
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Name</th>
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
                            {dataGLI.map((item) => {
                              return (
                                <tr>
                                  <td className="text-sm">{item?.id}</td>
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
                                    {logData1.role !== 'POLICE_ADMIN' && (
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
                                            onClick={() => { toggleUpdateGLI(item) }}
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
                                    )}
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
        {/* <UploadModal modal={openCDIModal} title='Corporate Document Information' parentCallback={CDICallback} /> */}
        <UploadModal modal={openCGLIModal} data={dataCGLIUpdate} title='Contractor Service Provider' parentCallback={CGLICallback} />
        <UploadModal modal={openALIModal} data={dataALIUpdate} title='Personal History Checks' parentCallback={ALICallback} />
        <UploadModal modal={openGLIModal} data={dataGLIUpdate} title='Training Requirements' parentCallback={GLICallback} />
        <ViewImageModal modal={openViewImageModal} itemData={imageData} />
      </div>
    </>
  );
}

export default OtherStaff;