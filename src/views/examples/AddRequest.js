import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
  Alert,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  CardFooter,
  Table,
  UncontrolledTooltip,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from "reactstrap";
import toast, { Toaster } from 'react-hot-toast';
import { successAlert, errorAlert } from '../../Theme/utils';
import DateTimePicker from 'react-datetime-picker';
// core components
import Header from "components/Headers/Header.js";
import { getLoggedinApi, TowFormDataApi, getDropDownApi, AssignJobApi, AvailableDriversApi, getVinData, DispatchUserRequest } from "../../APIstore/apiCalls";
import PropTypes from 'prop-types';
import ToggleButton from 'react-toggle-button'
// import { DatePicker } from 'reactstrap-date-picker'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import * as moment from 'moment'
import config from "config";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId, geocodeByAddress, getLatLng
} from "react-google-places-autocomplete";
import { set } from "react-hook-form";
const borderRadiusStyle = { borderRadius: 2 }

const options = [
  { value: 'York Regional Police', label: 'York Regional Police' },
  { value: 'Toronto Police Service', label: 'Toronto Police Service' },
  { value: 'Peel Regional Police', label: 'Peel Regional Police' },
  { value: 'Ontario Provincial Police', label: 'Ontario Provincial Police' },
  { value: 'Royal Canadian Mounted Police', label: 'Royal Canadian Mounted Police' },
  { value: 'Durham Regional Police', label: 'Durham Regional Police' },
  { value: 'Halton Regional Police', label: 'Halton Regional Police' },
  { value: 'Barrie Police Service', label: 'Barrie Police Service' },
  { value: 'Other', label: 'Other' },
];
const RoadAssistance = [
  { value: 'Charge Battery', label: 'Charge Battery' },
  { value: 'Car Lock', label: 'Car Lock' },
  { value: 'Tire Repair', label: 'Tire Repair' },
  { value: 'Other', label: 'Other' }
];
const vehicleList = [
  {
    value: 'Car',
    label: 'Car',
  },
  {
    value: 'SUV',
    label: 'SUV',
  },
  { value: 'Pick Up Truck', label: 'Pick Up Truck' },
  { value: 'Dump Truck', label: 'Dump Truck' },
  { value: 'Transport Truck', label: 'Transport Truck' },
  { value: 'Motorcycle', label: 'Motorcycle' },
  {
    value: 'Recreational Vehicle / Motorhome',
    label: 'Recreational Vehicle / Motorhome',
  },
  { value: 'Other', label: 'Other' },
];
const propertyList = [
  { value: 'E-Bike', label: 'E-Bike' },
  { value: 'Snowmobile', label: 'Snowmobile' },
  { value: 'Snowmobile and Trailer', label: 'Snowmobile and Trailer' },
  { value: 'Boat', label: 'Boat' },
  { value: 'Personal Watercraft', label: 'Personal Watercraft' },
  {
    value: ' Personal Watercraft and Trailer',
    label: ' Personal Watercraft and Trailer',
  },
  { value: 'All Terrain Vehicle', label: 'All Terrain Vehicle' },
  { value: 'Construction Equipment', label: 'Construction Equipment' },
  { value: 'Cargo Trailer', label: 'Cargo Trailer' },
  { value: 'Cargo Trailer', label: 'Cargo Trailer' },
  { value: 'Trailer', label: 'Trailer' },
  { value: 'Other', label: 'Other' },
];
const specialTaskList = [
  { value: 'Debris Clean up required', label: 'Debris Clean up required' },
  { value: 'Liquid/Oil clean up required', label: 'Liquid/Oil clean up required' },
  { value: 'Flatbed Cover required', label: 'Flatbed Cover required' },
];
function Profile({ direction, ...args }) {
  const [state, setState] = useState(false);
  const [statePropertyTow, setStateProperTow] = useState(false);
  const [stateOtherOcc, setStateOtherOcc] = useState(false);
  const [stateinCharge, setStateIncharge] = useState(true);
  const [statePolice, setStateIndicatePolicate] = useState(false);
  const [ShowLEAgency, setShowLEAgency] = useState(false);
  const [data, setData] = useState();
  const [dataDropdown, setDropdown] = useState();
  const [dataForm, setDataForm] = useState();
  const [userDetail, setUserDetail] = useState({});
  const [handleChangeData, setHandleChange] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [impoundRequest, setImpoundRequest] = useState('Roadside Assistance');
  const [value, setValue] = useState(new Date().toISOString())
  const [valueStart, setValueStart] = useState(new Date())
  const [valueEnd, setValueEnd] = useState(new Date())
  const [fmtValue, setFmtValue] = useState(undefined)
  const [fmtValueStart, setFmtValueStart] = useState(undefined)
  const [fmtValueEnd, setFmtValueEnd] = useState(undefined)
  const [ReasonforTow, setReasonforTow] = useState('')
  const [policeService, setpoliceService] = useState('')
  const [officerName, setofficerName] = useState('')
  const [officerBadge, setofficerBadge] = useState('')
  const [officerDepart, setofficerDepart] = useState('')
  const [occurrenceNumbers, setoccurrenceNumbers] = useState('')
  const [vin, setvin] = useState('')
  const [vehicleType, setvehicleType] = useState('')
  const [equipmentList, setequipmentList] = useState('')
  const [vehicle, setvehicle] = useState('')
  const [releaseStatus, setreleaseStatus] = useState('')
  const [startingMileage, setstartingMileage] = useState('')
  const [sucess, setSuccess] = useState(false);
  const [errors, setError] = useState(false);
  const [sucessd, setSuccessd] = useState(false);
  const [errorsd, setErrord] = useState(false);
  const [errorsVin, seterrorsVin] = useState(false);
  const [canBerelease, setCanberelease] = useState(false);
  const [RadioVal, setRadioValue] = useState('Vehicle');
  const [roadAssistance, setRoadAssistance] = useState('');
  const [dateTimepicker, onChange] = useState(new Date());

  const [driverData, setDriversData] = useState([]);
  const [usid, setUsId] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [modal, setModal] = useState(false);
  const [mapModal, setMapModal] = useState(false);
  const [List, setList] = useState([]);
  const [emptyError, setEmptyError] = useState(false);
  const [MasterChecked, setMasterChecked] = useState(false);
  const [ShowInstructions, setShowInstructions] = useState(true);
  const [SelectedList, setSelectedList] = useState([]);
  const [officerContact, setOfficerContact] = useState('');
  const [otherContact, setotherContact] = useState('');
  const [licensePlateNumber, setlicensePlateNumber] = useState('');
  const [towJobRequestLocation, settowJobRequestLocation] = useState('');
  const [specialInstructions, setspecialInstructions] = useState('');
  const [vinData, setVinData] = useState('');
  const [address, setAddress] = useState();
  const [addressObj, setAddressObj] = useState();
  const [driverName, setdriverName] = useState('');
  const [driverAddress, setdriverAddress] = useState('');
  const [driverEmail, setdriverEmail] = useState('');
  const [driverMobile, setdriverMobile] = useState('');
  const [SpecialTaskList, setSpecialTaskList] = useState('');
  const [sameAsAbove, setsameAsAbove] = useState(false);

  const [ownerName, setownerName] = useState('');
  const [ownerAddress, setownerAddress] = useState('');
  const [ownerEmail, setownerEmail] = useState('');
  const [ownerMobile, setownerMobile] = useState('');
  const [officerInCharge, setOfficerinCharge] = useState('');

  const [lienName, setlienName] = useState('');
  const [lienAddress, setlienAddress] = useState('');
  const [lienEmail, setlienEmail] = useState('');
  const [lienMobile, setlienMobile] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [veh, setVeh] = useState(false);
  const [prop, setProp] = useState(false);
  const [otherRoad, setotherRoad] = useState(false);
  const [towOnlySet, setTowOnly] = useState(false);
  const [OfficerinChargeBadgeNo, setOfficerinChargeBadgeNo] = useState('');
  const [ImpoundStorageLocation, SetImpoundStorageLocation] = useState('');
  const [reasonforImpoundStorage, setReasonforImpoundStorage] = useState('');
  const [companyID, setCompanyID] = useState('');
  const onMasterCheck = (e) => {
    let tempList = List;
    tempList.map((user) => (user.selected = e.target.checked));
    setMasterChecked(e.target.checked);
    setList(tempList);
    setSelectedList(List.filter((e) => e.selected))
    console.log("MasterSelected", SelectedList)
  }
  const onItemCheck = (e, item) => {
    let tempList = List;
    tempList.map((user) => {
      if (user.id === item.id) {
        user.selected = e.target.checked;
      }
      return user;
    });

    const totalItems = List.length;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;
    setMasterChecked(totalItems === totalCheckedItems);
    setList(tempList);
    setSelectedList(List.filter((e) => e.selected));
    console.log("sadf", SelectedList)
  }

  const getSelectedRows = () => {
    setSelectedList(List.filter((e) => e.selected))
  }
  const AssignjobNow = (id) => {

    if (SelectedList.length > 0) {
      const dataObj = SelectedList.map(items => ({
        id: usid,
        userId: items?.id,
        status: "Assigned"
      }));

      console.log("dataobj", dataObj)
      try {
        AssignJobApi(dataObj, async (res) => {
          if (res.sucess.statusCode === 'success') {
            toggle()
            successAlert(res.sucess.messages[0].message)

          } else {
            toggle()
            errorAlert('Something went wrong');
          }
        });
      } catch (error) {
        errorAlert(error);
      }
    }
    else {
      errorAlert('Please Select atleast one Row')
    }
  }
  const AssignJob = (usId) => {
    try {
      AvailableDriversApi('', async (res) => {
        if (res.sucess) {
          console.log("res.sucess.usersOnJobList", res.sucess?.usersOnJobList)
          setDriversData(res.sucess?.usersOnJobList);
          setList(res.sucess.usersOnJobList)
          toggle()
        } else {
          errorAlert('Something went wrong');
        }
      });
    } catch (error) {
      errorAlert(error);
    }

  }
  const toggle = () => {
    setModal(!modal)
  }
  const vinApiCall = () => {
    if (vin.length == 17) {
      try {
        getVinData(vin, async (res) => {
          console.log(".basicData", res.sucess.queryResponses.queryResponse[0].usMarketData.commonUsData.basicData)
          if (res.sucess) {
            setVinData(res.sucess.queryResponses.queryResponse[0].usMarketData.commonUsData.basicData)
            // setData(res.sucess.list)
          } else {
            errorAlert('Something went wrong');
          }
        });
      } catch (error) {
        errorAlert(error);
      }
    }
    else {
      errorAlert('Please enter valid VIN Number')
    }
  }
  const onSubmit = () => {
    // console.log("ShowLEAgency", vin.length);
    // return
    if (vin == '' || vin.length != 17) {
      errorAlert('Please enter VIN number');
      return;
    }

    let dataObj = {
      questionAsked: [],
      status: 'Pending',
      image: null,
      requestType: reqType ? reqType : '',
      roadService: '',
      reasonForTow: ReasonforTow ? ReasonforTow : '',
      reasonForImpound: reasonforImpoundStorage ? reasonforImpoundStorage : '',
      // startingLocation: {latitude: 43.961743, longitude: -79.065132},
      loading: false,
      indicatePolice: false,
      policeOfficers: [],
      policeService: policeService ? policeService : "Other",
      officerBadge: officerBadge ? officerBadge : '',
      officerInChargeBadge: OfficerinChargeBadgeNo ? OfficerinChargeBadgeNo : '',
      officerDepart: officerDepart ? officerDepart : '',
      officerName: officerName ? officerName : '',
      isOfficerInCharge: false,
      officerInCharge: officerInCharge ? officerInCharge : '',
      officerContact: officerContact ? officerContact : '',
      otherContact: otherContact ? otherContact : '',
      licensePlateNumber: licensePlateNumber ? licensePlateNumber : '',
      specialInstructions: specialInstructions ? specialInstructions : '',
      onSceneFinalImages: [],
      onSceneInitialImages: [],
      policeOccurrence: '',
      isOccurrenceNumbers: false,
      occurrenceNumbers: occurrenceNumbers ? occurrenceNumbers : '',
      receiptPicture: [],
      isMandatory: false,
      isSpecialInstructions: false,
      impoundLocation: ImpoundStorageLocation ? ImpoundStorageLocation : '',
      vin: vin ? vin : "",
      vinBasicData: vinData ? vinData : '',
      driverName: driverName ? driverName : '',
      driverMobile: driverMobile ? driverMobile : '',
      driverAddress: driverAddress ? driverAddress : '',
      driverEmail: driverEmail ? driverEmail : '',
      ownerName: ownerName ? ownerName : '',
      ownerMobile: ownerMobile ? ownerMobile : '',
      ownerAddress: ownerAddress ? ownerAddress : '',
      ownerEmail: ownerEmail ? ownerEmail : '',
      lienName: lienName ? lienName : '',
      lienMobile: lienMobile ? lienMobile : '',
      lienAddress: lienAddress ? lienAddress : '',
      lienEmail: lienEmail ? lienEmail : '',

      towTruck: '',
      vehicleType: vehicleType ? vehicleType : '',
      vehicleOrProperty: RadioVal ? RadioVal : '',
      vehicle: vehicleName ? vehicleName : '',
      property: propertyName ? propertyName : '',
      specialTask: SpecialTaskList ? SpecialTaskList : '',
      specialComments: '',
      comments: '',
      registeredOwnerComments: '',
      vehicleInventory: '',
      vehiclePicture: [],
      inventoryAndDamagePicture: [],
      equipmentList: [],
      startingLocation: '',
      finishingLocation: '',
      towOrImpoundDate: dateTimepicker ? moment(dateTimepicker).format('YYYY-MM-DDThh:mm:ss') : '',
      mandatoryDate: moment(new Date()).format('YYYY-MM-DDThh:mm:ss'),
      startDate: fmtValueStart ? moment(fmtValueStart).format('YYYY-MM-DDThh:mm:ss') : '',
      endDate: fmtValueEnd ? moment(fmtValueEnd).format('YYYY-MM-DDThh:mm:ss') : '',
      releaseStatus: releaseStatus ? releaseStatus : '',
      isRelease: true,
      registeredOwnerNotified: false,
      towCompany: '',
      isOtherVehicle: false,
      otherReportNumber: '',
      otherCompany: '',
      startingMileage: startingMileage ? startingMileage : '',
      endingMileage: 0,
      step: 1,
      requestStatus: 'Pending',
      sent: true,
      towJobRequestLocation: towJobRequestLocation ? towJobRequestLocation : '',
      userId: 0,
      towTruckPersons: null,
      Requestlongitude: latitude ? latitude : '',
      Requestlatitude: longitude ? longitude : '',
      createdAt: moment(new Date()).format('YYYY-MM-DDThh:mm:ss'),
      companyId: ShowLEAgency ? '' : companyID
    }


    try {
      DispatchUserRequest(dataObj, async (res) => {
        console.log("DDDD", res);
        if (res.sucess?.status == "failed") {
          errorAlert(res.sucess.message);

        } else {
          setUsId(res.sucess.generatedIds[0]);
          AssignJob()
          setModal(!modal)
          successAlert(res.sucess.message);
        }
      });
    } catch (error) {
      errorAlert(error);
    }
  }
  const handleChange = (value, formattedValue) => {
    setValue(value)
    setFmtValue(formattedValue)
  }
  const handleChangeStart = (value, formattedValue) => {
    setValueStart(value)
    setFmtValueStart(formattedValue)
  }
  const handleChangeEnd = (value, formattedValue) => {
    setValueEnd(value)
    setFmtValueEnd(formattedValue)
  }
  useEffect(() => {
    try {
      getDropDownApi('', async (res) => {
        if (res.sucess) {
          setDropdown(res.sucess)
        } else {
          errorAlert('Something went wrong');
        }
      });
    } catch (error) {
      errorAlert(error);
    }
  }, [])
  useEffect(() => {
    try {
      getLoggedinApi('', async (res) => {
        if (res.sucess) {
          setCompanyID(res.sucess.companyId)
          setData(res.sucess)
        } else {
          errorAlert('Something went wrong');
        }
      });
    } catch (error) {
      errorAlert(error);
    }
  }, [])
  useEffect(() => {
    try {
      TowFormDataApi('', async (res) => {
        if (res.sucess) {
          setDataForm(res.sucess)
        } else {
          errorAlert('Something went wrong');
        }
      });
    } catch (error) {
      errorAlert(error);
    }
  }, [])
  const textOnchange = (text, name) => {
    let user = userDetail;
    user[name] = text;
    setUserDetail(user);
  };
  const impoundRequestChange = (event) => {
    alert(event.target.value)
    setImpoundRequest(event.target.value)
  }

  const renderList = (selectedArray) => {
    return (selectedArray?.map(data => ({ label: data?.field1, value: data?.id })))
  }
  const [reqType, setreqType] = useState("Roadside Assistance");

  function onChangeValue(event) {
    setreqType(event.target.value);
    console.log(event.target.value);
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

  useEffect(() => {
    const func = async () => {
      const geocodeObj =
        address &&
        address?.value &&
        (await geocodeByPlaceId(address.value?.place_id));
      const addressObject =
        geocodeObj && getAddressObject(geocodeObj[0]?.address_components);
      let makeString = `${addressObject?.address == undefined ? '' : addressObject?.address} ${addressObject?.city == undefined ? '' : addressObj?.city} ${addressObject?.province == undefined ? '' : addressObject?.province} ${addressObject?.country == undefined ? '' : addressObject?.country}`
      // alert(makeString);

      settowJobRequestLocation(address?.label);
    };
    func();
  }, [address]);
  const RadioOnChange = (event) => {
    setRadioValue(event.target.value);
  }
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {sucess && (
          <Alert color="success">
            Request has been Dispatched
          </Alert>
        )}
        {errors && (
          <Alert color="danger">
            Something went Wrong
          </Alert>
        )}
        {errorsVin && (
          <Alert color="danger">
            Please enter valid VIN Number
          </Alert>
        )}
        <Row>

          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">{config.createDispatchRequest}</h3>
                  </Col>
                  {/* <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Settings
                    </Button>
                  </Col> */}
                </Row>
              </CardHeader>
              <CardBody>
                <legend>LE Related</legend>
                <div style={{
                  flexDirection: "row",
                  width: "100%",
                  display: "flex",
                }}>
                  <h6 className="heading-small text-muted">
                    LE Tow (Police / Bylaw):
                  </h6>
                  <div style={{
                    marginTop: 3,
                    marginLeft: 10
                  }}>
                    <ToggleButton
                      value={ShowLEAgency || false}
                      thumbStyle={borderRadiusStyle}
                      trackStyle={borderRadiusStyle}
                      activeLabel={'No'}
                      inactiveLabel={'Yes'}
                      colors={{
                        activeThumb: {
                          base: 'rgb(250,250,250)',
                        },
                        inactiveThumb: {
                          base: 'rgb(250,250,250)',
                        },
                        active: {
                          base: 'rgb(255, 0, 0)',
                          hover: 'rgb(255, 0, 0)',
                        },
                        inactive: {
                          base: 'rgb(0, 128, 0)',
                          hover: 'rgb(0, 128, 0)',
                        }
                      }}
                      // activeLabelStyle={{ backgroundColor:"red",width:'50px' }} 
                      // inactiveLabelStyle={{backgroundColor:"green" ,width:'50px' }}
                      // containerStyle={{display:'inline-block',width:'100px',backgroundColor:"#fff"}}
                      onToggle={(value) => {
                        setShowLEAgency(!value)
                      }} />
                  </div>
                </div>
                {!ShowLEAgency ? (
                  <FormGroup>

                    <Label for="exampleSelect">LE Agency</Label>
                    <Select
                      name="form-field-name"
                      // value={this.state.value}
                      onChange={(val) => { setpoliceService(val.label) }}
                      // clearable={this.state.clearable}
                      // searchable={this.state.searchable}
                      labelKey='name'
                      valueKey='countryCode'
                      options={renderList(dataDropdown?.policeDepartments)}
                    />

                    {/* </Input> */}
                  </FormGroup>
                ) : null}
                <legend>Item Type</legend>
                <div onChange={RadioOnChange}>
                  <input type="radio" value="Vehicle" name="gender" defaultChecked /> Vehicle {'  '}
                  <input type="radio" value="Property" name="gender" /> Property
                </div>
                <div style={{ marginTop: 10 }}>

                  {RadioVal == 'Vehicle' ? (
                    <FormGroup>

                      <Label for="exampleSelect">Select Vehicle</Label>
                      <Select
                        name="form-field-name"
                        // value={this.state.value}
                        onChange={(val) => {
                          setVehicleName(val.label)
                          if (val.label == 'Other') {
                            setVeh(true);
                            setProp(false);
                          } else {
                            setProp(false);
                            setVeh(false);
                          }

                        }}
                        // clearable={this.state.clearable}
                        // searchable={this.state.searchable}
                        labelKey='name'
                        valueKey='countryCode'
                        options={vehicleList}
                      />

                      {/* </Input> */}

                    </FormGroup>
                  ) : (
                    <FormGroup>

                      <Label for="exampleSelect">Select Property</Label>
                      <Select
                        name="form-field-name"
                        // value={this.state.value}
                        onChange={(val) => {
                          setPropertyName(val.label)
                          if (val.label == 'Other') {
                            setProp(true);
                            setVeh(false);
                          }
                          else {
                            setProp(false);
                            setVeh(false);
                          }
                        }}
                        // clearable={this.state.clearable}
                        // searchable={this.state.searchable}
                        labelKey='name'
                        valueKey='countryCode'
                        options={propertyList}
                      />

                      {/* </Input> */}

                    </FormGroup>

                  )}
                  {veh && !prop && RadioVal == 'Vehicle' ? (
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Vehicle Name
                          </Label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue={data?.userName}
                            id="input-username"
                            placeholder="Vehicle Name"
                            type="text"
                            onChange={text => setVehicleName(text.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  ) : null}
                  {prop && !veh && RadioVal == 'Property' ? (
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Property Name
                          </Label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue={data?.userName}
                            id="input-username"
                            placeholder="Property Name"
                            type="text"
                            onChange={text => setPropertyName(text.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  ) : null}
                </div>
                <legend>VIN Information</legend>
                <Row>

                  <Col lg="4">
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        VIN Number
                      </Label>
                      <Input
                        className="form-control-alternative"
                        // defaultValue={data?.userName}
                        id="input-username"
                        placeholder="VIN Number"
                        type="text"
                        onBlur={() => { vinApiCall() }}
                        onChange={text => setvin(text.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        License Plate Number
                      </Label>
                      <Input
                        className="form-control-alternative"
                        // defaultValue={data?.phone}
                        id="input-username"
                        placeholder=" License Plate Number"
                        onChange={text => setlicensePlateNumber(text.target.value)}
                        type="text"
                      />
                    </FormGroup>
                  </Col>

                  <Col lg="4">
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Year
                      </Label>
                      <Input
                        className="form-control-alternative"
                        defaultValue={vinData?.year}
                        id="input-username"
                        placeholder="Make"
                        onChange={text => textOnchange(text, 'make')}
                        type="text"
                      />
                    </FormGroup>
                  </Col>

                </Row>
                <Row>

                  <Col lg="4">
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Make
                      </Label>
                      <Input
                        className="form-control-alternative"
                        defaultValue={vinData?.make}
                        id="input-username"
                        placeholder="Make"
                        onChange={text => textOnchange(text, 'make')}
                        type="text"
                      />
                    </FormGroup>
                  </Col>

                  <Col lg="4">
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        Model
                      </Label>
                      <Input
                        className="form-control-alternative"
                        defaultValue={vinData?.model}
                        id="input-first-name"
                        placeholder="Model"
                        onChange={text => setotherContact(text.target.value)}
                        type="text"
                      />
                    </FormGroup>
                  </Col>

                  <Col lg="4">
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        Body Style
                      </Label>
                      <Input
                        className="form-control-alternative"
                        id="input-first-name"
                        placeholder="Vehicle Type"
                        defaultValue={vinData?.oemBodyStyle}
                        onChange={text => setvehicleType(text.target.value)}
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                </Row>


                <Row>

                  <Col lg="4">
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        Item Type
                      </Label>
                      <Input
                        className="form-control-alternative"
                        id="input-first-name"
                        placeholder="Item Type"
                        defaultValue={vinData?.vehicleType}
                        onChange={text => setvehicleType(text.target.value)}
                        type="text"
                      />
                    </FormGroup>
                  </Col>

                  <Col lg="4">
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        Body Type
                      </Label>
                      <Input
                        className="form-control-alternative"
                        id="input-first-name"
                        placeholder="Body Type"
                        defaultValue={vinData?.bodyType}
                        // onChange={text => setvehicleType(text.target.value)}
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        Driver Type
                      </Label>
                      <Input
                        className="form-control-alternative"
                        id="input-first-name"
                        defaultValue={vinData?.driveType}
                        placeholder="Driver Type"
                        onChange={text => setvehicleType(text.target.value)}
                        type="text"
                      />
                    </FormGroup>
                  </Col>

                </Row>

                <legend>Special Task</legend>
                <div style={{
                  flexDirection: "row",
                  width: "100%",
                  display: "flex",
                }}>
                  <h6 className="heading-small text-muted">
                    Clean Up/Special Instructions?
                  </h6>
                  <div style={{
                    marginTop: 3,
                    marginLeft: 10
                  }}>
                    <ToggleButton
                      value={ShowInstructions || false}
                      thumbStyle={borderRadiusStyle}
                      trackStyle={borderRadiusStyle}
                      activeLabel={'No'}
                      inactiveLabel={'Yes'}
                      colors={{
                        activeThumb: {
                          base: 'rgb(250,250,250)',
                        },
                        inactiveThumb: {
                          base: 'rgb(250,250,250)',
                        },
                        active: {
                          base: 'rgb(255, 0, 0)',
                          hover: 'rgb(255, 0, 0)',
                        },
                        inactive: {
                          base: 'rgb(0, 128, 0)',
                          hover: 'rgb(0, 128, 0)',
                        }
                      }}
                      onToggle={(value) => {
                        setShowInstructions(!value)
                      }} />
                  </div>
                </div>
                {!ShowInstructions ? (
                  <Row>
                    <Col lg="4">
                      <FormGroup>

                        <Label for="exampleSelect">Task</Label>
                        <Select
                          name="form-field-name"
                          // value={this.state.value}
                          onChange={(val) => { setSpecialTaskList(val.label) }}
                          // clearable={this.state.clearable}
                          // searchable={this.state.searchable}
                          labelKey='name'
                          valueKey='countryCode'
                          options={specialTaskList}
                        />

                        {/* </Input> */}
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Special Instructions
                        </Label>
                        <Input
                          className="form-control-alternative sp-class"
                          // defaultValue={data?.phone}
                          id="input-username"
                          placeholder="Special Instructions"
                          onChange={text => setspecialInstructions(text.target.value)}
                          type="textarea"
                          name="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                ) : null}

                <legend>Vehicle Owner Information</legend>
                {/* <Input
                  type="checkbox"
                  // checked={sameAsAbove}
                  onChange={(e) => {
                    console.log('e.target.value',e.target.value);
                    // if (e.target.value == 'on') {
                    //   setsameAsAbove(true)
                    // }
                    // else {
                    //   setsameAsAbove(false)
                    // }
                  }}
                /> */}

                <Row>

                  <Col lg="3">
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Name
                      </Label>
                      <Input
                        className="form-control-alternative"
                        // defaultValue={data?.userName}
                        id="input-username"
                        placeholder="Name"
                        type="text"
                        // onBlur={() => { vinApiCall() }}
                        onChange={text => setownerName(text.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="3">
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Address
                      </Label>
                      <Input
                        className="form-control-alternative"
                        // defaultValue={data?.phone}
                        id="input-username"
                        placeholder="Address"
                        onChange={text => setownerAddress(text.target.value)}
                        type="text"
                      />
                    </FormGroup>
                  </Col>

                  <Col lg="3">
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Phone Number
                      </Label>
                      <Input
                        className="form-control-alternative"
                        // defaultValue={vinData?.make}
                        id="input-username"
                        placeholder="Phone Number"
                        onChange={text => setownerMobile(text.target.value)}
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="3">
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Email
                      </Label>
                      <Input
                        className="form-control-alternative"
                        // defaultValue={vinData?.make}
                        id="input-username"
                        placeholder="Email"
                        onChange={text => setownerEmail(text.target.value)}
                        type="text"
                      />
                    </FormGroup>
                  </Col>

                </Row>
                <legend>Lien Holder Information</legend>
                <Row>

                  <Col lg="3">
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Name
                      </Label>
                      <Input
                        className="form-control-alternative"
                        // defaultValue={data?.userName}
                        id="input-username"
                        placeholder="Name"
                        type="text"
                        // onBlur={() => { vinApiCall() }}
                        onChange={text => setlienName(text.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="3">
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Address
                      </Label>
                      <Input
                        className="form-control-alternative"
                        // defaultValue={data?.phone}
                        id="input-username"
                        placeholder="Address"
                        onChange={text => setlienAddress(text.target.value)}
                        type="text"
                      />
                    </FormGroup>
                  </Col>

                  <Col lg="3">
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Phone Number
                      </Label>
                      <Input
                        className="form-control-alternative"
                        // defaultValue={vinData?.make}
                        id="input-username"
                        placeholder="Phone Number"
                        onChange={text => setlienMobile(text.target.value)}
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="3">
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Email
                      </Label>
                      <Input
                        className="form-control-alternative"
                        // defaultValue={vinData?.make}
                        id="input-username"
                        placeholder="Email"
                        onChange={text => setlienEmail(text.target.value)}
                        type="text"
                      />
                    </FormGroup>
                  </Col>

                </Row>
                {/* <div style={{ display: "flex", flexDirection: "row" }}>
                  <legend style={{ width: "unset" }}>Driver Information</legend>

                  <FormGroup row>
                  <Label sm={2}>Checkbox</Label>
                    <Col
                      sm={{
                        size: 10
                      }}
                    >

                      <FormGroup check>
                        
                        <Input
                          id="checkbox2"
                          type="checkbox"
                          checked={sameAsAbove}
                          onChange={(e) => {
                            const { checked } = e.target
                            console.log('checked', checked);
                            setsameAsAbove(!sameAsAbove)
                            if (checked === true) {
                              setdriverName(ownerName);
                              setdriverAddress(ownerAddress);
                              setdriverEmail(ownerEmail);
                              setdriverMobile(ownerMobile);
                            }
                            else {
                              setdriverName('');
                              setdriverAddress('');
                              setdriverEmail('');
                              setdriverMobile('');
                            }

                          }}
                        />

                      </FormGroup>
                    </Col>
                  </FormGroup>

                </div> */}

                <FormGroup row className="margin-class">
                  <Label className="dInformation">Driver Information</Label>
                  <Col sm={{ size: 4 }}>
                    <FormGroup check>

                      <Input
                        id="checkbox2"
                        className="checkq"
                        type="checkbox"
                        checked={sameAsAbove}
                        onChange={(e) => {
                          const { checked } = e.target
                          console.log('checked', checked);
                          setsameAsAbove(!sameAsAbove)
                          if (checked === true) {
                            setdriverName(ownerName);
                            setdriverAddress(ownerAddress);
                            setdriverEmail(ownerEmail);
                            setdriverMobile(ownerMobile);
                          }
                          else {
                            setdriverName('');
                            setdriverAddress('');
                            setdriverEmail('');
                            setdriverMobile('');
                          }

                        }}
                      />{'  '}
                      {' '}Same as Owner

                    </FormGroup>
                  </Col>
                </FormGroup>
                <Row>

                  <Col lg="3">
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Name
                      </Label>
                      <Input
                        className="form-control-alternative"
                        defaultValue={driverName ? driverName : ''}
                        id="input-username"
                        placeholder="Name"
                        type="text"
                        // onBlur={() => { vinApiCall() }}
                        onChange={text => setdriverName(text.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="3">
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Address
                      </Label>
                      <Input
                        className="form-control-alternative"
                        defaultValue={driverAddress ? driverAddress : ''}
                        id="input-username"
                        placeholder="Address"
                        onChange={text => setdriverAddress(text.target.value)}
                        type="text"
                      />
                    </FormGroup>
                  </Col>

                  <Col lg="3">
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Phone Number
                      </Label>
                      <Input
                        className="form-control-alternative"
                        defaultValue={driverMobile ? driverMobile : ''}
                        id="input-username"
                        placeholder="Phone Number"
                        onChange={text => setdriverMobile(text.target.value)}
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="3">
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Email
                      </Label>
                      <Input
                        className="form-control-alternative"
                        defaultValue={driverEmail ? driverEmail : ''}
                        id="input-username"
                        placeholder="Email"
                        onChange={text => setdriverEmail(text.target.value)}
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                {/* </Col> */}
                <legend>{!ShowLEAgency ? 'Law Enforcement:' : 'Client Information'}</legend>
                <Form>

                  {/* <div style={{
                    flexDirection: "row",
                    width: "100%",
                    display: "flex",
                  }}>
                    <h6 className="heading-small text-muted">
                      Indicate LE Tow (Police / Bylaw):
                    </h6>
                    <div style={{
                      marginTop: 3,
                      marginLeft: 10
                    }}>
                      <ToggleButton
                        value={statePolice || false}
                        thumbStyle={borderRadiusStyle}
                        trackStyle={borderRadiusStyle}
                        activeLabel={'No'}
                        inactiveLabel={'Yes'}
                        colors={{
                          activeThumb: {
                            base: 'rgb(250,250,250)',
                          },
                          inactiveThumb: {
                            base: 'rgb(250,250,250)',
                          },
                          active: {
                            base: 'rgb(255, 0, 0)',
                            hover: 'rgb(255, 0, 0)',
                          },
                          inactive: {
                            base: 'rgb(0, 128, 0)',
                            hover: 'rgb(0, 128, 0)',
                          }
                        }}
                        onToggle={(value) => {
                          setStateIndicatePolicate(!value)
                        }} />
                    </div>
                  </div> */}

                  <div className="">
                    {!ShowLEAgency && (
                      <Row>


                        <Col lg="4">
                          <FormGroup>
                            <Label
                              className="form-control-Label"
                              htmlFor="input-username"
                            >
                              LE Agency Occurrence #
                            </Label>
                            <Input
                              className="form-control-alternative"
                              // defaultValue={data?.userName}
                              id="input-username"
                              placeholder="LE Agency Occurrence #"
                              onChange={text => setoccurrenceNumbers(text.target.value)}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <Label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Officer Badge
                            </Label>
                            <Input
                              className="form-control-alternative"
                              // defaultValue={data?.userName}
                              id="input-username"
                              placeholder="Officer Badge"
                              onChange={text => setofficerBadge(text.target.value)}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <Label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Officer Name
                            </Label>
                            <Input
                              className="form-control-alternative"
                              // defaultValue={data?.phone}
                              id="input-username"
                              placeholder="Officer Name"
                              type="text"
                              onChange={text => setofficerName(text.target.value)}
                            />
                          </FormGroup>
                        </Col>


                      </Row>
                    )}
                    {!ShowLEAgency && (
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <Label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Officer Unit/Assignment
                            </Label>
                            <Input
                              className="form-control-alternative"
                              // defaultValue={data?.firstName}
                              id="input-first-name"
                              placeholder="Officer Unit/Assignment"
                              type="text"
                              onChange={text => setofficerDepart(text.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        {/* <Col lg="4">

                          <FormGroup>
                            <Label for="exampleSelect">Agency Name</Label>
                            <Select
                              name="form-field-name"
                              // value={this.state.value}
                              onChange={(val) => { setpoliceService(val.label) }}
                              // clearable={this.state.clearable}
                              // searchable={this.state.searchable}
                              labelKey='name'
                              valueKey='countryCode'
                              options={options}
                            />
                          </FormGroup>
                        </Col> */}
                        {/* <Col lg="4">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Other Company
                          </Label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue={data?.firstName}
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                            onChange={text => textOnchange(text, 'otherCompany')}
                          />
                        </FormGroup>
                      </Col> */}
                      </Row>
                    )}
                    {!ShowLEAgency && (
                      <Row>
                        <Col lg="4">
                          <h6 className="heading-small text-muted">
                            Officer in Charge:
                          </h6>
                          <ToggleButton
                            value={stateinCharge || false}
                            thumbStyle={borderRadiusStyle}
                            trackStyle={borderRadiusStyle}
                            activeLabel={'No'}
                            inactiveLabel={'Yes'}
                            colors={{
                              activeThumb: {
                                base: 'rgb(250,250,250)',
                              },
                              inactiveThumb: {
                                base: 'rgb(250,250,250)',
                              },
                              active: {
                                base: 'rgb(255, 0, 0)',
                                hover: 'rgb(255, 0, 0)',
                              },
                              inactive: {
                                base: 'rgb(0, 128, 0)',
                                hover: 'rgb(0, 128, 0)',
                              }
                            }}
                            onToggle={(value) => {
                              setStateIncharge(!value)
                            }} />
                        </Col>
                        {stateinCharge && (
                          <>
                            <Col lg="4">
                              <FormGroup>
                                <Label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Officer In Charge Badge #
                                </Label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-username"
                                  placeholder="Officer in Charge"
                                  onChange={text => setOfficerinChargeBadgeNo(text.target.value)}
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="4">
                              <FormGroup>
                                <Label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Officer In Charge Name
                                </Label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-username"
                                  placeholder="Officer in Charge"
                                  onChange={text => setOfficerinCharge(text.target.value)}
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                          </>
                        )}
                      </Row>
                    )}
                    {!ShowLEAgency && (
                      <Row>
                        <Col lg="4">
                          <h6 className="heading-small text-muted">
                            Other Occurrence Number:
                          </h6>
                          <ToggleButton
                            value={stateOtherOcc || false}
                            thumbStyle={borderRadiusStyle}
                            trackStyle={borderRadiusStyle}
                            activeLabel={'Yes'}
                            inactiveLabel={'No'}
                            colors={{
                              activeThumb: {
                                base: 'rgb(250,250,250)',
                              },
                              inactiveThumb: {
                                base: 'rgb(250,250,250)',
                              },
                              inactive: {
                                base: 'rgb(255, 0, 0)',
                                hover: 'rgb(255, 0, 0)',
                              },
                              active: {
                                base: 'rgb(0, 128, 0)',
                                hover: 'rgb(0, 128, 0)',
                              }
                            }}
                            onToggle={(value) => {
                              setStateOtherOcc(!value)
                            }} />
                        </Col>
                        {stateOtherOcc && (
                          <Col lg="8">
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Other Occurrence Number
                              </Label>
                              <Input
                                className="form-control-alternative"
                                // defaultValue={data?.userName}
                                id="input-username"
                                placeholder="Other Occurrence Number"
                                // onChange={text => textOnchange(text, 'vin')}
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        )}
                      </Row>
                    )}
                    <Row>
                      {/* <Col lg="4">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Vin
                          </Label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue={data?.userName}
                            id="input-username"
                            placeholder="Vin"
                            onChange={text => setvin(text.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col> */}
                      <Col lg="4">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Client Name
                          </Label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue={data?.userName}
                            id="input-username"
                            placeholder="Client Name"
                            onChange={text => setofficerName(text.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Client Phone
                          </Label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue={data?.userName}
                            id="input-username"
                            placeholder="Client Phone"
                            onChange={text => setOfficerContact(text.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Other Contact Info
                          </Label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue={data?.phone}
                            id="input-username"
                            placeholder="Other Contact Info"
                            onChange={text => setotherContact(text.target.value)}
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                    </Row>


                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Special Instructions
                          </Label>
                          <Input
                            className="form-control-alternative sp-class"
                            // defaultValue={data?.phone}
                            id="input-username"
                            placeholder="Special Instructions"
                            onChange={text => setspecialInstructions(text.target.value)}
                            type="textarea"
                            name="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <Label for="exampleSelect">Tow Vehicle Requested</Label>
                          <Select
                            name="form-field-name"
                            // value={this.state.value}
                            onChange={(val) => { setvehicle(val.label) }}
                            // clearable={this.state.clearable}
                            // searchable={this.state.searchable}
                            labelKey='name'
                            valueKey='countryCode'
                            options={renderList(dataDropdown?.towTrucks)}
                          />
                        </FormGroup>
                      </Col>
                      {/* <Col lg="4">
                        <FormGroup>
                          <Label for="exampleSelect">Impound / DropOff Location</Label>
                          <Select
                            name="form-field-name"
                            // value={this.state.value}
                            onChange={(val) => { setvehicle(val.label) }}
                            // clearable={this.state.clearable}
                            // searchable={this.state.searchable}
                            labelKey='name'
                            valueKey='countryCode'
                            options={renderList(dataDropdown?.towTrucks)}
                          />
                        </FormGroup>
                      </Col> */}
                      <Col lg="4">
                        <FormGroup>
                          <Label for="exampleSelect">Tow Equipment Required</Label>
                          <Select
                            name="form-field-name"
                            // value={this.state.value}
                            onChange={(val) => { setequipmentList(val.label) }}
                            // clearable={this.state.clearable}
                            // searchable={this.state.searchable}
                            labelKey='name'
                            // valueKey='countryCode'
                            options={renderList(dataDropdown?.equipmentList)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <legend>Service Information</legend>
                    <div onChange={onChangeValue}>
                      <FormGroup tag="fieldset">
                        <h4>Select Type</h4>
                        <FormGroup check>
                          <Label check>
                            <input type="radio" value="Roadside Assistance" name="reqType" checked={reqType === "Roadside Assistance"} />
                            {' '}Roadside Assistance
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Label check>
                            <input type="radio" value="Tow and Impound" name="reqType" checked={reqType === "Tow and Impound"} />
                            {' '}Tow and Impound/Storage
                          </Label>
                        </FormGroup>
                        <FormGroup check>
                          <Label check>
                            <input type="radio" value="Tow Only" name="reqType" checked={reqType === "Tow Only"} />
                            {' '}Tow Only
                          </Label>
                        </FormGroup>
                      </FormGroup>
                    </div>
                    {/* <Col lg="4"> */}
                    <FormGroup>

                      {reqType == 'Roadside Assistance' ? (
                        <>
                          <Label for="exampleSelect">Roadside Assistance Type</Label>
                          <Select
                            name="form-field-name"
                            // value={this.state.value}
                            onChange={(val) => {
                              setRoadAssistance(val.label)
                              console.log("Asdsa", val.label);
                              if (val.label == 'Other') {
                                setotherRoad(true)
                              }
                              else {
                                setotherRoad(false)
                              }
                            }}
                            // clearable={this.state.clearable}
                            // searchable={this.state.searchable}
                            labelKey='name'
                            valueKey='countryCode'
                            options={RoadAssistance}
                          />
                        </>
                      ) : (
                        <>
                          <Label for="exampleSelect">{reqType == 'Tow and Impound' ? "Reason for Tow" : "Tow Service Request"}</Label>
                          <Select
                            name="form-field-name"
                            // onChange={(val) => { setReasonforTow(val.label) }}
                            onChange={(val) => {
                              setReasonforTow(val.label)
                              console.log("Asdsa", val.label);
                              if (val.label == 'Other' || val.label == 'Other - Manual Entry') {
                                setTowOnly(true)
                              }
                              else {
                                setTowOnly(false)
                              }
                            }}
                            labelKey='name'
                            valueKey='countryCode'
                            options={renderList(dataDropdown?.reasonForTow)}
                          />
                        </>
                      )}
                      {towOnlySet && reqType == 'Tow Only' ? (
                        <Row className="ma-class">
                          <Col lg="12">
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Other
                              </Label>
                              <Input
                                className="form-control-alternative"
                                // defaultValue={data?.userName}
                                id="input-username"
                                placeholder="Other"
                                type="text"
                                onChange={text => setReasonforTow(text.target.value)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      ) : null}
                      {otherRoad && reqType == 'Roadside Assistance' ? (
                        <Row className="ma-class">
                          <Col lg="12">
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Other
                              </Label>
                              <Input
                                className="form-control-alternative"
                                // defaultValue={data?.userName}
                                id="input-username"
                                placeholder="Other"
                                type="text"
                                onChange={text => setReasonforTow(text.target.value)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      ) : null}
                      {/* {otherRoad && reqType == 'Tow and Impound' ? (
                        <Row className="ma-class">
                          <Col lg="12">
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Other
                              </Label>
                              <Input
                                className="form-control-alternative"
                                // defaultValue={data?.userName}
                                id="input-username"
                                placeholder="Other"
                                type="text"
                                onChange={text => setReasonforTow(text.target.value)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      ) : null} */}

                      {/* </Input> */}
                    </FormGroup>
                    <Row>
                      <>
                        {reqType == 'Tow and Impound' && (

                          <Col lg="12">
                            <FormGroup>
                              <Label for="exampleSelect">Reason for Impound/Storage</Label>
                              <Select
                                name="form-field-name"
                                // onChange={(val) => { setReasonforTow(val.label) }}
                                onChange={(val) => {
                                  setReasonforImpoundStorage(val.label)
                                  console.log("Asdsa", val.label);
                                  if (val.label == 'Other' || val.label == 'Other - Manual Entry') {
                                    setTowOnly(true)
                                  }
                                  else {
                                    setTowOnly(false)
                                  }
                                }}
                                labelKey='name'
                                valueKey='countryCode'
                                options={renderList(dataDropdown?.reasonForImpound)}
                              />
                            </FormGroup>
                          </Col>
                        )}
                      </>
                    </Row>
                    <Row>
                      {reqType == 'Tow and Impound' ? (
                        <>

                          <legend>Release Information</legend>

                          <div style={{
                            flexDirection: "row",
                            width: "100%",
                            display: "flex",
                          }}>
                            <h6 className="heading-small text-muted">
                              Can be released:
                            </h6>
                            <div style={{
                              marginTop: 3,
                              marginLeft: 10
                            }}>
                              <ToggleButton
                                value={canBerelease || false}
                                thumbStyle={borderRadiusStyle}
                                trackStyle={borderRadiusStyle}
                                activeLabel={'Yes'}
                                inactiveLabel={'No'}
                                colors={{
                                  activeThumb: {
                                    base: 'rgb(250,250,250)',
                                  },
                                  inactiveThumb: {
                                    base: 'rgb(250,250,250)',
                                  },
                                  inactive: {
                                    base: 'rgb(255, 0, 0)',
                                    hover: 'rgb(255, 0, 0)',
                                  },
                                  active: {
                                    base: 'rgb(0, 128, 0)',
                                    hover: 'rgb(0, 128, 0)',
                                  }
                                }}
                                onToggle={(value) => {
                                  setCanberelease(!value)
                                }} />
                            </div>
                          </div>
                          {!canBerelease ? (
                            <>
                              <Col lg="4">
                                <FormGroup>
                                  <Label for="exampleSelect">Release Status</Label>
                                  <Select
                                    name="form-field-name"
                                    // value={this.state.value}
                                    onChange={(val) => { setreleaseStatus(val.label) }}
                                    // clearable={this.state.clearable}
                                    // searchable={this.state.searchable}
                                    labelKey='name'
                                    valueKey='countryCode'
                                    options={renderList(dataDropdown?.releaseStatus)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <Label>Start Date</Label>
                                  {/* <DatePicker id="example-datepicker"
                                    value={valueStart}
                                    onChange={(v, f) => handleChangeStart(v, f)} /> */}
                                  <div className="date-style">
                                    <DatePicker
                                      selected={valueStart}
                                      onChange={(v, f) => handleChangeStart(v, f)}
                                      isClearable
                                      placeholderText="Please select start date"
                                    />
                                  </div>
                                  {/* <DateTimePicker onChange={(v, f) => handleChangeStart(v, f)} value={valueStart} /> */}
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <Label>End Date</Label>
                                  {/* <DateTimePicker onChange={(v, f) => handleChangeEnd(v, f)} value={valueEnd} /> */}
                                  <div className="date-style">
                                    <DatePicker
                                      selected={valueEnd}
                                      onChange={(v, f) => handleChangeEnd(v, f)}
                                      isClearable
                                      placeholderText="Please select end date"
                                    />
                                  </div>
                                  {/* <DatePicker id="example-datepicker"
                                    value={valueEnd}
                                    onChange={(v, f) => handleChangeEnd(v, f)} /> */}
                                </FormGroup>
                              </Col>
                            </>
                          ) : null}
                          <>
                            <legend>Additional Service Information</legend>

                            <>

                              <Col lg="4">
                                <FormGroup>
                                  <Label>Date and Time of Service Request</Label>
                                  {/* <DatePicker id="example-datepicker"
                                    value={value}
                                    onChange={(v, f) => handleChange(v, f)} /> */}
                                  <DateTimePicker onChange={onChange} value={dateTimepicker} />
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <Label for="exampleSelect">Impound/Storage Location</Label>
                                  <Select
                                    name="form-field-name"
                                    // value={this.state.value}
                                    onChange={(val) => { SetImpoundStorageLocation(val.label) }}
                                    // clearable={this.state.clearable}
                                    // searchable={this.state.searchable}
                                    labelKey='name'
                                    valueKey='countryCode'
                                    options={renderList(dataDropdown?.poundList)}
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="4">
                                <FormGroup>
                                  <Label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                  >
                                    Starting Location of Tow
                                  </Label>
                                  {/* <Input
                            className="form-control-alternative"
                            // defaultValue={data?.phone}
                            id="input-username"
                            placeholder="Tow Location"
                            onChange={text => settowJobRequestLocation(text.target.value)}
                            type="text"
                          /> */}
                                  <GooglePlacesAutocomplete
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
                                  />
                                </FormGroup>
                              </Col>
                            </>

                          </>
                        </>
                      ) : null}



                    </Row>
                    {/* <legend>Mileage Information</legend>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Starting Mileage of Tow Vehicle
                          </Label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue={data?.phone}
                            id="input-username"
                            placeholder=" Starting Mileage of Tow Vehicle"
                            type="text"
                            onChange={text => setstartingMileage(text.target.value)}
                          />
                        </FormGroup>
                      </Col>
                     
                    </Row> */}

                    <Button onClick={() => { onSubmit() }} className="my-4" color="primary" type="button">
                      {config.submit}
                    </Button>
                  </div>

                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal size="lg" style={{ maxWidth: '1600px', width: '80%' }} isOpen={modal} toggle={() => { toggle() }}>

          <ModalBody>
            {sucessd && (
              <Alert color="success">
                Job assigned to driver
              </Alert>
            )}
            {errorsd && (
              <Alert color="danger">
                Something went Wrong
              </Alert>
            )}
            {emptyError && (
              <Alert color="danger">
                Please Select atleast one Row
              </Alert>
            )}
            <Row>
              <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <h3 className="mb-0">{config.availableDrivers}</h3>
                    {/* <h3 style={{ position: "absolute", right: 20, top: 25, }} className="mb-0">Keep Scrolling ►</h3> */}
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            checked={MasterChecked}
                            id="mastercheck"
                            onChange={(e) => onMasterCheck(e)}
                          />
                        </th>
                        <th scope="col">Username</th>
                        <th scope="col">Name</th>
                        {/* <th scope="col">Address</th>
                        <th scope="col">Province</th> */}
                        <th scope="col">Phone</th>
                        {/* <th scope="col">Gender</th> */}
                        <th scope="col" />
                      </tr>
                    </thead>
                    {driverData ? (
                      <tbody>
                        {driverData.map((item) => {
                          return (
                            <tr key={item?.id} className={item?.selected ? "selected" : ""}>
                              <th scope="row">
                                <Input
                                  type="checkbox"
                                  checked={item?.selected}
                                  className="form-check-input"
                                  id="rowcheck{item.id}"
                                  onChange={(e) => onItemCheck(e, item)}
                                />
                              </th>
                              {/* <th scope="row">
                                <Media className="align-items-center">
                                  <a
                                    className="avatar rounded-circle mr-3"

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
                              <td className="text-sm">{item?.userName}</td>
                              <td className="text-sm">{item?.title} {item?.firstName} {item?.lastName}</td>
                              {/* <td className="text-sm">
                                {item?.address}, {item?.city}, {item?.country}
                              </td>
                              <td className="text-sm">
                                {item?.province}
                              </td> */}
                              <td className="text-sm">
                                {item?.phone}
                              </td>
                              <td className="text-sm">
                                <Button color="primary" onClick={() => {
                                  if (SelectedList.length > 0) {
                                    AssignjobNow(item?.id)
                                  }
                                  else {
                                    errorAlert('Please select atleast one record')
                                  }
                                }}>{config.assignJob}</Button>
                              </td>

                              {/* <td className="text-right">
                                <UncontrolledDropdown>
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

                                      onClick={() => { AssignjobNow(item?.id) }}
                                    >
                                      {config.assignJob}
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

                            onClick={e => e.preventDefault()}
                            tabIndex="-1"
                          >
                            <i className="fas fa-angle-left" />
                            <span className="sr-only">Previous</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem className="active">
                          <PaginationLink

                            onClick={e => e.preventDefault()}
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink

                            onClick={e => e.preventDefault()}
                          >
                            2 <span className="sr-only">(current)</span>
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink

                            onClick={e => e.preventDefault()}
                          >
                            3
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink

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
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => { toggle() }}>{config.close}</Button>
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
Profile.propTypes = {
  direction: PropTypes.string,
};
export default Profile;
