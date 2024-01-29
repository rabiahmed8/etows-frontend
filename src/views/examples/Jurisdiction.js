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
  Button,
  Alert,
  Row,
  Col,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Spinner,
  UncontrolledTooltip,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Input,
  CardBody,
  Form,
  FormGroup,
  Label
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { AllUsersApi, getCSVApi, CreateUsersApiCompany, GetAllUsersApi, AllUsersByType, CheckEnabledDisabled, deleteUser, disableUser, UploadCsvApi, UpdateUserPassword, UpdateUsersApi, companyList, getJurisdictionAll, deleteJurisdiction, addJurisdiction, updateJurisdiction } from "../../APIstore/apiCalls";
import { CsvToHtmlTable } from 'react-csv-to-table';
import axios from 'axios';
import config from "config";
import Select from 'react-select';
import { successAlert, errorAlert, emailValidator } from '../../Theme/utils';
import toast, { Toaster } from 'react-hot-toast';
const optionsComLE = [
  { value: 'POLICE_ADMIN', label: 'LE Admin' },
  { value: 'POLICE', label: 'LE' }
]
const optionsComTow = [
  { value: 'DRIVER', label: 'Driver' },
  { value: 'TOW_ADMIN', label: 'Tow Admin' },
  { value: 'STAFF', label: 'Staff' },
]
function Jurisdiction(props) {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [setItem, setItemData] = useState('');
  const [modalUpdate, setModalUpdate] = useState(false);
  const [deleteModal, setDeletToggle] = useState(false);
  const [sampleData, setsampleData] = useState();
  const [sucess, setSuccess] = useState(false);
  const [errors, setError] = useState(false);
  const [sucessUpdate, setsucessUpdate] = useState(false);
  const [errorsUpdate, setErrorUpdate] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [sucessPass, setSuccessPass] = useState(false);
  const [errorsPass, setErrorPass] = useState(false);
  const [sucessUdelete, setSuccessUdelete] = useState(false);
  const [errorsUdelete, setErrorUdelete] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [fieldErrors, setFieldsError] = useState(false);
  const [currentPass, setCurrentPassword] = useState('');
  const [newPass, setNewPassword] = useState('');
  const [confirmPass, setConfirmPassword] = useState('');
  const [searchInput, setSearchInput] = useState()
  const [rolesData, setRoles] = useState('');
  const [userID, setUserId] = useState('');
  const [modalAdd, setModalAdd] = useState(false);

  const options = [
    { value: 'DRIVER', label: 'Driver' },
    { value: 'TOW_ADMIN', label: 'Tow Admin' },
    { value: 'POLICE_ADMIN', label: 'Police Admin' },
    { value: 'POLICE', label: 'Police' },
    { value: 'STAFF', label: 'Staff' },
  ]
  const toggleAdd = () => {
    setModalAdd(!modalAdd);
  }

  const OnSubmitAdd = () => {

    if (!userDetail.jurisdiction) {
      errorAlert('Please enter Jurisdiction');
      return;
    }

    if (!userDetail.description) {
      errorAlert('Please enter Description');
      return;
    }
    else {
      const obj = {
        jurisdiction: userDetail?.jurisdiction,
        description: userDetail?.description,
      }
      console.log("obj", obj)
      try {
        addJurisdiction([obj], async (res) => {
          if (res.sucess) {
            toggleAdd()
            try {
              getJurisdictionAll('', async (res) => {
                if (res.sucess) {
                  console.log("res.sucess.list", res.sucess.list)

                  setData(res.sucess.list);

                } else {
                  console.log("errrrr")
                }
              });
            } catch (error) {
              console.log("error", error)
            }
            successAlert(res.sucess.messages[0].message)

          } else {
            toggleAdd()
            errorAlert('Something went wrong');
          }
        });
      } catch (error) {
        toggleAdd()
        errorAlert(error);
      }
    }
  }

  const toggle = () => {
    setModal(!modal)
  }
  const Deletetoggle = (item) => {
    setUserId(item.id)
    setDeletToggle(!deleteModal)
  }
  const toggleUpdate = (item) => {
    setModalUpdate(!modalUpdate);
    // alert(JSON.stringify(item))
    setItemData(item)
  }
  const deleteFunc = () => {

    try {
      deleteJurisdiction([userID], async (res) => {

        if (res.sucess) {
          console.log("res", res);
          setDeletToggle(!deleteModal)
          successAlert(res.sucess.messages[0].message);
          try {
            getJurisdictionAll('', async (res) => {
              if (res.sucess) {
                console.log("res.sucess.list", res.sucess.list)
                setData(res.sucess.list);

              } else {
                console.log("errrrr")
              }
            });
          } catch (error) {
            console.log("error", error)
          }
        } else {
          console.log("errrrr")
          // setErrorPass(true);
          // setTimeout(() => {
          //   setErrorUdelete(false)
          //   setDeletToggle(!deleteModal);
          // }, 3000);
          setDeletToggle(!deleteModal);
          errorAlert('Something went wrong');
        }
      });
    } catch (error) {
      errorAlert(error);
    }
  }
  const disableFunc = (item) => {
    // const obj = {
    //   [userID]
    // }
    try {
      disableUser([item.id], async (res) => {

        if (res.sucess) {
          console.log("res", res);
          // setDeletToggle(!deleteModal)
          successAlert('User Disable successfully')
          try {
            GetAllUsersApi('', async (res) => {
              if (res.sucess) {
                console.log("res.sucess.userAccountDtoList", res.sucess.userAccountDtoList)
                setData(res.sucess.userAccountDtoList);

              } else {
                console.log("errrrr")
              }
            });
          } catch (error) {
            console.log("error", error)
          }
        } else {
          console.log("errrrr")
          errorAlert('Something went wrong')
          // setErrorPass(true);
          // setTimeout(() => {
          //   setErrorUdelete(false)
          //   setDeletToggle(!deleteModal);
          // }, 3000);
        }
      });
    } catch (error) {
      console.log("error", error);
      errorAlert(error)
    }
  }
  useEffect(() => {
    try {
      getCSVApi('', async (res) => {
        if (res.sucess) {
          console.log("res.sucess.userAccountDtoList", res.sucess)
          setsampleData(res.sucess);

        } else {
          console.log("errrrr")
        }
      });
    } catch (error) {
      console.log("error", error)
    }
  }, [])
  useEffect(() => {

    try {
      getJurisdictionAll('', async (res) => {
        if (res.sucess) {
          console.log("res.sucess.userAccountDtoList", res.sucess)

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
  const handleOnChange = () => {
    if (csvFile) {
      try {
        const formData = new FormData();
        formData.append('files', csvFile);
        console.log("sd", csvFile)
        UploadCsvApi(formData, async (res) => {
          if (res.sucess) {
            console.log("res.sucess", res.sucess)
            toggle()
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false)
            }, 3000);

          } else {
            console.log("errrrr")
            toggle()
            setError(true);
            setTimeout(() => {
              setError(false)
            }, 3000);
          }
        });
      } catch (error) {
        console.log("error", error)
        toggle()
        setError(true);
        setTimeout(() => {
          setError(false)
        }, 3000);
      }
    }
    else {
      setEmptyError(true);
      setTimeout(() => {
        setEmptyError(false)
      }, 3000);
    }
  };
  const OnSubmit = () => {

    if (!userDetail.jurisdiction) {
      errorAlert('Please enter Jurisdiction');
      return;
    }

    if (!userDetail.description) {
      errorAlert('Please enter Description');
      return;
    }
    else {
      const obj = {
        id: setItem?.id,
        jurisdiction: userDetail?.jurisdiction === undefined ? setItem?.jurisdiction : userDetail?.jurisdiction,
        description: userDetail.description === undefined ? setItem?.description : userDetail?.description,
      }
      console.log("obj", obj)

      try {
        updateJurisdiction([obj], async (res) => {
          console.log("asd", res);
          if (res.sucess) {
            toggleUpdate()
            successAlert(res.sucess.messages[0].message);
          } else {
            toggleUpdate();
            errorAlert('Something went wrong');
          }
        });
      } catch (error) {
        errorAlert(error);
      }
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
  const getFilteredData = (val) => {
    if (val == '') {
      try {
        GetAllUsersApi('', async (res) => {
          if (res.sucess) {
            console.log("res.sucess.userAccountDtoList", res.sucess.userAccountDtoList)
            setData(res.sucess.userAccountDtoList);

          } else {
            errorAlert('Something went wrong');
          }
        });
      } catch (error) {
        errorAlert(error);
      }
    }
    else {
      console.log("11");
      let filteredData = data.filter(filterData => filterData.userName.includes(val));
      // console.log('filteredData',filteredData)
      setData(filteredData)
    }
  }
  const ChangeStatusJob = (status) => {
    if (status) {
      try {
        AllUsersByType(status, async (res) => {
          if (res.sucess) {
            console.log("res.sucess", res.sucess)
            setData(res.sucess.userAccountDtoList)
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
        GetAllUsersApi('', async (res) => {
          if (res.sucess) {
            console.log("res.sucess.userAccountDtoList", res.sucess.userAccountDtoList)
            setData(res.sucess.userAccountDtoList);

          } else {
            console.log("errrrr")
          }
        });
      } catch (error) {
        console.log("error", error)
      }
    }
    // setStatusData(status)
  }
  const ShowActivenInActive = (status) => {
    try {
      CheckEnabledDisabled(status, async (res) => {
        if (res.sucess) {
          console.log("res.sucess", res.sucess)
          setData(res.sucess.userAccountDtoList)
        } else {
          console.log("errrrr")
        }
      });
    } catch (error) {
      console.log("error", error)
    }

  }
  const accessButton = async (item) => {
    await localStorage.setItem('access', item.id);
    // navigate.push('/admin/index')
    window.open('/admin/index', '_blank', 'noopener,noreferrer');
  }
  return (
    <>

      <Header />

      {/* Page content */}
      <Container className="mt--7" fluid>

        {/* <Spinner type="grow" color="warning"
          children={false} /> */}
        <Row>
          <div className="col" style={{ marginTop: props?.data == '2' ? "8%" : 0 }}>
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>


                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 className="mb-0">All Jurisdiction</h3>

                    <div style={{ position: "absolute", right: 15 }}>
                      <Button onClick={() => { toggleAdd() }} className="" color="primary" type="button">
                        Add Jurisdiction
                      </Button>
                    </div>


                  </div>

                  <UncontrolledDropdown style={{ marginLeft: 10 }}>

                    {/* <DropdownToggle
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
                    </DropdownToggle> */}

                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem

                        onClick={() => { ChangeStatusJob() }}
                      >
                        {config.all}
                      </DropdownItem>
                      <DropdownItem

                        onClick={() => { ShowActivenInActive(true) }}
                      >
                        Active Users
                      </DropdownItem>
                      <DropdownItem

                        onClick={() => { ShowActivenInActive(false) }}
                      >
                        Inactive Users
                      </DropdownItem>
                      <DropdownItem

                        onClick={() => { ChangeStatusJob('TOW_ADMIN') }}
                      >
                        Admin
                      </DropdownItem>
                      <DropdownItem

                        onClick={() => { ChangeStatusJob('DRIVER') }}
                      >
                        Driver
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  {/* <button
                    className="importCSV"
                    onClick={() => {
                      toggle()
                    }}
                  >
                    {config.importCSV}
                  </button> */}
                  {/* <input
                    type="search"
                    placeholder="Search"
                    onBlur={text => getFilteredData(text.target.value)}
                    onChange={text => getFilteredData(text.target.value)}
                  /> */}
                  {/* <Form>
                    <InputGroup className="pad">
                      <Input
                        aria-label="Search"
                        className=""
                        placeholder="Search"
                        type="search"
                        onBlur={text => getFilteredData(text.target.value)}
                        onChange={text => getFilteredData(text.target.value)}
                      />
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <span className="fa fa-search" />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Form> */}
                </Row>
                {/* <h3 style={{ position: "absolute", right: 20, top: 25, }} className="mb-0">Keep Scrolling ►</h3> */}
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>

                    <th scope="col">Id</th>
                    <th scope="col">Jurisdiction</th>
                    <th scope="col">Description</th>
                    <th scope="col" />
                  </tr>
                </thead>
                {data ? (
                  <tbody>
                    {data.map((item) => {
                      return (
                        <tr style={{ borderWidth: 1, borderColor: 'black' }}>

                          <td style={{ textDecoration: 'underline black', cursor: "pointer" }} onClick={() => { toggleUpdate(item) }} className="text-sm">{item?.id}</td>
                          <td className="text-sm">{item?.jurisdiction}</td>
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
                                {/* <DropdownItem
                                  onClick={() => { disableFunc(item) }}
                                >
                                  {item.enabled ? 'Inactive' : 'Active'}
                                </DropdownItem> */}
                                {/* <DropdownItem
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
                                </DropdownItem> */}
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
        <Modal size="lg" style={{ maxWidth: '1600px', width: '80%' }} isOpen={modal} toggle={() => { toggle() }} className={props.className}>

          <ModalBody>
            {emptyError && (
              <Alert color="danger">
                Please File
              </Alert>
            )}

            <CsvToHtmlTable
              data={sampleData}
              csvDelimiter=","
              tableClassName="table table-striped table-hover"
            />
          </ModalBody>
          <ModalFooter>
            <input
              type={"file"}
              id={"csvFileInput"}
              accept={".xlsx, .xls, .csv"}
              onChange={(e) => { SetCsvFile(e.target.files[0]) }}
            />
            <Button onClick={() => { handleOnChange() }} className="my-4" color="primary" type="button">
              {config.uploadNow}
            </Button>
          </ModalFooter>
        </Modal>


        <Modal size="lg" style={{ maxWidth: '1600px', width: '80%' }} isOpen={modalUpdate} toggleUpdate={() => { toggleUpdate() }} className={props.className}>

          <ModalBody>

            <Row>

              <Col className="order-xl-1" xl="12">
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">Update Jurisdiction</h3>
                      </Col>

                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <h6 className="heading-small text-muted mb-4">
                        Jurisdiction information
                      </h6>
                      <div className="pl-lg-3">
                        <Row>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Jurisdiction
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={setItem?.jurisdiction}
                                id="input-username"
                                placeholder="Username"
                                onChange={text => textOnchange(text, 'jurisdiction')}
                                type="text"
                              />
                            </FormGroup>
                          </Col>

                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                Description
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={setItem?.description}
                                id="input-first-name"
                                placeholder="First name"
                                type="text"
                                onChange={text => textOnchange(text, 'description')}
                              />
                            </FormGroup>
                          </Col>

                        </Row>
                        <Button onClick={() => { OnSubmit() }} className="my-4" color="primary" type="button">
                          {config.save}
                        </Button>

                        <Button color="primary" onClick={() => { toggleUpdate() }}>{config.close}</Button>
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
            <Button color="primary" onClick={() => { deleteFunc() }}>Yes</Button>{' '}
            <Button color="secondary" onClick={() => { Deletetoggle() }}>No</Button>
          </ModalFooter>
        </Modal>

        {/* Add User  */}

        <Modal size="lg" style={{ maxWidth: '1600px', width: '80%' }} isOpen={modalAdd} toggleAdd={() => { toggleAdd() }} className={props.className}>

          <ModalBody>

            <Row>

              <Col className="order-xl-1" xl="12">
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">Add Jurisdiction</h3>
                      </Col>

                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <h6 className="heading-small text-muted mb-4">
                        Jurisdiction information
                      </h6>
                      <div className="pl-lg-3">
                        <Row>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Jurisdiction
                              </label>
                              <Input
                                className="form-control-alternative"
                                // defaultValue={setItem?.jurisdiction}
                                id="input-username"
                                placeholder="Jurisdiction"
                                onChange={text => textOnchange(text, 'jurisdiction')}
                                type="text"
                              />
                            </FormGroup>
                          </Col>

                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                Description
                              </label>
                              <Input
                                className="form-control-alternative"
                                // defaultValue={setItem?.description}
                                id="input-first-name"
                                placeholder="Description"
                                type="text"
                                onChange={text => textOnchange(text, 'description')}
                              />
                            </FormGroup>
                          </Col>

                        </Row>
                        <Button onClick={() => { OnSubmitAdd() }} className="my-4" color="primary" type="button">
                          {config.save}
                        </Button>

                        <Button color="primary" onClick={() => { toggleAdd() }}>{config.close}</Button>
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

export default Jurisdiction;
