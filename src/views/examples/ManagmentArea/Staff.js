import React, { useEffect, useState } from "react";

import {
  TabContent, TabPane, Nav, NavItem, NavLink, Button,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Spinner,
  Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";
import classnames from 'classnames';
import config from "config";
import { useLocation } from 'react-router-dom';
import UploadModal from "component/UploadModal";
import { UploadContractsApi } from "APIstore/apiCalls";
import { UploadGetContractsApi } from "APIstore/apiCalls";
import { successAlert } from "Theme/utils";
import { errorAlert } from "Theme/utils";
import { singleDeleteFile } from "APIstore/apiCalls";
import { getAssignCompany } from "APIstore/apiCalls";
import ViewImageModal from "component/ViewImageModal";

var logData1 = {}
function Staff(props) {
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
  const [dataCGLIUpdate, setDataCGLIUpdate] = useState([]);
  const [dataALIUpdate, setDataALIUpdate] = useState([]);
  const [dataGLIUpdate, setDataGLIUpdate] = useState([]);
  const [dataWSIBUpdate, setDataWSIBUpdate] = useState([]);
  const [fileData, setFileData] = useState('');
  const [logInfo, setLogInfo] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [dropdownVal, setDropdownVal] = useState('Select Company');
  const [companyId,setCompanyId]=useState("");
  const [companiesID, setCompId] = useState();
  const [dropdownData, setDropdownData] = useState([]);
  const [openViewImageModal, setViewImageModal] = useState(false);
  const [imageData, setDataImage] = useState();
  const setItem = location.state;
  
  const Deletetoggle = (item) => {
    setFileData(item)
    setDeletToggle(!deleteModal)
  }
  const deleteAPI = () => {
    setIsLoader(true)
    try {
      singleDeleteFile(fileData, async (res) => {
        if (res.sucess) {
          setDeletToggle(!deleteModal)
          
          successAlert(res.sucess.messages[0].message)
          setIsLoader(false)
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
    setIsLoader(true);
    setCompanyId(logData.role == 'POLICE_ADMIN' ? setItem?.id : logData?.companyId);
    const obj = {
      id: logData.role == 'POLICE_ADMIN' ? setItem?.id : logData?.companyId,
      subType: type,
      type: type,
      comId: logData.role == 'POLICE_ADMIN' ? setItem?.id : logData?.companyId
    }
    
    try {
      UploadGetContractsApi(obj, async (res) => {
        if (res.sucess) {
          if (type == "DriverLicence") {
            setDataCGLI(res.sucess.list);
            setIsLoader(false)
            return
          }
          if (type == "TowLicence") {
            setDataALI(res.sucess.list);
            setIsLoader(false)
            return
          }
          if (type == "CSPPersonalHistoryChecks") {
            setDataGLI(res.sucess.list);
            setIsLoader(false)
            return
          }
          if (type == "TrainingRequirements") {
            setDataWSIB(res.sucess.list);
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
    try {
      getAssignCompany(logData1?.companyId, async (res) => {
        if (res.sucess) {
          console.log("res.sucess.listres.sucess.list", res.sucess.list);
          setDropdownData(res.sucess.list)
        }
      });
    } catch (error) {
      successAlert(error)
    }
  }
  useEffect(() => {
    getLoggedData()
    if (activeTab == '5') {
      getDataFiles("TrainingRequirements")
    }
    if (activeTab == '4') {
      getDataFiles("CSPPersonalHistoryChecks")
    }
    if (activeTab == '3') {
      getDataFiles("TowLicence")
    }
    if (activeTab == '2') {
      getDataFiles("DriverLicence")
    }
  }, [activeTab, companiesID])
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
      logData1 = state;
    });
  }
  const ChangeStatusJob = (item) => {
    setDropdownVal(item.corporateName)
    setCompId(item.id);
  }
  const toggleUpdateCGLI = (item) => {
    if (item) {
      setOpenCGLIModal(!openCGLIModal);
      setDataCGLIUpdate(item)
    }
  }
  const toggleUpdateALI = (item) => {
    if (item) {
      setOpenALIModal(!openALIModal);
      setDataALIUpdate(item)
    }
  }
  const toggleUpdateGLI = (item) => {
    if (item) {
      setOpenGLIModal(!openGLIModal);
      setDataGLIUpdate(item)
    }
  }
  const toggleUpdateWSIB = (item) => {
    console.log("asd", item);
    if (item) {
      setOpenWSIBModal(!openWSIBModal);
      setDataWSIBUpdate(item)
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
          await getDataFiles("DriverLicence")
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
          setOpenALIModal(false);
          await getDataFiles("TowLicence")
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
  }
  const GLICallback = (feeAgrementData) => {
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
          setOpenGLIModal(false);
          await getDataFiles("CSPPersonalHistoryChecks")
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
  }
  const WSIBCallback = (feeAgrementData) => {
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
          setOpenWSIBModal(false);
          await getDataFiles("TrainingRequirements")
          setIsLoader(false)
          successAlert(res.sucess.response.messages[0].message)
          setDataWSIBUpdate([])
        } else {
          setIsLoader(false)
          errorAlert(res.sucess.response.messages[0].message)
        }
      });
    } catch (error) {
      setIsLoader(false)
      successAlert(error)
    }
  }

  return (
    <>
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
              Drivers Licence
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
              CSP Personal History Checks
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '5' })}
              onClick={() => { toggle('5'); }}
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
                      <h3 className="mb-0">Drivers Licence</h3>
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
                      {logData1.role !== 'POLICE_ADMIN' && (
                        <Button style={{ position: "absolute", right: 20, top: -12, }} onClick={() => { 
                          setDataCGLIUpdate([])
                          setOpenCGLIModal(!openCGLIModal) }} className="my-4 p-btm" color="primary" type="button">
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
                              <th scope="col">Comments</th>
                              <th scope="col">Issued Date</th>
                              <th scope="col">Expiry Date</th>
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
                                    {logData1.role != 'POLICE_ADMIN' && (
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
                        Tow Licence</h3>
                      {logData1.role !== 'POLICE_ADMIN' && (
                        <Button style={{ position: "absolute", right: 20, top: -12, }} onClick={() => { 
                          setDataALIUpdate([])
                          setOpenALIModal(!openALIModal) }} className="my-4 p-btm" color="primary" type="button">
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
                                    {logData1.role != 'POLICE_ADMIN' && (
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
                      <h3 className="mb-0">CSP Personal History Checks</h3>
                      {logData1.role !== 'POLICE_ADMIN' && (
                        <Button style={{ position: "absolute", right: 20, top: -12, }} onClick={() => { 
                          setDataGLIUpdate([])
                          setOpenGLIModal(!openGLIModal) }} className="my-4 p-btm" color="primary" type="button">
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
                                    {logData1.role != 'POLICE_ADMIN' && (
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
          <TabPane tabId="5">
            <Row className="row1">
              <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <Row>
                      <h3 className="mb-0">Training Requirements</h3>
                      {logData1.role !== 'POLICE_ADMIN' && (
                        <Button style={{ position: "absolute", right: 20, top: -12, }} onClick={() => { 
                          setDataWSIBUpdate([])
                          setOpenWSIBModal(!openWSIBModal) }} className="my-4 p-btm" color="primary" type="button">
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
                      {dataWSIB?.length > 0 ? (
                        <>
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Name</th>
                              <th scope="col">Comments</th>
                              <th scope="col">Issued Date</th>
                              <th scope="col">Expiry Date</th>
                              <th scope="col" />
                            </tr>
                          </thead>

                          <tbody>
                            {dataWSIB.map((item) => {
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
                                    {logData1.role != 'POLICE_ADMIN' && (
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
                                            onClick={() => { toggleUpdateWSIB(item) }}
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
        <UploadModal modal={openCGLIModal} data={dataCGLIUpdate} title='Driver Licence' parentCallback={CGLICallback} />
        <UploadModal modal={openALIModal} data={dataALIUpdate} title='Tow Licence' parentCallback={ALICallback} />
        <UploadModal modal={openGLIModal} data={dataGLIUpdate} title='CSP Personal History Checks' parentCallback={GLICallback} />
        <UploadModal modal={openWSIBModal} data={dataWSIBUpdate} title='Training Requirements' parentCallback={WSIBCallback} />
        <ViewImageModal modal={openViewImageModal} itemData={imageData} companyId={companyId}/>
      </div>
    </>
  );
}

export default Staff;