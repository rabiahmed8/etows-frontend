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
} from "../../APIstore/apiCalls";
import config from "config";
import Maps from "./Maps";
import moment from "moment";
import { successAlert, errorAlert, emailValidator } from "../../Theme/utils";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";
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
  const toggleUpdate = (item) => {
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
      getLocationDriver(driverId ? driverId : "", async (res) => {
        if (res.sucess) {
          console.log("res.sucess.userLocations", res.sucess?.userLocations);
          setDataLatLng(res.sucess?.userLocations[0]);
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
            let result = res.sucess.filter(
              (el) =>
                (el.status == "LE Request" ? "Pending" : el.status) ===
                statusData
            );
            setData(result);
            setInitialData(res.sucess);
            setCurrentPage(1);
            setIsLoader(false);
          } else {
            console.log("errrrr");
            setIsLoader(false);
          }
        }
      );

      // setData([
      //   {
      //     id: 538,
      //     userId: "dec8674d-c3f8-4179-9dc2-e1993a16d8cb",
      //     indicatePolice: true,
      //     isMandatory: false,
      //     isOccurrenceNumbers: true,
      //     isOfficerInCharge: false,
      //     towJobRequestLocation: "starting location datafield test",
      //     questionAsked: null,
      //     startingMileage: 1235,
      //     endingMileage: 1236,
      //     equipmentList: [],
      //     equipmentListStr: "",
      //     onSceneInitialImages: [],
      //     onSceneFinalImages: [],
      //     policeOfficers: [],
      //     towTruckPersons: [],
      //     isOtherVehicle: false,
      //     loading: false,
      //     mandatoryDate: "2023-12-12",
      //     occurrenceNumbers: "additional occ #'s datafield",
      //     officerInCharge: "oic name datafield",
      //     officerInChargeBadge: "oic badge number datafield",
      //     otherVehicle: null,
      //     policeOccurrence: "2023-LE occ datafield",
      //     policeService: "York Regional Police",
      //     officerBadge: "badge # datafield",
      //     officerDepart: "assignment datafield",
      //     officerName: "Officer name datafield",
      //     otherCompany:
      //       "other number datafield test from info entered in Android app",
      //     officerContact: "officer phone number datafield",
      //     licensePlateNumber: "AXJZ639",
      //     specialInstructions: "",
      //     otherContact: "Test other contact info datafield",
      //     reasonForImpound: "CCC VIP Minimum 45 Days",
      //     reasonForTow: "Impaired Driving",
      //     releaseStatus: "Can be Released after Mandatory Seizure/Hold Period",
      //     requestType: "Tow and Impound/Storage",
      //     requestStatus: "Pending",
      //     roadService: "",
      //     step: "538",
      //     sent: true,
      //     towOrImpoundDate: "2023-12-12",
      //     vehicleType: "Light Tow/Duty tilt and load tow truck.",
      //     vehicle: "Car",
      //     vin: "19uua66285a804804",
      //     vinBasicData: {
      //       doors: 4,
      //       driveType: "FWD",
      //       trim: "",
      //       year: 2005,
      //       oemDoors: 4,
      //       rearAxle: "",
      //       bodyType: "Sedan",
      //       vehicleType: "Car",
      //       model: "TL",
      //       oemBodyStyle: "Sedan",
      //       make: "Acura",
      //       bodySubtype: "",
      //       response: null,
      //     },
      //     jurisdiction: null,
      //     status: "Complete",
      //     requestlongitude: null,
      //     requestlatitude: null,
      //     vehicleOrProperty: "Vehicle",
      //     property: "",
      //     specialTask: "Liquid/Oil Clean Up Required",
      //     specialComments: "Test absorbent ",
      //     comments: "test datafield from Android app ",
      //     startingLocation: "starting location datafield test",
      //     finishingLocation: "ending location datafield test",
      //     startDate: "2023-12-12T14:44:26.25",
      //     endDate: "2024-01-26T19:44:00",
      //     isRelease: false,
      //     registeredOwnerNotified: false,
      //     registeredOwnerComments: null,
      //     finalComments: null,
      //     heldPurpose:
      //       "Criminal Proceedings – Homicide, Fatal Collision, Major Project, etc",
      //     propertyForfiet: "Forfeiture datafield test",
      //     propertyForfietDetails: "",
      //     notifyOwner: null,
      //     notifyOwnerName: null,
      //     notifyOwnerEmail: null,
      //     notifyContact: null,
      //     notifiedBy: null,
      //     isSpecialInstructions: false,
      //     isSelfGenerated: false,
      //     driverName: "Driver First Name Surname",
      //     driverMobile: "driver phone number",
      //     driverAddress: "Driver address datafield",
      //     driverEmail: "driver email datafield",
      //     ownerName: "Vehicle Owner First name Surname",
      //     ownerMobile: "Vehicle owner phone number datafield",
      //     ownerAddress: "12 Springwood Ct, Barrie, ON L4N 5V1, Canada",
      //     ownerEmail: "Vehicle Owner email datafield",
      //     lienName: "Test Lien Hold First Name Last Name",
      //     lienMobile: "123-456-7890 Ext Lien Holder",
      //     lienAddress: "1lien holder way address datafield",
      //     lienEmail: "lienholder@email.com",
      //     companyId: 49,
      //     testStatus: null,
      //     userUrl:
      //       "https://stage-api.etows.app:8443/user/userinfo?userId=dec8674d-c3f8-4179-9dc2-e1993a16d8cb",
      //     createdAt: "2023-12-12T15:02:05.722021",
      //     updatedAt: "2023-12-12T15:51:56.362609",
      //     response: null,
      //   },
      // ]);
      // setInitialData([
      //   {
      //     id: 538,
      //     userId: "dec8674d-c3f8-4179-9dc2-e1993a16d8cb",
      //     indicatePolice: true,
      //     isMandatory: false,
      //     isOccurrenceNumbers: true,
      //     isOfficerInCharge: false,
      //     towJobRequestLocation: "starting location datafield test",
      //     questionAsked: null,
      //     startingMileage: 1235,
      //     endingMileage: 1236,
      //     equipmentList: [],
      //     equipmentListStr: "",
      //     onSceneInitialImages: [],
      //     onSceneFinalImages: [],
      //     policeOfficers: [],
      //     towTruckPersons: [],
      //     isOtherVehicle: false,
      //     loading: false,
      //     mandatoryDate: "2023-12-12",
      //     occurrenceNumbers: "additional occ #'s datafield",
      //     officerInCharge: "oic name datafield",
      //     officerInChargeBadge: "oic badge number datafield",
      //     otherVehicle: null,
      //     policeOccurrence: "2023-LE occ datafield",
      //     policeService: "York Regional Police",
      //     officerBadge: "badge # datafield",
      //     officerDepart: "assignment datafield",
      //     officerName: "Officer name datafield",
      //     otherCompany:
      //       "other number datafield test from info entered in Android app",
      //     officerContact: "officer phone number datafield",
      //     licensePlateNumber: "AXJZ639",
      //     specialInstructions: "",
      //     otherContact: "Test other contact info datafield",
      //     reasonForImpound: "CCC VIP Minimum 45 Days",
      //     reasonForTow: "Impaired Driving",
      //     releaseStatus: "Can be Released after Mandatory Seizure/Hold Period",
      //     requestType: "Tow and Impound/Storage",
      //     requestStatus: "Pending",
      //     roadService: "",
      //     step: "538",
      //     sent: true,
      //     towOrImpoundDate: "2023-12-12",
      //     vehicleType: "Light Tow/Duty tilt and load tow truck.",
      //     vehicle: "Car",
      //     vin: "19uua66285a804804",
      //     vinBasicData: {
      //       doors: 4,
      //       driveType: "FWD",
      //       trim: "",
      //       year: 2005,
      //       oemDoors: 4,
      //       rearAxle: "",
      //       bodyType: "Sedan",
      //       vehicleType: "Car",
      //       model: "TL",
      //       oemBodyStyle: "Sedan",
      //       make: "Acura",
      //       bodySubtype: "",
      //       response: null,
      //     },
      //     jurisdiction: null,
      //     status: "Complete",
      //     requestlongitude: null,
      //     requestlatitude: null,
      //     vehicleOrProperty: "Vehicle",
      //     property: "",
      //     specialTask: "Liquid/Oil Clean Up Required",
      //     specialComments: "Test absorbent ",
      //     comments: "test datafield from Android app ",
      //     startingLocation: "starting location datafield test",
      //     finishingLocation: "ending location datafield test",
      //     startDate: "2023-12-12T14:44:26.25",
      //     endDate: "2024-01-26T19:44:00",
      //     isRelease: false,
      //     registeredOwnerNotified: false,
      //     registeredOwnerComments: null,
      //     finalComments: null,
      //     heldPurpose:
      //       "Criminal Proceedings – Homicide, Fatal Collision, Major Project, etc",
      //     propertyForfiet: "Forfeiture datafield test",
      //     propertyForfietDetails: "",
      //     notifyOwner: null,
      //     notifyOwnerName: null,
      //     notifyOwnerEmail: null,
      //     notifyContact: null,
      //     notifiedBy: null,
      //     isSpecialInstructions: false,
      //     isSelfGenerated: false,
      //     driverName: "Driver First Name Surname",
      //     driverMobile: "driver phone number",
      //     driverAddress: "Driver address datafield",
      //     driverEmail: "driver email datafield",
      //     ownerName: "Vehicle Owner First name Surname",
      //     ownerMobile: "Vehicle owner phone number datafield",
      //     ownerAddress: "12 Springwood Ct, Barrie, ON L4N 5V1, Canada",
      //     ownerEmail: "Vehicle Owner email datafield",
      //     lienName: "Test Lien Hold First Name Last Name",
      //     lienMobile: "123-456-7890 Ext Lien Holder",
      //     lienAddress: "1lien holder way address datafield",
      //     lienEmail: "lienholder@email.com",
      //     companyId: 49,
      //     testStatus: null,
      //     userUrl:
      //       "https://stage-api.etows.app:8443/user/userinfo?userId=dec8674d-c3f8-4179-9dc2-e1993a16d8cb",
      //     createdAt: "2023-12-12T15:02:05.722021",
      //     updatedAt: "2023-12-12T15:51:56.362609",
      //     response: null,
      //   },
      // ]);
      // setCurrentPage(1);
      // setIsLoader(false);
    } catch (error) {
      console.log("error", error);
      setIsLoader(false);
    }
  };
  const requestTypeFunc = (status) => {
    setIsLoader(true);
    let result = initialData.filter((el) => el.requestType === status);
    setData(result);
    setCurrentPage(1);
    setIsLoader(false);
  };
  const LEFilter = (status) => {
    setIsLoader(true);
    let result = initialData.filter((el) => el.indicatePolice === status);
    setData(result);
    setCurrentPage(1);
    setIsLoader(false);
  };

  const ChangeStatusJob = (status) => {
    setIsLoader(true);
    if (status) {
      let result = initialData.filter(
        (el) => (el.status == "LE Request" ? "Pending" : el.status) === status
      );
      setData(result);
    } else if (status == "") {
      setData(initialData);
    }
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
                              LEFilter(true);
                            }}
                          >
                            LE - Yes
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => {
                              LEFilter(false);
                            }}
                          >
                            LE - No
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => {
                              requestTypeFunc("Roadside Assistance");
                            }}
                          >
                            Roadside Assistance
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => {
                              requestTypeFunc("Tow and Impound/Storage");
                            }}
                          >
                            Tow and Impound/Storage
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => {
                              requestTypeFunc("Tow only");
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
                            <tr>
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
                              <td
                                onClick={() => {
                                  toggleUpdate(item);
                                }}
                                className="text-sm"
                                style={{ whiteSpace: "pre-line" }}
                              >
                                {item?.towJobRequestLocation
                                  ? item?.towJobRequestLocation
                                  : "Nill"}
                              </td>

                              <td
                                onClick={() => {
                                  toggleUpdate(item);
                                }}
                                className="text-sm"
                              >
                                {item?.status == "LE Request"
                                  ? "Pending"
                                  : item?.status}
                              </td>
                              <td
                                onClick={() => {
                                  toggleUpdate(item);
                                }}
                                className="text-sm"
                              >
                                {item?.requestType}
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
                              <td
                                onClick={() => {
                                  toggleUpdate(item);
                                }}
                                className="text-sm"
                              >
                                {item?.indicatePolice === true ? "Yes" : "No"}
                              </td>
                              {logData1.role != "POLICE_ADMIN" && (
                                <>
                                  {
                                  // statusData == "Pending" ||
                                  // statusData == "LE Request" ||
                                  // item?.status == "Pending" ||
                                  // item?.status == "LE Request" ?
                                  item?.status === "Pending" ?
                                  (
                                    <td>
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
                                  )}
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
          style={{ maxWidth: "1600px" }}
          isOpen={modalUpdate}
          fullscreen
          toggleUpdate={() => {
            toggleUpdate();
          }}
          className={props.className}
        >
          <ModalHeader className="md-header">
            <div style={{ display: "flex", placeContent: "end" }}>
              {" "}
              <AiFillCloseCircle
                size={25}
                onClick={() => {
                  setModalUpdate(!modalUpdate);
                }}
              />
            </div>
          </ModalHeader>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Table hover style={{ margin: "20px" }}>
              <thead>
                <tr>
                  <th>Job Id: {setItem?.id}</th>
                  <th>Update Job</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Company Id:</th>
                  <td>{setItem?.companyId}</td>
                </tr>
                <tr>
                  <th scope="row">Other Number:</th>
                  <td>{setItem?.otherCompany}</td>
                </tr>
                <tr>
                  <th scope="row">UserId:</th>
                  <td>{setItem?.userId}</td>
                </tr>
                <tr>
                  <th scope="row">Licence Plate Number:</th>
                  <td>{setItem?.licensePlateNumber}</td>
                </tr>
                <tr>
                  <th scope="row">Service Request Date:</th>
                  <td>
                    {moment(setItem?.towOrImpoundDate).format("MMMM Do YYYY")}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Item Type {setItem?.vehicleOrProperty}:</th>
                  <td>
                    {" "}
                    {setItem?.vehicleOrProperty == "Vehicle"
                      ? setItem?.vehicle
                      : setItem?.property}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Tow Vehicle Required:</th>
                  <td>{setItem?.vehicleType}</td>
                </tr>
                <tr>
                  <th scope="row">Tow Truck Persons:</th>
                  <td>{setItem?.towTruckPersons}</td>
                </tr>
                <tr>
                  <th scope="row">Other Vehicle</th>
                  <td>{setItem?.otherVehicle}</td>
                </tr>
                <tr>
                  <th scope="row">OnScene Initial Images: </th>
                  <td>
                    {" "}
                    <ul>
                      {vehiclePicture.map((image) => {
                        return (
                          <li>
                            <a
                              onClick={() => {
                                ViewImage(image);
                              }}
                              target="_blank"
                              style={{ cursor: "pointer" }}
                            >
                              {image?.name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th scope="row">OnScene Final Images: </th>
                  <td>
                    {" "}
                    <ul>
                      {inventoryAndDamagePicture.map((image) => {
                        return (
                          <li>
                            <a
                              onClick={() => {
                                ViewImage(image);
                              }}
                              target="_blank"
                              style={{ cursor: "pointer" }}
                            >
                              {image?.name}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Service Request Location:</th>
                  <td>{setItem?.towJobRequestLocation}</td>
                </tr>
                <tr>
                  <th scope="row">Other Contact Info</th>
                  <td>{setItem?.otherContact}</td>
                </tr>
                <tr>
                  <th scope="row">Is Special Task</th>
                  <td>{setItem?.isSpecialInstructions ? "Yes" : "No"}</td>
                </tr>
                <tr>
                  <th scope="row">Special Task</th>
                  <td>{setItem?.specialTask}</td>
                </tr>
                <tr>
                  <th scope="row">Special Comments</th>
                  <td>{setItem?.specialComments}</td>
                </tr>
                <tr>
                  <th scope="row">Is LE:</th>
                  <td>{setItem?.indicatePolice ? "Yes" : "No"}</td>
                </tr>
                {setItem?.indicatePolice && (
                  <>
                    <tr>
                      <th scope="row">LE Tow (Police/ Bylaw):</th>
                      <td>{setItem?.policeService}</td>
                    </tr>
                    <tr>
                      <th scope="row">LE Agency Occ. #:</th>
                      <td>{setItem?.policeOccurrence}</td>
                    </tr>
                    <tr>
                      <th scope="row">Officer Badge #:</th>
                      <td>{setItem?.officerBadge}</td>
                    </tr>
                    <tr>
                      <th scope="row">Officer Assignment:</th>
                      <td>{setItem?.officerDepart}</td>
                    </tr>
                    <tr>
                      <th scope="row">Officer Name:</th>
                      <td>{setItem?.officerName}</td>
                    </tr>
                    <tr>
                      <th scope="row">Officer Contact</th>
                      <td>{setItem?.officerContact}</td>
                    </tr>
                    <tr>
                      <th scope="row">Is Officer Incharge:</th>
                      <td>
                        {setItem?.isOfficerInCharge &&
                        (setItem?.isOfficerInCharge == true ||
                          setItem?.isOfficerInCharge == "true")
                          ? "Yes"
                          : "No"}
                      </td>
                    </tr>
                    {setItem?.isOfficerInCharge && (
                      <>
                        <tr>
                          <th scope="row">Officer In Charge Badge#:</th>
                          <td>{setItem?.officerInChargeBadge}</td>
                        </tr>
                        <tr>
                          <th scope="row">Officer In Charge:</th>
                          <td>{setItem?.officerInCharge}</td>
                        </tr>
                      </>
                    )}
                    <tr>
                      <th scope="row">Is Occurrence Numbers:</th>
                      <td>
                        {setItem?.isOccurrenceNumbers &&
                        (setItem?.isOccurrenceNumbers == true ||
                          setItem?.isOccurrenceNumbers == "true")
                          ? "Yes"
                          : "No"}
                      </td>
                    </tr>
                    {setItem?.isOccurrenceNumbers && (
                      <tr>
                        <th scope="row">Occurrence Numbers</th>
                        <td>{setItem?.occurrenceNumbers}</td>
                      </tr>
                    )}
                    <tr>
                      <th scope="row">Confirm LE Tow Reciept: </th>
                      <td>
                        {" "}
                        {receiptPicture.map((image) => {
                          return (
                            <li>
                              <a
                                onClick={() => {
                                  ViewImage(image);
                                }}
                                target="_blank"
                                style={{ cursor: "pointer" }}
                              >
                                {image?.name}
                              </a>
                            </li>
                          );
                        })}
                      </td>
                    </tr>
                  </>
                )}
                {!setItem?.indicatePolice && (
                  <>
                    <tr>
                      <th scope="row">Client Name:</th>
                      <td>{setItem?.officerName}</td>
                    </tr>
                    <tr>
                      <th scope="row">Client Contact</th>
                      <td>{setItem?.officerContact}</td>
                    </tr>
                  </>
                )}
                <tr>
                  <th scope="row">VIN Number:</th>
                  <td>{setItem?.vin}</td>
                </tr>
                <tr>
                  <th scope="row">Year:</th>
                  <td>{setItem.vinBasicData?.year}</td>
                </tr>
                <tr>
                  <th scope="row">Make:</th>
                  <td>{setItem.vinBasicData?.make}</td>
                </tr>
                <tr>
                  <th scope="row">Model:</th>
                  <td>{setItem.vinBasicData?.model}</td>
                </tr>
                <tr>
                  <th scope="row">Body Style:</th>
                  <td>{setItem.vinBasicData?.oemBodyStyle}</td>
                </tr>
                <tr>
                  <th scope="row">Vehicle Type:</th>
                  <td>{setItem.vinBasicData?.vehicleType}</td>
                </tr>
                <tr>
                  <th scope="row">Body Type:</th>
                  <td>{setItem.vinBasicData?.bodyType}</td>
                </tr>
                <tr>
                  <th scope="row">Driver Type:</th>
                  <td>{setItem.vinBasicData?.driveType}</td>
                </tr>
                <tr>
                  <th scope="row">Doors:</th>
                  <td>{setItem.vinBasicData?.doors}</td>
                </tr>
              </tbody>
            </Table>
            <Table hover style={{ margin: "20px" }}>
              <thead>
                <tr>
                  <th>Job Id: {setItem?.id}</th>
                  <th>Update Job</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Starting Mileage:</th>
                  <td>{setItem?.startingMileage}</td>
                </tr>
                <tr>
                  <th scope="row">Ending Mileage:</th>
                  <td>{setItem?.endingMileage}</td>
                </tr>
                <tr>
                  <th scope="row">Equipment List:</th>
                  <td>{setItem?.equipmentListStr}</td>
                </tr>
                <tr>
                  <th scope="row">Starting Location:</th>
                  <td>{setItem?.startingLocation}</td>
                </tr>
                <tr>
                  <th scope="row">Finishing Location:</th>
                  <td>{setItem?.finishingLocation}</td>
                </tr>
                <tr>
                  <th scope="row">Final Comments:</th>
                  <td>{setItem?.finalComments}</td>
                </tr>
                <tr>
                  <th scope="row">Release Status</th>
                  <td>{setItem?.releaseStatus}</td>
                </tr>
                {setItem?.requestType == "Tow and Impound/Storage" && (
                  <>
                    <tr>
                      <th scope="row">Is Release:</th>
                      <td>{setItem?.isRelease ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                      <th scope="row">Start Date:</th>
                      <td>{setItem?.startDate}</td>
                    </tr>
                    {setItem?.releaseStatus == "Cannot be Released" ? (
                      <tr>
                        <th scope="row">End Date:</th>
                        <td>-</td>
                      </tr>
                    ) : (
                      <tr>
                        <th scope="row">End Date:</th>
                        <td>{setItem?.startDate}</td>{" "}
                        {/*end date krni hai shayed*/}
                      </tr>
                    )}
                  </>
                )}
                <tr>
                  <th scope="row">Jurisdiction:</th>
                  <td>{setItem?.jurisdiction}</td>
                </tr>
                <tr>
                  <th scope="row">Mandatory Date:</th>
                  <td>{setItem?.mandatoryDate}</td>
                </tr>
                <tr>
                  <th scope="row">Comments:</th>
                  <td>{setItem?.comments}</td>
                </tr>
                <tr>
                  <th scope="row">Owner Name:</th>
                  <td>{setItem?.ownerName}</td>
                </tr>
                <tr>
                  <th scope="row">Owner Mobile:</th>
                  <td>{setItem?.ownerMobile}</td>
                </tr>
                <tr>
                  <th scope="row">Owner Address:</th>
                  <td>{setItem?.ownerAddress}</td>
                </tr>
                <tr>
                  <th scope="row">Owner Email:</th>
                  <td>{setItem?.ownerEmail}</td>
                </tr>
                <tr>
                  <th scope="row">Lien Name:</th>
                  <td>{setItem?.lienName}</td>
                </tr>
                <tr>
                  <th scope="row">Lien Mobile:</th>
                  <td>{setItem?.lienMobile}</td>
                </tr>
                <tr>
                  <th scope="row">Lien Address:</th>
                  <td>{setItem?.lienAddress}</td>
                </tr>
                <tr>
                  <th scope="row">Lien Email:</th>
                  <td>{setItem?.lienEmail}</td>
                </tr>
                <tr>
                  <th scope="row">Driver Name</th>
                  <td>{setItem?.driverName}</td>
                </tr>
                <tr>
                  <th scope="row">Driver Mobile</th>
                  <td>{setItem?.driverMobile}</td>
                </tr>
                <tr>
                  <th scope="row">Driver Address</th>
                  <td>{setItem?.driverAddress}</td>
                </tr>
                <tr>
                  <th scope="row">Driver Email</th>
                  <td>{setItem?.driverEmail}</td>
                </tr>
                {setItem?.requestType == "Tow and Impound/Storage" && (
                  <tr>
                    <th scope="row">Reason For Impound</th>
                    <td>{setItem?.reasonForImpound}</td>
                  </tr>
                )}
                {(setItem?.requestType == "Tow and Impound/Storage" ||
                  setItem?.requestType == "Tow only") && (
                  <tr>
                    <th scope="row">Reason For Tow</th>
                    <td>{setItem?.reasonForTow}</td>
                  </tr>
                )}
                <tr>
                  <th scope="row">Request Type</th>
                  <td>{setItem?.requestType}</td>
                </tr>
                <tr>
                  <th scope="row">Service Status</th>
                  <td>
                    {setItem?.status == "LE Request"
                      ? "Pending"
                      : setItem?.status}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Registered Owner Notified</th>
                  <td>{setItem?.registeredOwnerNotified ? "Yes" : "No"}</td>
                </tr>
                {setItem?.registeredOwnerNotified && (
                  <tr>
                    <th scope="row">{setItem?.registeredOwnerComments}</th>
                    <td>{setItem?.registeredOwnerComments}</td>
                  </tr>
                )}
                {setItem?.requestType == "Roadside Assistance" && (
                  <tr>
                    <th scope="row">Road Service</th>
                    <td>{setItem?.roadService}</td>
                  </tr>
                )}
                <tr>
                  <th scope="row">Held Purpose:</th>
                  <td>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <Label for="exampleSelect">{heldForOthersVal}</Label>
                          <Select
                            name="form-field-name"
                            // onChange={(val) => { setReasonforTow(val.label) }}
                            onChange={(val) => {
                              setHeldForOthers(val.label);
                              if (
                                val.label == "Other" ||
                                val.label == "Other - Manual Entry"
                              ) {
                                setShowHeldForOthers(true);
                              } else {
                                setShowHeldForOthers(false);
                              }
                            }}
                            labelKey="name"
                            options={renderList(dataDropdown?.heldPurposeList)}
                          />
                        </FormGroup>
                        {showheldForOthers === true && (
                          <Col lg="12">
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Other
                              </Label>
                              <Input
                                className="form-control-alternative"
                                // defaultValue={data?.userName}
                                id="input-username"
                                placeholder="Other"
                                type="text"
                                onChange={(text) =>
                                  setHeldForOthers(text.target.value)
                                }
                              />
                            </FormGroup>
                          </Col>
                        )}
                      </Col>
                    </Row>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Property Forfiet:</th>
                  <td>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <Label for="exampleSelect">
                            {propertyForfietVal}
                          </Label>
                          <Select
                            name="form-field-name"
                            onChange={(val) => {
                              setPropertyForfiet(val.label);
                              if (
                                val.label == "Other" ||
                                val.label == "Other - Manual Entry"
                              ) {
                                setShowPropertyForfiet(true);
                              } else {
                                setShowPropertyForfiet(false);
                              }
                            }}
                            labelKey="name"
                            options={renderList(
                              dataDropdown?.propertyForfietList
                            )}
                          />
                        </FormGroup>

                        {showPropertyForfiet === true && (
                          <FormGroup>
                            <Label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Other
                            </Label>
                            <Input
                              className="form-control-alternative"
                              // defaultValue={data?.userName}
                              id="input-username"
                              placeholder="Other"
                              type="text"
                              onChange={(text) =>
                                setPropertyForfiet(text.target.value)
                              }
                            />
                          </FormGroup>
                        )}
                      </Col>
                    </Row>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Notified Owner details </th>
                  <td>
                    <Row>
                      <Col lg="12">
                        <FormGroup check>
                          <Input
                            id="checkbox2"
                            className="checkq"
                            type="checkbox"
                            checked={notifyOwner}
                            onChange={(e) => {
                              const { checked } = e.target;
                              setNotifyOwner(checked);
                            }}
                          />
                          {"  "} Notify Owner?
                        </FormGroup>
                        {notifyOwner && (
                          <>
                            <FormGroup style={{ marginTop: 10 }}>
                              <Label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Notify Owner Name
                              </Label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={notifyOwnerName}
                                id="input-username"
                                placeholder="i.e. forfiet details"
                                type="text"
                                onChange={(text) =>
                                  setNotifyOwnerName(text.target.value)
                                }
                              />
                            </FormGroup>
                            <FormGroup style={{ marginTop: 10 }}>
                              <Label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Notify Owner Email
                              </Label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={notifyOwnerEmail}
                                id="input-username"
                                placeholder="i.e. forfiet details"
                                type="text"
                                onChange={(text) =>
                                  setNotifyOwnerEmail(text.target.value)
                                }
                              />
                            </FormGroup>

                            <FormGroup style={{ marginTop: 10 }}>
                              <Label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Notify Owner Contact
                              </Label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={notifyContact}
                                id="input-username"
                                placeholder="i.e. forfiet details"
                                type="text"
                                onChange={(text) =>
                                  setNotifyContact(text.target.value)
                                }
                              />
                            </FormGroup>

                            <FormGroup style={{ marginTop: 10 }}>
                              <Label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Notified by
                              </Label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={notifiedBy}
                                id="input-username"
                                placeholder="i.e. forfiet details"
                                type="text"
                                onChange={(text) =>
                                  setNotifiedBy(text.target.value)
                                }
                              />
                            </FormGroup>
                          </>
                        )}
                      </Col>
                    </Row>
                  </td>
                </tr>
                <tr>
                  <th scope="row">asd</th>
                  <td>Larry</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <ModalFooter>
            <ModalFooter>
              <Button
                onClick={() => {
                  onSubmit();
                }}
                className="my-4"
                color="primary"
                type="button"
              >
                Update Job
              </Button>
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
