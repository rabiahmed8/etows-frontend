import React, { useEffect, useState } from "react";
import {
    TabContent, TabPane, Modal, ModalHeader, ModalBody, ModalFooter, Nav,
    NavItem, NavLink, CardTitle, CardText,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,
    Button,
    Alert,
    Row,
    Col,
    Input,
    CardBody,
    Form,
    FormGroup,
    Label
} from 'reactstrap';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import classnames from 'classnames';
import Header from "components/Headers/Header.js";
import AllUsers from "./AllUsers";
import config from "config";
import Select, { StylesConfig } from 'react-select';
import { successAlert, errorAlert } from '../../Theme/utils';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useHistory } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AddressInput from './AddressInput';
// import GooglePlacesAutocomplete, {
//     geocodeByPlaceId, geocodeByAddress, getLatLng
// } from "react-google-places-autocomplete";
import { UpdateCompany,assignCompany,addCompanyJurisdiction,getAllTowCompany,getAssignCompany,getCompanyJurisdictionAll,getJurisdictionAll
 } from "APIstore/apiCalls";

// export default class CompanyDetail extends React.Component {
function CompanyDetail(props) {
    const navigate = useHistory()
    const options = [
        { value: 'Tow Company', label: 'Tow Company' },
        { value: 'L.E/Govt Agency', label: 'L.E/Govt Agency' }
    ]
    // constructor(props) {
    //     super(props);

    //     this.toggle = this.toggle.bind(this);
    //     this.state = {
    //         activeTab: '1'
    //     };
    // }
    const [key, setKey] = useState('home');
    const [activeTab, setactiveTab] = useState('1')
    const [modalUpdate, setModalUpdate] = useState(false);
    const location = useLocation();

    const [data, setData] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);
    const [deleteModal, setDeletToggle] = useState(false);
    const [adduser, setAddUsers] = useState(false);
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
    const [ShowSec, setShowSec] = useState(false)
    const [isLoader, setIsLoader] = useState(false);
    const [allData, setAllData] = useState('')
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [address, setAddress] = useState('');
    const [dropdownData, setDropdownData] = useState();
    const [companyDropdownData, setCompanyDropdownData] = useState();
    const [dropdownDataUpdate, setDropdownDataUpdate] = useState();
    const [companyDropdownDataUpdate, setCompanyDropdownDataUpdate] = useState();
    const [jurisdictionData, setJurisdictionData] = useState();
    const [companiesData, setCompaniesData] = useState();
    const [selectedservices, setselectedservices] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [companyDataFilter, setCompanyDataFilter] = useState([]);
    const [companiesDataFilter, setCompaniesDataFilter] = useState([]);
    const [corporateAddress, setCorporateAddress] = useState('');
    const setItemsData = location.state;
    const [setItem, setItemData] = useState(setItemsData);
    
    useEffect(() => {
        try {
            getAllTowCompany('', async (res) => {
                if (res.sucess) {
                    setCompanyDropdownData(res.sucess.list);

                } else {
                    console.log("errrrr")
                }
            });
        } catch (error) {
            console.log("error", error)
        }

        try {
            getJurisdictionAll('', async (res) => {
                if (res.sucess) {
                    setDropdownData(res.sucess.list);

                } else {
                    console.log("errrrr")
                }
            });
        } catch (error) {
            console.log("error", error)
        }
    }, [setItem])
    const toggle = (tab) => {
        if (activeTab !== tab) {
            setactiveTab(tab)
            // this.setState({
            //     activeTab: tab
            // });
        }
    }
    const toggleUpdate = (item) => {

        //End Younis Update
        try {
            getAssignCompany(item.id, async (res) => {
                if (res.sucess) {
                    let data = res.sucess.list;
                    console.log("result", data);
                    setCompaniesDataFilter(data)
                    setCompaniesData(res.sucess.list);
                    var myArray = [];
                    for (let i = 0; i < data.length; i++) {
                        myArray.push({
                            jurisdiction: data[i].assigned.corporateName,
                            id: data[i].assigned.id,
                        });
                    };
                    const arr1 = getUniqueListBy(myArray, 'id')
                    setCompanyDropdownDataUpdate(myArray)
                    setSelectedCompanies(renderList(myArray).map((i) => i));

                } else {
                    console.log("errrrr")
                }
            });
        } catch (error) {
            console.log("error", error)
        }

        //End Younis Update

        try {
            getCompanyJurisdictionAll(item.id, async (res) => {

                if (res.sucess) {
                    console.log("res.res.res.sucess", res.sucess.list);
                    let data = res.sucess.list;
                    setCompanyDataFilter(data)
                    // setJurisdictionData(res.sucess.list);
                    var myArray = [];
                    for (let i = 0; i < data.length; i++) {
                        myArray.push({
                            jurisdiction: data[i].jurisdiction.jurisdiction,
                            id: data[i].jurisdiction.id,
                        });
                    };
                    // const arr1 = getUniqueListBy(myArray, 'id')
                    // console.log("myArraymyArraymyArray",arr1);
                    setDropdownDataUpdate(myArray)
                    setselectedservices(renderList(myArray).map((i) => i));

                } else {
                    console.log("errrrr")
                }
            });
        } catch (error) {
            console.log("error", error)
        }

        setModalUpdate(!modalUpdate);
        setCorporateAddress(item?.corporateAddress);
        setItemData(item);
        setCompanyType(item?.companyType);
    }
    const textOnchange = (text, name) => {
        const val = text.target ? text.target.value : text;
        let user = userDetail;
        user[name] = val;
        setUserDetail(user);
    };
    const OnSubmit = () => {
        console.log("Asd", userDetail)

        const obj = {

            corporateName: userDetail?.corporateName === undefined ? setItem?.corporateName : userDetail?.corporateName,
            corporateAddress: corporateAddress,
            companyName: userDetail?.companyName === undefined ? setItem?.companyName : userDetail?.companyName,
            companyAddress: userDetail?.companyAddress === undefined ? setItem?.companyAddress : userDetail?.companyAddress,
            companyType: userDetail?.companyType === undefined ? setItem?.companyType : userDetail?.companyType,
            additionalInformation: userDetail?.additionalInformation === undefined ? setItem?.additionalInformation : userDetail?.additionalInformation,
            primarybadgeId: userDetail?.primarybadgeId === undefined ? setItem?.primarybadgeId : userDetail?.primarybadgeId,
            primaryName: userDetail?.primaryName === undefined ? setItem?.primaryName : userDetail?.primaryName,
            primaryContact: userDetail?.primaryContact === undefined ? setItem?.primaryContact : userDetail?.primaryContact,
            primaryRankPositionTitle: userDetail?.primaryRankPositionTitle === undefined ? setItem?.primaryRankPositionTitle : userDetail?.primaryRankPositionTitle,
            primaryDepartment: userDetail?.primaryDepartment === undefined ? setItem?.primaryDepartment : userDetail?.primaryDepartment,
            primaryEmail: userDetail?.primaryEmail === undefined ? setItem?.primaryEmail : userDetail?.primaryEmail,
            primaryAddress: userDetail?.primaryAddress === undefined ? setItem?.primaryAddress : userDetail?.primaryAddress,
            secondarybadgeId: userDetail?.secondarybadgeId === undefined ? setItem?.secondarybadgeId : userDetail?.secondarybadgeId,
            secondaryName: userDetail?.secondaryName === undefined ? setItem?.secondaryName : userDetail?.secondaryName,
            secondaryContact: userDetail?.secondaryContact === undefined ? setItem?.secondaryContact : userDetail?.secondaryContact,
            secondaryRankPositionTitle: userDetail?.secondaryRankPositionTitle === undefined ? setItem?.secondaryRankPositionTitle : userDetail?.secondaryRankPositionTitle,
            secondaryDepartment: userDetail?.secondaryDepartment === undefined ? setItem?.secondaryDepartment : userDetail?.secondaryDepartment,
            secondaryEmail: userDetail?.secondaryEmail === undefined ? setItem?.secondaryEmail : userDetail?.secondaryEmail,
            secondaryAddress: userDetail?.secondaryAddress === undefined ? setItem?.secondaryAddress : userDetail?.secondaryAddress,

            id: setItem?.id,
            // companyName: userDetail?.companyName === undefined ? setItem?.companyName : userDetail?.companyName,
            // companyType: userDetail.companyType === undefined ? setItem?.companyType : userDetail?.companyType,
            // companyAddress: userDetail.companyAddress === undefined ? setItem?.companyAddress : userDetail?.companyAddress,
            // additionalInformation: userDetail.additionalInformation === undefined ? setItem?.additionalInformation : userDetail.additionalInformation,
            // companyHolderName: userDetail.companyHolderName === undefined ? setItem?.companyHolderName : userDetail.companyHolderName,
            // companyHolderContact: userDetail.companyHolderContact === undefined ? setItem?.companyHolderContact : userDetail.companyHolderContact,
            // companyHolderAddress: userDetail.companyHolderAddress === undefined ? setItem?.companyHolderAddress : userDetail.companyHolderAddress,
        }
        console.log("obj", obj)

        try {
            UpdateCompany([obj], async (res) => {
                console.log("asd", res);
                if (res.sucess) {
                    if (jurisdictionData && jurisdictionData.length > 0) {
                        var myArray = [];
                        for (let i = 0; i < jurisdictionData.length; i++) {
                            myArray.push({
                                jurisdiction: { id: jurisdictionData[i].value },
                                company: { id: setItem.id },
                                description: ""
                            });
                        };
                        try {
                            addCompanyJurisdiction(setItem.id, myArray, async (res) => {
                                if (res.sucess.statusCode == 'success') {
                                    successAlert("Jurisdiction updated successfully")
                                } else {
                                    errorAlert('Jurisdiction not updated')
                                }
                            });
                        } catch (error) {
                            console.log("error", error)
                        }

                    }
                    if (companiesData && companiesData?.length > 0) {
                        var assignedCompArray = [];
                        for (let i = 0; i < companiesData.length; i++) {
                            assignedCompArray.push({
                                assigned: { id: companiesData[i].value },
                                company: { id: res.sucess.generatedIds[0] },
                                description: companiesData[i].value + " assinged to " + res.sucess.generatedIds[0]
                            });
                        };
                        try {
                            assignCompany(setItem?.id, assignedCompArray, async (res) => {
                                if (res.sucess.statusCode == 'success')
                                    successAlert(res.sucess.messages[0].message)
                                else
                                    errorAlert('Companies not updated')
                            });
                        } catch (error) {
                            successAlert(error)
                        }
                    }
                    toggleUpdate(setItem)
                    successAlert(res.sucess.messages[0].message)
                    // window.location.reload(true)
                    // redirect("/admin/company")
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
    const redirect = (to) => {
        navigate.push(to);
        window.location.reload(true)
    }
    const getAddressObject = (address_components) => {
        console.log(address_components);
        const ShouldBeComponent = {
            street_number: ["street_number"],
            postal_code: ["postal_code"],
            street: ["street_address", "route"],
            province: [
                "administrative_area_level_1",
                "administrative_area_level_2",
                "administrative_area_level_3",
                "administrative_area_level_4",
                "administrative_area_level_5"
            ],
            city: [
                "locality",
                "sublocality",
                "sublocality_level_1",
                "sublocality_level_2",
                "sublocality_level_3",
                "sublocality_level_4"
            ],
            country: ["country"]
        };

        let address = {
            street_number: "",
            postal_code: "",
            street: "",
            province: "",
            city: "",
            country: ""
        };

        address_components.forEach((component) => {
            for (var shouldBe in ShouldBeComponent) {
                if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
                    if (shouldBe === "country") {
                        address[shouldBe] = component.short_name;
                    } else {
                        address[shouldBe] = component.long_name;
                    }
                }
            }
        });

        // Fix the shape to match our schema
        address.address = address.street_number + " " + address.street;
        delete address.street_number;
        delete address.street;
        if (address.country === "US") {
            address.state = address.province;
            delete address.province;
        }
        return address;
    };
    function getUniqueListBy(arr, key) {
        return [...new Map(arr.map(item => [item[key], item])).values()]
    }
    const renderCompanyList = (selectedArray) => {
        return (selectedArray?.map(data => ({ label: data?.corporateName, value: data?.id })))
    }

    const renderList = (selectedArray) => {
        return (selectedArray?.map(data => ({ label: data?.jurisdiction, value: data?.id })))
    }
    // useEffect(() => {
    //     // if(data?.address){
    //     //   textOnchange(data?.address,'address');
    //     // }
    //     const func = async () => {
    //         const geocodeObj =
    //             address &&
    //             address?.value &&
    //             (await geocodeByPlaceId(address.value?.place_id));
    //         const addressObject =
    //             geocodeObj && getAddressObject(geocodeObj[0]?.address_components);
    //         // let makeString = `${addressObject?.address == undefined ? '' : addressObject?.address} ${addressObject?.city == undefined ? '' : addressObj?.city} ${addressObject?.province == undefined ? '' : addressObject?.province} ${addressObject?.country == undefined ? '' : addressObject?.country}`
    //         // alert(address?.label);

    //         if (address?.label) {
    //             textOnchange(address?.label, 'corporateAddress');
    //         }
    //     };
    //     func();
    // }, [address]);
    return (
        <>
            {/* {activeTab === '1' && ()} */}
            <div className="header pb-8 pt-5 pt-md-8" style={{ background: 'green' }}>

                <Container fluid>
                    <div className="header-body">
                        <span style={{ position: "absolute", top: 35, fontSize: 16, fontWeight: 600, color: "#fff" }}>
                            {setItem?.corporateName}
                        </span>
                    </div>
                </Container>
            </div>
            <div style={{ marginLeft: 40 }}>
                <Nav tabs className="nav--links">
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Company Information
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Users
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({})}
                            onClick={() => {
                                toggleUpdate(setItemsData);
                            }}
                        >
                            Update
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    {setItem?.corporateName ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Legal Name</span>
                                            <span className="text-sm">{setItem?.corporateName}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.corporateAddress ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Corporate Address</span>
                                            <span className="text-sm">{setItem?.corporateAddress}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.companyName ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Operating Name</span>
                                            <span className="text-sm">{setItem?.companyName}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.companyAddress ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Company Address</span>
                                            <span className="text-sm">{setItem?.companyAddress}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.companyType ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Company Type</span>
                                            <span className="text-sm">{setItem?.companyType}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.additionalInformation ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Additional Information</span>
                                            <span className="text-sm">{setItem?.additionalInformation}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primarybadgeId ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Primary Badge/ID</span>
                                            <span className="text-sm">{setItem?.primarybadgeId}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primaryName ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Primary Name</span>
                                            <span className="text-sm">{setItem?.primaryName}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primaryContact ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Primary Contact</span>
                                            <span className="text-sm">{setItem?.primaryContact}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primaryRankPositionTitle ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Primary Rank Position/Title</span>
                                            <span className="text-sm">{setItem?.primaryRankPositionTitle}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primaryDepartment ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Primary Department</span>
                                            <span className="text-sm">{setItem?.primaryDepartment}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primaryEmail ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Primary Email</span>
                                            <span className="text-sm">{setItem?.primaryEmail}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.primaryAddress ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Primary Address</span>
                                            <span className="text-sm">{setItem?.primaryAddress}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondarybadgeId ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Secondary Badge/ID</span>
                                            <span className="text-sm">{setItem?.secondarybadgeId}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondaryName ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Secondary Name</span>
                                            <span className="text-sm">{setItem?.secondaryName}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondaryContact ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Secondary Contact</span>
                                            <span className="text-sm">{setItem?.secondaryContact}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondaryRankPositionTitle ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Secondary Rank Position/Title</span>
                                            <span className="text-sm">{setItem?.secondaryRankPositionTitle}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondaryDepartment ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Secondary Department</span>
                                            <span className="text-sm">{setItem?.secondaryDepartment}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondaryEmail ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Secondary Email</span>
                                            <span className="text-sm">{setItem?.secondaryEmail}</span>
                                        </div>
                                    ) : null}
                                    {setItem?.secondaryAddress ? (
                                        <div className="listUi">
                                            <span className="text-sm listUiItem">Secondary Address</span>
                                            <span className="text-sm">{setItem?.secondaryAddress}</span>
                                        </div>
                                    ) : null}



                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <AllUsers data={'2'} idData={setItem?.id} typeData={setItem?.companyType} />
                        {/* <Row>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                        </Row> */}
                    </TabPane>
                </TabContent>
            </div>
            <Modal size="lg" style={{ maxWidth: '1600px', width: '80%' }} isOpen={modalUpdate} toggleUpdate={() => { setModalUpdate(!modalUpdate); }} className={props.className}>

                <ModalBody>

                    <Row>

                        <Col className="order-xl-1" xl="12">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">Update Company</h3>
                                        </Col>

                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <h6 className="heading-small text-muted mb-4">
                                            Company Information
                                        </h6>

                                        <div className="pl-lg-3">
                                            <Row>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <Label for="exampleSelect">Company Type</Label>
                                                        <Select
                                                            name="form-field-name"
                                                            defaultInputValue={setItem?.companyType}
                                                            // value={setItem?.companyType}
                                                            onChange={(val) => {
                                                                textOnchange(val.label, 'companyType')
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
                                                            Legal Name
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue={setItem?.corporateName}
                                                            id="input-username"
                                                            placeholder="Legal Name"
                                                            onChange={text => textOnchange(text, 'corporateName')}
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-username"
                                                        >
                                                            Operating Name
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            defaultValue={setItem?.companyName}
                                                            id="input-username"
                                                            placeholder="Operating Name"
                                                            onChange={text => textOnchange(text, 'companyName')}
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            {setItem?.companyType == 'L.E/Govt Agency' && (
                                                <Row>
                                                    <Col lg="12">
                                                        <FormGroup>
                                                            <Label for="exampleSelect">Companies</Label>
                                                            <Select
                                                                value={selectedCompanies}
                                                                onChange={(val) => {
                                                                    setCompaniesData(val)
                                                                    setSelectedCompanies(val)
                                                                    console.log("valvalval", val);
                                                                }}

                                                                closeMenuOnSelect={false}
                                                                allowSelectAll={true}
                                                                // defaultValue={renderList(dropdownDataUpdate)}
                                                                // placeholder={'kk'}
                                                                // value={renderList(dropdownDataUpdate)}
                                                                // defaultMenuIsOpen
                                                                isMulti
                                                                options={renderCompanyList(companyDropdownData)}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            )}
                                            {setItem?.companyType == 'Tow Company' && (
                                                <Row>
                                                    <Col lg="12">
                                                        <FormGroup>
                                                            <Label for="exampleSelect">Jurisdiction(s)</Label>
                                                            <Select
                                                                // onChange={setselectedservices}
                                                                value={selectedservices}
                                                                onChange={(val) => {
                                                                    setJurisdictionData(val)
                                                                    setselectedservices(val)
                                                                }}
                                                                // onBlur={handleFocus}

                                                                closeMenuOnSelect={false}
                                                                allowSelectAll={true}
                                                                // defaultValue={renderList(dropdownDataUpdate)}
                                                                // placeholder={'kk'}
                                                                // value={renderList(dropdownDataUpdate)}
                                                                // defaultMenuIsOpen
                                                                isMulti
                                                                options={renderList(dropdownData)}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            )}
                                            <Row>
                                                {/* <Col lg="12">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      Address
                    </label>
                    <Input
                      className="form-control-alternative"
                      defaultValue={setItem?.corporateAddress}
                      id="input-username"
                      placeholder="Address"
                      onChange={text => textOnchange(text, 'corporateAddress')}
                      type="text"
                    />
                  </FormGroup>
                </Col> */}
                                                <Col lg="12">
                                                    <FormGroup>
                                                        <Label
                                                            className="form-control-label"
                                                            htmlFor="input-username"
                                                        >
                                                            Address
                                                        </Label>

                                                        <AddressInput
                                                            className="form-control-alternative form-control"
                                                            id="companyAddress1"
                                                            placeholder="Search Address"
                                                            value={setItem?.corporateAddress}
                                                            // onChange={(text) => {
                                                            //     setAddress(text)
                                                            // }}
                                                            onChange={(text) => setCorporateAddress(text)}
                                                        />
                                                        {/* <GooglePlacesAutocomplete
                                                            className="sp-class"
                                                            apiKey="AIzaSyA-dt2M9mfh_6qyZ4yBguLU1zau5UiAetU"
                                                            selectProps={{
                                                                styles: {
                                                                    input: (provided) => ({
                                                                        ...provided,
                                                                        "input": {
                                                                            height: 32,
                                                                        },
                                                                    }),
                                                                },
                                                                isClearable: true,
                                                                defaultInputValue: setItem?.corporateAddress,
                                                                // defaultValue: setItem?.corporateAddress,
                                                                value: address,
                                                                onChange: (val) => {
                                                                    setAddress(val);
                                                                    geocodeByAddress(val?.label)
                                                                        .then(results => getLatLng(results[0]))
                                                                        .then(({ lat, lng }) => {
                                                                            console.log('Successfully got latitude and longitude', { lat, lng })
                                                                            setLatitude(lat);
                                                                            setLongitude(lng);
                                                                        }
                                                                        );
                                                                    // settowJobRequestLocation(JSON.stringify(val.label))
                                                                }
                                                            }}
                                                        /> */}
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            {setItem?.companyType == 'L.E/Govt Agency' && (
                                                <>
                                                    <legend>Primary Contact</legend>
                                                    <Row>
                                                        <Col lg="4">
                                                            <FormGroup>
                                                                <label
                                                                    className="form-control-label"
                                                                    htmlFor="input-username"
                                                                >
                                                                    Badge/ID
                                                                </label>
                                                                <Input
                                                                    className="form-control-alternative"
                                                                    defaultValue={setItem?.primarybadgeId}
                                                                    id="input-username"
                                                                    placeholder="Badge/ID"
                                                                    type="text"
                                                                    onChange={text => textOnchange(text, 'primarybadgeId')}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col lg="4">
                                                            <FormGroup>
                                                                <label
                                                                    className="form-control-label"
                                                                    htmlFor="input-username"
                                                                >
                                                                    Name
                                                                </label>
                                                                <Input
                                                                    className="form-control-alternative"
                                                                    defaultValue={setItem?.primaryName}
                                                                    id="input-username"
                                                                    placeholder="Name"
                                                                    onChange={text => textOnchange(text, 'primaryName')}
                                                                    type="text"
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col lg="4">
                                                            <FormGroup>
                                                                <label
                                                                    className="form-control-label"
                                                                    htmlFor="input-username"
                                                                >
                                                                    Rank
                                                                </label>
                                                                <Input
                                                                    className="form-control-alternative"
                                                                    defaultValue={setItem?.primaryRankPositionTitle}
                                                                    id="input-username"
                                                                    placeholder="Rank"
                                                                    type="text"
                                                                    onChange={text => textOnchange(text, 'primaryRankPositionTitle')}
                                                                />
                                                            </FormGroup>


                                                        </Col>

                                                    </Row>
                                                </>

                                            )}
                                            {setItem?.companyType == 'L.E/Govt Agency' && (
                                                <Row>
                                                    <Col lg="4">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-username"
                                                            >
                                                                Department/Bureau
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                defaultValue={setItem?.primaryDepartment}
                                                                id="input-username"
                                                                placeholder="Department/Bureau"
                                                                type="text"
                                                                onChange={text => textOnchange(text, 'primaryDepartment')}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="4">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-username"
                                                            >
                                                                Phone
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                defaultValue={setItem?.primaryContact}
                                                                id="input-username"
                                                                placeholder="Phone"
                                                                onChange={text => textOnchange(text, 'primaryContact')}
                                                                type="text"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="4">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-username"
                                                            >
                                                                Email
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                defaultValue={setItem?.primaryEmail}
                                                                id="input-username"
                                                                placeholder="Email"
                                                                type="text"
                                                                onChange={text => textOnchange(text, 'primaryEmail')}
                                                            />
                                                        </FormGroup>


                                                    </Col>

                                                </Row>
                                            )}
                                            {setItem?.companyType == 'L.E/Govt Agency' && (
                                                <>
                                                    <div onClick={() => { setShowSec(!ShowSec) }}>
                                                        {ShowSec ? <AiFillMinusCircle size={22} /> : <AiFillPlusCircle size={22} />}
                                                    </div>
                                                    {ShowSec && (
                                                        <>
                                                            {setItem?.companyType == 'L.E/Govt Agency' && (
                                                                <>
                                                                    <legend>Secondary Contact</legend>
                                                                    <Row>
                                                                        <Col lg="4">
                                                                            <FormGroup>
                                                                                <label
                                                                                    className="form-control-label"
                                                                                    htmlFor="input-username"
                                                                                >
                                                                                    Badge/ID
                                                                                </label>
                                                                                <Input
                                                                                    className="form-control-alternative"
                                                                                    defaultValue={setItem?.secondarybadgeId}
                                                                                    id="input-username"
                                                                                    placeholder="Badge/ID"
                                                                                    type="text"
                                                                                    onChange={text => textOnchange(text, 'secondarybadgeId')}
                                                                                />
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col lg="4">
                                                                            <FormGroup>
                                                                                <label
                                                                                    className="form-control-label"
                                                                                    htmlFor="input-username"
                                                                                >
                                                                                    Name
                                                                                </label>
                                                                                <Input
                                                                                    className="form-control-alternative"
                                                                                    defaultValue={setItem?.secondaryName}
                                                                                    id="input-username"
                                                                                    placeholder="Name"
                                                                                    onChange={text => textOnchange(text, 'secondaryName')}
                                                                                    type="text"
                                                                                />
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col lg="4">
                                                                            <FormGroup>
                                                                                <label
                                                                                    className="form-control-label"
                                                                                    htmlFor="input-username"
                                                                                >
                                                                                    Rank
                                                                                </label>
                                                                                <Input
                                                                                    className="form-control-alternative"
                                                                                    defaultValue={setItem?.secondaryRankPositionTitle}
                                                                                    id="input-username"
                                                                                    placeholder="Rank"
                                                                                    type="text"
                                                                                    onChange={text => textOnchange(text, 'secondaryRankPositionTitle')}
                                                                                />
                                                                            </FormGroup>


                                                                        </Col>

                                                                    </Row>
                                                                </>

                                                            )}
                                                            {setItem?.companyType == 'L.E/Govt Agency' && (
                                                                <Row>
                                                                    <Col lg="4">
                                                                        <FormGroup>
                                                                            <label
                                                                                className="form-control-label"
                                                                                htmlFor="input-username"
                                                                            >
                                                                                Department/Bureau
                                                                            </label>
                                                                            <Input
                                                                                className="form-control-alternative"
                                                                                defaultValue={setItem?.secondaryDepartment}
                                                                                id="input-username"
                                                                                placeholder="Department/Bureau"
                                                                                type="text"
                                                                                onChange={text => textOnchange(text, 'secondaryDepartment')}
                                                                            />
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col lg="4">
                                                                        <FormGroup>
                                                                            <label
                                                                                className="form-control-label"
                                                                                htmlFor="input-username"
                                                                            >
                                                                                Phone
                                                                            </label>
                                                                            <Input
                                                                                className="form-control-alternative"
                                                                                defaultValue={setItem?.secondaryContact}
                                                                                id="input-username"
                                                                                placeholder="Phone"
                                                                                onChange={text => textOnchange(text, 'secondaryDepartment')}
                                                                                type="text"
                                                                            />
                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col lg="4">
                                                                        <FormGroup>
                                                                            <label
                                                                                className="form-control-label"
                                                                                htmlFor="input-username"
                                                                            >
                                                                                Email
                                                                            </label>
                                                                            <Input
                                                                                className="form-control-alternative"
                                                                                defaultValue={setItem?.secondaryEmail}
                                                                                id="input-username"
                                                                                placeholder="Email"
                                                                                type="text"
                                                                                onChange={text => textOnchange(text, 'secondaryEmail')}
                                                                            />
                                                                        </FormGroup>


                                                                    </Col>

                                                                </Row>
                                                            )}
                                                        </>
                                                    )}
                                                </>

                                            )}
                                            {/* {cType == 'Tow Company' && (
                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Operating Name
                      </label>
                      <Input
                        className="form-control-alternative"
                        defaultValue={setItem?.companyName}
                        id="input-username"
                        placeholder="Operating Name"
                        onChange={text => textOnchange(text, 'companyName')}
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Company Address
                      </label>
                      <Input
                        className="form-control-alternative"
                        defaultValue={setItem?.companyAddress}
                        id="input-username"
                        placeholder="Company Address"
                        onChange={text => textOnchange(text, 'companyAddress')}
                        type="text"
                      />
                    </FormGroup>
                  </Col>

                  <Col lg="4">
                    <FormGroup>
                      <Label for="exampleSelect">Jurisdiction(s)</Label>
                      <Select
                        name="form-field-name"
                        onChange={(val) => {
                          textOnchange(val.label, 'additionalInformation')
                          setJuridiction(val.label)
                        }}
                        labelKey='name'
                        valueKey='countryCode'
                        options={optionsJuridiction}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              )} */}
                                            {setItem?.companyType == 'Tow Company' && (
                                                <>
                                                    <legend>Primary Contact</legend>
                                                    <Row>
                                                        <Col lg="4">
                                                            <FormGroup>
                                                                <label
                                                                    className="form-control-label"
                                                                    htmlFor="input-username"
                                                                >
                                                                    Name
                                                                </label>
                                                                <Input
                                                                    className="form-control-alternative"
                                                                    defaultValue={setItem?.primaryName}
                                                                    id="input-username"
                                                                    placeholder="Name"
                                                                    type="text"
                                                                    onChange={text => textOnchange(text, 'primaryName')}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col lg="4">
                                                            <FormGroup>
                                                                <label
                                                                    className="form-control-label"
                                                                    htmlFor="input-username"
                                                                >
                                                                    Position/Title
                                                                </label>
                                                                <Input
                                                                    className="form-control-alternative"
                                                                    defaultValue={setItem?.primaryRankPositionTitle}
                                                                    id="input-username"
                                                                    placeholder="Position/Title"
                                                                    onChange={text => textOnchange(text, 'primaryRankPositionTitle')}
                                                                    type="text"
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col lg="4">
                                                            <FormGroup>
                                                                <label
                                                                    className="form-control-label"
                                                                    htmlFor="input-username"
                                                                >
                                                                    Phone
                                                                </label>
                                                                <Input
                                                                    className="form-control-alternative"
                                                                    defaultValue={setItem?.primaryContact}
                                                                    id="input-username"
                                                                    placeholder="Phone"
                                                                    type="text"
                                                                    onChange={text => textOnchange(text, 'primaryContact')}
                                                                />
                                                            </FormGroup>
                                                        </Col>

                                                    </Row>
                                                </>

                                            )}
                                            {setItem?.companyType == 'Tow Company' && (
                                                <Row>
                                                    <Col lg="4">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-username"
                                                            >
                                                                Email
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                defaultValue={setItem?.primaryEmail}
                                                                id="input-username"
                                                                placeholder="Email"
                                                                type="text"
                                                                onChange={text => textOnchange(text, 'primaryEmail')}
                                                            />
                                                        </FormGroup>

                                                    </Col>

                                                </Row>

                                            )}

                                            {setItem?.companyType == 'Tow Company' && (
                                                <>
                                                    <div onClick={() => { setShowSec(!ShowSec) }}>
                                                        {ShowSec ? <AiFillMinusCircle size={22} /> : <AiFillPlusCircle size={22} />}
                                                    </div>
                                                    {ShowSec && (
                                                        <>

                                                            {setItem?.companyType == 'Tow Company' && (
                                                                <>
                                                                    <legend>Secondary Contact</legend>
                                                                    <Row>
                                                                        <Col lg="4">
                                                                            <FormGroup>
                                                                                <label
                                                                                    className="form-control-label"
                                                                                    htmlFor="input-username"
                                                                                >
                                                                                    Name
                                                                                </label>
                                                                                <Input
                                                                                    className="form-control-alternative"
                                                                                    defaultValue={setItem?.secondaryName}
                                                                                    id="input-username"
                                                                                    placeholder="Name"
                                                                                    type="text"
                                                                                    onChange={text => textOnchange(text, 'secondaryName')}
                                                                                />
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col lg="4">
                                                                            <FormGroup>
                                                                                <label
                                                                                    className="form-control-label"
                                                                                    htmlFor="input-username"
                                                                                >
                                                                                    Position/Title
                                                                                </label>
                                                                                <Input
                                                                                    className="form-control-alternative"
                                                                                    defaultValue={setItem?.secondaryRankPositionTitle}
                                                                                    id="input-username"
                                                                                    placeholder="Position/Title"
                                                                                    onChange={text => textOnchange(text, 'secondaryRankPositionTitle')}
                                                                                    type="text"
                                                                                />
                                                                            </FormGroup>
                                                                        </Col>
                                                                        <Col lg="4">
                                                                            <FormGroup>
                                                                                <label
                                                                                    className="form-control-label"
                                                                                    htmlFor="input-username"
                                                                                >
                                                                                    Phone
                                                                                </label>
                                                                                <Input
                                                                                    className="form-control-alternative"
                                                                                    defaultValue={setItem?.secondaryContact}
                                                                                    id="input-username"
                                                                                    placeholder="Phone"
                                                                                    type="text"
                                                                                    onChange={text => textOnchange(text, 'secondaryContact')}
                                                                                />
                                                                            </FormGroup>


                                                                        </Col>

                                                                    </Row>
                                                                </>

                                                            )}
                                                            {setItem?.companyType == 'Tow Company' && (
                                                                <Row>
                                                                    <Col lg="4">
                                                                        <FormGroup>
                                                                            <label
                                                                                className="form-control-label"
                                                                                htmlFor="input-username"
                                                                            >
                                                                                Email
                                                                            </label>
                                                                            <Input
                                                                                className="form-control-alternative"
                                                                                defaultValue={setItem?.secondaryEmail}
                                                                                id="input-username"
                                                                                placeholder="Email"
                                                                                type="text"
                                                                                onChange={text => textOnchange(text, 'secondaryEmail')}
                                                                            />
                                                                        </FormGroup>

                                                                    </Col>

                                                                </Row>

                                                            )}

                                                        </>
                                                    )}
                                                </>
                                            )}
                                            <Button onClick={() => { OnSubmit() }} className="my-4" color="primary" type="button">
                                                {config.save}
                                            </Button>

                                            <Button color="primary" onClick={() => { setModalUpdate(!modalUpdate); }}>{config.close}</Button>
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

export default CompanyDetail;