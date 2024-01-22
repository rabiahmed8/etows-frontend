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
import { singleAllAgency, singleDeleteAgency, singleSaveAgency, singleUpdateAgency } from "../../../APIstore/apiCalls";
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
function GovtAgencyContacts(props) {
  const { classes } = props;
  const [data, setData] = useState([]);
  const [ViewImagemodal, setViewImageModal] = useState(false);
  const [setItem, setItemData] = useState('');
  const [modalUpdate, setModalUpdate] = useState(false);
  const [sampleData, setsampleData] = useState('https://api.etows.app:9000/file/files/9/Police/users-list%20(1).xlsx');
  const [statusData, setStatusData] = useState([]);
  const [imageLink, setImageLink] = useState('');
  const [typeAgency, setAgencyType] = useState('')
  const [userDetail, setUserDetail] = useState({});
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [agencyName, setAgencyName] = useState('');
  const [name1, setName1] = useState('')
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
      singleDeleteAgency(userID, async (res) => {
        console.log("adasdasd", res)
        if (res.sucess) {
          try {
            singleAllAgency('', async (res) => {
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
      singleAllAgency('', async (res) => {
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
    let API = Object.keys(hoistData).length > 0 ? singleUpdateAgency : singleSaveAgency;
    console.log("hoistData", hoistData);
    const obj = {
      id: hoistData?.id ? hoistData?.id : 0,
      agencyName: agencyName === undefined || agencyName === '' ? hoistData?.agencyName : agencyName,
      agencyType: typeAgency === undefined || typeAgency === '' ? hoistData?.agencyType : typeAgency,
      primaryName: name1 === undefined || name1 === '' ? hoistData?.name1 : name1,
      primaryPosition: position1 === undefined || position1 === '' ? hoistData?.position1 : position1,
      primaryPhone: hoistData?.phone1 ? hoistData?.phone1 : phone1,
      primaryEmail: email1 === undefined || email1 === '' ? hoistData?.email1 : email1,
      primaryAddress: address1 === undefined || address1 === '' ? hoistData?.address1 : address1,
      secondaryName: name2 === undefined || name2 === '' ? hoistData?.name2 : name2,
      secondaryPosition: position2 === undefined || position2 === '' ? hoistData?.position2 : position2,
      secondaryPhone: phone2 === undefined || phone2 === '' ? hoistData?.phone2 : phone2,
      secondaryEmail: email2 === undefined || email2 === '' ? hoistData?.email2 : email2,
      secondaryAddress: address2 === undefined || address2 === '' ? hoistData?.address2 : address2,
      companyId: loggedData.companyId ? loggedData.companyId : null,
    }
    console.log("ooobb", obj);

    try {
      API(obj, async (res) => {
        console.log("qq", res);
        if (res.sucess) {
          try {
            singleAllAgency('', async (res) => {
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
                  <h3 className="mb-0">{config.govtAgency}</h3>
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
                  {/* <Link

                    to={{
                      pathname: "/admin/agency-detail",
                      state: '' // your data array of objects
                    }}>
                    Add New
                  </Link> */}
                </Row>

              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                {data.length > 0 ? (
                  <>
                    <thead className="thead-light">
                      <tr>

                        <th scope="col">ID</th>
                        <th scope="col">Agency Name</th>
                        <th scope="col">Agency Type</th>
                        {/* <th scope="col">Contract</th>
                        <th scope="col">Fees Agrement</th>
                        <th scope="col">Invoices</th>
                        <th scope="col">Issue Date</th>
                        <th scope="col">Expiry Date</th> */}
                        <th scope="col" />
                      </tr>
                    </thead>

                    <tbody>
                      {data.map((item) => {
                        return (
                          <tr>
                            <Link

                              to={{
                                pathname: "/admin/agency-detail",
                                state: item // your data array of objects
                              }}
                            // target='_blank'
                            > <td style={{ textDecoration: 'underline black', cursor: "pointer" }}
                              // onClick={() => { toggle(item) }} 
                              className="text-sm">{item?.id}</td></Link>
                            {/* <td className="text-sm">{item?.id}</td> */}
                            <td className="text-sm">{item?.agencyName}</td>
                            <td className="text-sm">
                              {item?.agencyType}
                            </td>
                            {/* <td className="text-sm">
                              <Button onClick={() => { ViewImage(item) }} className="my-4 p-btm" color="primary" type="button">
                                View
                              </Button>
                            </td>
                            <td className="text-sm">
                              <Button onClick={() => { ViewImage(item) }} className="my-4 p-btm" color="primary" type="button">
                                View
                              </Button>
                            </td>
                            <td className="text-sm">
                              <Button onClick={() => { ViewImage(item) }} className="my-4 p-btm" color="primary" type="button">
                                View
                              </Button>
                            </td>
                            <td className="text-sm">
                              {item?.agencyType}
                            </td>
                            <td className="text-sm">
                              {item?.agencyType}
                            </td>
                            <td className="text-sm">
                              {item?.agencyType}
                            </td> */}
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
                                  {/* <DropdownItem

                                  onClick={() => { toggleUpdate() }}
                                >
                                  Add
                                </DropdownItem> */}
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
                        {config.govtAgency}
                      </h6>
                      <div className="pl-lg-3">
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                Agency Name
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={hoistData?.agencyName}
                                id="input-first-name"
                                placeholder="Agency Name"
                                type="text"
                                onChange={text => setAgencyName(text.target.value)}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <Label for="exampleSelect">Agency Type</Label>

                              <Select
                                name="form-field-name"
                                // value={this.state.value}
                                // defaultValue={hoistData?.agencyType}
                                defaultInputValue={hoistData?.agencyType}
                                // val={hoistData?.agencyType}
                                onChange={(val) => {
                                  setAgencyType(val.label)
                                  if (val.label == 'Other') {
                                    setShowOther(true);
                                  }
                                  else {
                                    setShowOther(false);
                                  }
                                }}
                                labelKey='name'
                                valueKey='countryCode'
                                options={[
                                  { value: 'police', label: 'Police' },
                                  { value: 'bylaw', label: 'By Law' },
                                  { value: 'other', label: 'Other' }
                                ]}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        {showOther && (
                          <Row>
                            <Col lg="12">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                >
                                  Other
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  defaultValue={hoistData?.agencyType}
                                  id="input-first-name"
                                  placeholder="Other"
                                  type="text"
                                  onChange={text => setAgencyType(text.target.value)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        )}
                        <h6 className="heading-small text-muted mb-4">
                          {config.contact1}
                        </h6>
                        <Row>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                Name
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={hoistData?.primaryName}
                                id="input-first-name"
                                placeholder="Name"
                                type="text"
                                onChange={text => setName1(text.target.value)}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                Position
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={hoistData?.primaryPosition}
                                id="input-first-name"
                                placeholder="Position"
                                type="text"
                                onChange={text => setPosition1(text.target.value)}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                Phone
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={hoistData?.primaryPhone}
                                id="input-first-name"
                                placeholder="Phone"
                                type="text"
                                onChange={text => setPhone1(text.target.value)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                Email
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={hoistData?.primaryEmail}
                                id="input-first-name"
                                placeholder="Email"
                                type="text"
                                onChange={text => setEmail1(text.target.value)}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                Address
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={hoistData?.primaryAddress}
                                id="input-first-name"
                                placeholder="Address"
                                type="text"
                                onChange={text => setAddress1(text.target.value)}
                              />
                            </FormGroup>
                          </Col>

                        </Row>
                        <div style={{ display: "flex" }}>
                          <h6 className="heading-small text-muted ">
                            {config.contact2}
                          </h6>
                          <div style={{ marginLeft: 20 }} onClick={() => { setShowSec(!ShowSec) }}>
                            {ShowSec ? <AiFillMinusCircle size={22} /> : <AiFillPlusCircle size={22} />}
                          </div>
                        </div>
                        {ShowSec && (
                          <>
                            <Row>
                              <Col lg="4">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-first-name"
                                  >
                                    Name
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    defaultValue={hoistData?.secondaryName}
                                    id="input-first-name"
                                    placeholder="Name"
                                    type="text"
                                    onChange={text => setName2(text.target.value)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-first-name"
                                  >
                                    Position
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    defaultValue={hoistData?.secondaryPosition}
                                    id="input-first-name"
                                    placeholder="Position"
                                    type="text"
                                    onChange={text => setPosition2(text.target.value)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-first-name"
                                  >
                                    Phone
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    defaultValue={hoistData?.secondaryPhone}
                                    id="input-first-name"
                                    placeholder="Phone"
                                    type="text"
                                    onChange={text => setPhone2(text.target.value)}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="4">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-first-name"
                                  >
                                    Email
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    defaultValue={hoistData?.secondaryEmail}
                                    id="input-first-name"
                                    placeholder="Email"
                                    type="text"
                                    onChange={text => setEmail2(text.target.value)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-first-name"
                                  >
                                    Address
                                  </label>
                                  <Input
                                    className="form-control-alternative"
                                    defaultValue={hoistData?.secondaryAddress}
                                    id="input-first-name"
                                    placeholder="Address"
                                    type="text"
                                    onChange={text => setAddress2(text.target.value)}
                                  />
                                </FormGroup>
                              </Col>

                            </Row>
                          </>
                        )}
                        {/* <Row>
                          <Col lg="4">
                            <FormGroup>
                              <div className="flex-class mb-4">
                                <Label for="exampleSelect">Invoices</Label>
                                <Button
                                  onClick={() => { setOpenInvoiceModal(!openInvoiceModal) }}
                                  // onClick={() => { handleOnChange(25) }}
                                  className="p-btm  save-close" color="primary" type="button">
                                  Upload
                                </Button>
                              </div>
                            </FormGroup>

                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <div className="flex-class">
                                <Label for="exampleSelect">Contracts</Label>
                                <Button
                                  onClick={() => { setOpenContractModal(!openContractModal) }}
                                  // onClick={() => { handleOnChange(25) }}
                                  className="p-btm  save-close" color="primary" type="button">
                                  Upload
                                </Button>
                              </div>
                            </FormGroup>

                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <div className="flex-class">
                                <Label for="exampleSelect">Fee Agrement</Label>
                                <Button
                                  onClick={() => { setOpenFeeAgrementModal(!openfeeAgrementModal) }}
                                  // onClick={() => { handleOnChange(25) }}
                                  className="p-btm  save-close" color="primary" type="button">
                                  Upload
                                </Button>
                              </div>
                            </FormGroup>

                          </Col>
                        </Row> */}
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
GovtAgencyContacts.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(GovtAgencyContacts);