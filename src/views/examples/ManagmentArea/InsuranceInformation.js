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
  FormGroup
} from "reactstrap";
import { Document, Page } from 'react-pdf';
import Select from 'react-select';
import * as moment from 'moment'
// core components
import Header from "components/Headers/Header.js";
import { getAgencies, SaveAgencies, UpdateAgencies, UploadContractsApi, getUploadData } from "../../../APIstore/apiCalls";
import { CsvToHtmlTable } from 'react-csv-to-table';
import toast, { Toaster } from 'react-hot-toast';
import config from "config";
import { successAlert, errorAlert, emailValidator } from '../../../Theme/utils';
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import DateTimePicker from 'react-datetime-picker';
const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});
function InsuranceInformation(props) {
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
  const [dateTimepickerIssueDate, onChangeIssueDate] = useState(new Date());
  const [dateTimepickerExpiryDate, onChangeExpiryDate] = useState(new Date());

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }

  const ViewImage = (item) => {
    const obj = {
      type: item?.agencyType,
      id: item?.id
    }
    try {
      getUploadData(obj, async (res) => {
        console.log("adasdasd", res)
        if (res.sucess) {
          console.log("res.sucess.fileInfoList[0].url", res.sucess.fileInfoList[0].url)
          setImageLink(res.sucess.fileInfoList[0].url);
          ViewImagetoggle();
        } else {
          console.log("errrrr");
          // ViewImagetoggle();
        }
      });
    } catch (error) {
      console.log("error", error)
    }
  }
  const ViewImagetoggle = () => {
    setViewImageModal(!ViewImagemodal)
  }
  const toggleUpdate = (item) => {
    if (item) {
      setModalUpdate(!modalUpdate);
      setItemData(item)
    }
    else {
      setModalUpdate(!modalUpdate);
      setItemData('');
    }
  }

  useEffect(() => {
    try {
      getAgencies('', async (res) => {
        console.log("adasdasd", res)
        if (res.sucess) {
          setData(res.sucess.list);
        } else {
          console.log("errrrr")
        }
      });
    } catch (error) {
      console.log("error", error)
    }
  }, [setItem])
  const [csvFile, SetCsvFile] = useState('');
  const handleOnChange = (item) => {
    console.log("iddd", item);
    if (csvFile) {
      try {
        const formData = new FormData();
        formData.append('files', csvFile);
        formData.append('id', item);
        formData.append('fileType', 'Police');
        console.log("sd", csvFile)

        UploadContractsApi(formData, async (res) => {
          if (res.sucess) {
            console.log("res.sucess", res.sucess)
          } else {
            console.log("errrrr")
          }
        });
      } catch (error) {
        console.log("error", error)
      }
    }
    else {
     
    }

  };
  const OnSubmit = () => {
    return
    let API = setItem ? UpdateAgencies : SaveAgencies;
    const obj = [{
      id: setItem ? userDetail.id === undefined ? setItem?.id : setItem.id : userDetail.id === undefined ? setItem?.id : userDetail.id,
      agencyName: userDetail.agencyName === undefined ? setItem?.agencyName : userDetail.agencyName,
      agencyType: userDetail.agencyType === undefined ? setItem?.agencyType : userDetail.agencyType,
      contract: userDetail.contract === undefined ? setItem?.contract : userDetail.contract,
      contract: userDetail.contract === undefined ? setItem?.contract : userDetail.contract,
      contract: userDetail.contract === undefined ? setItem?.contract : userDetail.contract,
      Issue: dateTimepickerIssueDate ? moment(dateTimepickerIssueDate).format('YYYY-MM-DDThh:mm:ss') : '',
      Expiry: dateTimepickerExpiryDate ? moment(dateTimepickerExpiryDate).format('YYYY-MM-DDThh:mm:ss') : '',
    }]
    try {
      API(obj, async (res) => {
        if (res.sucess) {
          handleOnChange(res.sucess.generatedIds[0])
          setModalUpdate(!modalUpdate)
          successAlert(res.sucess.messages[0].message)

        } else {
          setModalUpdate(!modalUpdate)
          errorAlert(res.sucess.messages[0].message)
        }
      });
    } catch (error) {
      setModalUpdate(!modalUpdate)
      errorAlert(error)
    }
    // }
  }
  const textOnchange = (text, name) => {
    const val = text.target.value;
    console.log("Asdas", val)
    let user = userDetail;
    user[name] = val;
    setUserDetail(user);
  };
  const ChangeStatusJob = (status) => {
    console.log("fff", data);
    console.log("fff", status);
    if (status == 'Police') {
      let result = data.filter(el => el.agencyType === status);
      setData(result)
    }
    else {
      try {
        getAgencies('', async (res) => {
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
                  <h3 className="mb-0">{config.InsuranceInformation}</h3>
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
                  {/* <h3 style={{ position: "absolute", right: 20, top: 25, }} className="mb-0">Keep Scrolling ►</h3> */}
                </Row>

              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>

                    <th scope="col">ID</th>
                    <th scope="col">Commercial LI</th>
                    <th scope="col">Automobile LI</th>
                    <th scope="col">Garage LI</th>
                    <th scope="col">WSIB</th>
                    {/* <th scope="col">Issue Date</th>
                    <th scope="col">Expiry Date</th> */}
                    <th>
                      <Button onClick={() => { toggleUpdate() }} className="my-4 p-btm" color="primary" type="button">
                        Add
                      </Button>
                    </th>
                    <th scope="col" />
                  </tr>
                </thead>
                {data ? (
                  <tbody>
                    {data.map((item) => {
                      return (
                        <tr>
                          <td className="text-sm">{item?.id}</td>
                         
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
                            <Button onClick={() => { ViewImage(item) }} className="my-4 p-btm" color="primary" type="button">
                              View
                            </Button>
                          </td>
                          <td className="text-sm">
                            <Button onClick={() => { ViewImage(item) }} className="my-4 p-btm" color="primary" type="button">
                              View
                            </Button>
                          </td>
                          {/* <td className="text-sm">
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
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
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
                        <h3 className="mb-0">{setItem ? config.updateUser : "ADD"}</h3>
                      </Col>

                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <h6 className="heading-small text-muted mb-4">
                        {config.InsuranceInformation}
                      </h6>
                      <div className="pl-lg-3">
                       
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <div className="flex-class">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Commercial Liability Insurance
                                </label>
                                <input
                                  accept="image/*"
                                  className={classes.input}
                                  id="contained-button-file"
                                  multiple
                                  type="file"
                                  onChange={(e) => {
                                    const files = e.target.files;
                                    console.log(files[0].name);
                                  }}
                                />
                                <label htmlFor="contained-button-file">
                                  <Button variant="contained" component="span" className='p-btm'>
                                    Upload File
                                  </Button>
                                </label>
                              </div>
                            </FormGroup>

                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <div className="flex-class">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Automobile Liability Insurance
                                </label>
                                <input
                                  accept="image/*"
                                  className={classes.input}
                                  id="contained-button-file"
                                  multiple
                                  type="file"
                                  onChange={(e) => {
                                    const files = e.target.files;
                                    console.log(files[0].name);
                                  }}
                                />
                                <label htmlFor="contained-button-file">
                                  <Button variant="contained" component="span" className='p-btm'>
                                    Upload File
                                  </Button>
                                </label>
                              </div>
                            </FormGroup>
                          </Col>
                        
                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <div className="flex-class">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Garage Liability Insurance
                                </label>
                                <input
                                  accept="image/*"
                                  className={classes.input}
                                  id="contained-button-file"
                                  multiple
                                  type="file"
                                  onChange={(e) => {
                                    const files = e.target.files;
                                    console.log(files[0].name);
                                  }}
                                />
                                <label htmlFor="contained-button-file">
                                  <Button variant="contained" component="span" className='p-btm'>
                                    Upload File
                                  </Button>
                                </label>
                              </div>
                            </FormGroup>

                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <div className="flex-class">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  WSIB
                                </label>
                                <input
                                  accept="image/*"
                                  className={classes.input}
                                  id="contained-button-file"
                                  multiple
                                  type="file"
                                  onChange={(e) => {
                                    const files = e.target.files;
                                    console.log(files[0].name);
                                  }}
                                />
                                <label htmlFor="contained-button-file">
                                  <Button variant="contained" component="span" className='p-btm'>
                                    Upload File
                                  </Button>
                                </label>
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>

                        {/* <Row>
                          <Col lg="6">
                            <FormGroup>
                              <Label>Issue Date</Label>
                        
                              <DateTimePicker onChange={onChangeIssueDate} value={dateTimepickerIssueDate} />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <Label>Expiry Date</Label>
                             
                              <DateTimePicker onChange={onChangeExpiryDate} value={dateTimepickerExpiryDate} />
                            </FormGroup>
                          </Col>
                        </Row> */}
                        <Row>
                          <div className="save-close-div">
                            <Button onClick={() => { OnSubmit() }} className="p-btm my-4 save-close" color="primary" type="button">
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
InsuranceInformation.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(InsuranceInformation);
