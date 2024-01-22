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
import { Link } from "react-router-dom";
// core components
import Header from "components/Headers/Header.js";
import { AllUsersApi, getCSVApi, GetAllUsersApi, DeleteCompany, UpdateCompany, AddCompany, getAllCompany, AllUsersByType, CheckEnabledDisabled, deleteUser, disableUser, UploadCsvApi, UpdateUserPassword, UpdateUsersApi, getCourtProceedings, addCourtProceedings, updateCourtProceedings, deleteCourtProceedings } from "../../APIstore/apiCalls";
import { CsvToHtmlTable } from 'react-csv-to-table';
import axios from 'axios';
import config from "config";
import Select from 'react-select';
import { successAlert, errorAlert } from '../../Theme/utils';
import toast, { Toaster } from 'react-hot-toast';

function CourtProceedings(props) {
    const [data, setData] = useState([]);
    const [modal, setModal] = useState(false);
    const [setItem, setItemData] = useState('');
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);
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
    const [cType, setCompanyType] = useState('')
    const [cJuridiction, setJuridiction] = useState('')
    const options = [
        { value: 'criminal', label: 'Criminal' },
        { value: 'civil', label: 'Civil' }
    ]
    const optionsJuridiction = [
        { value: '1', label: '1' },
        { value: '2', label: '2' }
    ]

    const toggle = (item) => {
        setModal(!modal);
        setItemData(item)
    }
    const Deletetoggle = (item) => {
        setUserId(item.id)
        setDeletToggle(!deleteModal)
    }
    const toggleUpdate = (item) => {
        setModalUpdate(!modalUpdate);

        setItemData(item);
        setCompanyType(item?.companyType)
    }
    const toggleAdd = () => {
        setModalAdd(!modalAdd);
    }
    const deleteFunc = () => {
        // const obj = {
        //   [userID]
        // }
        try {
            deleteCourtProceedings(userID, async (res) => {

                if (res.sucess) {
                    console.log("res", res);
                    setDeletToggle(!deleteModal)
                    successAlert(res.sucess.messages[0].message);
                    try {
                        getCourtProceedings('', async (res) => {
                            if (res.sucess) {
                                console.log("res.sucess.companies", res.sucess.list)
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
            getCourtProceedings('', async (res) => {
                if (res.sucess) {
                    console.log("res.sucessds", res.sucess.list)
                    // return
                    setData(res.sucess.list);

                } else {
                    console.log("errrrr")
                }
            });
        } catch (error) {
            console.log("error", error)
        }
    }, [setItem, sucessUdelete, errorsUdelete,])
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
        console.log("Asd", userDetail)

        const obj = {

            description: userDetail?.description === undefined ? setItem?.description : userDetail?.description,
            proceedingType: userDetail?.proceedingType === undefined ? setItem?.proceedingType : userDetail?.proceedingType,
            id: setItem?.id,
        }
        console.log("obj", obj)

        try {
            updateCourtProceedings([obj], async (res) => {
                console.log("asd", res);
                if (res.sucess) {

                    toggleUpdate()
                    successAlert(res.sucess.messages[0].message)

                } else {

                    toggleUpdate();
                    errorAlert('Something went wrong');
                }
            });
        } catch (error) {
            errorAlert(error);
        }
        // }
    }


    const OnSubmitAdd = () => {
        const obj = {
            description: userDetail?.description === undefined ? setItem?.description : userDetail?.description,
            proceedingType: userDetail?.proceedingType === undefined ? setItem?.proceedingType : userDetail?.proceedingType,
        }
        console.log("obj", obj)

        try {
            addCourtProceedings([obj], async (res) => {
                console.log("asd", res);
                if (res.sucess) {
                    toggleAdd()
                    successAlert(res.sucess.messages[0].message)
                    try {
                        getCourtProceedings('', async (res) => {
                            if (res.sucess) {
                                console.log("res.sucess.companies", res.sucess.list)
                                setData(res.sucess.list);

                            } else {
                                console.log("errrrr")
                            }
                        });
                    } catch (error) {
                        console.log("error", error)
                    }
                } else {
                    toggleAdd();
                    errorAlert('Something went wrong');
                }
            });
        } catch (error) {
            errorAlert(error);
        }
        // }
    }
    const textOnchange = (text, name) => {
        const val = text.target ? text.target.value : text;
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
    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>

                {/* <Spinner type="grow" color="warning"
          children={false} /> */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                        <h3 className="mb-0">Court Proceedings</h3>
                                        <Button onClick={() => { toggleAdd() }} className="" color="primary" type="button">
                                            Add Court Proceeding
                                        </Button>
                                    </div>
                                </Row>
                                {/* <h3 style={{ position: "absolute", right: 20, top: 25, }} className="mb-0">Keep Scrolling ►</h3> */}
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Proceeding Type</th>
                                        {/* <th scope="col">Corporate Address</th> */}
                                        {/* <th scope="col">Company Holder Name</th>
                    <th scope="col">Company Holder Contact</th> */}
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                {data ? (
                                    <tbody>
                                        {data.map((item) => {
                                            return (
                                                <tr style={{ borderWidth: 1, borderColor: 'black' }}>

                                                    <Link

                                                        to={{
                                                            pathname: "/admin/company-detail",
                                                            state: item // your data array of objects
                                                        }}
                                                    // target='_blank'
                                                    > <td style={{ textDecoration: 'underline black', cursor: "pointer" }}
                                                        // onClick={() => { toggle(item) }} 
                                                        className="text-sm">{item?.id}</td></Link>
                                                    <td className="text-sm">{item?.description}</td>
                                                    <td className="text-sm">
                                                        {item?.proceedingType}
                                                    </td>
                                                    {/* <td className="text-sm">
                                                        {item?.corporateAddress}

                                                    </td> */}
                                                    {/* <td className="text-sm">
                            {item?.companyHolderName}
                          </td>
                          <td className="text-sm">
                            {item.companyHolderContact}
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
                                                                <DropdownItem
                                                                    onClick={() => { toggleUpdate(item) }}
                                                                >
                                                                    Update Court Proceeding
                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    onClick={() => { Deletetoggle(item) }}
                                                                >
                                                                    Delete Court Proceeding
                                                                </DropdownItem>
                                                                {/* <DropdownItem
                                  onClick={() => { toggleAdd() }}
                                >
                                  Add
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

                    <ModalHeader>Company Id: {setItem?.id}</ModalHeader>
                    <ModalBody>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {setItem?.corporateName ? (
                                <div className="listUi">
                                    <span className="text-sm">Corporate Name</span>
                                    <span className="text-sm">{setItem?.corporateName}</span>
                                </div>
                            ) : null}
                            {setItem?.corporateAddress ? (
                                <div className="listUi">
                                    <span className="text-sm">Corporate Address</span>
                                    <span className="text-sm">{setItem?.corporateAddress}</span>
                                </div>
                            ) : null}
                            {setItem?.companyName ? (
                                <div className="listUi">
                                    <span className="text-sm">Company Name</span>
                                    <span className="text-sm">{setItem?.companyName}</span>
                                </div>
                            ) : null}
                            {setItem?.companyAddress ? (
                                <div className="listUi">
                                    <span className="text-sm">Company Address</span>
                                    <span className="text-sm">{setItem?.companyAddress}</span>
                                </div>
                            ) : null}
                            {setItem?.companyType ? (
                                <div className="listUi">
                                    <span className="text-sm">Company Type</span>
                                    <span className="text-sm">{setItem?.companyType}</span>
                                </div>
                            ) : null}
                            {setItem?.additionalInformation ? (
                                <div className="listUi">
                                    <span className="text-sm">Additional Information</span>
                                    <span className="text-sm">{setItem?.additionalInformation}</span>
                                </div>
                            ) : null}
                            {setItem?.primarybadgeId ? (
                                <div className="listUi">
                                    <span className="text-sm">Badge/ID</span>
                                    <span className="text-sm">{setItem?.primarybadgeId}</span>
                                </div>
                            ) : null}
                            {setItem?.primaryName ? (
                                <div className="listUi">
                                    <span className="text-sm">Name</span>
                                    <span className="text-sm">{setItem?.primaryName}</span>
                                </div>
                            ) : null}
                            {setItem?.primaryContact ? (
                                <div className="listUi">
                                    <span className="text-sm">Contact</span>
                                    <span className="text-sm">{setItem?.primaryContact}</span>
                                </div>
                            ) : null}
                            {setItem?.primaryRankPositionTitle ? (
                                <div className="listUi">
                                    <span className="text-sm">Rank Position/Title</span>
                                    <span className="text-sm">{setItem?.primaryRankPositionTitle}</span>
                                </div>
                            ) : null}
                            {setItem?.primaryDepartment ? (
                                <div className="listUi">
                                    <span className="text-sm">Department</span>
                                    <span className="text-sm">{setItem?.primaryDepartment}</span>
                                </div>
                            ) : null}
                            {setItem?.primaryEmail ? (
                                <div className="listUi">
                                    <span className="text-sm">Email</span>
                                    <span className="text-sm">{setItem?.primaryEmail}</span>
                                </div>
                            ) : null}
                            {setItem?.primaryAddress ? (
                                <div className="listUi">
                                    <span className="text-sm">Address</span>
                                    <span className="text-sm">{setItem?.primaryAddress}</span>
                                </div>
                            ) : null}
                            {setItem?.secondarybadgeId ? (
                                <div className="listUi">
                                    <span className="text-sm">Badge/ID</span>
                                    <span className="text-sm">{setItem?.secondarybadgeId}</span>
                                </div>
                            ) : null}
                            {setItem?.secondaryName ? (
                                <div className="listUi">
                                    <span className="text-sm">Name</span>
                                    <span className="text-sm">{setItem?.secondaryName}</span>
                                </div>
                            ) : null}
                            {setItem?.secondaryContact ? (
                                <div className="listUi">
                                    <span className="text-sm">Contact</span>
                                    <span className="text-sm">{setItem?.secondaryContact}</span>
                                </div>
                            ) : null}
                            {setItem?.secondaryRankPositionTitle ? (
                                <div className="listUi">
                                    <span className="text-sm">Rank Position/Title</span>
                                    <span className="text-sm">{setItem?.secondaryRankPositionTitle}</span>
                                </div>
                            ) : null}
                            {setItem?.secondaryDepartment ? (
                                <div className="listUi">
                                    <span className="text-sm">Department</span>
                                    <span className="text-sm">{setItem?.secondaryDepartment}</span>
                                </div>
                            ) : null}
                            {setItem?.secondaryEmail ? (
                                <div className="listUi">
                                    <span className="text-sm">Email</span>
                                    <span className="text-sm">{setItem?.secondaryEmail}</span>
                                </div>
                            ) : null}
                            {setItem?.secondaryAddress ? (
                                <div className="listUi">
                                    <span className="text-sm">Address</span>
                                    <span className="text-sm">{setItem?.secondaryAddress}</span>
                                </div>
                            ) : null}



                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => { setModal(!modal); }}>Close</Button>{' '}
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
                                                <h3 className="mb-0">Update Court Proceeding</h3>
                                            </Col>

                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <Form>
                                            <h6 className="heading-small text-muted mb-4">
                                                Court Proceeding Information
                                            </h6>
                                            <div className="pl-lg-3">
                                                <Row>
                                                    <Col lg="4">
                                                        <FormGroup>
                                                            <Label for="exampleSelect">Proceeding Type</Label>
                                                            <Select
                                                                name="form-field-name"
                                                                // value={this.state.value}
                                                                onChange={(val) => {
                                                                    textOnchange(val.label, 'proceedingType')
                                                                    setCompanyType(val.label)
                                                                }}
                                                                defaultInputValue={setItem?.proceedingType}
                                                                // clearable={this.state.clearable}
                                                                // searchable={this.state.searchable}
                                                                labelKey='name'
                                                                valueKey='countryCode'
                                                                options={options}
                                                            />

                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="4">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-username"
                                                            >
                                                                Description
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                defaultValue={setItem?.description}
                                                                id="input-username"
                                                                placeholder="Description"
                                                                onChange={text => textOnchange(text, 'description')}
                                                                type="text"
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


                {/* Add Company */}

                <Modal size="lg" style={{ maxWidth: '1600px', width: '80%' }} isOpen={modalAdd} toggleAdd={() => { toggleAdd() }} className={props.className}>

                    <ModalBody>

                        <Row>

                            <Col className="order-xl-1" xl="12">
                                <Card className="bg-secondary shadow">
                                    <CardHeader className="bg-white border-0">
                                        <Row className="align-items-center">
                                            <Col xs="8">
                                                <h3 className="mb-0">Add Court Proceeding</h3>
                                            </Col>

                                        </Row>
                                    </CardHeader>
                                    <CardBody>
                                        <Form>
                                            <h6 className="heading-small text-muted mb-4">
                                                Court Proceeding Information
                                            </h6>
                                            <div className="pl-lg-3">
                                                <Row>
                                                    <Col lg="4">
                                                        <FormGroup>
                                                            <Label for="exampleSelect">Proceeding Type</Label>
                                                            <Select
                                                                name="form-field-name"
                                                                // value={this.state.value}
                                                                onChange={(val) => {
                                                                    textOnchange(val.label, 'proceedingType')
                                                                    setCompanyType(val.label)
                                                                }}
                                                                // clearable={this.state.clearable}
                                                                // searchable={this.state.searchable}
                                                                labelKey='name'
                                                                valueKey='countryCode'
                                                                options={options}
                                                            />

                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="4">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-username"
                                                            >
                                                                Description
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                // defaultValue={setItem?.companyName}
                                                                id="input-username"
                                                                placeholder="Description"
                                                                onChange={text => textOnchange(text, 'description')}
                                                                type="text"
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

export default CourtProceedings;
