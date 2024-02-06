import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";
import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Input,
  FormGroup,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useLocation, useHistory, Link } from "react-router-dom";
import { PieChart } from "react-minimal-pie-chart";
// core components
import toast, { Toaster } from "react-hot-toast";
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
import { Redirect } from "react-router-dom";
import Header from "components/Headers/Header.js";
import Maps from "./examples/Maps";
import {
  getDashboard,
  getLoggedinApi,
  getUserData,
  UpdatePassword,
} from "../APIstore/apiCalls";
import config from "config";
import moment from "moment";
import { onMessageListener, fetchToken } from "../Service/firebase";
import Notifications, { notify } from "react-notify-toast";
import { successAlert, errorAlert } from "Theme/utils";
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      da: "",
      modal: false,
      currentPass: "",
      newPass: "",
      confirmPass: "",
      data: [],
      EPdata: [],
      checkTempPassword: "",
      pieData: {
        labels: ["Pending Calls", "Service", "Active"],
        datasets: [
          {
            label: "# of Votes",
            data: [35, 40, 25],
            backgroundColor: ["#007D9C", "#244D70", "#FE452A"],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      isLoader: false,
      chartExample1Data: "data1",
      value: window.localStorage.getItem("notificationsData"),
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  handleChanges = (e) => {
    // only subscribe to changes to the key specified
    if (e.key === this.props.key) {
      this.setState({ value: e.newValue });
    }
    console.log("valuevalue", this.state.value);
  };

  getLoggedData = async () => {
    const storedData = await localStorage.getItem("accessData");
    if (storedData) {
      const getdata = await localStorage.getItem("accessData");
      let logData = JSON.parse(getdata);
      fetchToken(logData);
    } else {
      const getdata = await localStorage.getItem("loggedData");
      let logData = JSON.parse(getdata);
      fetchToken(logData);
    }
  };
  OnChangePassword = () => {
    const { currentPass, newPass, confirmPass } = this.state;
    if (!currentPass) {
      errorAlert("Please enter Current Password");
      return;
    }
    if (!newPass) {
      errorAlert("Please enter New Password");
      return;
    }

    if (!confirmPass) {
      errorAlert("Please enter Confirm Password");
      return;
    }
    if (confirmPass != newPass) {
      errorAlert("Your New Password and Confirm Password is not matched");
      return;
    }

    let obj = {
      currentPassword: currentPass,
      newPassword: newPass,
      reTypePassword: confirmPass,
    };
    try {
      UpdatePassword(obj, async (res) => {
        if (res.sucess) {
          successAlert(res.sucess.messages[0].message);
          this.setState({ modal: !this.state.modal });
          await localStorage.setItem("checkTempVar", false);
        } else {
          errorAlert("Something went wrong");
        }
      });
    } catch (error) {
      errorAlert(error);
    }
  };
  async onClose() {
    this.setState({ modal: !this.state.modal });
    await localStorage.setItem("checkTempVar", false);
  }
  async componentDidMount() {
    this.getLoggedData();

    try {
      getDashboard("", async (res) => {
        if (res.sucess) {
          this.setState({ EPdata: res.sucess });
          this.setState({
            pieData: {
              labels: ["Pending Calls", "Service", "Active"],
              datasets: [
                {
                  label: "# of Votes",
                  data: [
                    res.sucess?.activeReq,
                    res.sucess?.serviceReq,
                    res.sucess?.pendingReq,
                  ],
                  backgroundColor: ["#007D9C", "#244D70", "#FE452A"],
                  borderColor: [
                    "rgba(255,99,132,1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            },
          });
          this.setState({ isLoader: false });
        } else {
          console.log("errrrr");
          this.setState({ isLoader: false });
        }
      });
    } catch (error) {
      console.log("error", error);
      this.setState({ isLoader: false });
    }
    console.log("pp0", this.state.EPdata?.activeReq);

    const id = await localStorage.getItem("access");
    if (id) {
      try {
        getUserData(id, async (res) => {
          if (res.sucess) {
            await localStorage.setItem(
              "accessData",
              JSON.stringify(res.sucess)
            );
          } else {
            console.log("errrrr");
          }
        });
      } catch (error) {
        console.log("error", error);
      }
    }

    const token = await localStorage.getItem("token");

    if (!token) {
      await localStorage.clear();
      await window.localStorage.clear();
      window.location.replace("process.env.REACT_APP_AUTH_URL/login");
    }
    try {
      getLoggedinApi("", async (res) => {
        if (res.sucess) {
          console.log("res.dsgdf", res.sucess.roles[0]);
          this.setState({
            data: res.sucess.roles[0],
            modal: res.sucess.isTemporaryPassword,
          });
          const tempVar = await localStorage.getItem("checkTempVar");
          if (tempVar === null) {
            this.setState({ modal: res.sucess.isTemporaryPassword });
          } else if (tempVar == true) {
            this.setState({ modal: tempVar });
          } else {
            this.setState({ modal: false });
          }
          let role = res.sucess.roles[0];
          if (role == "DRIVER") {
            window.location = "/admin/user-profile";
            return;
          }
          if (role == "POLICE") {
            window.location = "/admin/user-profile";
            return;
          }
          if (role == "STAFF") {
            window.location = "/admin/user-profile";
            return;
          }
          // if (role == 'POLICE_ADMIN') {
          //     window.location = '/admin/user-profile';
          //     return
          // }
          // else {
          //   window.location = '/admin/index';
          //   return
          // }
        } else {
          console.log("errrrr");
        }
      });
    } catch (error) {
      console.log("error", error);
    }
    // else {
    //   window.location.reload();
    // }
  }

  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1",
    });
  };
  render() {
    const { isLoader, pieData, EPdata } = this.state;
    return (
      <>
        <Header />
        {/* Page content */}
        {/* {this.state.da && (
          <div style={{position:"absolute",marginLeft:"10%",marginTop:"-15%"}} onClick={async () => {
            await localStorage.removeItem('access')
            await localStorage.removeItem('accessData')
            alert('done')
          }}><span style={{color:"#000",}}>lkjflkkjkllkj</span></div>
        )} */}
        <>
          {isLoader ? (
            <div className="SpinnerClass">
              <Spinner className="loader" children={true} />
            </div>
          ) : (
            <>
              {this.state.data == "POLICE_ADMIN" && (
                <Container className="mt--7" fluid>
                  <Row className="addSome">
                    <Col xl="6">
                      <Card className="shadow">
                        <CardHeader className="bg-transparent">
                          <Row className="align-items-center">
                            <div className="col">
                              <h2 className="mb-0">Pending Calls</h2>
                            </div>
                          </Row>
                        </CardHeader>
                        <CardBody className="heightSet">
                          {/* Chart */}
                          <div className="chart">
                            <Pie data={pieData} />
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col xl="6">
                      <Card className="shadow">
                        <CardHeader className="border-0">
                          <Row className="align-items-center">
                            <div className="col">
                              <h3 className="mb-0">Invoices Not Paid</h3>
                            </div>
                          </Row>
                        </CardHeader>
                        <div id="overlay">
                          <div id="text">Under Development Version 2</div>
                        </div>
                        <Table className="align-items-center table-flush additionalLE opacityset">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Agency/Company</th>
                              <th scope="col">Date Issued</th>
                              <th scope="col">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row"></th>
                              <th></th>
                              <td>$3358.22</td>
                            </tr>
                            <tr>
                              <th scope="row"></th>
                              <th></th>
                              <td>$450.00</td>
                            </tr>
                            <tr>
                              <th scope="row"></th>
                              <th></th>
                              <td>$566.25</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Card>
                    </Col>
                  </Row>
                  <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="12">
                      <Card className="shadow">
                        <CardHeader className="border-0">
                          <Row className="align-items-center">
                            <div className="col">
                              <h3 className="mb-0">List of Impounded Items</h3>
                            </div>
                            {/* <div className="col text-right">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          size="sm"
                        >
                          See all
                        </Button>
                      </div> */}
                          </Row>
                        </CardHeader>
                        <Table className="align-items-center table-flush additional">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Date In</th>
                              <th scope="col">Licence</th>
                              <th scope="col">Make, Model</th>
                              <th scope="col">Release Y/N</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td scope="row">2022-11-25</td>
                              <td>AABK-789</td>
                              <td>Dodge, Ram</td>
                              <td>
                                {/* <i className="fas fa-arrow-up text-success mr-3" />{" "} */}
                                YES
                              </td>
                            </tr>

                            {EPdata?.requests?.map((item) => {
                              return (
                                <tr>
                                  <>
                                    <td>
                                      {moment(item?.startDate).format(
                                        "YYYY-MM-DD"
                                      )}
                                    </td>
                                    <td scope="row">
                                      {item?.licensePlateNumber}
                                    </td>
                                    <td>
                                      {item.vinBasicData?.make},{" "}
                                      {item.vinBasicData?.model}
                                    </td>
                                    <td>
                                      {item?.isRelease === true ? "YES" : "NO"}
                                    </td>
                                  </>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              )}
              {(this.state.data == "ADMIN" ||
                this.state.data == "TOW_ADMIN") && (
                <Container className="mt--7" fluid>
                  <Row className="addSome">
                    <Col className="mb-5 mb-xl-0" xl="8">
                      <Card className="bg-gradient-default shadow">
                        <CardHeader className="bg-transparent">
                          <Row className="align-items-center">
                            <div className="col">
                              <h6 className="text-uppercase text-light ls-1 mb-1">
                                Overview
                              </h6>
                              <h2 className="text-white mb-0">
                                Show Tracker & Drivers On Duty
                              </h2>
                            </div>
                          </Row>
                        </CardHeader>
                        <CardBody className="addHeight">
                          <Maps
                            lat={43.64839}
                            lng={-79.87626}
                            data={"hide"}
                            dataU={"a"}
                          />
                        </CardBody>
                      </Card>
                    </Col>
                    <Col xl="4">
                      <Card className="shadow">
                        <CardHeader className="bg-transparent">
                          <Row className="align-items-center">
                            <div className="col">
                              <h6 className="text-uppercase text-muted ls-1 mb-1">
                                Performance
                              </h6>
                              <h2 className="mb-0">Service Request</h2>
                            </div>
                          </Row>
                        </CardHeader>
                        <CardBody className="heightSet">
                          {/* Chart */}
                          <div className="chart">
                            {/* <Bar
                      data={chartExample2.data}
                      options={chartExample2.options}
                    /> */}
                            <Pie data={pieData} />
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="8">
                      <Card className="shadow">
                        <CardHeader className="border-0">
                          <Row className="align-items-center">
                            <div className="col">
                              <h3 className="mb-0">List of Impounded Items</h3>
                            </div>
                            {/* <div className="col text-right">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          size="sm"
                        >
                          See all
                        </Button>
                      </div> */}
                          </Row>
                        </CardHeader>
                        <Table className="align-items-center table-flush additional">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Date In</th>
                              <th scope="col">VIN</th>
                              <th scope="col">Make/Model</th>
                              <th scope="col">Release Status</th>
                              <th scope="col">Owner Notified</th>
                            </tr>
                          </thead>
                          <tbody>
                            {EPdata?.requests?.map((item) => {
                              return (
                                <tr>
                                  <>
                                    <td scope="row" className="text-sm">
                                      {moment(item?.towOrImpoundDate).format(
                                        "YYYY-MM-DD"
                                      )}
                                    </td>
                                    <td className="text-sm">{item?.vin}</td>
                                    <td className="text-sm">
                                      {item.vinBasicData?.make},{" "}
                                      {item.vinBasicData?.model}
                                    </td>
                                    <td className="text-sm">
                                      {item?.releaseStatus}
                                    </td>
                                    <td className="text-sm">
                                      {/* <i className="fas fa-arrow-up text-success mr-3" />{" "} */}
                                      YES
                                    </td>
                                  </>
                                </tr>
                              );
                            })}
                            {/* <tr>
                        <th scope="row">/all-jobs.html</th>
                        <td>2,050</td>
                        <td>147</td>
                        <td>
                          <i className="fas fa-arrow-up text-success mr-3" />{" "}
                          50,87%
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">/profile.html</th>
                        <td>1,795</td>
                        <td>190</td>
                        <td>
                          <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                          46,53%
                        </td>
                      </tr> */}
                          </tbody>
                        </Table>
                      </Card>
                    </Col>
                    <Col xl="4">
                      <Card className="shadow">
                        <CardHeader className="border-0">
                          <Row className="align-items-center">
                            <div className="col">
                              <h3 className="mb-0">Invoices Not Paid</h3>
                            </div>
                            {/* <div className="col text-right">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          size="sm"
                        >
                          See all
                        </Button>
                      </div> */}
                          </Row>
                        </CardHeader>
                        <Table className="align-items-center table-flush additional">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Agency/Company</th>
                              <th scope="col">Date Issued</th>
                              <th scope="col">Amount</th>
                              <th scope="col" />
                            </tr>
                          </thead>
                          <tbody>
                            {EPdata?.requests?.map((item) => {
                              return (
                                <tr>
                                  <>
                                    <td scope="row">{item?.policeService}</td>
                                    <td>
                                      {moment(item?.startDate).format(
                                        "YYYY-MM-DD"
                                      )}
                                    </td>
                                    <td>$566.25</td>
                                  </>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </Card>
                    </Col>
                  </Row>
                  <Modal
                    size="lg"
                    style={{ maxWidth: "1600px", width: "80%" }}
                    isOpen={this.state.modal}
                    toggle={() => {
                      this.setState({ modal: !this.state.modal });
                    }}
                  >
                    <ModalHeader>Update Password </ModalHeader>
                    <ModalBody>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Current Password
                            </label>
                            <Input
                              type="password"
                              className="form-control-alternative"
                              // defaultValue={data?.city}
                              id="input-city"
                              placeholder="Current Password"
                              // type="text"
                              onChange={(text) =>
                                this.setState({
                                  currentPass: text.target.value,
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              New Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              // defaultValue={data?.country}
                              id="input-country"
                              placeholder="New Password"
                              type="password"
                              onChange={(text) =>
                                this.setState({ newPass: text.target.value })
                              }
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Confirm Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              placeholder="Confirm Password"
                              type="password"
                              // defaultValue={data?.postalCode}
                              onChange={(text) =>
                                this.setState({
                                  confirmPass: text.target.value,
                                })
                              }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="bg-white"
                        onClick={() => {
                          this.OnChangePassword();
                        }}
                      >
                        Save
                      </Button>{" "}
                      <Button
                        color="primary"
                        onClick={() => {
                          this.onClose();
                        }}
                      >
                        Continue
                      </Button>{" "}
                      <Button
                        color="primary"
                        onClick={() => {
                          this.onClose();
                        }}
                      >
                        Close
                      </Button>{" "}
                    </ModalFooter>
                  </Modal>
                </Container>
              )}
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
          )}
        </>
      </>
    );
  }
}

export default Index;
