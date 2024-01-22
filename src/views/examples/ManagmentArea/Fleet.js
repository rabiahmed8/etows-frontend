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
  Modal, ModalHeader, ModalBody, ModalFooter,
  Input,
  CardBody,
  Form,
  FormGroup,

} from "reactstrap";
import { Document, Page } from 'react-pdf';
import Select from 'react-select';
import { Link } from "react-router-dom";
import * as moment from 'moment'
// core components
import Header from "components/Headers/Header.js";
import { singleAllAgency, singleAllCorporate, singleDeleteAgency, singleDeleteCorporate, singleSaveAgency, singleSaveCorporate, singleUpdateAgency, singleUpdateCorporate } from "../../../APIstore/apiCalls";
import { CsvToHtmlTable } from 'react-csv-to-table';
import toast, { Toaster } from 'react-hot-toast';
import config from "config";
import { successAlert, errorAlert, emailValidator } from '../../../Theme/utils';
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import DateTimePicker from 'react-datetime-picker';
import UploadModal from "component/UploadModal";
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});
var hoistData = {};
function Fleet(props) {
  const { classes } = props;
  const [data, setData] = useState([]);
  const [ViewImagemodal, setViewImageModal] = useState(false);
  const [setItem, setItemData] = useState('');
  const [modalUpdate, setModalUpdate] = useState(false);
  const [sampleData, setsampleData] = useState('https://api.etows.app:9000/file/files/9/Police/users-list%20(1).xlsx');
  const [statusData, setStatusData] = useState([]);
  const [imageLink, setImageLink] = useState('');
  const [typeTruck, setTypeTruck] = useState('')
  const [userDetail, setUserDetail] = useState({});
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [truckName, setTruckName] = useState('');
  const [description, setDescription] = useState('')
  const [position1, setPosition1] = useState('')
  const [phone1, setPhone1] = useState('')
  const [email1, setEmail1] = useState('')
  const [address1, setAddress1] = useState('')
  const [name2, setName2] = useState('')
  const [position2, setPosition2] = useState('')
  const [phone2, setPhone2] = useState('')
  const [email2, setEmail2] = useState('')
  const [address2, setAddress2] = useState('')
  const [showOther, setShowOther] = useState(false)
  const [ShowSec, setShowSec] = useState(false)
  const [deleteModal, setDeletToggle] = useState(false);
  const [userID, setUserId] = useState('');
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }
  const ViewImagetoggle = () => {
    setViewImageModal(!ViewImagemodal)
  }
  const toggleUpdate = (item) => {
    if (item) {
      setModalUpdate(!modalUpdate);
      setItemData(item)
      hoistData = item;
      console.log("setItemData", hoistData);
    }
    else {
      setModalUpdate(!modalUpdate);
      setItemData('');
    }
  }
  const Deletetoggle = (item) => {
    setUserId(item?.id)
    setDeletToggle(!deleteModal)
  }
  const deleteAPI = () => {
    try {
      singleDeleteCorporate(userID, async (res) => {
        console.log("adasdasd", res)
        if (res.sucess) {
          try {
            singleAllCorporate('', async (res) => {
              console.log("singleAllAgency", res)
              if (res.sucess) {
                setData(res.sucess.list);
                console.log("res.sucess.list", res.sucess.list);
                setDeletToggle(!deleteModal)
              } else {
                console.log("errrrr")
                setDeletToggle(!deleteModal)
              }
            });
          } catch (error) {
            console.log("error", error)
            setDeletToggle(!deleteModal)
          }
          successAlert(res.sucess.messages[0].message)
        } else {
          errorAlert(res.sucess.messages[0].message)
        }
      });
    } catch (error) {
      errorAlert(error)
    }
  }
  useEffect(() => {

    try {
      singleAllCorporate('', async (res) => {
        console.log("adasdasd", res)
        if (res.sucess) {
          setData(res.sucess.list);
          console.log("res.sucess.list", res.sucess.list);
        } else {
          console.log("errrrr")
        }
      });
    } catch (error) {
      console.log("error", error)
    }
  }, [setItem])
  const OnSubmit = async () => {
    const getdata = await localStorage.getItem('loggedData')
    let loggedData = JSON.parse(getdata)
    let API = Object.keys(hoistData).length > 0 ? singleUpdateCorporate : singleSaveCorporate;
    console.log("hoistData", hoistData);
    const obj = {
      id: hoistData?.id ? hoistData?.id : 0,
      name: truckName === undefined || truckName === '' ? hoistData?.name : truckName,
      type: 'fleet',
      description: description === undefined || description === '' ? hoistData?.description : description,
      companyId: loggedData.companyId ? loggedData.companyId : null,
    }
    console.log("ooobb", obj);

    try {
      API(obj, async (res) => {
        console.log("qq", res);
        if (res.sucess) {
          try {
            singleAllCorporate('', async (res) => {
              console.log("adasdasd", res)
              if (res.sucess) {
                setData(res.sucess.list);
                console.log("res.sucess.list", res.sucess.list);
              } else {
                console.log("errrrr")
              }
            });
          } catch (error) {
            console.log("error", error)
          }
          setModalUpdate(!modalUpdate)
          successAlert(res.sucess.messages[0].message)
          console.log("res.sucess", res.sucess);
        } else {
          setModalUpdate(!modalUpdate)
          console.log("eeee", res.sucess);
          errorAlert(res.sucess.messages[0].message)
        }
      });
    } catch (error) {
      console.log("error", error);
      // setModalUpdate(!modalUpdate)
      errorAlert(error)
    }
    // }
  }

  const ChangeStatusJob = (status) => {
    console.log("fff", data);
    console.log("fff", status);
    if (status == 'Police') {
      let result = data.filter(el => el.agencyType === status);
      setData(result)
    }
    else {
      try {
        singleAllAgency('', async (res) => {
          if (res.sucess) {
            console.log("res.sucess", res.sucess)
            setData(res.sucess.list)
          } else {
            console.log("errrrr")
          }
        });
      } catch (error) {
        console.log("error", error)
      }
    }
    setStatusData(status)
  }
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>

        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>
                  <h3 className="mb-0">{config.fleet}</h3>
                  <UncontrolledDropdown style={{ marginLeft: 10 }}>
                    <DropdownToggle
                      className="btn-icon-only text-light"

                      role="button"
                      size="sm"
                      color=""
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem

                        onClick={() => { ChangeStatusJob('All') }}
                      >
                        All
                      </DropdownItem>
                      <DropdownItem

                        onClick={() => { ChangeStatusJob('Police') }}
                      >
                        {config.police}
                      </DropdownItem>
                      <DropdownItem

                        onClick={() => { ChangeStatusJob('By Law') }}
                      >
                        {config.byLaw}
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <Button style={{ position: "absolute", right: 20, top: -7, }} onClick={() => { toggleUpdate() }} className="my-4 p-btm" color="primary" type="button">
                    Add New
                  </Button>
                </Row>

              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                {data.length > 0 ? (
                  <>
                    <thead className="thead-light">
                      <tr>

                        <th scope="col">ID</th>
                        <th scope="col">Truck Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Description</th>
                        <th scope="col" />
                      </tr>
                    </thead>

                    <tbody>
                      {data.map((item) => {
                        return (
                          <tr>
                            <Link

                              to={{
                                pathname: "/admin/fleet-detail",
                                state: item // your data array of objects
                              }}
                            // target='_blank'
                            > <td style={{ textDecoration: 'underline black', cursor: "pointer" }}
                              // onClick={() => { toggle(item) }} 
                              className="text-sm">{item?.id}</td></Link>
                            <td className="text-sm">{item?.name}</td>
                            <td className="text-sm">
                              {item?.type}
                            </td>
                            <td className="text-sm">
                              {item?.description}
                            </td>
                            <td className="text-right">
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
                                    onClick={() => { toggleUpdate(item) }}
                                  >
                                    Update
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => { Deletetoggle(item) }}
                                  >
                                    Delete
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                        )
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
        <Modal size="lg" style={{ maxWidth: '1600px', width: '80%' }} isOpen={ViewImagemodal} toggle={() => { ViewImagetoggle() }} className={props.className}>
          <ModalBody>

            {/* <CsvToHtmlTable
              data={sampleData}
              csvDelimiter=","
              tableClassName="table table-striped table-hover"
            /> */}
            <h3>{imageLink ? imageLink : 'Please Upload image'}</h3>
            <Document file="https://api.etows.app:9000/file/files/9/Police/Resume-Tayyab.pdf" onLoadSuccess={onDocumentLoadSuccess}>
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


        <Modal size="lg" style={{ maxWidth: '1600px', width: '80%' }} isOpen={modalUpdate} toggleUpdate={() => { toggleUpdate() }} className={props.className}>
          <ModalBody>
            <Row>

              <Col className="order-xl-1" xl="12">
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">{hoistData ? config.updateUser : "Add New"}</h3>
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
                                onChange={text => setTruckName(text.target.value)}
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
                                onChange={text => setDescription(text.target.value)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <div className="save-close-div">
                            <Button
                              onClick={() => { OnSubmit() }}
                              // onClick={() => { handleOnChange(25) }}
                              className="p-btm my-4 save-close" color="primary" type="button">
                              {config.save}
                            </Button>

                            <Button color="primary" className='s-btm my-4 save-close' onClick={() => { toggleUpdate() }}>{config.close}</Button>
                          </div>
                        </Row>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal>
        {/* delete */}
        <Modal isOpen={deleteModal} toggle={() => { Deletetoggle() }} className={props.className}>
          <ModalHeader toggle={() => { Deletetoggle() }}>Delete</ModalHeader>
          <ModalBody>
            Are you sure want to delete?
          </ModalBody>
          <ModalFooter>
            <Button className="my-4 p-btm" color="primary" onClick={() => { deleteAPI() }}>Yes</Button>{' '}
            <Button className="my-4 s-btm" color="secondary" onClick={() => { Deletetoggle() }}>No</Button>
          </ModalFooter>
        </Modal>
      </Container>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: 'green',
            },
          },
          error: {
            style: {
              background: 'red',
            },
          },
        }}
      />
    </>
  );
}
Fleet.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Fleet);