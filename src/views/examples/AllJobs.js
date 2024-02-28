import React, { useEffect, useState, useCallback } from "react";
import ToggleButton from "react-toggle-button";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import ViewImageModal from "component/ViewImageModal";
import { Constants } from "../../Environment";

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
  Button,
  UncontrolledTooltip,
  Alert,
  Input,
  Label,
  Spinner,
  CardBody,
  FormGroup,
  Form,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import CustomPagination from "components/customPagination.js";
import { AiFillCloseCircle } from "react-icons/ai";
// core components
import Header from "components/Headers/Header.js";
import {
  AllJobsApi,
  getImagesData,
  getUploadDatabyUrl,
  JobRequestByStatusApi,
  AvailableDriversApi,
  AssignJobApi,
  getUserDatabyUrl,
  getOnDutyDrivers,
  getLocationDriver,
  DispatchUserRequestUpdate,
  getDropDownApi,
  getJobDetails,
} from "../../APIstore/apiCalls";

import config from "config";
import Maps from "./Maps";
import moment from "moment";
import { successAlert, errorAlert, emailValidator } from "../../Theme/utils";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";
import { Link } from "react-router-dom";

var logData1 = {};
var localAccessData = null;
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
  const [logInfo, setLogInfo] = useState("");
  const [dataLatLng, setDataLatLng] = useState([]);
  const [driverId, setDataId] = useState("");
  const [currentSort, setcurrentSort] = useState("up");
  const [heldForOthersVal, setHeldForOthers] = useState(setItem?.heldPurpose);
  const [propertyForfietVal, setPropertyForfiet] = useState(
    setItem?.propertyForfiet
  );
  const [propertyForfietDetails, setPropertyForfietDetails] = useState(
    setItem?.propertyForfietDetails
  );
  const [notifyOwner, setNotifyOwner] = useState(setItem?.notifyOwner);
  const [notifyOwnerName, setNotifyOwnerName] = useState(
    setItem?.notifyOwnerName
  );
  const [notifyOwnerEmail, setNotifyOwnerEmail] = useState(
    setItem?.notifyOwnerEmail
  );
  const [notifyContact, setNotifyContact] = useState(setItem?.notifyContact);
  const [notifiedBy, setNotifiedBy] = useState(setItem?.notifiedBy);
  const [showheldForOthers, setShowHeldForOthers] = useState("");
  const [showPropertyForfiet, setShowPropertyForfiet] = useState("");
  const [dataDropdown, setDropdown] = useState();
  const [vehiclePicture, setVehiclePicture] = useState([]);
  const [inventoryAndDamagePicture, setInventoryAndDamagePicture] = useState(
    []
  );
  const [receiptPicture, setReceiptPicture] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [openViewImageModal, setViewImageModal] = useState(false);
  const [imageData, setDataImage] = useState();
  const location = useLocation();
  const assignedCompany = location.state;

  const ViewImage = (item) => {
    setDataImage(item);
    setViewImageModal(!openViewImageModal);
  };

  const loadImages = (jobId, type) => {
    const obj = {
      type: type,
      id: jobId,
    };
    try {
      if (type == "vehiclePicture") setVehiclePicture([]);
      else if (type == "inventoryAndDamagePicture")
        setInventoryAndDamagePicture([]);
      else if (type == "receiptPicture") setReceiptPicture([]);

      getImagesData(obj, async (res) => {
        if (res.sucess) {
          var list = res.sucess.list;
          if (type == "vehiclePicture") {
            setVehiclePicture(list != null ? list : []);
          } else if (type == "inventoryAndDamagePicture") {
            setInventoryAndDamagePicture(list != null ? list : []);
          } else if (type == "receiptPicture") {
            setReceiptPicture(list != null ? list : []);
          }
        } else {
          console.log("errrrr");
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  const renderList = (selectedArray) => {
    return selectedArray?.map((data) => ({
      label: data?.field1,
      value: data?.id,
    }));
  };
  const toggleUpdate = (detailsData) => {
    try {
      getJobDetails(detailsData.id, async (res) => {
        if (res.sucess) {
          console.log(res.sucess);
          let item = res.sucess;
          loadImages(item?.id, "vehiclePicture");
          loadImages(item?.id, "inventoryAndDamagePicture");
          loadImages(item?.id, "receiptPicture");

          setModalUpdate(!modalUpdate);
          console.log("item", item);
          setNotifyOwner(item?.notifyOwner ? item.notifyOwner : false);
          setNotifyOwnerName(item?.notifyOwnerName);
          setNotifyContact(item?.notifyContact);
          setNotifyOwnerEmail(item?.notifyOwnerEmail);
          setNotifiedBy(item?.notifiedBy);
          setItemData(item);

          setHeldForOthers(item?.heldPurpose);
          setPropertyForfiet(item?.propertyForfiet);
        } else {
          console.log("errrrr");
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const sortTypes = {
    up: {
      class: "sort-up",
      fn: (a, b) => a.net_worth - b.net_worth,
    },
    down: {
      class: "sort-down",
      fn: (a, b) => b.net_worth - a.net_worth,
    },
    // default: {
    //   class: 'sort',
    //   fn: (a, b) => a
    // }
  };

  const onSortChange = () => {
    // const { currentSort } = this.state;
    let nextSort;

    if (currentSort === "down") nextSort = "up";
    else if (currentSort === "up") nextSort = "down";
    // else if (currentSort === 'default') nextSort = 'down';
    setcurrentSort(nextSort);
    let newArray = data.slice().reverse();
    setData(newArray);
  };
  const toggleModataData = () => {
    setModalOpen(!modalOpen);
  };
  useEffect(() => {
    try {
      getDropDownApi("", async (res) => {
        if (res.sucess) {
          setDropdown(res.sucess);
        } else {
          // errorAlert('Something went wrong');
        }
      });
    } catch (error) {
      errorAlert(error);
    }
  }, []);
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
            getIndexData();
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
          setDataId(res.sucess?.usersOnJobList[0]?.id);
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
    try {
      console.log(driverId);
      getLocationDriver(driverId ? driverId : "", async (res) => {
        if (res.sucess) {
          console.log("res.sucess.userLocations", res.sucess?.userLocations);
          setDataLatLng(res.sucess?.userLocations?.[0] || []);
          setMapModal(!mapModal);
        } else {
          console.log("errrrr");
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  const getLoggedData = async () => {
    let logData;
    const storedData = await localStorage.getItem("accessData");
    if (storedData) {
      const getdata = await localStorage.getItem("accessData");
      logData = JSON.parse(getdata);
      localAccessData = logData;
    } else {
      const getdata = await localStorage.getItem("loggedData");
      logData = JSON.parse(getdata);
    }
    console.log("parsedDataparsedData", localAccessData);
    setLogInfo(logData);
    setLogInfo((state) => {
      logData1 = state;
    });
  };
  useEffect(() => {
    getLoggedData();
    getIndexData();
  }, []);

  const getIndexData = () => {
    setIsLoader(true);
    try {
      AllJobsApi(
        assignedCompany != null ? assignedCompany?.id : "",
        async (res) => {
          if (res.sucess) {
            console.log("res.sucess", res.sucess);
            let result = res.sucess;
            // if (statusData) {
            //   result = result.filter(
            //     (el) =>
            //       (el.status == "LE Request" ? "Pending" : el.status) ===
            //       statusData
            //   );
            // }
            // setData(result);
            setInitialData(res.sucess);
            ChangeStatusJob(statusData, res.sucess);
            setCurrentPage(1);
            setIsLoader(false);
          } else {
            console.log("errrrr");
            setIsLoader(false);
          }
        }
      );
    } catch (error) {
      console.log("error", error);
      setIsLoader(false);
    }
  };

  //   const requestTypeFunc = (status) => {
  //     // setIsLoader(true);
  //     let result = initialData.filter((el) => el.requestType === status);
  //     setData(result);
  //     // setCurrentPage(1);
  //     // setIsLoader(false);
  //   };
  //   const LEFilter = (status) => {
  //     // setIsLoader(true);
  //     let result = initialData.filter((el) => el.indicatePolice === status);
  //     setData(result);
  //     // setCurrentPage(1);
  //     // setIsLoader(false);
  //   };
  // const serviceFilter = (status) => {
  //   // setIsLoader(true);
  //   if (status) {
  //     let result = initialData.filter(
  //       (el) => (el.status == "LE Request" ? "Pending" : el.status) === status
  //     );
  //     setData(result);
  //   } else if (status == "") {
  //     setData(initialData);
  //   }
  //   // setCurrentPage(1);
  //   // setStatusData(status);
  //   //  setIsLoader(false);

  // }
  const ChangeStatusJob = (status, data) => {
    let LE = [true, false];
    let type = ["Roadside Assistance", "Tow and Impound/Storage", "Tow only"];
    let result = data || initialData;
    setIsLoader(true);
    if (status === "") {
      // result = initialData;
    } else if (LE.includes(status)) {
      result = result.filter((el) => el.indicatePolice === status);
    } else if (type.includes(status)) {
      result = result.filter((el) => el.requestType === status);
    } else {
      result = result.filter(
        (el) => (el.status == "LE Request" ? "Pending" : el.status) === status
      );
    }

    setData(result);
    setCurrentPage(1);
    setStatusData(status);
    setIsLoader(false);
  };

  const callUser = useCallback((item) => {
    setIsLoader(true);
    try {
      getUserDatabyUrl(item.userUrl, async (res) => {
        if (res.sucess) {
          // setModalData(res.sucess);
          // console.warn("item.updatedAt: " + String(item?.updatedAt).substring(0, 10));
          setModalData({ ...res.sucess, updatedAt: item?.updatedAt });
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

  const onSubmit = () => {
    if (
      (notifyOwnerName != undefined &&
        notifyOwnerName != null &&
        notifyOwnerName != "" &&
        notifiedBy != undefined &&
        notifiedBy != null &&
        notifiedBy != "" &&
        notifyOwner) ||
      notifyOwner == false
    ) {
      const new_obj = {
        ...setItem,
        ...{
          heldPurpose: heldForOthersVal
            ? heldForOthersVal
            : setItem?.heldPurpose,
          propertyForfiet: propertyForfietVal
            ? propertyForfietVal
            : setItem?.propertyForfiet,
          propertyForfietDetails: propertyForfietDetails
            ? propertyForfietDetails
            : "",
          notifyOwner: notifyOwner ? notifyOwner : "",
          notifyOwnerName: notifyOwnerName ? notifyOwnerName : "",
          notifyOwnerEmail: notifyOwnerEmail ? notifyOwnerEmail : "",
          notifyContact: notifyContact ? notifyContact : "",
          notifiedBy: notifiedBy ? notifiedBy : "",
        },
      };
      try {
        DispatchUserRequestUpdate(new_obj, async (res) => {
          if (res.sucess?.status == "failed") {
            errorAlert(res.sucess.message);
          } else {
            setModalUpdate(!modalUpdate);
            successAlert(res.sucess.message);
            window.location.reload(false);
          }
        });
      } catch (error) {
        errorAlert(error);
      }
    } else errorAlert("Please enter notify owner name/notified by!");
  };

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
                <Row className="flex-between">
                  <div className="flex-row">
                    <h3 className="mb-0">{config.allJobs}</h3>
                    {localAccessData == null ? (
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
                              ChangeStatusJob(true);
                            }}
                          >
                            LE - Yes
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => {
                              ChangeStatusJob(false);
                            }}
                          >
                            LE - No
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => {
                              ChangeStatusJob("Roadside Assistance");
                            }}
                          >
                            Roadside Assistance
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => {
                              ChangeStatusJob("Tow and Impound/Storage");
                            }}
                          >
                            Tow and Impound/Storage
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => {
                              ChangeStatusJob("Tow only");
                            }}
                          >
                            Tow only
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
                          <DropdownItem
                            onClick={() => {
                              ChangeStatusJob("ENRoute");
                            }}
                          >
                            ENRoute
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => {
                              ChangeStatusJob("ENRoute(D)");
                            }}
                          >
                            ENRoute(D)
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => {
                              ChangeStatusJob("Complete");
                            }}
                          >
                            Complete
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => {
                              ChangeStatusJob("Completely Cancelled");
                            }}
                          >
                            Completely Cancelled
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    ) : null}
                  </div>
                  <div onClick={getIndexData} className="btn btn-primary">
                    Refresh
                  </div>
                </Row>
              </CardHeader>

              {isLoader && (
                <div className="SpinnerClass">
                  <Spinner className="loader" children={true} />
                </div>
              )}
              {data.length > 0 ? (
                <Table className="align-items-center table-flush" responsive>
                  {localAccessData == null ? (
                    <>
                      <thead className="thead-light">
                        <tr>
                          <th scope="col" style={{ width: "10%" }}>
                            Job ID
                            <button
                              style={{
                                border: "unset",
                                marginLeft: 10,
                                fontSize: 15,
                              }}
                              onClick={() => {
                                onSortChange();
                              }}
                            >
                              <i
                                className={`fas fa-${sortTypes[currentSort].class}`}
                              />
                            </button>
                          </th>
                          <th scope="col">Location</th>
                          <th scope="col">Service status</th>
                          <th scope="col">Request Type</th>
                          <th scope="col">Entered By</th>
                          <th scope="col">LE</th>
                          {logData1.role != "POLICE_ADMIN" && (
                            <th scope="col">Assign Job</th>
                          )}
                          <th scope="col" />
                        </tr>
                      </thead>
                      <tbody>
                        {currentPosts.map((item) => {
                          return (
                            <tr key={item.id}>
                              <td
                                style={{
                                  textDecoration: "underline black",
                                  cursor: "pointer",
                                }}
                                className="text-sm"
                                // onClick={() => {
                                //   toggleUpdate(item);
                                // }}
                              >
                                <Link
                                  style={{
                                    textDecoration: "underline black",
                                    cursor: "pointer",
                                  }}
                                  className="text-sm"
                                  to={`/admin/jobdetail/${item.id}`}
                                >
                                  {item?.id}
                                </Link>
                              </td>
                              <td className="text-sm">
                                <Link
                                  style={{ whiteSpace: "pre-line" }}
                                  className="text-sm"
                                  to={`/admin/jobdetail/${item.id}`}
                                >
                                  {item?.towJobRequestLocation
                                    ? item?.towJobRequestLocation
                                    : "Nill"}
                                </Link>
                              </td>

                              <td className="text-sm">
                                <Link
                                  className="text-sm"
                                  to={`/admin/jobdetail/${item.id}`}
                                >
                                  {item?.status == "LE Request"
                                    ? "Pending"
                                    : item?.status}
                                </Link>
                              </td>

                              <td className="text-sm">
                                <Link
                                  className="text-sm"
                                  to={`/admin/jobdetail/${item.id}`}
                                >
                                  {item?.requestType}
                                </Link>
                              </td>

                              <td className="text-sm">
                                <Button
                                  onClick={() => {
                                    callUser(item);
                                  }}
                                  className="paddingCt"
                                  color="primary"
                                  type="button"
                                >
                                  View
                                </Button>
                              </td>
                              <td className="text-sm">
                                <Link
                                  className="text-sm"
                                  to={`/admin/jobdetail/${item.id}`}
                                >
                                  {item?.indicatePolice === true ? "Yes" : "No"}
                                </Link>
                              </td>
                              {logData1.role != "POLICE_ADMIN" && (
                                <>
                                  {
                                    // statusData == "Pending" ||
                                    // statusData == "LE Request" ||
                                    // item?.status == "Pending" ||
                                    // item?.status == "LE Request" ?
                                    item?.status === "Pending" ? (
                                      <td >
                                        <Button
                                          onClick={() => {
                                            AssignJob(item?.id);
                                          }}
                                          className="paddingLess"
                                          color="primary"
                                          type="button"
                                        >
                                          {config.assign}
                                        </Button>
                                      </td>
                                    ) : (
                                      <td>---</td>
                                    )
                                  }
                                </>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </>
                  ) : (
                    <div id="overlay">
                      <div id="text" style={{ top: "40%" }}>
                        Under Development Version 2
                      </div>
                    </div>
                  )}
                </Table>
              ) : (
                <div className="text-center">
                  {localAccessData == null ? (
                    <>{!isLoader && <h2>No Record Found</h2>}</>
                  ) : null}
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
          // style={{ maxWidth: "1600px", width: "80%" }}
          isOpen={modal}
          toggle={() => {
            toggle();
          }}
          // className={props.className}
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
                          <th scope="col">Location</th>
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
            <Maps lat={dataLatLng.lat} lng={dataLatLng.lon} data={"hide"} />
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
          style={{ maxWidth: "845px" }}
          isOpen={modalOpen}
          toggleModataData={() => {
            toggleModataData();
          }}
          className={props.className}
        >
          <ModalHeader>
            Entered By {modalData?.firstName} {modalData?.lastName}
          </ModalHeader>
          <ModalBody>
            <Table
              hover
              style={{ margin: "20px", width: "-webkit-fill-available" }}
            >
              {/* <thead>
                <tr>
                  <th>Job Id: {setItem?.id}</th>
                  <th>Update Job</th>
                </tr>
              </thead> */}
              <tbody>
                {modalData?.userName ? (
                  <tr>
                    <th scope="row">Email</th>
                    <td>{modalData?.userName}</td>
                  </tr>
                ) : null}
                {modalData?.firstName ? (
                  <tr>
                    <th scope="row">First Name</th>
                    <td>{modalData?.firstName}</td>
                  </tr>
                ) : null}
                {modalData?.lastName ? (
                  <tr>
                    <th scope="row">Last Name</th>
                    <td>{modalData?.lastName}</td>
                  </tr>
                ) : null}
                {modalData?.phone ? (
                  <tr>
                    <th scope="row">Phone Number</th>
                    <td>{modalData?.phone}</td>
                  </tr>
                ) : null}
                {modalData?.companyName ? (
                  <tr>
                    <th scope="row">Company Name</th>
                    <td>{modalData?.companyName}</td>
                  </tr>
                ) : null}
                {modalData?.updatedAt ? (
                  <tr>
                    <th scope="row">Modified Date</th>
                    <td>
                      {moment(
                        String(modalData?.updatedAt).replace("T", " ")
                      ).format("MMM DD, YYYY")}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </Table>
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
        <ViewImageModal
          modal={openViewImageModal}
          itemData={imageData}
          prefix={Constants.apiUrl}
        />
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
