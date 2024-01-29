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
  Container,
  Row,
  Button,
  UncontrolledTooltip,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from "reactstrap";
import '../../appstyle.css'
import Maps from "./Maps";
import * as moment from 'moment'
import Header from "components/Headers/Header.js";
import { getAllLogs, getLogsRoles } from "../../APIstore/apiCalls";
import config from "config";
function Logs(props) {
  const [data, setData] = useState([]);
  const [mapModal, setMapModal] = useState(false);
  useEffect(() => {
    try {
      getAllLogs('', async (res) => {
        if (res.sucess) {
          console.log("res.sucess", res.sucess)
          setData(res.sucess)
        } else {
          console.log("errrrr")
        }
      });
    } catch (error) {
      console.log("error", error)
    }
  }, [])
  const toggleMap = () => {
    setMapModal(!mapModal)
  }
  const ChangeStatusJob = (status) => {
    if (status) {
      try {
        getLogsRoles(status, async (res) => {
          if (res.sucess) {
            console.log("res.sucess", res.sucess)
            setData(res.sucess)
          } else {
            console.log("errrrr")
          }
        });
      } catch (error) {
        console.log("error", error)
      }
    }
    else {
      try {
        getAllLogs('', async (res) => {
          if (res.sucess) {
            console.log("res.sucess", res.sucess)
            setData(res.sucess)
          } else {
            console.log("errrrr")
          }
        });
      } catch (error) {
        console.log("error", error)
      }
    }
  }
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h3 className="mb-0">Logs</h3>
                  <UncontrolledDropdown style={{ marginLeft: 10 }}>
                    <DropdownToggle
                      className="btn-icon-only text-light"
                      style={{
                        width: 80,
                        height: 32
                      }}
                      role="button"
                      size="sm"
                      color=""
                      onClick={e => e.preventDefault()}
                    >
                      Filter
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem

                        onClick={() => { ChangeStatusJob('') }}
                      >
                        {config.all}
                      </DropdownItem>
                      <DropdownItem

                        onClick={() => { ChangeStatusJob('admin') }}
                      >
                        Admin
                      </DropdownItem>
                      <DropdownItem

                        onClick={() => { ChangeStatusJob('driver') }}
                      >
                        Driver
                      </DropdownItem>
                      <DropdownItem

                        onClick={() => { ChangeStatusJob('staff') }}
                      >
                        Staff
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Email(Username)</th>
                    <th scope="col">Role</th>
                    <th scope="col">LoggedIn Time</th>
                    <th scope="col" />
                  </tr>
                </thead>
                {data ? (
                  <tbody>
                    {data.map((item) => {
                      return (
                        <tr>
                          <td className="text-sm"> {item?.username}</td>
                          <td className="text-sm">{item?.role}</td>
                          <td className="text-sm">
                            {item?.loggedInTime ? moment(item?.loggedInTime).format('YYYY-MM-DD hh:mm:ss') : ''}
                          </td>
                          {/* <td>
                            <Button onClick={() => { toggleMap() }} className="my-4" color="primary" type="button">
                              {config.goToLocation}
                            </Button>
                          </td>  */}
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
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                              >
                                Action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                              >
                                Another action
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                              >
                                Something else here
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td> */}
                        </tr>
                      )
                    })}
                  </tbody>
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
        <Modal size="lg" style={{ maxWidth: '1600px', width: '80%' }} isOpen={mapModal} toggle={() => { toggleMap() }} className={props.className}>
          <ModalHeader>{config.towRequestLocation}</ModalHeader>
          <ModalBody>
            <Maps lat={43.648390} lng={-79.876260} data={'hide'}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => { toggleMap() }}>{config.close}</Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
}

export default Logs;
