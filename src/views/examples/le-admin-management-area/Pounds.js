import React, { useEffect, useState } from "react";

import {
  TabContent, TabPane, Button,
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
function Pounds(props) {
  const { dataItem } = props;
  const [activeTab, setactiveTab] = useState('2')
  const location = useLocation();
  const [openPoundsModal, setOpenPounds] = useState(false);
  const [deleteModal, setDeletToggle] = useState(false);
  const [dataPounds, setDataContractRepo] = useState([]);
  const [dataPoundsUpdate, setDataPoundsUpdate] = useState([]);
  const [fileData, setFileData] = useState('');
  const [logInfo, setLogInfo] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [dropdownVal, setDropdownVal] = useState('Select Company');
  const [companiesID, setCompId] = useState();
  const [dropdownData, setDropdownData] = useState([]);
  const [imageData, setDataImage] = useState();
  const setItem = location.state;
  const [openViewImageModal, setViewImageModal] = useState(false);

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
  const getDataFiles = (type) => {
    setIsLoader(true)
    const obj = {
      id: dataItem?.id,
      subType: type,
      type: type,
      comId: dataItem?.companyId
    }
    try {
      UploadGetContractsApi(obj, async (res) => {
        if (res.sucess) {
          if (type == "Pounds") {
            setDataContractRepo(res.sucess.list);
            setIsLoader(false)
            return
          }
        }
      });
    } catch (error) {
      console.log("error", error)
      setIsLoader(false)
    }
    try {
      getAssignCompany(dataItem?.id, async (res) => {
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
    if (activeTab == '2') {
      getDataFiles("Pounds")
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
    console.log("logData1logData1", logData1);
  }
  const ChangeStatusJob = (item) => {
    setDropdownVal(item.corporateName)
    setCompId(item.id)
  }
  const toggleUpdatePounds = (item) => {
    if (item) {
      setOpenPounds(!openPoundsModal);
      setDataPoundsUpdate(item)
    }
    else {

    }
  }
  const ViewImage = (item) => {
    setDataImage(item);
    setViewImageModal(!openViewImageModal);
  }
  const PoundsCallback = (feeAgrementData) => {
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
      if (Object.keys(dataPoundsUpdate).length !== 0) {
        formData.append('id', dataPoundsUpdate.id);
      }
      formData.append('refId', dataItem?.id);
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      UploadContractsApi(formData, async (res) => {
        if (res.sucess) {
          console.log("UPP", res.sucess)
          setOpenPounds(false)
          await getDataFiles("Pounds")
          setIsLoader(false)
          successAlert(res.sucess.response.messages[0].message)
          setDataPoundsUpdate([])

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


  return (
    <>
      {/* {activeTab === '1' && ()} */}
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
        
        <TabContent activeTab={activeTab}>

          <TabPane tabId="2">
            <Row className="row1">
              <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <Row>
                      <h3 className="mb-0">Pounds</h3>
                      <Button style={{ position: "absolute", right: 20, top: -12, }} onClick={() => { setOpenPounds(!openPoundsModal) }} className="my-4 p-btm" color="primary" type="button">
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
                      {dataPounds?.length > 0 ? (
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
                            {dataPounds.map((item) => {
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
                                          onClick={() => { toggleUpdatePounds(item) }}
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
        <UploadModal modal={openPoundsModal} data={dataPoundsUpdate} title='Pounds' parentCallback={PoundsCallback} />
        <ViewImageModal modal={openViewImageModal} itemData={imageData} companyId={dataItem?.companyId}/>
      </div>
    </>
  );
}

export default Pounds;