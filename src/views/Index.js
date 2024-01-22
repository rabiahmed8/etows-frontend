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
  Col
} from "reactstrap";
import { useLocation, useHistory, Link } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';
// core components

import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";
import { Redirect } from 'react-router-dom';
import Header from "components/Headers/Header.js";
import Maps from "./examples/Maps";
import { getLoggedinApi, getUserData } from "../APIstore/apiCalls";
const data = {
  labels: ["Pending Calls", "Service", "Active",],
  datasets: [
    {
      label: "# of Votes",
      data: [45, 30, 25],
      backgroundColor: [
        "#007D9C",
        "#244D70",
        "#FE452A",
      ],
      borderColor: [
        "rgba(255,99,132,1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      da: '',
      data: [],
      chartExample1Data: "data1"
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  async componentDidMount() {
    // alert(JSON.stringify(this.props.location))
    // const reloadCount = localStorage.getItem('token');
    // if (reloadCount < 2) {
    //   localStorage.setItem('token', String(reloadCount + 1));
    //   window.location.reload();
    // } else {
    //   localStorage.removeItem('token');
    // }

    const id = await localStorage.getItem('access');
    if (id) {
      try {
        getUserData(id, async (res) => {
          if (res.sucess) {
            await localStorage.setItem('accessData', JSON.stringify(res.sucess));
          } else {
            console.log("errrrr")
          }
        });
      } catch (error) {
        console.log("error", error)
      }

    }


    const token = await localStorage.getItem('token');

    // alert(token)
    // alert(token)
    if (!token) {

      await localStorage.clear();
      await window.localStorage.clear();
      window.location.replace('https://api.etows.app:8443/login');
    }
    try {
      getLoggedinApi('', async (res) => {
        if (res.sucess) {
          console.log("res.dsgdf", res.sucess.roles[0])
          this.setState({ data: res.sucess.roles[0] })
          let role = res.sucess.roles[0];
          if (role == 'DRIVER') {
            window.location = '/admin/user-profile';
            return
          }
          if (role == 'POLICE') {
            window.location = '/admin/user-profile';
            return
          }
          if (role == 'STAFF') {
            window.location = '/admin/user-profile';
            return
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
          console.log("errrrr")
        }
      });
    } catch (error) {
      console.log("error", error)
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
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };
  render() {
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
        {(this.state.data == 'ADMIN' || this.state.data == 'POLICE_ADMIN' || this.state.data == 'TOW_ADMIN') && (
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
                        <h2 className="text-white mb-0">Show Tracker & Drivers On Duty</h2>
                      </div>
                      {/* <div className="col">
                        <Nav className="justify-content-end" pills>
                          <NavItem>
                            <NavLink
                              className={classnames("py-2 px-3", {
                                active: this.state.activeNav === 1
                              })}
                              href="#pablo"
                              onClick={e => this.toggleNavs(e, 1)}
                            >
                              <span className="d-none d-md-block">Month</span>
                              <span className="d-md-none">M</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames("py-2 px-3", {
                                active: this.state.activeNav === 2
                              })}
                              data-toggle="tab"
                              href="#pablo"
                              onClick={e => this.toggleNavs(e, 2)}
                            >
                              <span className="d-none d-md-block">Week</span>
                              <span className="d-md-none">W</span>
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </div> */}
                    </Row>
                  </CardHeader>
                  <CardBody className="addHeight">
                    <Maps lat={43.648390} lng={-79.876260} />
                    {/* Chart */}
                    {/* <div className="chart">
                    <Line
                      data={chartExample1[this.state.chartExample1Data]}
                      options={chartExample1.options}
                      getDatasetAtEvent={e => console.log(e)}
                    />
                    <Maps lat = {43.648390} lng = {-79.876260}/>
                  </div> */}
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
                        <h2 className="mb-0">Pending Calls</h2>
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
                      <Pie data={data} />
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
                        <h3 className="mb-0">List of Impounded Cars</h3>
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
                  <Table className="align-items-center table-flush additional" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Date In</th>
                        <th scope="col">License</th>
                        <th scope="col">Make, Model</th>
                        <th scope="col">Release Y/N</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">2022-11-25</th>
                        <td>AABK-789</td>
                        <td>Dodge, Ram</td>
                        <td>
                          {/* <i className="fas fa-arrow-up text-success mr-3" />{" "} */}
                          YES
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">2022-10-30</th>
                        <td>ABMY-442</td>
                        <td>Toyota, Corolla</td>
                        <td>
                          {/* <i className="fas fa-arrow-down text-warning mr-3" />{" "} */}
                          NO
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">2022-10-29</th>
                        <td>BMMF-256</td>
                        <td>Ford, Mustang</td>
                        <td>
                          {/* <i className="fas fa-arrow-down text-warning mr-3" />{" "} */}
                          NO
                        </td>
                      </tr>
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
                        <h3 className="mb-0">List of Invoices</h3>
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
                  <Table className="align-items-center table-flush additional" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Company</th>
                        <th scope="col">Amount</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">York Regional Police</th>
                        <td>$3358.22</td>
                        {/* <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">60%</span>
                            <div>
                              <Progress
                                max="100"
                                value="60"
                                barClassName="bg-gradient-danger"
                              />
                            </div>
                          </div>
                        </td> */}
                      </tr>
                      <tr>
                        <th scope="row">York Regional Police</th>
                        <td>$450.00</td>
                        {/* <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">70%</span>
                            <div>
                              <Progress
                                max="100"
                                value="70"
                                barClassName="bg-gradient-success"
                              />
                            </div>
                          </div>
                        </td> */}
                      </tr>
                      <tr>
                        <th scope="row">York Region By-Law</th>
                        <td>$566.25</td>
                        {/* <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">80%</span>
                            <div>
                              <Progress max="100" value="80" />
                            </div>
                          </div>
                        </td> */}
                      </tr>
                      {/* <tr>
                        <th scope="row">Instagram</th>
                        <td>3,678</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">75%</span>
                            <div>
                              <Progress
                                max="100"
                                value="75"
                                barClassName="bg-gradient-info"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">twitter</th>
                        <td>2,645</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">30%</span>
                            <div>
                              <Progress
                                max="100"
                                value="30"
                                barClassName="bg-gradient-warning"
                              />
                            </div>
                          </div>
                        </td>
                      </tr> */}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </>
    );
  }
}

export default Index;
