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
// core components
import Header from "components/Headers/Header.js";
import { AvailableDriversApi } from "../../APIstore/apiCalls";
import config from "config";
function AvailableDrivers(props) {
  const [data, setData] = useState([]);
  const [mapModal, setMapModal] = useState(false);
  useEffect(() => {
    try {
      AvailableDriversApi('', async (res) => {
        if (res.sucess) {
          console.log("res.sucess.usersOnJobList", res.sucess?.usersOnJobList)
          setData(res.sucess?.usersOnJobList)
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
                            <Button onClick={() => { toggleMap() }} className="my-4" color="primary" type="button">
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
            <Maps lat = {43.648390} lng = {-79.876260}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => { toggleMap() }}>{config.close}</Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
}

export default AvailableDrivers;
