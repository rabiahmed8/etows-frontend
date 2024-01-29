import React, { useEffect, useRef, useState } from "react";

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
// core components
import Header from "components/Headers/Header.js";
import { getOnDutyDrivers, getLocationDriver } from "../../APIstore/apiCalls";
import config from "config";
let timerId;
function AvailableDrivers(props) {
  const [data, setData] = useState([]);
  const [dataLatLng, setDataLatLng] = useState([]);
  const [mapModal, setMapModal] = useState(false);
  const [itemsData, setItemData] = useState();
  // const timerId = useRef(null)
  const movies = React.useRef(null);

  const init = async () => {
    let logData;
    let localAccessData = null
    const storedData = await localStorage.getItem('accessData')
    if (storedData) {
      const getdata = await localStorage.getItem('accessData')
      logData = JSON.parse(getdata)
      localAccessData = logData
    }
    else {
      const getdata = await localStorage.getItem('loggedData')
      logData = JSON.parse(getdata)
    }
    if (localAccessData == null) {
      try {
        getOnDutyDrivers('', async (res) => {
          if (res.sucess) {
            setData(res.sucess?.usersOnJobList)
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
        getOnDutyDrivers(logData?.companyId, async (res) => {
          if (res.sucess) {
            setData(res.sucess?.usersOnJobList)
          } else {
            console.log("errrrr")
          }
        });
      } catch (error) {
        console.log("error", error)
      }
    }
  }
  useEffect(() => {
    init()
    if (mapModal) {
      callagain(itemsData)
    }
    else {
      clearTimeout(timerId)
    }
  }, [mapModal])
  const callagain = (item) => {
    timerId = setInterval(function () {
      try {
        getLocationDriver(item?.id ? item?.id : '', async (res) => {
          if (res.sucess) {
            setDataLatLng(res.sucess);
          } else {
            console.log("errrrr")
          }
        });
      } catch (error) {
        console.log("error", error)
      }
    }, 5000);

  }
  const toggleMap = (item) => {
    setItemData(item)
    try {
      getLocationDriver(item.id ? item.id : '', async (res) => {
        if (res.sucess) {
          setDataLatLng(res.sucess);
          setMapModal(true);
        } else {
          console.log("errrrr")
        }
      });
    } catch (error) {
      console.log("error", error)
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
                <h3 className="mb-0">{config.availableDrivers}</h3>
                {/* <h3 style={{ position: "absolute", right: 20, top: 25, }} className="mb-0">Keep Scrolling ►</h3> */}
              </CardHeader>
              {data.length > 0 ? (
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Email</th>
                      <th scope="col">Name</th>
                      {/* <th scope="col">Address</th> */}
                      {/* <th scope="col">City</th> */}
                      <th scope="col">Phone</th>
                      <th scope="col">Location</th>
                      {/* <th scope="col">Role</th> */}
                      {/* <th scope="col">Gender</th> */}
                      <th scope="col" />
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((item) => {
                      return (
                        <tr>
                          {/* <th scope="row">
                          <Media className="align-items-center">
                            <a
                              className="avatar rounded-circle mr-3"
                              href="#pablo"
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
                          <td className="text-sm">{item?.title} {item?.firstName} {item?.lastName}</td>
                          {/* <td className="text-sm">
                            {item?.address}, {item?.city}, {item?.country}
                        </td> */}
                          {/* <td className="text-sm">
                            {item?.city}
                          </td> */}
                          <td className="text-sm">
                            {item?.phone}
                          </td>
                          <td>
                            <Button onClick={() => { toggleMap(item) }} className="my-4" color="primary" type="button">
                              {config.goToLocation}
                            </Button>
                          </td>
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
                </Table>
              ) : (
                <div className="text-center">
                  <h3>No Record Found</h3>
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
            <Maps lat={dataLatLng.lat} lng={dataLatLng.lon} data={'hide'} show={'towtruck'} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => { setMapModal(false) }}>{config.close}</Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
}

export default AvailableDrivers;
