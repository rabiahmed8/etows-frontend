import React, { useEffect, useState, useCallback } from "react";

// reactstrap components
import {
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
  Container,
  Row,
  Col,
  Button,
  UncontrolledTooltip,
  Alert,
  Input,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import CustomPagination from "components/customPagination.js";
// core components
import Header from "components/Headers/Header.js";
import {
  AllJobsApi,
  JobRequestByStatusApi,
  AvailableDriversApi,
  AssignJobApi,
  getUserDatabyUrl,
} from "../../APIstore/apiCalls";
import config from "config";
import Maps from "./Maps";
import moment from "moment";
import { successAlert, errorAlert, emailValidator } from "../../Theme/utils";
import toast, { Toaster } from "react-hot-toast";

function AllJobs(props) {
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const [driverData, setDriversData] = useState([]);
  const [usid, setUsId] = useState([]);
  const [statusData, setStatusData] = useState("Pending");
  const [modal, setModal] = useState(false);
  const [mapModal, setMapModal] = useState(false);
  const [sucess, setSuccess] = useState(false);
  const [errors, setError] = useState(false);
  const [List, setList] = useState([]);
  const [emptyError, setEmptyError] = useState(false);
  const [MasterChecked, setMasterChecked] = useState(false);
  const [SelectedList, setSelectedList] = useState([]);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [setItem, setItemData] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [modalData, setModalData] = useState({});
  const toggleUpdate = (item) => {
    setModalUpdate(!modalUpdate);
    console.log("item", item);
    setItemData(item);
  };
  const toggleModataData = () => {
    setModalOpen(!modalOpen);
  };
  const onMasterCheck = (e) => {
    let tempList = List;
    tempList.map((user) => (user.selected = e.target.checked));
    setMasterChecked(e.target.checked);
    setList(tempList);
    setSelectedList(List.filter((e) => e.selected));
    console.log("MasterSelected", SelectedList);
  };
  const onItemCheck = (e, item) => {
    let tempList = List;
    tempList.map((user) => {
      if (user.id === item.id) {
        user.selected = e.target.checked;
      }
      return user;
    });

    const totalItems = List.length;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;
    setMasterChecked(totalItems === totalCheckedItems);
    setList(tempList);
    setSelectedList(List.filter((e) => e.selected));
    console.log("sadf", SelectedList);
  };

  const getSelectedRows = () => {
    setSelectedList(List.filter((e) => e.selected));
  };
  

  const AssignjobNow = (id) => {
    if (SelectedList.length > 0) {
      const dataObj = SelectedList.map((items) => ({
        id: usid,
        userId: items?.id,
        status: "Assigned",
      }));

      console.log("dataobj", dataObj);
      try {
        AssignJobApi(dataObj, async (res) => {
          if (res.sucess.statusCode === "success") {
            toggle();
            try {
              AllJobsApi("", async (res) => {
                if (res.sucess) {
                  console.log("res.sucess", res.sucess);
                  setData(res.sucess);
                } else {
                  console.log("errrrr");
                }
              });
            } catch (error) {
              console.log("error", error);
            }
            successAlert(res.sucess.messages[0].message);
          } else {
            toggle();
            errorAlert("Database error !!!");
          }
        });
      } catch (error) {
        errorAlert(error);
      }
    } else {
      errorAlert("Please Select atleast one Row");
    }
  };
  const AssignJob = (usId) => {
    try {
      AvailableDriversApi("", async (res) => {
        if (res.sucess) {
          console.log("res.sucess.usersOnJobList", res.sucess?.usersOnJobList);
          setDriversData(res.sucess?.usersOnJobList);
          setUsId(usId);
          setList(res.sucess.usersOnJobList);
          toggle();
        } else {
          console.log("errrrr");
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  const toggle = () => {
    setModal(!modal);
  };
  const toggleMap = () => {
    setMapModal(!mapModal);
  };
  useEffect(() => {
    setIsLoader(true);
    getData();
  }, []);

  const getData = ()=>{
    try {
      AllJobsApi("", async (res) => {
        if (res.sucess) {
          let result = res.sucess.filter((el) => el.status === statusData);
          setInitialData(res.sucess)
          setData(result);
          setIsLoader(false);
        } else {
          console.log("errrrr");
          setIsLoader(false);
        }
      });
    } catch (error) {
      console.log("error", error);
      setIsLoader(false);
    }
  }
  const ChangeStatusJob = (status) => {
    // if ((status != 'LE Request' && status != 'Complete') && (status != 'OnScene' && status != 'Pending') && (status != 'Enroute' && status != 'Enroute(D)') && status != 'OnScene(D)') {
    //   try {
    //     JobRequestByStatusApi(status, async (res) => {
    //       if (res.sucess) {
    //         console.log("res.sucess", res.sucess)
    //         setData(res.sucess)
    //       } else {
    //         console.log("errrrr")
    //       }
    //     });
    //   } catch (error) {
    //     console.log("error", error)
    //   }
    // }
    // if (status == 'Enroute(D)') {
    //   let result = data.filter(el => el.status === status);
    //   setData(result);
    //   setStatusData(status)
    //   return
    // }
    // if (status == 'Enroute') {
    //   let result = data.filter(el => el.status === status);
    //   setData(result);
    //   setStatusData(status)
    //   return
    // }
    // if (status == 'OnScene') {
    //   let result = data.filter(el => el.status === status);
    //   setData(result);
    //   setStatusData(status)
    //   return
    // }
    // if (status == 'OnScene(D)') {
    //   let result = data.filter(el => el.status === status);
    //   setData(result);
    //   setStatusData(status)
    //   return
    // }
    // if (status == 'LE Request') {
    //   let result = data.filter(el => el.status === status);
    //   setData(result);
    //   setStatusData(status)
    //   return
    // }
    // if (status == 'Complete') {
    //   let result = data.filter(el => el.status === status);
    //   setData(result);
    //   setStatusData(status)
    //   return
    // }
    // if (status == 'Pending') {
    //   let result = data.filter(el => el.status === status);
    //   setData(result);
    //   setStatusData(status)
    //   return
    // }

    if (status) {
      setIsLoader(true);
      let result = initialData.filter((el) => el.status === status);
      setData(result);
      setIsLoader(false);
    
    } else if (status == "") {
      setIsLoader(true);
      setData(initialData);
      setIsLoader(false);
    
    }

    setStatusData(status);
  };
  const callUser = useCallback((item) => {
    setIsLoader(true);
    try {
      getUserDatabyUrl(item.userUrl, async (res) => {
        console.log("aa", res.sucess);
        if (res.sucess) {
          setModalData(res.sucess);
          setIsLoader(false);
          toggleModataData();
        } else {
          console.log("errrrr");
          setIsLoader(false);
        }
      });
    } catch (error) {
      console.log("error", error);
      setIsLoader(false);
    }
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        {sucess && <Alert color="success">Job has been Assigned</Alert>}
        {errors && <Alert color="danger">Something went Wrong</Alert>}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>
                  
                  <h3 className="mb-0">{config.allJobs}</h3>
                  <UncontrolledDropdown style={{ marginLeft: 10 }}>
                    <DropdownToggle
                      className="btn-icon-only text-light"
                      style={{
                        width: 80,
                        height: 32,
                      }}
                      role="button"
                      size="sm"
                      color=""
                      onClick={(e) => e.preventDefault()}
                    >
                      Filter
                    </DropdownToggle>
                    
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem
                        onClick={() => {
                          ChangeStatusJob("");
                        }}
                      >
                        {config.all}
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          ChangeStatusJob("LE Request");
                        }}
                      >
                        LE Request
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          ChangeStatusJob("Assigned");
                        }}
                      >
                        Assigned
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          ChangeStatusJob("Pending");
                        }}
                      >
                        {config.pending}
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          ChangeStatusJob("OnScene");
                        }}
                      >
                        OnScene
                      </DropdownItem>
                      {/* <DropdownItem

                        onClick={() => { ChangeStatusJob('OnScene(D)') }}
                      >
                        OnScene(D)
                      </DropdownItem> */}
                      <DropdownItem
                        onClick={() => {
                          ChangeStatusJob("ENRoute");
                        }}
                      >
                        Enroute
                      </DropdownItem>
                      {/* <DropdownItem

                        onClick={() => { ChangeStatusJob('ENRoute(D)') }}
                      >
                        Enroute(D)
                      </DropdownItem> */}

                      <DropdownItem
                        onClick={() => {
                          ChangeStatusJob("Complete");
                        }}
                      >
                        Complete
                      </DropdownItem>
                    </DropdownMenu>
                    
                  </UncontrolledDropdown>
                  <Button
                      onClick={() => {
                        getData();
                      }}
                      className="my-4 paddingCt"
                      color="primary"
                      type="button"
                    >
                      Refresh
                    </Button>
                  {/* <h3 style={{ position: "absolute", right: 20, top: 25, }} className="mb-0">Keep Scrolling ►</h3> */}
                </Row>
              </CardHeader>
              {isLoader && (
                <div className="SpinnerClass">
                  <Spinner className="loader" children={true} />
                </div>
              )}
              {currentPosts.length > 0 ? (
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      {/* <th scope="col">Id</th> */}
                      <th scope="col">Job ID</th>
                      <th scope="col">Location</th>
                      <th scope="col">Service status</th>
                      <th scope="col">Driver</th>
                      <th scope="col">LE</th>
                      {/* <th scope="col">Vehicle</th>
                    <th scope="col">Vin</th>
                  <th scope="col">Location</th> */}
                      <th scope="col">Assign Job</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.map((item) => {
                      return (
                        <tr>
                          {/* <td className="text-sm">{item?.id}</td> */}
                          {/* <td className="text-sm">{item?.officerName}</td> */}
                          <td
                            style={{
                              textDecoration: "underline black",
                              cursor: "pointer",
                            }}
                            className="text-sm"
                            onClick={() => {
                              toggleUpdate(item);
                            }}
                          >
                            {item?.id}
                          </td>
                          <td className="text-sm">
                            {item?.towJobRequestLocation
                              ? item?.towJobRequestLocation
                              : "Nill"}
                          </td>

                          {/* <td className="text-sm">
                            {item.releaseStatus.length > 25 ?
                              `${item.releaseStatus.substring(0, 25)}...` : item.releaseStatus
                            }
                          </td>
                          <td className="text-sm">
                            {item.requestStatus.length > 15 ?
                              `${item.requestStatus.substring(0, 15)}...` : item.requestStatus
                            }
                          </td> */}

                          <td className="text-sm">{item?.status}</td>
                          <td className="text-sm">
                            <Button
                              onClick={() => {
                                callUser(item);
                              }}
                              className="my-4 paddingCt"
                              color="primary"
                              type="button"
                            >
                              View
                            </Button>
                          </td>
                          <td className="text-sm">
                            {item?.indicatePolice ? "Yes" : "No"}
                          </td>
                          {/* <td className="text-sm">
                            {item?.vin}

                          </td>
                          <td>
                            <Button onClick={() => { toggleMap() }} className="my-4" color="primary" type="button">
                              {config.goToLocation}
                            </Button>
                          </td> */}
                          {statusData === "Pending" ||
                          statusData === "LE Request" ||
                          item?.status === "Pending" ||
                          item?.status === "LE Request" ? (
                            <td style={{ textAlign: "center" }}>
                              <Button
                                onClick={() => {
                                  AssignJob(item?.id);
                                }}
                                className="my-4 paddingLess"
                                color="primary"
                                type="button"
                              >
                                {config.assign}
                              </Button>
                            </td>
                          ) : (
                            <td style={{ textAlign: "center" }}>---</td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center">
                  {!isLoader && <h2>No Record Found</h2>}
                </div>
              )}

              <CardFooter className="py-4">
                <CustomPagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                  totalPosts={data.length}
                  postsPerPage={postsPerPage}
                />
              </CardFooter>
            </Card>
          </div>
        </Row>
        <Modal
          size="lg"
          style={{ maxWidth: "1600px", width: "80%" }}
          isOpen={modal}
          toggle={() => {
            toggle();
          }}
          className={props.className}
        >
          <ModalBody>
            {emptyError && (
              <Alert color="danger">Please Select atleast one Row</Alert>
            )}
            <Row>
              <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <h3 className="mb-0">{config.availableDrivers}</h3>
                    {/* <h3 style={{ position: "absolute", right: 20, top: 25, }} className="mb-0">Keep Scrolling ►</h3> */}
                  </CardHeader>
                  {driverData ? (
                    <Table
                      className="align-items-center table-flush"
                      responsive
                    >
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              checked={MasterChecked}
                              id="mastercheck"
                              onChange={(e) => onMasterCheck(e)}
                            />
                          </th>
                          <th scope="col">Email</th>
                          <th scope="col">Name</th>
                          {/* <th scope="col">Address</th>
                        <th scope="col">Province</th> */}
                          <th scope="col">Location</th>
                          {/* <th scope="col">Gender</th> */}
                          {/* <th scope="col">Role</th> */}
                          <th scope="col" />
                        </tr>
                      </thead>
                      {driverData ? (
                        <tbody>
                          {driverData.map((item) => {
                            return (
                              <tr
                                key={item?.id}
                                className={item?.selected ? "selected" : ""}
                              >
                                <th scope="row">
                                  <Input
                                    type="checkbox"
                                    checked={item?.selected}
                                    className="form-check-input"
                                    id="rowcheck{item.id}"
                                    onChange={(e) => onItemCheck(e, item)}
                                  />
                                </th>
                                {/* <th scope="row"> */}
                                {/* <Media className="align-items-center">
                                  <a
                                    className="avatar rounded-circle mr-3"

                                    onClick={e => e.preventDefault()}
                                  >
                                    <img
                                      alt="..."
                                      src={require("assets/img/theme/bootstrap.jpg")}
                                    />
                                  </a>
                                  <Media>
                                    <span className="mb-0 text-sm">
                                      {item?.userName}
                                    </span>
                                  </Media>
                                </Media>
                              </th> */}
                                <td className="text-sm"> {item?.userName}</td>
                                <td className="text-sm">
                                  {item?.title} {item?.firstName}{" "}
                                  {item?.lastName}
                                </td>
                                <td>
                                  <Button
                                    onClick={() => {
                                      toggleMap();
                                    }}
                                    className="my-4"
                                    color="primary"
                                    type="button"
                                  >
                                    {config.goToLocation}
                                  </Button>
                                </td>
                                <td>
                                  <Button
                                    onClick={() => {
                                      AssignjobNow(item?.id);
                                    }}
                                    className="my-4"
                                    color="primary"
                                    type="button"
                                  >
                                    Assign Job
                                  </Button>
                                </td>
                                {/* <td className="text-sm">
                                {item?.address}, {item?.city}, {item?.country}
                              </td> */}
                                {/* <td className="text-sm">
                                {item?.province}
                              </td> */}
                                {/* <td className="text-sm">
                                {item?.phone}
                              </td> */}

                                {/* <td className="text-sm">
                                {item?.roles}
                              </td> */}
                                {/* <td className="text-sm">
                                <div className="d-flex align-items-center">
                                  <span className="mr-2"></span>
                                  <div>
                                    <span>{item.gender == 'm' ? 'Male' : 'Female'}</span>
                                  </div>
                                </div>
                              </td> */}
                                {/* <td className="text-right">
                                <UncontrolledDropdown>
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

                                      onClick={() => { AssignjobNow(item?.id) }}
                                    >
                                      {config.assignJob}
                                    </DropdownItem>
                                   
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </td> */}
                              </tr>
                            );
                          })}
                        </tbody>
                      ) : (
                        <div className="text-center">
                          {!isLoader && <h2>No Record Found</h2>}
                        </div>
                      )}
                    </Table>
                  ) : (
                    <div className="text-center">
                      <h2>No Record Found</h2>
                    </div>
                  )}
                  <CardFooter className="py-4">
                    <nav aria-label="...">
                      <Pagination
                        className="pagination justify-content-end mb-0"
                        listClassName="justify-content-end mb-0"
                      >
                        <PaginationItem className="disabled">
                          <PaginationLink
                            onClick={(e) => e.preventDefault()}
                            tabIndex="-1"
                          >
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem className="active">
                          <PaginationLink onClick={(e) => e.preventDefault()}>
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink onClick={(e) => e.preventDefault()}>
                            2 <span className="sr-only">(current)</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink onClick={(e) => e.preventDefault()}>
                            3
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink onClick={(e) => e.preventDefault()}>
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
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                toggle();
              }}
            >
              {config.close}
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          size="lg"
          style={{ maxWidth: "1600px", width: "80%" }}
          isOpen={mapModal}
          toggle={() => {
            toggleMap();
          }}
          className={props.className}
        >
          <ModalHeader>{config.towRequestLocation}</ModalHeader>
          <ModalBody>
            <Maps lat={44.34181} lng={-79.73231} />
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                toggleMap();
              }}
            >
              {config.close}
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          size="sm"
          style={{ maxWidth: "1600px", width: "60%" }}
          isOpen={modalUpdate}
          toggleUpdate={() => {
            toggleUpdate();
          }}
          className={props.className}
        >
          <ModalHeader>Job Id: {setItem?.id}</ModalHeader>
          <ModalBody>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {setItem?.officerName ? (
                <div className="listUi">
                  <span className="text-sm">Client Name</span>
                  <span className="text-sm">{setItem?.officerName}</span>
                </div>
              ) : null}
              {setItem?.officerDepart ? (
                <div className="listUi">
                  <span className="text-sm">Officer Depart</span>
                  <span className="text-sm">{setItem?.officerDepart}</span>
                </div>
              ) : null}
              {setItem?.officerContact ? (
                <div className="listUi">
                  <span className="text-sm">Client Contact</span>
                  <span className="text-sm">{setItem?.officerContact}</span>
                </div>
              ) : null}
              {setItem?.licensePlateNumber ? (
                <div className="listUi">
                  <span className="text-sm">License Plate Number</span>
                  <span className="text-sm">{setItem?.licensePlateNumber}</span>
                </div>
              ) : null}
              {setItem?.mandatoryDate ? (
                <div className="listUi">
                  <span className="text-sm">Mandatory Date</span>
                  <span className="text-sm">
                    {moment(setItem?.mandatoryDate).format("MMMM d, YYYY")}
                  </span>
                </div>
              ) : null}
              {setItem?.otherCompany ? (
                <div className="listUi">
                  <span className="text-sm">Other Company</span>
                  <span className="text-sm">{setItem?.otherCompany}</span>
                </div>
              ) : null}
              {setItem?.towJobRequestLocation ? (
                <div className="listUi">
                  <span className="text-sm">Tow Job Request Location</span>
                  <span className="text-sm">
                    {setItem?.towJobRequestLocation}
                  </span>
                </div>
              ) : null}
              {setItem?.policeService ? (
                <div className="listUi">
                  <span className="text-sm">Police Service</span>
                  <span className="text-sm">{setItem?.policeService}</span>
                </div>
              ) : null}
              {setItem?.officerBadge ? (
                <div className="listUi">
                  <span className="text-sm">Officer Badge</span>
                  <span className="text-sm">{setItem?.officerBadge}</span>
                </div>
              ) : null}
              {setItem?.policeOccurrence ? (
                <div className="listUi">
                  <span className="text-sm">Police Occurrence</span>
                  <span className="text-sm">{setItem?.policeOccurrence}</span>
                </div>
              ) : null}
              {setItem?.otherContact ? (
                <div className="listUi">
                  <span className="text-sm">Client Other Contact</span>
                  <span className="text-sm">{setItem?.otherContact}</span>
                </div>
              ) : null}
              {setItem?.specialInstructions ? (
                <div className="listUi">
                  <span className="text-sm">Special Instructions</span>
                  <span className="text-sm">
                    {setItem?.specialInstructions}
                  </span>
                </div>
              ) : null}
              {setItem?.occurrenceNumbers ? (
                <div className="listUi">
                  <span className="text-sm">Occurrence Numbers</span>
                  <span className="text-sm">{setItem?.occurrenceNumbers}</span>
                </div>
              ) : null}
              {setItem?.vin ? (
                <div className="listUi">
                  <span className="text-sm">Vin Number</span>
                  <span className="text-sm">{setItem?.vin}</span>
                </div>
              ) : null}
              {setItem?.vinBasicData?.year ? (
                <div className="listUi">
                  <span className="text-sm">Year</span>
                  <span className="text-sm">{setItem.vinBasicData?.year}</span>
                </div>
              ) : null}
              {setItem?.vinBasicData?.make ? (
                <div className="listUi">
                  <span className="text-sm">Make</span>
                  <span className="text-sm">{setItem.vinBasicData?.make}</span>
                </div>
              ) : null}
              {setItem?.vinBasicData?.model ? (
                <div className="listUi">
                  <span className="text-sm">Model</span>
                  <span className="text-sm">{setItem.vinBasicData?.model}</span>
                </div>
              ) : null}
              {setItem?.vinBasicData?.oemBodyStyle ? (
                <div className="listUi">
                  <span className="text-sm">Body Style</span>
                  <span className="text-sm">
                    {setItem.vinBasicData?.oemBodyStyle}
                  </span>
                </div>
              ) : null}
              {setItem?.vehicleType ? (
                <div className="listUi">
                  <span className="text-sm">Item Type</span>
                  <span className="text-sm">{setItem?.vehicleType}</span>
                </div>
              ) : null}
              {setItem?.vinBasicData?.bodyType ? (
                <div className="listUi">
                  <span className="text-sm">Body Type</span>
                  <span className="text-sm">
                    {setItem.vinBasicData?.bodyType}
                  </span>
                </div>
              ) : null}
              {setItem?.vinBasicData?.driveType ? (
                <div className="listUi">
                  <span className="text-sm">Driver Type</span>
                  <span className="text-sm">
                    {setItem.vinBasicData?.driveType}
                  </span>
                </div>
              ) : null}
              {setItem?.vinBasicData?.doors ? (
                <div className="listUi">
                  <span className="text-sm">Doors</span>
                  <span className="text-sm">{setItem.vinBasicData?.doors}</span>
                </div>
              ) : null}

              {setItem?.ownerName ? (
                <div className="listUi">
                  <span className="text-sm">Owner Name</span>
                  <span className="text-sm">{setItem?.ownerName}</span>
                </div>
              ) : null}
              {setItem?.ownerMobile ? (
                <div className="listUi">
                  <span className="text-sm">Owner Mobile</span>
                  <span className="text-sm">{setItem?.ownerMobile}</span>
                </div>
              ) : null}
              {setItem?.ownerAddress ? (
                <div className="listUi">
                  <span className="text-sm">Owner Address</span>
                  <span className="text-sm">{setItem?.ownerAddress}</span>
                </div>
              ) : null}
              {setItem?.ownerEmail ? (
                <div className="listUi">
                  <span className="text-sm">Owner Email</span>
                  <span className="text-sm">{setItem?.ownerEmail}</span>
                </div>
              ) : null}
              {setItem?.lienName ? (
                <div className="listUi">
                  <span className="text-sm">Lien Name</span>
                  <span className="text-sm">{setItem?.lienName}</span>
                </div>
              ) : null}
              {setItem?.lienMobile ? (
                <div className="listUi">
                  <span className="text-sm">Lien Mobile</span>
                  <span className="text-sm">{setItem?.lienMobile}</span>
                </div>
              ) : null}
              {setItem?.lienAddress ? (
                <div className="listUi">
                  <span className="text-sm">Lien Address</span>
                  <span className="text-sm">{setItem?.lienAddress}</span>
                </div>
              ) : null}
              {setItem?.lienEmail ? (
                <div className="listUi">
                  <span className="text-sm">Lien Email</span>
                  <span className="text-sm">{setItem?.lienEmail}</span>
                </div>
              ) : null}
              {setItem?.driverName ? (
                <div className="listUi">
                  <span className="text-sm">Driver Name</span>
                  <span className="text-sm">{setItem?.driverName}</span>
                </div>
              ) : null}
              {setItem?.driverMobile ? (
                <div className="listUi">
                  <span className="text-sm">Driver Mobile</span>
                  <span className="text-sm">{setItem?.driverMobile}</span>
                </div>
              ) : null}
              {setItem?.driverAddress ? (
                <div className="listUi">
                  <span className="text-sm">Driver Address</span>
                  <span className="text-sm">{setItem?.driverAddress}</span>
                </div>
              ) : null}
              {setItem?.driverEmail ? (
                <div className="listUi">
                  <span className="text-sm">Driver Email</span>
                  <span className="text-sm">{setItem?.driverEmail}</span>
                </div>
              ) : null}

              {setItem?.reasonForImpound ? (
                <div className="listUi">
                  <span className="text-sm">Reason For Impound</span>
                  <span className="text-sm">{setItem?.reasonForImpound}</span>
                </div>
              ) : null}
              {setItem?.reasonForTow ? (
                <div className="listUi">
                  <span className="text-sm">Reason For Tow</span>
                  <span className="text-sm">{setItem?.reasonForTow}</span>
                </div>
              ) : null}
              {/* {setItem?.requestStatus ? (
                <div className="listUi">
                  <span className="text-sm">Request Status</span>
                  <span className="text-sm">{setItem?.requestStatus}</span>
                </div>
              ) : null} */}
              {setItem?.requestType ? (
                <div className="listUi">
                  <span className="text-sm">Request Type</span>
                  <span className="text-sm">{setItem?.requestType}</span>
                </div>
              ) : null}
              {setItem?.releaseStatus ? (
                <div className="listUi">
                  <span className="text-sm">Release Status</span>
                  <span className="text-sm">{setItem?.releaseStatus}</span>
                </div>
              ) : null}
              {setItem?.status ? (
                <div className="listUi">
                  <span className="text-sm">Service Status</span>
                  <span className="text-sm">{setItem?.status}</span>
                </div>
              ) : null}
              {setItem?.vehicleOrProperty ? (
                <div className="listUi">
                  <span className="text-sm">Vehicle Property</span>
                  <span className="text-sm">{setItem?.vehicleOrProperty}</span>
                </div>
              ) : null}
            </div>
          </ModalBody>
          <ModalFooter>
            <ModalFooter>
              {/* <Button onClick={() => { toggle() }} className="my-4" color="primary" type="button">
                Assign Job
              </Button> */}
              <Button
                color="primary"
                onClick={() => {
                  setModalUpdate(!modalUpdate);
                }}
              >
                Close
              </Button>{" "}
            </ModalFooter>
          </ModalFooter>
        </Modal>

        <Modal
          size="sm"
          style={{ maxWidth: "1600px", width: "60%" }}
          isOpen={modalOpen}
          toggleModataData={() => {
            toggleModataData();
          }}
          className={props.className}
        >
          <ModalHeader>Driver Detail</ModalHeader>
          <ModalBody>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {modalData?.userName ? (
                <div className="listUi">
                  <span className="text-sm">Email</span>
                  <span className="text-sm">{modalData?.userName}</span>
                </div>
              ) : null}
              {modalData?.firstName ? (
                <div className="listUi">
                  <span className="text-sm">First Name</span>
                  <span className="text-sm">{modalData?.firstName}</span>
                </div>
              ) : null}
              {modalData?.lastName ? (
                <div className="listUi">
                  <span className="text-sm">Last Name</span>
                  <span className="text-sm">{modalData?.lastName}</span>
                </div>
              ) : null}

              {modalData?.phone ? (
                <div className="listUi">
                  <span className="text-sm">Phone Number</span>
                  <span className="text-sm">{modalData?.phone}</span>
                </div>
              ) : null}
              {modalData?.companyName ? (
                <div className="listUi">
                  <span className="text-sm">Company Name</span>
                  <span className="text-sm">{modalData?.companyName}</span>
                </div>
              ) : null}
              {modalData?.lastModifiedDate ? (
                <div className="listUi">
                  <span className="text-sm">Modified Date</span>
                  <span className="text-sm">
                    {moment(modalData?.lastModifiedDate).format("MMMM d, YYYY")}
                  </span>
                </div>
              ) : null}
            </div>
          </ModalBody>
          <ModalFooter>
            <ModalFooter>
              {/* <Button onClick={() => { toggle() }} className="my-4" color="primary" type="button">
                Assign Job
              </Button> */}
              <Button
                color="primary"
                onClick={() => {
                  setModalOpen(!modalOpen);
                }}
              >
                Close
              </Button>{" "}
            </ModalFooter>
          </ModalFooter>
        </Modal>
      </Container>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
      />
    </>
  );
}

export default AllJobs;
