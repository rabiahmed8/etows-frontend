import React, { useEffect, useState } from "react";

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Badge,
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
  Col,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import toast, { Toaster } from "react-hot-toast";
import classnames from "classnames";
import { useLocation } from "react-router-dom";
import UploadModal from "component/UploadModal";
import { UploadContractsApi } from "APIstore/apiCalls";
import { errorAlert } from "Theme/utils";
import { successAlert } from "Theme/utils";
import { UploadGetContractsApi } from "APIstore/apiCalls";
import { singleDeleteFile } from "APIstore/apiCalls";
import { getAssignCompany } from "APIstore/apiCalls";
import ViewImageModal from "component/ViewImageModal";

var logData1 = {};
var localAccessData = null;
function FleetDetail(props) {
  const [logInfo, setLogInfo] = useState("");
  const [key, setKey] = useState("home");
  const [activeTab, setactiveTab] = useState("1");
  const location = useLocation();
  const [openVOModal, setOpenVOModal] = useState(false);
  const [openTowLicModal, setOpenTowLicModal] = useState(false);
  const [openCVORModal, setOpenCVORModal] = useState(false);
  const [openAnnualSafteyModal, setOpenAnnualSafteyModal] = useState(false);
  const [openTruckOwnerModal, setOpenTruckOwnerModal] = useState(false);
  const [openInsuranceInfoModal, setOpenInsuranceInfoModal] = useState(false);
  const [openVehiclePicturesModal, setOpenVehiclePicturesModal] =
    useState(false);

  const [dataVehicle, setDataVehicle] = useState([]);
  const [dataVehiclePictures, setDataVehiclePictures] = useState([]);
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
  const [dataUpdateVehiclePictures, setDataUpdateVehiclePictures] = useState(
    []
  );
  const [isLoader, setIsLoader] = useState(false);
  const [dropdownVal, setDropdownVal] = useState("Select Company");
  const [companiesID, setCompId] = useState();
  const [dropdownData, setDropdownData] = useState([]);
  const [openViewImageModal, setViewImageModal] = useState(false);
  const [imageData, setDataImage] = useState();

  const setItem = location.state;
  console.log("item", setItem);

  const [deleteModal, setDeletToggle] = useState(false);
  const [fileData, setFileData] = useState("");
  const Deletetoggle = (item) => {
    setFileData(item);
    setDeletToggle(!deleteModal);
  };
  const deleteAPI = () => {
    setIsLoader(true);
    try {
      singleDeleteFile(fileData, async (res) => {
        console.log("adasdasd", res);
        if (res.sucess) {
          setDeletToggle(!deleteModal);
          if (activeTab == "2") {
            getDataFiles("VehicleOwnership");
          }
          if (activeTab == "3") {
            getDataFiles("TowLicence");
          }
          if (activeTab == "4") {
            getDataFiles("CVOR");
          }
          if (activeTab == "5") {
            getDataFiles("AnnualSafety");
          }
          if (activeTab == "6") {
            getDataFiles("TruckOwnership");
          }
          if (activeTab == "7") {
            getDataFiles("InsuranceInformation");
          }
          if (activeTab == "8") {
            getDataFiles("VehiclePictures");
          }

          setIsLoader(false);
          successAlert(res.sucess.messages[0].message);
        } else {
          errorAlert(res.sucess.messages[0].message);
          setIsLoader(false);
          setDeletToggle(!deleteModal);
        }
      });
    } catch (error) {
      errorAlert(error);
      setIsLoader(false);
      setDeletToggle(!deleteModal);
    }
  };
  const ChangeStatusJob = (item) => {
    setDropdownVal(item.corporateName);
    setCompId(item.id);
  };

  const toggleUpdateVehicleOwnership = (item) => {
    if (item) {
      setDataUpdateVehicle(item);
      setOpenVOModal(!openVOModal);
    }
  };
  const toggleUpdateTowLicence = (item) => {
    if (item) {
      setDataUpdateTowLic(item);
      setOpenTowLicModal(!openTowLicModal);
    }
  };
  const toggleUpdateCVOR = (item) => {
    if (item) {
      setDataUpdateCSOR(item);
      setOpenCVORModal(!openCVORModal);
    }
  };
  const toggleUpdateAnnualSafety = (item) => {
    if (item) {
      setDataUpdateAnnualSaftey(item);
      setOpenAnnualSafteyModal(!openAnnualSafteyModal);
    }
  };
  const toggleUpdateTruckOwnership = (item) => {
    if (item) {
      setDataUpdateTruckOwr(item);
      setOpenTruckOwnerModal(!openTruckOwnerModal);
    }
  };
  const toggleUpdateInsuranceInformation = (item) => {
    if (item) {
      setDataUpdateInsuranceInfo(item);
      setOpenInsuranceInfoModal(!openInsuranceInfoModal);
    }
  };
  const toggleUpdateVehiclePictures = (item) => {
    if (item) {
      setDataUpdateVehiclePictures(item);
      setOpenVehiclePicturesModal(!openVehiclePicturesModal);
    }
  };
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };
  const ViewImage = (item) => {
    setDataImage(item);
    setViewImageModal(!openViewImageModal);
  };
  const VehicleOwnershipCallback = (InvoiceData) => {
    setIsLoader(true);
    try {
      const formData = new FormData();
      if (InvoiceData) {
        for (let i = 0; i < InvoiceData.length; i++) {
          formData.append(`file`, InvoiceData[i].files);
          formData.append("type", InvoiceData[i].imageType);
          formData.append("subType", InvoiceData[i].imageType);
          formData.append("issueDate", InvoiceData[i].issueDate);
          formData.append("expiryDate", InvoiceData[i].expDate);
          formData.append(
            "comments",
            InvoiceData[i].comments ? InvoiceData[i].comments : ""
          );
        }
      }

      // formData.append('id', setItem.id);
      if (Object.keys(dataVehicleOwnership).length !== 0) {
        formData.append("id", dataVehicleOwnership.id);
      }
      formData.append("refId", setItem.id);
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      UploadContractsApi(formData, async (res) => {
        if (res.sucess) {
          console.log("UPP", res.sucess);
          await getDataFiles("VehicleOwnership");
          setIsLoader(false);
          successAlert(res.sucess.response.messages[0].message);
          setOpenVOModal(false);
          setDataUpdateVehicle([]);

          // setModalUpdate(!modalUpdate)
        } else {
          console.log("errrrr");
          setIsLoader(false);
          errorAlert(res.sucess.response.messages[0].message);
        }
      });
    } catch (error) {
      errorAlert(error);
      setIsLoader(false);
      console.log("error", error);
    }
  };
  const TowLicenceCallback = (ContractData) => {
    setIsLoader(true);
    try {
      const formData = new FormData();
      if (ContractData) {
        for (let i = 0; i < ContractData.length; i++) {
          formData.append(`file`, ContractData[i].files);
          formData.append("type", ContractData[i].imageType);
          formData.append("subType", ContractData[i].imageType);
          formData.append("issueDate", ContractData[i].issueDate);
          formData.append("expiryDate", ContractData[i].expDate);
          formData.append(
            "comments",
            ContractData[i].comments ? ContractData[i].comments : ""
          );
        }
      }
      if (Object.keys(dataUpdateTowLic).length !== 0) {
        formData.append("id", dataUpdateTowLic.id);
      }
      formData.append("refId", setItem.id);
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      UploadContractsApi(formData, async (res) => {
        if (res.sucess) {
          console.log("UPP", res.sucess);
          await getDataFiles("TowLicence");
          setIsLoader(false);
          successAlert(res.sucess.response.messages[0].message);
          setOpenTowLicModal(false);
          setDataUpdateTowLic([]);
        } else {
          console.log("errrrr");
          setIsLoader(false);
          errorAlert(res.sucess.response.messages[0].message);
        }
      });
    } catch (error) {
      console.log("error", error);
      setIsLoader(false);
      errorAlert(error);
    }
  };
  const CVORCallback = (feeAgrementData) => {
    setIsLoader(true);
    try {
      const formData = new FormData();

      if (feeAgrementData) {
        for (let i = 0; i < feeAgrementData.length; i++) {
          formData.append(`file`, feeAgrementData[i].files);
          formData.append("type", feeAgrementData[i].imageType);
          formData.append("subType", feeAgrementData[i].imageType);
          formData.append("issueDate", feeAgrementData[i].issueDate);
          formData.append("expiryDate", feeAgrementData[i].expDate);
          formData.append(
            "comments",
            feeAgrementData[i].comments ? feeAgrementData[i].comments : ""
          );
        }
      }
      if (Object.keys(dataUpdateCSOR).length !== 0) {
        formData.append("id", dataUpdateCSOR.id);
      }
      formData.append("refId", setItem.id);
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      UploadContractsApi(formData, async (res) => {
        if (res.sucess) {
          console.log("UPP", res.sucess);
          await getDataFiles("CVOR");
          setIsLoader(false);
          setOpenCVORModal(false);
          successAlert(res.sucess.response.messages[0].message);
          setDataUpdateCSOR([]);
        } else {
          console.log("errrrr");
          setIsLoader(false);
          errorAlert(res.sucess.response.messages[0].message);
        }
      });
    } catch (error) {
      console.log("error", error);
      setIsLoader(false);
      errorAlert(error);
    }
  };
  const AnnualSafetyCallback = (feeAgrementData) => {
    setIsLoader(true);
    try {
      const formData = new FormData();

      if (feeAgrementData) {
        for (let i = 0; i < feeAgrementData.length; i++) {
          formData.append(`file`, feeAgrementData[i].files);
          formData.append("type", feeAgrementData[i].imageType);
          formData.append("subType", feeAgrementData[i].imageType);
          formData.append("issueDate", feeAgrementData[i].issueDate);
          formData.append("expiryDate", feeAgrementData[i].expDate);
          formData.append(
            "comments",
            feeAgrementData[i].comments ? feeAgrementData[i].comments : ""
          );
        }
      }
      if (Object.keys(dataUpdateAnnualSaftey).length !== 0) {
        formData.append("id", dataUpdateAnnualSaftey.id);
      }
      formData.append("refId", setItem.id);
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      UploadContractsApi(formData, async (res) => {
        if (res.sucess) {
          console.log("UPP", res.sucess);
          await getDataFiles("AnnualSafety");
          setOpenAnnualSafteyModal(false);
          setIsLoader(false);
          successAlert(res.sucess.response.messages[0].message);
          setDataUpdateAnnualSaftey([]);

          // setModalUpdate(!modalUpdate)
        } else {
          console.log("errrrr");
          setIsLoader(false);
          errorAlert(res.sucess.response.messages[0].message);
        }
      });
    } catch (error) {
      console.log("error", error);
      setIsLoader(false);
      errorAlert(error);
    }
  };
  const TruckOwnershipCallback = (feeAgrementData) => {
    setIsLoader(true);
    try {
      const formData = new FormData();

      if (feeAgrementData) {
        for (let i = 0; i < feeAgrementData.length; i++) {
          formData.append(`file`, feeAgrementData[i].files);
          formData.append("type", feeAgrementData[i].imageType);
          formData.append("subType", feeAgrementData[i].imageType);
          formData.append("issueDate", feeAgrementData[i].issueDate);
          formData.append("expiryDate", feeAgrementData[i].expDate);
          formData.append(
            "comments",
            feeAgrementData[i].comments ? feeAgrementData[i].comments : ""
          );
        }
      }
      if (Object.keys(dataUpdateTruckOwr).length !== 0) {
        formData.append("id", dataUpdateTruckOwr.id);
      }
      formData.append("refId", setItem.id);
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      UploadContractsApi(formData, async (res) => {
        if (res.sucess) {
          console.log("UPP", res.sucess);
          await getDataFiles("TruckOwnership");
          setOpenTruckOwnerModal(false);
          setIsLoader(false);
          successAlert(res.sucess.response.messages[0].message);
          setDataUpdateTruckOwr([]);
          // setModalUpdate(!modalUpdate)
        } else {
          console.log("errrrr");
          setIsLoader(false);
          errorAlert(res.sucess.response.messages[0].message);
        }
      });
    } catch (error) {
      console.log("error", error);
      setIsLoader(false);
      errorAlert(error);
    }
  };
  const InsuranceInformationCallback = (feeAgrementData) => {
    setIsLoader(true);
    try {
      const formData = new FormData();

      if (feeAgrementData) {
        for (let i = 0; i < feeAgrementData.length; i++) {
          formData.append(`file`, feeAgrementData[i].files);
          formData.append("type", feeAgrementData[i].imageType);
          formData.append("subType", feeAgrementData[i].imageType);
          formData.append("issueDate", feeAgrementData[i].issueDate);
          formData.append("expiryDate", feeAgrementData[i].expDate);
          formData.append(
            "comments",
            feeAgrementData[i].comments ? feeAgrementData[i].comments : ""
          );
        }
      }
      if (Object.keys(dataUpdateInsuranceInfo).length !== 0) {
        formData.append("id", dataUpdateInsuranceInfo.id);
      }
      formData.append("refId", setItem.id);
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      UploadContractsApi(formData, async (res) => {
        if (res.sucess) {
          console.log("UPP", res.sucess);
          await getDataFiles("InsuranceInformation");
          setOpenInsuranceInfoModal(false);
          setIsLoader(false);
          successAlert(res.sucess.response.messages[0].message);
          setDataUpdateInsuranceInfo([]);
          // setModalUpdate(!modalUpdate)
        } else {
          console.log("errrrr");
          setIsLoader(false);
          errorAlert(res.sucess.response.messages[0].message);
        }
      });
    } catch (error) {
      console.log("error", error);
      setIsLoader(false);
      errorAlert(error);
    }
  };
  const VehiclePicturesCallback = (feeAgrementData) => {
    setIsLoader(true);
    try {
      const formData = new FormData();

      if (feeAgrementData) {
        for (let i = 0; i < feeAgrementData.length; i++) {
          formData.append(`file`, feeAgrementData[i].files);
          formData.append("type", feeAgrementData[i].imageType);
          formData.append("subType", feeAgrementData[i].imageType);
          formData.append("issueDate", feeAgrementData[i].issueDate);
          formData.append("expiryDate", feeAgrementData[i].expDate);
          formData.append(
            "comments",
            feeAgrementData[i].comments ? feeAgrementData[i].comments : ""
          );
        }
      }
      if (Object.keys(dataUpdateVehiclePictures).length !== 0) {
        formData.append("id", dataUpdateVehiclePictures.id);
      }
      formData.append("refId", setItem.id);
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      UploadContractsApi(formData, async (res) => {
        if (res.sucess) {
          console.log("UPP", res.sucess);
          await getDataFiles("VehiclePictures");
          setOpenVehiclePicturesModal(false);
          setIsLoader(false);
          successAlert(res.sucess.response.messages[0].message);
          setDataUpdateVehiclePictures([]);
          // setModalUpdate(!modalUpdate)
        } else {
          console.log("errrrr");
          setIsLoader(false);
          errorAlert(res.sucess.response.messages[0].message);
        }
      });
    } catch (error) {
      console.log("error", error);
      setIsLoader(false);
      errorAlert(error);
    }
  };
  const getDataFiles = (type) => {
    setIsLoader(true);
    let obj;
    if (localAccessData == null) {
      obj = {
        id: setItem.id,
        subType: type,
        type: type,
        comId: setItem?.companyId,
      };
    } else {
      obj = {
        id: logData1.role == "POLICE_ADMIN" ? setItem?.id : logData1?.companyId,
        subType: type,
        type: type,
        comId:
          logData1.role == "POLICE_ADMIN" ? setItem?.id : logData1?.companyId,
      };
    }

    setCompId(
      logData1.role == "POLICE_ADMIN" ? setItem?.companyId : logData1?.companyId
    );

    try {
      UploadGetContractsApi(obj, async (res) => {
        if (res.sucess) {
          if (type == "VehicleOwnership") {
            setDataVehicle(res.sucess.list);
            setIsLoader(false);
            return;
          }
          if (type == "TowLicence") {
            setDataTowLic(res.sucess.list);
            setIsLoader(false);
            return;
          }
          if (type == "CVOR") {
            setDataCSOR(res.sucess.list);
            setIsLoader(false);
            return;
          }
          if (type == "AnnualSafety") {
            setDataAnnualSaftey(res.sucess.list);
            setIsLoader(false);
            return;
          }
          if (type == "TruckOwnership") {
            setDataTruckOwr(res.sucess.list);
            setIsLoader(false);
            return;
          }
          if (type == "InsuranceInformation") {
            setDataInsuranceInfo(res.sucess.list);
            setIsLoader(false);
            return;
          }
          if (type == "VehiclePictures") {
            setDataVehiclePictures(res.sucess.list);
            setIsLoader(false);
            return;
          }
        } else {
          console.log("errrrr");
          setIsLoader(false);
        }
      });
    } catch (error) {
      console.log("error", error);
      setIsLoader(false);
    }
    try {
      getAssignCompany(logData1?.companyId, async (res) => {
        if (res.sucess) {
          console.log("res.sucess.listres.sucess.list", res.sucess.list);
          setDropdownData(res.sucess.list);
        }
        // else
        //     errorAlert('Companies not added')
      });
    } catch (error) {
      successAlert(error);
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
    setLogInfo(logData);
    setLogInfo((state) => {
      logData1 = state;
    });
  };
  useEffect(() => {
    getLoggedData();
    if (activeTab == "2") {
      getDataFiles("VehicleOwnership");
    }
    if (activeTab == "3") {
      getDataFiles("TowLicence");
    }
    if (activeTab == "4") {
      getDataFiles("CVOR");
    }
    if (activeTab == "5") {
      getDataFiles("AnnualSafety");
    }
    if (activeTab == "6") {
      getDataFiles("TruckOwnership");
    }
    if (activeTab == "7") {
      getDataFiles("InsuranceInformation");
    }
    if (activeTab == "8") {
      getDataFiles("VehiclePictures");
    }
  }, [activeTab]);
  return (
    <>
      {/* {activeTab === '1' && ()} */}
      <div className="header pb-4 pt-5 pt-md-8" style={{ background: "green" }}>
        <Container fluid>
          <div className="header-body">
            <span
              style={{
                position: "absolute",
                top: 35,
                fontSize: 16,
                fontWeight: 600,
                color: "#fff",
              }}
            >
              {setItem?.corporateName}
            </span>
          </div>
        </Container>
      </div>
      <div>
        <Nav tabs className="nav--links" style={{}}>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              Fleet Information
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
            >
              Vehicle Ownership
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => {
                toggle("3");
              }}
            >
              Tow Licence
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "4" })}
              onClick={() => {
                toggle("4");
              }}
            >
              CVOR
            </NavLink>
          </NavItem>
        </Nav>
        <Nav tabs className="nav--links" style={{}}>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "5" })}
              onClick={() => {
                toggle("5");
              }}
            >
              Annual Safety Inspections
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "6" })}
              onClick={() => {
                toggle("6");
              }}
            >
              Truck Ownership Info
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "7" })}
              onClick={() => {
                toggle("7");
              }}
            >
              Insurance Information
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "8" })}
              onClick={() => {
                toggle("8");
              }}
            >
              Vehicle Pictures
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row className="dflex-class">
              <Col sm="11">
                {/* <div style={{ display: "flex", flexDirection: "column" }}>
                  {setItem?.id ? (
                    <div className="listUi">
                      <span className="text-sm listUiItem">
                        Fleet Vehicle ID
                      </span>
                      <span className="text-sm">{setItem?.id}</span>
                    </div>
                  ) : null}
                  {setItem?.companyId ? (
                    <div className="listUi">
                      <span className="text-sm listUiItem">Tow Company ID</span>
                      <span className="text-sm">{setItem?.companyId}</span>
                    </div>
                  ) : null}
                  {setItem?.name ? (
                    <div className="listUi">
                      <span className="text-sm listUiItem">Name</span>
                      <span className="text-sm">{setItem?.name}</span>
                    </div>
                  ) : null}
                  {setItem?.type ? (
                    <div className="listUi">
                      <span className="text-sm listUiItem">Type</span>
                      <span className="text-sm">
                        {setItem?.type === "fleet" ? "Fleet" : setItem?.type}
                      </span>
                    </div>
                  ) : null}
                  {setItem?.description ? (
                    <div className="listUi">
                      <span className="text-sm listUiItem">Description</span>
                      <span className="text-sm">{setItem?.description}</span>
                    </div>
                  ) : null}
                </div> */}
                <div className="table-flex " style={{ width: "625px" }}>
                  <div className="table-card">
                    <Table borderless hover>
                      <tbody>
                        <tr>
                          <th scope="row"> Fleet Vehicle ID</th>
                          <td>{setItem?.id}</td>
                        </tr>

                        <tr>
                          <th scope="row">Tow Company ID</th>
                          <td>{setItem?.companyId}</td>
                        </tr>
                        <tr>
                          <th scope="row">Name</th>
                          <td>{setItem?.name}</td>
                        </tr>
                        <tr>
                          <th scope="row">Type</th>
                          <td>
                            {" "}
                            {setItem?.type === "fleet"
                              ? "Fleet"
                              : setItem?.type}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Description</th>
                          <td>{setItem?.description}</td>
                        </tr>
                        <tr>
                          <th scope="row">Fleet Type</th>
                          <td>{setItem?.fleetTypeName}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
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
                      {logData1.role != "POLICE_ADMIN" && (
                        <Button
                          style={{ position: "absolute", right: 20, top: -12 }}
                          onClick={() => {
                            setDataUpdateVehicle([]);
                            setOpenVOModal(!openVOModal);
                          }}
                          className="my-4 p-btm"
                          color="primary"
                          type="button"
                        >
                          Add New
                        </Button>
                      )}
                    </Row>
                  </CardHeader>
                  {isLoader ? (
                    <div className="SpinnerClass">
                      <Spinner className="loader" children={true} />
                    </div>
                  ) : (
                    <Table
                      className="align-items-center table-flush"
                      responsive
                    >
                      {dataVehicle?.length > 0 ? (
                        <>
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Name</th>
                              <th scope="col">File</th>
                              <th scope="col">Comments</th>
                              <th scope="col">Issued Date</th>
                              <th scope="col">Expiry /Renewal Date</th>
                              <th scope="col" />
                            </tr>
                          </thead>

                          <tbody>
                            {dataVehicle.map((item) => {
                              return (
                                <tr>
                                  <td className="text-sm">{item?.id}</td>
                                  <td className="text-sm">
                                    {item.name.length > 20
                                      ? `${item.name.substring(0, 20)}...`
                                      : item.name}
                                  </td>
                                  <td className="text-sm">
                                    <Button
                                      onClick={() => {
                                        ViewImage(item);
                                      }}
                                      className="my-4 p-btm"
                                      color="primary"
                                      type="button"
                                    >
                                      View
                                    </Button>
                                  </td>

                                  <td className="text-sm">{item?.comments}</td>
                                  <td className="text-sm">{item?.issueDate}</td>
                                  <td className="text-sm">
                                    {item?.expiryDate}
                                  </td>
                                  <td className="text-right">
                                    {logData1.role != "POLICE_ADMIN" && (
                                      <UncontrolledDropdown>
                                        <DropdownToggle
                                          className="btn-icon-only text-light"
                                          href="#pablo"
                                          role="button"
                                          size="sm"
                                          color=""
                                          onClick={(e) => e.preventDefault()}
                                        >
                                          <i className="fas fa-ellipsis-v" />
                                        </DropdownToggle>
                                        <DropdownMenu
                                          className="dropdown-menu-arrow"
                                          right
                                        >
                                          <DropdownItem
                                            onClick={() => {
                                              toggleUpdateVehicleOwnership(
                                                item
                                              );
                                            }}
                                          >
                                            Update
                                          </DropdownItem>
                                          <DropdownItem
                                            onClick={() => {
                                              Deletetoggle(item);
                                            }}
                                          >
                                            Delete
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </UncontrolledDropdown>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </>
                      ) : (
                        <div className="text-center">
                          <h3>No Record Found</h3>
                        </div>
                      )}
                    </Table>
                  )}
                  <CardFooter className="py-4">
                    <nav aria-label="...">
                      <Pagination
                        className="pagination justify-content-end mb-0"
                        listClassName="justify-content-end mb-0"
                      >
                        <PaginationItem className="disabled">
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            tabIndex="-1"
                          >
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem className="active">
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            2 <span className="sr-only">(current)</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            3
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
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
                      {logData1.role != "POLICE_ADMIN" && (
                        <Button
                          style={{ position: "absolute", right: 20, top: -12 }}
                          onClick={() => {
                            setDataUpdateTowLic([]);
                            setOpenTowLicModal(!openTowLicModal);
                          }}
                          className="my-4 p-btm"
                          color="primary"
                          type="button"
                        >
                          Add New
                        </Button>
                      )}
                    </Row>
                  </CardHeader>
                  {isLoader ? (
                    <div className="SpinnerClass">
                      <Spinner className="loader" children={true} />
                    </div>
                  ) : (
                    <Table
                      className="align-items-center table-flush"
                      responsive
                    >
                      {dataTowLic?.length > 0 ? (
                        <>
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Name</th>
                              <th scope="col">File</th>
                              <th scope="col">Comments</th>
                              <th scope="col">Issued Date</th>
                              <th scope="col">Expiry /Renewal Date</th>
                              <th scope="col" />
                            </tr>
                          </thead>

                          <tbody>
                            {dataTowLic.map((item) => {
                              return (
                                <tr>
                                  <td className="text-sm">{item?.id}</td>
                                  <td className="text-sm">
                                    {item.name.length > 20
                                      ? `${item.name.substring(0, 20)}...`
                                      : item.name}
                                  </td>
                                  <td className="text-sm">
                                    <Button
                                      onClick={() => {
                                        ViewImage(item);
                                      }}
                                      className="my-4 p-btm"
                                      color="primary"
                                      type="button"
                                    >
                                      View
                                    </Button>
                                  </td>

                                  <td className="text-sm">{item?.comments}</td>
                                  <td className="text-sm">{item?.issueDate}</td>
                                  <td className="text-sm">
                                    {item?.expiryDate}
                                  </td>
                                  <td className="text-right">
                                    {logData1.role != "POLICE_ADMIN" && (
                                      <UncontrolledDropdown>
                                        <DropdownToggle
                                          className="btn-icon-only text-light"
                                          href="#pablo"
                                          role="button"
                                          size="sm"
                                          color=""
                                          onClick={(e) => e.preventDefault()}
                                        >
                                          <i className="fas fa-ellipsis-v" />
                                        </DropdownToggle>
                                        <DropdownMenu
                                          className="dropdown-menu-arrow"
                                          right
                                        >
                                          <DropdownItem
                                            onClick={() => {
                                              toggleUpdateTowLicence(item);
                                            }}
                                          >
                                            Update
                                          </DropdownItem>
                                          <DropdownItem
                                            onClick={() => {
                                              Deletetoggle(item);
                                            }}
                                          >
                                            Delete
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </UncontrolledDropdown>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </>
                      ) : (
                        <div className="text-center">
                          <h3>No Record Found</h3>
                        </div>
                      )}
                    </Table>
                  )}
                  <CardFooter className="py-4">
                    <nav aria-label="...">
                      <Pagination
                        className="pagination justify-content-end mb-0"
                        listClassName="justify-content-end mb-0"
                      >
                        <PaginationItem className="disabled">
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            tabIndex="-1"
                          >
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem className="active">
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            2 <span className="sr-only">(current)</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            3
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
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
                      {logData1.role != "POLICE_ADMIN" && (
                        <Button
                          style={{ position: "absolute", right: 20, top: -12 }}
                          onClick={() => {
                            setDataUpdateCSOR([]);
                            setOpenCVORModal(!openCVORModal);
                          }}
                          className="my-4 p-btm"
                          color="primary"
                          type="button"
                        >
                          Add New
                        </Button>
                      )}
                    </Row>
                  </CardHeader>
                  {isLoader ? (
                    <div className="SpinnerClass">
                      <Spinner className="loader" children={true} />
                    </div>
                  ) : (
                    <Table
                      className="align-items-center table-flush"
                      responsive
                    >
                      {dataCSOR?.length > 0 ? (
                        <>
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Name</th>
                              <th scope="col">File</th>
                              <th scope="col">Comments</th>
                              <th scope="col">Issued Date</th>
                              <th scope="col">Expiry /Renewal Date</th>
                              <th scope="col" />
                            </tr>
                          </thead>

                          <tbody>
                            {dataCSOR.map((item) => {
                              return (
                                <tr>
                                  <td className="text-sm">{item?.id}</td>
                                  <td className="text-sm">
                                    {item.name.length > 20
                                      ? `${item.name.substring(0, 20)}...`
                                      : item.name}
                                  </td>
                                  <td className="text-sm">
                                    <Button
                                      onClick={() => {
                                        ViewImage(item);
                                      }}
                                      className="my-4 p-btm"
                                      color="primary"
                                      type="button"
                                    >
                                      View
                                    </Button>
                                  </td>

                                  <td className="text-sm">{item?.comments}</td>
                                  <td className="text-sm">{item?.issueDate}</td>
                                  <td className="text-sm">
                                    {item?.expiryDate}
                                  </td>
                                  <td className="text-right">
                                    {logData1.role != "POLICE_ADMIN" && (
                                      <UncontrolledDropdown>
                                        <DropdownToggle
                                          className="btn-icon-only text-light"
                                          href="#pablo"
                                          role="button"
                                          size="sm"
                                          color=""
                                          onClick={(e) => e.preventDefault()}
                                        >
                                          <i className="fas fa-ellipsis-v" />
                                        </DropdownToggle>
                                        <DropdownMenu
                                          className="dropdown-menu-arrow"
                                          right
                                        >
                                          {/* <DropdownItem

                              onClick={() => { toggleUpdate() }}
                            >
                              Add
                            </DropdownItem> */}
                                          <DropdownItem
                                            onClick={() => {
                                              toggleUpdateCVOR(item);
                                            }}
                                          >
                                            Update
                                          </DropdownItem>
                                          <DropdownItem
                                            onClick={() => {
                                              Deletetoggle(item);
                                            }}
                                          >
                                            Delete
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </UncontrolledDropdown>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </>
                      ) : (
                        <div className="text-center">
                          <h3>No Record Found</h3>
                        </div>
                      )}
                    </Table>
                  )}
                  <CardFooter className="py-4">
                    <nav aria-label="...">
                      <Pagination
                        className="pagination justify-content-end mb-0"
                        listClassName="justify-content-end mb-0"
                      >
                        <PaginationItem className="disabled">
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            tabIndex="-1"
                          >
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem className="active">
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            2 <span className="sr-only">(current)</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            3
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
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
                      <h3 className="mb-0">Annual Safety Inspections</h3>

                      {logData1.role != "POLICE_ADMIN" && (
                        <Button
                          style={{ position: "absolute", right: 20, top: -12 }}
                          onClick={() => {
                            setDataUpdateAnnualSaftey([]);
                            setOpenAnnualSafteyModal(!openAnnualSafteyModal);
                          }}
                          className="my-4 p-btm"
                          color="primary"
                          type="button"
                        >
                          Add New
                        </Button>
                      )}
                    </Row>
                  </CardHeader>
                  {isLoader ? (
                    <div className="SpinnerClass">
                      <Spinner className="loader" children={true} />
                    </div>
                  ) : (
                    <Table
                      className="align-items-center table-flush"
                      responsive
                    >
                      {dataAnnualSaftey?.length > 0 ? (
                        <>
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Name</th>
                              <th scope="col">File</th>
                              <th scope="col">Comments</th>
                              <th scope="col">Issued Date</th>
                              <th scope="col">Expiry Date</th>
                              <th scope="col" />
                            </tr>
                          </thead>

                          <tbody>
                            {dataAnnualSaftey.map((item) => {
                              return (
                                <tr>
                                  <td className="text-sm">{item?.id}</td>
                                  <td className="text-sm">
                                    {item.name.length > 20
                                      ? `${item.name.substring(0, 20)}...`
                                      : item.name}
                                  </td>
                                  <td className="text-sm">
                                    <Button
                                      onClick={() => {
                                        ViewImage(item);
                                      }}
                                      className="my-4 p-btm"
                                      color="primary"
                                      type="button"
                                    >
                                      View
                                    </Button>
                                  </td>

                                  <td className="text-sm">{item?.comments}</td>
                                  <td className="text-sm">{item?.issueDate}</td>
                                  <td className="text-sm">
                                    {item?.expiryDate}
                                  </td>
                                  <td className="text-right">
                                    {logData1.role != "POLICE_ADMIN" && (
                                      <UncontrolledDropdown>
                                        <DropdownToggle
                                          className="btn-icon-only text-light"
                                          href="#pablo"
                                          role="button"
                                          size="sm"
                                          color=""
                                          onClick={(e) => e.preventDefault()}
                                        >
                                          <i className="fas fa-ellipsis-v" />
                                        </DropdownToggle>
                                        <DropdownMenu
                                          className="dropdown-menu-arrow"
                                          right
                                        >
                                          <DropdownItem
                                            onClick={() => {
                                              toggleUpdateAnnualSafety(item);
                                            }}
                                          >
                                            Update
                                          </DropdownItem>
                                          <DropdownItem
                                            onClick={() => {
                                              Deletetoggle(item);
                                            }}
                                          >
                                            Delete
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </UncontrolledDropdown>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </>
                      ) : (
                        <div className="text-center">
                          <h3>No Record Found</h3>
                        </div>
                      )}
                    </Table>
                  )}
                  <CardFooter className="py-4">
                    <nav aria-label="...">
                      <Pagination
                        className="pagination justify-content-end mb-0"
                        listClassName="justify-content-end mb-0"
                      >
                        <PaginationItem className="disabled">
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            tabIndex="-1"
                          >
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem className="active">
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            2 <span className="sr-only">(current)</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            3
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
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
                      <h3 className="mb-0">Truck Ownership Info </h3>
                      {logData1.role != "POLICE_ADMIN" && (
                        <Button
                          style={{ position: "absolute", right: 20, top: -12 }}
                          onClick={() => {
                            setDataUpdateTruckOwr([]);
                            setOpenTruckOwnerModal(!openTruckOwnerModal);
                          }}
                          className="my-4 p-btm"
                          color="primary"
                          type="button"
                        >
                          Add New
                        </Button>
                      )}
                    </Row>
                  </CardHeader>
                  {isLoader ? (
                    <div className="SpinnerClass">
                      <Spinner className="loader" children={true} />
                    </div>
                  ) : (
                    <Table
                      className="align-items-center table-flush"
                      responsive
                    >
                      {dataTruckOwr?.length > 0 ? (
                        <>
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Name</th>
                              <th scope="col">File</th>
                              <th scope="col">Comments</th>
                              <th scope="col">Issued Date</th>
                              <th scope="col">Expiry Date</th>
                              <th scope="col" />
                            </tr>
                          </thead>

                          <tbody>
                            {dataTruckOwr.map((item) => {
                              return (
                                <tr>
                                  <td className="text-sm">{item?.id}</td>
                                  <td className="text-sm">
                                    {item.name.length > 20
                                      ? `${item.name.substring(0, 20)}...`
                                      : item.name}
                                  </td>
                                  <td className="text-sm">
                                    <Button
                                      onClick={() => {
                                        ViewImage(item);
                                      }}
                                      className="my-4 p-btm"
                                      color="primary"
                                      type="button"
                                    >
                                      View
                                    </Button>
                                  </td>

                                  <td className="text-sm">{item?.comments}</td>
                                  <td className="text-sm">{item?.issueDate}</td>
                                  <td className="text-sm">
                                    {item?.expiryDate}
                                  </td>
                                  <td className="text-right">
                                    {logData1.role != "POLICE_ADMIN" && (
                                      <UncontrolledDropdown>
                                        <DropdownToggle
                                          className="btn-icon-only text-light"
                                          href="#pablo"
                                          role="button"
                                          size="sm"
                                          color=""
                                          onClick={(e) => e.preventDefault()}
                                        >
                                          <i className="fas fa-ellipsis-v" />
                                        </DropdownToggle>
                                        <DropdownMenu
                                          className="dropdown-menu-arrow"
                                          right
                                        >
                                          <DropdownItem
                                            onClick={() => {
                                              toggleUpdateTruckOwnership(item);
                                            }}
                                          >
                                            Update
                                          </DropdownItem>
                                          <DropdownItem
                                            onClick={() => {
                                              Deletetoggle(item);
                                            }}
                                          >
                                            Delete
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </UncontrolledDropdown>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </>
                      ) : (
                        <div className="text-center">
                          <h3>No Record Found</h3>
                        </div>
                      )}
                    </Table>
                  )}
                  <CardFooter className="py-4">
                    <nav aria-label="...">
                      <Pagination
                        className="pagination justify-content-end mb-0"
                        listClassName="justify-content-end mb-0"
                      >
                        <PaginationItem className="disabled">
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            tabIndex="-1"
                          >
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem className="active">
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            2 <span className="sr-only">(current)</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            3
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
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
                      {logData1.role != "POLICE_ADMIN" && (
                        <Button
                          style={{ position: "absolute", right: 20, top: -12 }}
                          onClick={() => {
                            setDataUpdateInsuranceInfo([]);
                            setOpenInsuranceInfoModal(!openInsuranceInfoModal);
                          }}
                          className="my-4 p-btm"
                          color="primary"
                          type="button"
                        >
                          Add New
                        </Button>
                      )}
                    </Row>
                  </CardHeader>
                  {isLoader ? (
                    <div className="SpinnerClass">
                      <Spinner className="loader" children={true} />
                    </div>
                  ) : (
                    <Table
                      className="align-items-center table-flush"
                      responsive
                    >
                      {dataInsuranceInfo?.length > 0 ? (
                        <>
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Name</th>
                              <th scope="col">File</th>
                              <th scope="col">Comments</th>
                              <th scope="col">Issued Date</th>
                              <th scope="col">Expiry Date</th>
                              <th scope="col" />
                            </tr>
                          </thead>

                          <tbody>
                            {dataInsuranceInfo.map((item) => {
                              return (
                                <tr>
                                  <td className="text-sm">{item?.id}</td>
                                  <td className="text-sm">
                                    {item.name.length > 20
                                      ? `${item.name.substring(0, 20)}...`
                                      : item.name}
                                  </td>
                                  <td className="text-sm">
                                    <Button
                                      onClick={() => {
                                        ViewImage(item);
                                      }}
                                      className="my-4 p-btm"
                                      color="primary"
                                      type="button"
                                    >
                                      View
                                    </Button>
                                  </td>

                                  <td className="text-sm">{item?.comments}</td>
                                  <td className="text-sm">{item?.issueDate}</td>
                                  <td className="text-sm">
                                    {item?.expiryDate}
                                  </td>
                                  <td className="text-right">
                                    {logData1.role != "POLICE_ADMIN" && (
                                      <UncontrolledDropdown>
                                        <DropdownToggle
                                          className="btn-icon-only text-light"
                                          href="#pablo"
                                          role="button"
                                          size="sm"
                                          color=""
                                          onClick={(e) => e.preventDefault()}
                                        >
                                          <i className="fas fa-ellipsis-v" />
                                        </DropdownToggle>
                                        <DropdownMenu
                                          className="dropdown-menu-arrow"
                                          right
                                        >
                                          <DropdownItem
                                            onClick={() => {
                                              toggleUpdateInsuranceInformation(
                                                item
                                              );
                                            }}
                                          >
                                            Update
                                          </DropdownItem>
                                          <DropdownItem
                                            onClick={() => {
                                              Deletetoggle(item);
                                            }}
                                          >
                                            Delete
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </UncontrolledDropdown>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </>
                      ) : (
                        <div className="text-center">
                          <h3>No Record Found</h3>
                        </div>
                      )}
                    </Table>
                  )}
                  <CardFooter className="py-4">
                    <nav aria-label="...">
                      <Pagination
                        className="pagination justify-content-end mb-0"
                        listClassName="justify-content-end mb-0"
                      >
                        <PaginationItem className="disabled">
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            tabIndex="-1"
                          >
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem className="active">
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            2 <span className="sr-only">(current)</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            3
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
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
          <TabPane tabId="8">
            <Row className="row1">
              <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <Row>
                      <h3 className="mb-0">Vehicle Pictures</h3>
                      {logData1.role != "POLICE_ADMIN" && (
                        <Button
                          style={{ position: "absolute", right: 20, top: -12 }}
                          onClick={() => {
                            setDataUpdateVehiclePictures([]);
                            setOpenVehiclePicturesModal(
                              !openVehiclePicturesModal
                            );
                          }}
                          className="my-4 p-btm"
                          color="primary"
                          type="button"
                        >
                          Add New
                        </Button>
                      )}
                    </Row>
                  </CardHeader>
                  {isLoader ? (
                    <div className="SpinnerClass">
                      <Spinner className="loader" children={true} />
                    </div>
                  ) : (
                    <Table
                      className="align-items-center table-flush"
                      responsive
                    >
                      {dataVehiclePictures?.length > 0 ? (
                        <>
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">ID</th>
                              <th scope="col">Name</th>
                              <th scope="col">File</th>
                              <th scope="col">Comments</th>
                              <th scope="col">Issued Date</th>
                              <th scope="col">Expiry Date</th>
                              <th scope="col" />
                            </tr>
                          </thead>

                          <tbody>
                            {dataVehiclePictures.map((item) => {
                              return (
                                <tr>
                                  <td className="text-sm">{item?.id}</td>
                                  <td className="text-sm">
                                    {item.name.length > 20
                                      ? `${item.name.substring(0, 20)}...`
                                      : item.name}
                                  </td>
                                  <td className="text-sm">
                                    <Button
                                      onClick={() => {
                                        ViewImage(item);
                                      }}
                                      className="my-4 p-btm"
                                      color="primary"
                                      type="button"
                                    >
                                      View
                                    </Button>
                                  </td>

                                  <td className="text-sm">{item?.comments}</td>
                                  <td className="text-sm">{item?.issueDate}</td>
                                  <td className="text-sm">
                                    {item?.expiryDate}
                                  </td>
                                  <td className="text-right">
                                    {logData1.role != "POLICE_ADMIN" && (
                                      <UncontrolledDropdown>
                                        <DropdownToggle
                                          className="btn-icon-only text-light"
                                          href="#pablo"
                                          role="button"
                                          size="sm"
                                          color=""
                                          onClick={(e) => e.preventDefault()}
                                        >
                                          <i className="fas fa-ellipsis-v" />
                                        </DropdownToggle>
                                        <DropdownMenu
                                          className="dropdown-menu-arrow"
                                          right
                                        >
                                          <DropdownItem
                                            onClick={() => {
                                              toggleUpdateVehiclePictures(item);
                                            }}
                                          >
                                            Update
                                          </DropdownItem>
                                          <DropdownItem
                                            onClick={() => {
                                              Deletetoggle(item);
                                            }}
                                          >
                                            Delete
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </UncontrolledDropdown>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </>
                      ) : (
                        <div className="text-center">
                          <h3>No Record Found</h3>
                        </div>
                      )}
                    </Table>
                  )}
                  <CardFooter className="py-4">
                    <nav aria-label="...">
                      <Pagination
                        className="pagination justify-content-end mb-0"
                        listClassName="justify-content-end mb-0"
                      >
                        <PaginationItem className="disabled">
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            tabIndex="-1"
                          >
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem className="active">
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            2 <span className="sr-only">(current)</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            3
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
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

        <Modal
          isOpen={deleteModal}
          toggle={() => {
            Deletetoggle();
          }}
          className={props.className}
        >
          <ModalHeader
            toggle={() => {
              Deletetoggle();
            }}
          >
            Delete
          </ModalHeader>
          <ModalBody>Are you sure want to delete?</ModalBody>
          <ModalFooter>
            <Button
              className="my-4 p-btm"
              color="primary"
              onClick={() => {
                deleteAPI();
              }}
            >
              Yes
            </Button>{" "}
            <Button
              className="my-4 s-btm"
              color="secondary"
              onClick={() => {
                Deletetoggle();
              }}
            >
              No
            </Button>
          </ModalFooter>
        </Modal>
        <UploadModal
          modal={openVOModal}
          data={dataVehicleOwnership}
          title="Vehicle Ownership"
          parentCallback={VehicleOwnershipCallback}
        />
        <UploadModal
          modal={openTowLicModal}
          data={dataUpdateTowLic}
          title="Tow Licence"
          parentCallback={TowLicenceCallback}
        />
        <UploadModal
          modal={openCVORModal}
          data={dataUpdateCSOR}
          title="CVOR"
          parentCallback={CVORCallback}
        />
        <UploadModal
          modal={openAnnualSafteyModal}
          data={dataUpdateAnnualSaftey}
          title="Annual Safety"
          parentCallback={AnnualSafetyCallback}
        />
        <UploadModal
          modal={openTruckOwnerModal}
          data={dataUpdateTruckOwr}
          title="Truck Ownership"
          parentCallback={TruckOwnershipCallback}
        />
        <UploadModal
          modal={openInsuranceInfoModal}
          data={dataUpdateInsuranceInfo}
          title="Insurance Information"
          parentCallback={InsuranceInformationCallback}
        />
        <UploadModal
          modal={openVehiclePicturesModal}
          data={dataUpdateVehiclePictures}
          title="Vehicle Pictures"
          parentCallback={VehiclePicturesCallback}
        />
        <ViewImageModal
          modal={openViewImageModal}
          itemData={imageData}
          companyId={companiesID}
        />
      </div>
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

export default FleetDetail;
