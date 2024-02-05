import React, { useEffect, useState } from "react";

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
  Label,
  Container,
  // Button,
  Alert,
  Row,
  Col,
  Spinner,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  CardBody,
  Form,
  FormGroup,
} from "reactstrap";
import { Document, Page } from "react-pdf";
import Select from "react-select";
import { Link, useHistory } from "react-router-dom";
import * as moment from "moment";
// import { browserHistory } from 'react-router';
// core components
import Header from "components/Headers/Header.js";
import {
  singleAllAgency,
  singleAllCorporate,
  singleDeleteAgency,
  singleDeleteCorporate,
  singleSaveAgency,
  singleSaveCorporate,
  singleUpdateAgency,
  singleUpdateCorporate,
} from "../../../APIstore/apiCalls";
import { CsvToHtmlTable } from "react-csv-to-table";
import toast, { Toaster } from "react-hot-toast";
import config from "config";
import { successAlert, errorAlert, emailValidator } from "../../../Theme/utils";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PropTypes, { object } from "prop-types";
import DateTimePicker from "react-datetime-picker";
import UploadModal from "component/UploadModal";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import routes from "routes";
const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: "none",
  },
});
var hoistData = {};
// const descriptionList = [
//   { value: "Light Tow / Duty boom style tow truck", label: "Light Tow / Duty boom style tow truck" },
//   { value: "Light Tow / Duty tilt and load tow truck", label: "Light Tow / Duty tilt and load tow truck" },
//   { value: "Medium Tow / Duty tilt and load tow truck", label: "Medium Tow / Duty tilt and load tow truck" },
//   { value: "Medium Tow / Duty wreckers - fixed boom(25 tons)", label: "Medium Tow / Duty wreckers - fixed boom(25 tons)" },
//   { value: "Medium Tow / Duty wreckers - fixed boom(20 tons)", label: "Medium Tow / Duty wreckers - fixed boom(20 tons)" },
//   { value: "Medium Tow / Duty wreckers - fixed boom(15 tons)", label: "Medium Tow / Duty wreckers - fixed boom(15 tons)" },
//   { value: "Medium Tow / Duty wreckers - fixed boom(10 tons)", label: "Medium Tow / Duty wreckers - fixed boom(10 tons)" },
//   { value: "Heavy Tow / Duty wreckers - rotator boom(75 tons or higher)", label: "Heavy Tow / Duty wreckers - rotator boom(75 tons or higher)" },
//   { value: "Heavy Tow / Duty wreckers - rotator boom(70 tons)", label: "Heavy Tow / Duty wreckers - rotator boom(70 tons)" },
//   { value: "Heavy Tow / Duty wreckers - rotator boom(65 tons)", label: "Heavy Tow / Duty wreckers - rotator boom(65 tons)" },
//   { value: "Heavy Tow / Duty wreckers - rotator boom(60 tons)", label: "Heavy Tow / Duty wreckers - rotator boom(60 tons)" },
//   { value: "Heavy Tow / Duty wreckers - rotator boom(55 tons)", label: "Heavy Tow / Duty wreckers - rotator boom(55 tons)" },
//   { value: "Heavy Tow / Duty wreckers - rotator boom(50 tons)", label: "Heavy Tow / Duty wreckers - rotator boom(50 tons)" },
//   { value: "Heavy Tow / Duty wreckers - rotator boom(45 tons)", label: "Heavy Tow / Duty wreckers - rotator boom(45 tons)" },
//   { value: "Heavy Tow / Duty wreckers - rotator boom(40 tons)", label: "Heavy Tow / Duty wreckers - rotator boom(40 tons)" },
//   { value: "Heavy Tow / Duty wreckers - fixed boom(50 tons)", label: "Heavy Tow / Duty wreckers - fixed boom(50 tons)" },
//   { value: "Heavy Tow / Duty wreckers - fixed boom(45 tons)", label: "Heavy Tow / Duty wreckers - fixed boom(45 tons)" },
//   { value: "Heavy Tow / Duty wreckers - fixed boom(40 tons)", label: "Heavy Tow / Duty wreckers - fixed boom(40 tons)" },
//   { value: "Heavy Tow / Duty wreckers - fixed boom(35 tons)", label: "Heavy Tow / Duty wreckers - fixed boom(35 tons)" },
//   { value: "Heavy Tow / Duty wreckers - fixed boom(30 tons)", label: "Heavy Tow / Duty wreckers - fixed boom(30 tons)" },
// ]
function Fleet(props) {
  const { classes, dataItem } = props;
  const [data, setData] = useState([]);
  const [ViewImagemodal, setViewImageModal] = useState(false);
  const [setItem, setItemData] = useState("");
  const [modalUpdate, setModalUpdate] = useState(false);
  const [sampleData, setsampleData] = useState(
    "process.env.REACT_APP_API_URL/file/files/9/Police/users-list%20(1).xlsx"
  );
  const [statusData, setStatusData] = useState([]);
  const [imageLink, setImageLink] = useState("");
  const [typeTruck, setTypeTruck] = useState("");
  const [userDetail, setUserDetail] = useState({});
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [truckName, setTruckName] = useState("");
  const [mileage, setMileage] = useState(0);
  const [description, setDescription] = useState("");
  const [position1, setPosition1] = useState("");
  const [phone1, setPhone1] = useState("");
  const [email1, setEmail1] = useState("");
  const [address1, setAddress1] = useState("");
  const [name2, setName2] = useState("");
  const [position2, setPosition2] = useState("");
  const [phone2, setPhone2] = useState("");
  const [email2, setEmail2] = useState("");
  const [address2, setAddress2] = useState("");
  const [showOther, setShowOther] = useState(false);
  const [ShowSec, setShowSec] = useState(false);
  const [deleteModal, setDeletToggle] = useState(false);
  const [userID, setUserId] = useState("");
  const [logdataVal, setLogData] = useState("");
  const navigate = useHistory();
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const ViewImagetoggle = () => {
    setViewImageModal(!ViewImagemodal);
  };
  const toggleUpdate = (item) => {
    if (item) {
      setModalUpdate(!modalUpdate);
      setItemData(item);
      hoistData = item;
    } else {
      hoistData = {};
      setModalUpdate(!modalUpdate);
      setItemData("");
    }
  };
  const Deletetoggle = (item) => {
    setUserId(item?.id);
    setDeletToggle(!deleteModal);
  };
  const deleteAPI = () => {
    try {
      singleDeleteCorporate(userID, async (res) => {
        console.log("adasdasd", res);
        if (res.sucess) {
          try {
            singleAllCorporate("", async (res) => {
              console.log("singleAllAgency", res);
              if (res.sucess) {
                setData(res.sucess.list);
                console.log("res.sucess.list", res.sucess.list);
                setDeletToggle(!deleteModal);
              } else {
                console.log("errrrr");
                setDeletToggle(!deleteModal);
              }
            });
          } catch (error) {
            console.log("error", error);
            setDeletToggle(!deleteModal);
          }
          successAlert(res.sucess.messages[0].message);
        } else {
          errorAlert(res.sucess.messages[0].message);
        }
      });
    } catch (error) {
      errorAlert(error);
    }
  };
  const getLoggedData = async () => {
    var logData;
    const storedData = await localStorage.getItem("accessData");
    if (storedData) {
      const getdata = await localStorage.getItem("accessData");
      logData = JSON.parse(getdata);
    } else {
      const getdata = await localStorage.getItem("loggedData");
      logData = JSON.parse(getdata);
    }
    setLogData(logData);
    try {
      singleAllCorporate(
        dataItem != null
          ? dataItem?.id
          : logData != null && logData != undefined
          ? logData.companyId
          : "",
        async (res) => {
          if (res.sucess) {
            setData(res.sucess.list);
          } else {
            console.log("errrrr");
          }
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getLoggedData();
  }, [setItem]);
  const OnSubmit = async () => {
    const getdata = await localStorage.getItem("loggedData");
    let loggedData = JSON.parse(getdata);
    let API =
      Object.keys(hoistData).length > 0
        ? singleUpdateCorporate
        : singleSaveCorporate;
    console.log("hoistData", hoistData);
    const obj = {
      id: hoistData?.id ? hoistData?.id : 0,
      name:
        truckName === undefined || truckName === ""
          ? hoistData?.name
          : truckName,
      type: "fleet",
      description:
        description === undefined || description === ""
          ? hoistData?.description
          : description,
      longVal:
        mileage === undefined || mileage === "" ? hoistData?.mileage : mileage,
      companyId: loggedData.companyId ? loggedData.companyId : null,
    };
    console.log("ooobb", obj);

    try {
      API(obj, async (res) => {
        console.log("qq", res);
        if (res.sucess) {
          try {
            singleAllCorporate("", async (res) => {
              console.log("adasdasd", res);
              if (res.sucess) {
                setData(res.sucess.list);
                console.log("res.sucess.list", res.sucess.list);
              } else {
                console.log("errrrr");
              }
            });
          } catch (error) {
            console.log("error", error);
          }
          setModalUpdate(!modalUpdate);
          successAlert(res.sucess.messages[0].message);
          console.log("res.sucess", res.sucess);
        } else {
          setModalUpdate(!modalUpdate);
          console.log("eeee", res.sucess);
          errorAlert(res.sucess.messages[0].message);
        }
      });
    } catch (error) {
      console.log("error", error);
      // setModalUpdate(!modalUpdate)
      errorAlert(error);
    }
    // }
  };

  const ChangeStatusJob = (status) => {
    console.log("fff", data);
    console.log("fff", status);
    if (status == "Police") {
      let result = data.filter((el) => el.agencyType === status);
      setData(result);
    } else {
      try {
        singleAllAgency("", async (res) => {
          if (res.sucess) {
            console.log("res.sucess", res.sucess);
            setData(res.sucess.list);
          } else {
            console.log("errrrr");
          }
        });
      } catch (error) {
        console.log("error", error);
      }
    }
    setStatusData(status);
  };

  const redirect = (to, query) => {
    navigate.push(to, query);
  };
  return (
    <>
      {logdataVal.role != "POLICE_ADMIN" ? (
        <div
          className="header pb-5 pt-5 pt-md-8"
          style={{ background: "green" }}
        >
          <Container fluid>
            <div className="header-body">{/* Card stats */}</div>
          </Container>
        </div>
      ) : (
        <div className="header pb-8" style={{ background: "green" }}>
          <Container fluid>
            <div className="header-body">{/* Card stats */}</div>
          </Container>
        </div>
      )}
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>
                  <h3 className="mb-0">{config.fleet}</h3>
                  {logdataVal.role != "POLICE_ADMIN" && (
                    <Button
                      style={{ position: "absolute", right: 20, top: -7 }}
                      onClick={() => {
                        toggleUpdate();
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
              <Table className="align-items-center table-flush" responsive>
                {data.length > 0 ? (
                  <>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col" className="width-160">
                          Truck ID
                        </th>
                        <th scope="col" className="width-160">
                          Truck Name
                        </th>
                        {/* <th scope="col">Truck Type</th> */}
                        <th scope="col" className="width-160">
                          Mileage
                        </th>
                        <th scope="col" className="width-160">
                          Description
                        </th>
                        <th scope="col" className="width-160" />
                      </tr>
                    </thead>

                    <tbody>
                      {data.map((item) => {
                        return (
                          <tr>
                            <td
                              onClick={() => {
                                redirect("/admin/fleet-detail", item);
                              }}
                              style={{
                                textDecoration: "underline black",
                                cursor: "pointer",
                                whiteSpace: "pre-line",
                              }}
                              // onClick={() => { toggle(item) }}
                              className="text-sm ex-width"
                            >
                              {item?.id}
                            </td>
                            <td
                              onClick={() => {
                                redirect("/admin/fleet-detail", item);
                              }}
                              className="text-sm"
                            >
                              {item?.name}
                            </td>
                            <td
                              onClick={() => {
                                redirect("/admin/fleet-detail", item);
                              }}
                              className="text-sm"
                            >
                              {item?.longVal == null ? 0 : item?.longVal}
                            </td>
                            {/* <td className="text-sm ex-width">
                              {item?.type === 'fleet' ? 'Fleet' : item?.type}
                            </td> */}
                            <td
                              onClick={() => {
                                redirect("/admin/fleet-detail", item);
                              }}
                              className="text-sm"
                            >
                              {item?.description}
                            </td>
                            <td className="">
                              {logdataVal.role != "POLICE_ADMIN" && (
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
                                        toggleUpdate(item);
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
        <Modal
          size="lg"
          style={{ maxWidth: "1600px", width: "80%" }}
          isOpen={ViewImagemodal}
          toggle={() => {
            ViewImagetoggle();
          }}
          className={props.className}
        >
          <ModalBody>
            {/* <CsvToHtmlTable
              data={sampleData}
              csvDelimiter=","
              tableClassName="table table-striped table-hover"
            /> */}
            <h3>{imageLink ? imageLink : "Please Upload image"}</h3>
            <Document
              file="process.env.REACT_APP_API_URL/file/files/9/Police/Resume-Tayyab.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </ModalBody>
          {/* <ModalFooter>
            <input
              type={"file"}
              id={"csvFileInput"}
              accept={".xlsx, .xls, .csv"}
              onChange={(e) => { SetCsvFile(e.target.files[0]) }}
            />
            <Button onClick={() => { handleOnChange() }} className="my-4" color="primary" type="button">
              {config.uploadNow}
            </Button>
          </ModalFooter> */}
        </Modal>

        <Modal
          size="lg"
          style={{ maxWidth: "1600px", width: "80%" }}
          isOpen={modalUpdate}
          toggleUpdate={() => {
            toggleUpdate();
          }}
          className={props.className}
        >
          <ModalBody>
            <Row>
              <Col className="order-xl-1" xl="12">
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">
                          {Object.entries(hoistData).length > 0
                            ? "Update Vehicle"
                            : "Add New"}
                        </h3>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <h6 className="heading-small text-muted mb-4">
                        {config.fleet}
                      </h6>
                      <div className="pl-lg-3">
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                Truck Name
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={hoistData?.name}
                                id="input-first-name"
                                placeholder="Truck Name"
                                type="text"
                                onChange={(text) =>
                                  setTruckName(text.target.value)
                                }
                              />
                            </FormGroup>
                          </Col>

                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                Description
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={hoistData?.description}
                                id="input-first-name"
                                placeholder="Description"
                                type="text"
                                onChange={(text) =>
                                  setDescription(text.target.value)
                                }
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                Mileage
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={
                                  hoistData?.longVal == null
                                    ? 0
                                    : hoistData?.longVal
                                }
                                id="input-first-name"
                                placeholder="Mileage"
                                type="number"
                                onChange={(text) =>
                                  setMileage(text.target.value)
                                }
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <div className="save-close-div">
                            <Button
                              onClick={() => {
                                OnSubmit();
                              }}
                              // onClick={() => { handleOnChange(25) }}
                              className="p-btm my-4 save-close"
                              color="primary"
                              type="button"
                            >
                              {config.save}
                            </Button>

                            <Button
                              color="primary"
                              className="s-btm my-4 save-close"
                              onClick={() => {
                                toggleUpdate();
                              }}
                            >
                              {config.close}
                            </Button>
                          </div>
                        </Row>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
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
Fleet.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Fleet);
