import React, { useEffect, useState } from "react";

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import classnames from "classnames";
import { useLocation } from "react-router-dom";
import UploadModal from "component/UploadModal";
import { UploadContractsApi } from "APIstore/apiCalls";
import { UploadGetContractsApi } from "APIstore/apiCalls";
import { successAlert } from "Theme/utils";
import { errorAlert } from "Theme/utils";
import { singleDeleteFile } from "APIstore/apiCalls";
import { getAssignCompany } from "APIstore/apiCalls";
import ViewImageModal from "component/ViewImageModal";
// export default class CorpDetail extends React.Component {
var logData1 = {};
function CorpDetail(props) {
  const [key, setKey] = useState("home");
  const [activeTab, setactiveTab] = useState("6");
  const location = useLocation();
  const [openCDIModal, setOpenCDIModal] = useState(false);
  const [openCGLIModal, setOpenCGLIModal] = useState(false);
  const [openALIModal, setOpenALIModal] = useState(false);
  const [openGLIModal, setOpenGLIModal] = useState(false);
  const [openWSIBModal, setOpenWSIBModal] = useState(false);
  const [openOwnershipDeclarationModal, setOwnershipDeclarationModal] =
    useState(false);
  const [openIncorporationDocumentsModal, setIncorporationDocumentsModal] =
    useState(false);
  const [openOwnerinfoModal, setOwnerinfoModal] = useState(false);
  const [openViewImageModal, setViewImageModal] = useState(false);
  const [imageData, setDataImage] = useState();
  const [data, setData] = useState([]);
  const [deleteModal, setDeletToggle] = useState(false);
  const [dataOD, setDataOD] = useState([]);
  const [dataID, setDataID] = useState([]);
  const [dataOI, setDataOI] = useState([]);
  const [dataCGLI, setDataCGLI] = useState([]);
  const [dataALI, setDataALI] = useState([]);
  const [dataGLI, setDataGLI] = useState([]);
  const [dataWSIB, setDataWSIB] = useState([]);
  const [companyId, setCompanyId] = useState("");
  const [dataODUpdate, setDataODUpdate] = useState([]);
  const [dataIDUpdate, setDataIDUpdate] = useState([]);
  const [dataOIUpdate, setDataOIUpdate] = useState([]);
  const [dataCGLIUpdate, setDataCGLIUpdate] = useState([]);
  const [dataALIUpdate, setDataALIUpdate] = useState([]);
  const [dataGLIUpdate, setDataGLIUpdate] = useState([]);
  const [dataWSIBUpdate, setDataWSIBUpdate] = useState([]);
  const [fileData, setFileData] = useState("");
  const [logInfo, setLogInfo] = useState("");
  const [dropdownVal, setDropdownVal] = useState("Select Company");
  const [companiesID, setCompId] = useState();
  const [dropdownData, setDropdownData] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const setItem = location.state;

  const Deletetoggle = (item) => {
    setFileData(item);
    setDeletToggle(!deleteModal);
  };
  const deleteAPI = () => {
    setIsLoader(true);
    try {
      singleDeleteFile(fileData, async (res) => {
        if (res.sucess) {
          setDeletToggle(!deleteModal);
          if (activeTab == "6") {
            getDataFiles("OwnershipDeclaration");
          }
          if (activeTab == "7") {
            getDataFiles("IncorporationDocuments");
          }
          if (activeTab == "8") {
            getDataFiles("Ownerinfo");
          }
          if (activeTab == "5") {
            getDataFiles("WSIB");
          }
          if (activeTab == "4") {
            getDataFiles("GarageLiablitlyInsurance");
          }
          if (activeTab == "3") {
            getDataFiles("AutomobileLiabilityInsurance");
          }
          if (activeTab == "2") {
            getDataFiles("CommercialGeneralLiabilityInsurance");
          }

          successAlert(res.sucess.messages[0].message);
          setIsLoader(false);
        } else {
          errorAlert(res.sucess.messages[0].message);
          setDeletToggle(!deleteModal);
          setIsLoader(false);
        }
      });
    } catch (error) {
      errorAlert(error);
      setIsLoader(false);
      setDeletToggle(!deleteModal);
    }
  };
  useEffect(() => {
    getLoggedData();
    if (activeTab == "6") {
      getDataFiles("OwnershipDeclaration");
    }
    if (activeTab == "7") {
      getDataFiles("IncorporationDocuments");
    }
    if (activeTab == "8") {
      getDataFiles("Ownerinfo");
    }
    if (activeTab == "5") {
      getDataFiles("WSIB");
    }
    if (activeTab == "4") {
      getDataFiles("GarageLiablitlyInsurance");
    }
    if (activeTab == "3") {
      getDataFiles("AutomobileLiabilityInsurance");
    }
    if (activeTab == "2") {
      getDataFiles("CommercialGeneralLiabilityInsurance");
    }
  }, [activeTab, companiesID]);

  const getLoggedData = async () => {
    let logData;
    const storedData = await localStorage.getItem("accessData");
    if (storedData) {
      const getdata = await localStorage.getItem("accessData");
      logData = JSON.parse(getdata);
    } else {
      const getdata = await localStorage.getItem("loggedData");
      logData = JSON.parse(getdata);
    }

    setLogInfo(logData);
    setLogInfo((state) => {
      logData1 = state;
    });

    try {
      getAssignCompany(logData1?.companyId, async (res) => {
        if (res.sucess) {
          console.log("res.sucess.listres.sucess.list", res.sucess.list);
          setDropdownData(res.sucess.list);
        }
      });
    } catch (error) {
      successAlert(error);
    }
  };

  const getDataFiles = (type) => {
    var userDetails;
    const storedData = localStorage.getItem("accessData");
    if (storedData) {
      const getdata = localStorage.getItem("accessData");
      userDetails = JSON.parse(getdata);
    } else {
      const getdata = localStorage.getItem("loggedData");
      userDetails = JSON.parse(getdata);
    }

    setCompanyId(
      userDetails.role == "POLICE_ADMIN" ? setItem?.id : userDetails?.companyId
    );

    const obj = {
      id:
        userDetails.role == "POLICE_ADMIN"
          ? setItem?.id
          : userDetails?.companyId,
      subType: type,
      type: type,
      comId:
        userDetails.role == "POLICE_ADMIN"
          ? setItem?.id
          : userDetails?.companyId,
    };
    try {
      UploadGetContractsApi(obj, async (res) => {
        console.log("OwnershipDeclarationOwnershipDeclaration", res.sucess);
        if (res.sucess) {
          if (type == "OwnershipDeclaration") {
            setDataOD(res.sucess.list);
            setIsLoader(false);
            return;
          }
          if (type == "IncorporationDocuments") {
            setDataID(res.sucess.list);
            setIsLoader(false);
            return;
          }
          if (type == "Ownerinfo") {
            setDataOI(res.sucess.list);
            setIsLoader(false);
            return;
          }
          if (type == "CommercialGeneralLiabilityInsurance") {
            setDataCGLI(res.sucess.list);
            setIsLoader(false);
            return;
          }
          if (type == "AutomobileLiabilityInsurance") {
            setDataALI(res.sucess.list);
            setIsLoader(false);
            return;
          }
          if (type == "GarageLiablitlyInsurance") {
            setDataGLI(res.sucess.list);
            setIsLoader(false);
            return;
          }
          if (type == "WSIB") {
            setDataWSIB(res.sucess.list);
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
  };

  const ChangeStatusJob = (item) => {
    console.log("item.corporateName", item);
    setDropdownVal(item.corporateName);
    setCompId(item.id);
  };
  const toggleUpdateOD = (item) => {
    if (item) {
      setOwnershipDeclarationModal(!openOwnershipDeclarationModal);
      setDataODUpdate(item);
    }
  };
  const toggleUpdateID = (item) => {
    if (item) {
      setIncorporationDocumentsModal(!openIncorporationDocumentsModal);
      setDataIDUpdate(item);
    }
  };
  const toggleUpdateOI = (item) => {
    if (item) {
      setOwnerinfoModal(!openOwnerinfoModal);
      setDataOIUpdate(item);
    }
  };
  const toggleUpdateCGLI = (item) => {
    if (item) {
      setOpenCGLIModal(!openCGLIModal);
      setDataCGLIUpdate(item);
    }
  };
  const toggleUpdateALI = (item) => {
    if (item) {
      setOpenALIModal(!openALIModal);
      setDataALIUpdate(item);
    }
  };
  const toggleUpdateGLI = (item) => {
    if (item) {
      setOpenGLIModal(!openGLIModal);
      setDataGLIUpdate(item);
    }
  };
  const toggleUpdateWSIB = (item) => {
    console.log("asd", item);
    if (item) {
      setOpenWSIBModal(!openWSIBModal);
      setDataWSIBUpdate(item);
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

  const CDICallback = (InvoiceData) => {
    setIsLoader(true);
    try {
      const formData = new FormData();
      if (InvoiceData) {
        for (let i = 0; i < InvoiceData.length; i++) {
          formData.append(`files`, InvoiceData[i].files);
          formData.append("type", InvoiceData[i].imageType);
          formData.append("subType", InvoiceData[i].imageType);
          formData.append("issueDate", InvoiceData[i].issueDate);
          formData.append("expiryDate", InvoiceData[i].expDate);
          formData.append("comments", InvoiceData[i].comments);
        }
      }

      formData.append("id", setItem.id);
      formData.append("refId", setItem.id);
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      UploadContractsApi(formData, async (res) => {
        if (res.sucess) {
          console.log("UPP", res.sucess);
          setOpenCDIModal(false);
          setIsLoader(false);
          // setModalUpdate(!modalUpdate)
        } else {
          console.log("errrrr");
          setIsLoader(false);
        }
      });
    } catch (error) {
      console.log("error", error);
      setIsLoader(false);
    }
  };
  const CGLICallback = (feeAgrementData) => {
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
      if (Object.keys(dataCGLIUpdate).length !== 0) {
        formData.append("id", dataCGLIUpdate.id);
      }

      formData.append("refId", logData1?.companyId);
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      UploadContractsApi(formData, async (res) => {
        if (res.sucess) {
          console.log("UPP", res.sucess);
          setOpenCGLIModal(false);
          await getDataFiles("CommercialGeneralLiabilityInsurance");
          setIsLoader(false);
          successAlert(res.sucess.response.messages[0].message);
          setDataCGLIUpdate([]);
        } else {
          errorAlert(res.sucess.response.messages[0].message);
          setIsLoader(false);
        }
      });
    } catch (error) {
      successAlert(error);
      setIsLoader(false);
    }
  };
  const ALICallback = (feeAgrementData) => {
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
      if (Object.keys(dataALIUpdate).length !== 0) {
        formData.append("id", dataALIUpdate.id);
      }
      formData.append("refId", logData1?.companyId);
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      UploadContractsApi(formData, async (res) => {
        if (res.sucess) {
          console.log("UPP", res.sucess);
          setOpenALIModal(false);
          // setModalUpdate(!modalUpdate)
          await getDataFiles("AutomobileLiabilityInsurance");
          setIsLoader(false);
          successAlert(res.sucess.response.messages[0].message);
          setDataALIUpdate([]);
        } else {
          errorAlert(res.sucess.response.messages[0].message);
          setIsLoader(false);
        }
      });
    } catch (error) {
      successAlert(error);
      setIsLoader(false);
    }
  };
  const GLICallback = (feeAgrementData) => {
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
      if (Object.keys(dataGLIUpdate).length !== 0) {
        formData.append("id", dataGLIUpdate.id);
      }
      formData.append("refId", logData1?.companyId);
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      UploadContractsApi(formData, async (res) => {
        if (res.sucess) {
          console.log("UPP", res.sucess);
          setOpenGLIModal(false);
          // setModalUpdate(!modalUpdate)
          await getDataFiles("GarageLiablitlyInsurance");
          successAlert(res.sucess.response.messages[0].message);
          setDataGLIUpdate([]);
        } else {
          errorAlert(res.sucess.response.messages[0].message);
        }
      });
    } catch (error) {
      error(error);
      setIsLoader(false);
    }
  };
  const WSIBCallback = (feeAgrementData) => {
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
      if (Object.keys(dataWSIBUpdate).length !== 0) {
        formData.append("id", dataWSIBUpdate.id);
      }
      formData.append("refId", logData1?.companyId);
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      UploadContractsApi(formData, async (res) => {
        if (res.sucess) {
          console.log("UPP", res.sucess);
          setOpenWSIBModal(false);

          await getDataFiles("WSIB");
          successAlert(res.sucess.response.messages[0].message);
          setDataWSIBUpdate([]);
          setIsLoader(false);
        } else {
          errorAlert(res.sucess.response.messages[0].message);
          setIsLoader(false);
        }
      });
    } catch (error) {
      successAlert(error);
      setIsLoader(false);
    }
  };
  const OwnershipDeclarationCallback = (feeAgrementData) => {
    setIsLoader(true);
    try {
      const formData = new FormData();

      if (feeAgrementData) {
        for (let i = 0; i < feeAgrementData.length; i++) {
          formData.append(`file`, feeAgrementData[i]?.files);
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
      if (Object.keys(dataODUpdate).length !== 0) {
        formData.append("id", dataODUpdate.id);
      }

      formData.append("refId", logData1?.companyId);
      formData.append("companyId", logData1?.companyId);

      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      UploadContractsApi(formData, async (res) => {
        if (res.sucess) {
          console.log("UPP", res.sucess);
          setOwnershipDeclarationModal(false);
          // setModalUpdate(!modalUpdate)
          await getDataFiles("OwnershipDeclaration");
          setIsLoader(false);
          successAlert(res.sucess.response.messages[0].message);
          setDataODUpdate([]);
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
  const IncorporationDocumentsCallback = (feeAgrementData) => {
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
      if (Object.keys(dataIDUpdate).length !== 0) {
        formData.append("id", dataIDUpdate.id);
      }
      formData.append("refId", logData1?.companyId);
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      UploadContractsApi(formData, async (res) => {
        if (res.sucess) {
          console.log("UPP", res.sucess);
          setIncorporationDocumentsModal(false);
          // setModalUpdate(!modalUpdate)
          await getDataFiles("IncorporationDocuments");
          setIsLoader(false);
          successAlert(res.sucess.response.messages[0].message);
          setDataIDUpdate([]);
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
  const OwnerinfoCallback = (feeAgrementData) => {
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
      if (Object.keys(dataOIUpdate).length !== 0) {
        formData.append("id", dataOIUpdate.id);
      }
      formData.append("refId", logData1?.companyId);
      for (var key of formData.entries()) {
        console.log(key[0] + ", " + key[1]);
      }

      UploadContractsApi(formData, async (res) => {
        if (res.sucess) {
          console.log("UPP", res.sucess);
          setOwnerinfoModal(false);
          await getDataFiles("Ownerinfo");
          setIsLoader(false);
          successAlert(res.sucess.response.messages[0].message);
          setDataOIUpdate([]);
        } else {
          console.log("errrrr");
          errorAlert(res.sucess.response.messages[0].message);
          setIsLoader(false);
        }
      });
    } catch (error) {
      successAlert(error);
      setIsLoader(false);
    }
  };
  return (
    <>
      {/* {activeTab === '1' && ()} */}
      {logData1.role != "POLICE_ADMIN" && (
        <div
          className="header pb-6 pt-5 pt-md-4"
          style={{ background: "green" }}
        >
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
      )}
      <div>
        <Nav tabs className="nav--links" style={{}}>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "6" })}
              onClick={() => {
                toggle("6");
              }}
            >
              Ownership Declaration
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "7" })}
              onClick={() => {
                toggle("7");
              }}
            >
              Incorporation Documents
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "8" })}
              onClick={() => {
                toggle("8");
              }}
            >
              Owner Info
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
            >
              Commercial General Liability Insurance
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => {
                toggle("3");
              }}
            >
              Automobile Liability Insurance
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "4" })}
              onClick={() => {
                toggle("4");
              }}
            >
              Garage Liability Insurance
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "5" })}
              onClick={() => {
                toggle("5");
              }}
            >
              WSIB
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
                      <h3 className="mb-0">
                        Commercial General Liability Insurance
                      </h3>

                      {logData1.role !== "POLICE_ADMIN" && (
                        <Button
                          style={{ position: "absolute", right: 20, top: -12 }}
                          onClick={() => {
                            setDataCGLIUpdate([]);
                            setOpenCGLIModal(!openCGLIModal);
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
                                              toggleUpdateCGLI(item);
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
                      <h3 className="mb-0">Automobile Liability Insurance</h3>
                      {logData1.role !== "POLICE_ADMIN" && (
                        <Button
                          style={{ position: "absolute", right: 20, top: -12 }}
                          onClick={() => {
                            setDataALIUpdate([]);
                            setOpenALIModal(!openALIModal);
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
                                              toggleUpdateALI(item);
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
                      <h3 className="mb-0">Garage Liability Insurance</h3>

                      {/* <h3 style={{ position: "absolute", right: 20, top: 25, }} className="mb-0">Keep Scrolling ►</h3> */}

                      {logData1.role !== "POLICE_ADMIN" && (
                        <Button
                          style={{ position: "absolute", right: 20, top: -12 }}
                          onClick={() => {
                            setDataGLIUpdate([]);
                            setOpenGLIModal(!openGLIModal);
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
                                              toggleUpdateGLI(item);
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
                      <h3 className="mb-0">WSIB</h3>

                      {/* <h3 style={{ position: "absolute", right: 20, top: 25, }} className="mb-0">Keep Scrolling ►</h3> */}

                      {logData1.role !== "POLICE_ADMIN" && (
                        <Button
                          style={{ position: "absolute", right: 20, top: -12 }}
                          onClick={() => {
                            setDataWSIBUpdate([]);
                            setOpenWSIBModal(!openWSIBModal);
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
                                              toggleUpdateWSIB(item);
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
                      <h3 className="mb-0">Ownership Declaration</h3>
                      {logData1.role !== "POLICE_ADMIN" && (
                        <Button
                          style={{ position: "absolute", right: 20, top: -12 }}
                          onClick={() => {
                            setDataODUpdate([]);
                            setOwnershipDeclarationModal(
                              !openOwnershipDeclarationModal
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
                      {dataOD?.length > 0 ? (
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
                            {dataOD.map((item) => {
                              return (
                                <tr>
                                  <td className="text-sm">{item?.id}</td>
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
                                              toggleUpdateOD(item);
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
                      <h3 className="mb-0">Incorporation Documents</h3>
                      {logData1.role !== "POLICE_ADMIN" && (
                        <Button
                          style={{ position: "absolute", right: 20, top: -12 }}
                          onClick={() => {
                            setDataIDUpdate([]);
                            setIncorporationDocumentsModal(
                              !openIncorporationDocumentsModal
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
                      {dataID?.length > 0 ? (
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
                            {dataID.map((item) => {
                              return (
                                <tr>
                                  <td className="text-sm">{item?.id}</td>
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
                                              toggleUpdateID(item);
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
                      <h3 className="mb-0">Owner Info</h3>
                      {logData1.role !== "POLICE_ADMIN" && (
                        <Button
                          style={{ position: "absolute", right: 20, top: -12 }}
                          onClick={() => {
                            setDataOIUpdate([]);
                            setOwnerinfoModal(!openOwnerinfoModal);
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
                      {dataOI?.length > 0 ? (
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
                            {dataOI?.map((item) => {
                              return (
                                <tr>
                                  <td className="text-sm">{item?.id}</td>
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
                                              toggleUpdateOI(item);
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
        {/* delete */}
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
          modal={openCGLIModal}
          data={dataCGLIUpdate}
          title="Commercial General Liability Insurance"
          dataType="CommercialGeneralLiabilityInsurance"
          parentCallback={CGLICallback}
        />
        <UploadModal
          modal={openALIModal}
          data={dataALIUpdate}
          title="Automobile Liability Insurance"
          dataType="AutomobileLiabilityInsurance"
          parentCallback={ALICallback}
        />
        <UploadModal
          modal={openGLIModal}
          data={dataGLIUpdate}
          title="Garage Liability Insurance"
          dataType="GarageLiablitlyInsurance"
          parentCallback={GLICallback}
        />
        <UploadModal
          modal={openWSIBModal}
          data={dataWSIBUpdate}
          title="WSIB"
          dataType="WSIB"
          parentCallback={WSIBCallback}
        />
        <UploadModal
          modal={openOwnershipDeclarationModal}
          data={dataODUpdate}
          title="Ownership Declaration"
          dataType="OwnershipDeclaration"
          parentCallback={OwnershipDeclarationCallback}
        />
        <UploadModal
          modal={openIncorporationDocumentsModal}
          data={dataIDUpdate}
          title="Incorporation Documents"
          dataType="IncorporationDocuments"
          parentCallback={IncorporationDocumentsCallback}
        />
        <UploadModal
          modal={openOwnerinfoModal}
          data={dataOIUpdate}
          title="Owner info"
          dataType="Ownerinfo"
          parentCallback={OwnerinfoCallback}
        />
        <ViewImageModal
          modal={openViewImageModal}
          itemData={imageData}
          companyId={companyId}
        />
      </div>
    </>
  );
}

export default CorpDetail;
