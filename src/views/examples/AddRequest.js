import React, { useEffect, useState } from "react";

import {Button,Card,CardHeader,CardBody,FormGroup,Form,Input,Container,Row,Col,Label,Pagination,PaginationItem,PaginationLink,CardFooter,Table,Modal,ModalBody,ModalFooter} from "reactstrap";
import { Toaster } from 'react-hot-toast';
import { successAlert, errorAlert } from '../../Theme/utils';
import DateTimePicker from 'react-datetime-picker';
import Header from "components/Headers/Header.js";
import { getLoggedinApi, TowFormDataApi, getDropDownApi, AssignJobApi, AvailableDriversApi, getVinData, DispatchUserRequest,singleAllCorporate } from "../../APIstore/apiCalls";
import PropTypes from 'prop-types';
import ToggleButton from 'react-toggle-button'
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import AddressInput from './AddressInput';
import * as moment from 'moment'
import config from "config";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
const borderRadiusStyle = { borderRadius: 2 }

var localAccessData = null
function Profile({ direction, ...args }) {
  const requestData = {
    status: 'Pending',
    image: null,
    requestType: 'Roadside Assistance',
    roadService: '',
    reasonForTow:'',
    reasonForImpound: '',
    startingLocation: '',
    finishingLocation: '',
    loading: false,
    indicatePolice: true,
    policeService:"",
    officerBadge:'',
    officerInChargeBadge: '',
    officerDepart: '',
    officerName: '',
    isOfficerInCharge: true,
    officerInCharge: '',
    officerContact: '',
    otherContact: '',
    licensePlateNumber: '',
    specialInstructions: '',
    policeOccurrence: '',
    isOccurrenceNumbers:false,
    occurrenceNumbers: '',
    isMandatory: false,
    isSpecialInstructions:  false,
    impoundLocation: '',
    vin:"",
    vinBasicData: null,
    driverName: '',
    driverMobile:'',
    driverAddress:'',
    driverEmail: '',
    ownerName:  '',
    ownerMobile: '',
    ownerAddress: '',
    ownerEmail: '',
    lienName: '',
    lienMobile: '',
    lienAddress: '',
    lienEmail: '',
    towTruck: '',
    vehicleType: '',
    vehicleOrProperty: 'Vehicle',
    vehicle: '',
    property: '',
    specialTask:'',
    specialComments:'',
    equipmentList: [],
    towOrImpoundDate:new Date(),
    mandatoryDate: moment(new Date()).format('YYYY-MM-DDThh:mm:ss'),
    startDate: new Date(),
    endDate: new Date(),
    releaseStatus:  '',
    isRelease: false,
    registeredOwnerNotified: false,
    isOtherVehicle: false,
    startingMileage: 0,
    endingMileage: 0,
    step: 1,
    requestStatus: 'Pending',
    sent: true,
    towJobRequestLocation:'',
    userId: 0,
    towTruckPersons: null,
    createdAt: moment(new Date()).format('YYYY-MM-DDThh:mm:ss'),
    companyId: '',
    heldPurpose: '',
    propertyForfiet: '',
    propertyForfietDetails: ""
  }

  const [state, setState] = useState(requestData);

  const [key, setKey] = useState(0);
  const [ShowLEAgency, setShowLEAgency] = useState(false);
  const [data, setData] = useState();
  const [dataDropdown, setDropdown] = useState();
  const [dataForm, setDataForm] = useState();
  const [userDetail, setUserDetail] = useState({});
  const [roadAssistance, setRoadAssistance] = useState('');
  const [driverData, setDriversData] = useState([]);
  const [usid, setUsId] = useState([]);
  const [modal, setModal] = useState(false);
  const [List, setList] = useState([]);
  const [MasterChecked, setMasterChecked] = useState(false);
  const [SelectedList, setSelectedList] = useState([]);
  const [vinData, setVinData] = useState('');
  const [address, setAddress] = useState();
  const [sameAsAbove, setsameAsAbove] = useState(false);
  const [specialTaskListOther, setSpecialTaskListOther] = useState(false);
  const [veh, setVeh] = useState(false);
  const [prop, setProp] = useState(false);
  const [otherRoad, setotherRoad] = useState(false);
  const [towOnlySet, setTowOnly] = useState(false);
  const [towOnlyImpound, setTowOnlyImpound] = useState(false);
  const [towVehicleRequested, SetTowVehicleRequested] = useState(false);
  const [TowEquipmentRequired, SetTowEquipmentRequired] = useState(false);
  const [ReleasedStatus, setReleasedStatus] = useState(false);

  const [showheldForOthers, setShowHeldForOthers] = useState('');
  const [showPropertyForfiet, setShowPropertyForfiet] = useState('');
  const [dateDisabled, setDateDisabled] = useState(false);
  const [fleetVehicles, setFleetVehicles] = useState();

  const onMasterCheck = (e) => {
    let tempList = List;
    tempList.map((user) => (user.selected = e.target.checked));
    setMasterChecked(e.target.checked);
    setList(tempList);
    setSelectedList(List.filter((e) => e.selected))
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
  }

  const AssignjobNow = (id) => {
    if (SelectedList.length > 0) {
      const dataObj = SelectedList.map(items => ({
        id: usid,
        userId: items?.id,
        status: "Assigned"
      }));

      try {
        AssignJobApi(dataObj, async (res) => {
          if (res.sucess.statusCode == 'success') {
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
    if (state.vin.length == 17) {
      try {
        getVinData(state.vin, async (res) => {
          if (res.sucess) {
            setVinData(res.sucess.queryResponses.queryResponse[0].usMarketData.commonUsData.basicData)
          } else {
            errorAlert('Something went wrong');
          }
        });
      } catch (error) {
        errorAlert(error);
      }
    }
  }

  const onSubmit = () => {
    let messages="";
    for (const key in config.sRequest) {
      const label1 = String(config.sRequest[key].label?.l1);
      const label2 = String(config.sRequest[key].label?.l2);
      const ext = String(config.sRequest[key].ext);
      const cext = String(config.sRequest[key].cext);
      
      if (label1.endsWith('*') || label2.endsWith('*')) {
        if(state[key]==undefined || state[key]=="undefined" || state[key]==null || (state[key]!=undefined && state[key].length==0)){
          let checkCond=config.sRequest[key]?.checkCond;
          checkCond=checkCond?state[checkCond.split(":")[0]]==true || String(state[checkCond.split(":")[0]]).includes("Vehicle"):undefined;

          let field=checkCond==undefined?label1:(checkCond?label1:label2);
          field=field!="" && field!='undefined'?(field.replace("*","").replace("Select ","").trim()):"";
          field=field!="" && ext!="undefined"?ext+field:field;
          field=field!=""?field.toLowerCase():"";
          field=field!="" && cext!="undefined" && checkCond==false?cext+field:field;
          messages+=field!='undefined' && field!=""?(messages!=""?", "+field:"Please fill "+field):"";
        }
      }
    }
    console.warn(messages);
    if(messages!=undefined && messages!="")
      errorAlert(messages);
    else
    try {
      DispatchUserRequest(state, async (res) => {
        if (res.sucess?.status == "failed") {
          errorAlert(res.sucess.message);
        } else if(res && res.sucess){
          setUsId(res?.sucess?.generatedIds[0]);
          AssignJob()
          setModal(!modal)
          successAlert(res.sucess.message);
        }else errorAlert("Something went wrong");
      });
    } catch (error) {
      errorAlert(error);
    }
  }
  
  const getAccessData = async () => {
    const storedData = await localStorage.getItem('accessData')
    let parsedData = JSON.parse(storedData)
    localAccessData = parsedData;
  }
  useEffect(() => {
    getAccessData()
    try {
      try {
          let logData;
          const storedData = localStorage.getItem('accessData');
          if (storedData) {
            const getdata = localStorage.getItem('accessData');
            logData = JSON.parse(getdata)
            localAccessData = logData

          }else {
            const getdata = localStorage.getItem('loggedData')
            logData = JSON.parse(getdata)
          }
          
          singleAllCorporate(logData!=null && logData!=undefined?logData.companyId:"", async (res) => {
            if (res.sucess) {
              setFleetVehicles(res.sucess);
            }
          });
        } catch (error) {
          console.log("error", error)
        }
    } catch (error) {
      errorAlert(error);
    }

    try {
      getDropDownApi('', async (res) => {
        if (res.sucess) {
          setDropdown(res.sucess)
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
          setState((p)=>{return {...p,companyId:res.sucess.companyId}});
          setData(res.sucess);
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

  const renderFList = (selectedArray) => {
    return (selectedArray?.map(data => ({ label: data?.description,value:data?.description})))
  }

  const renderList = (selectedArray) => {
    return (selectedArray?.map(data => ({ label: data?.field1, value: data?.id })))
  }

  function onChangeValue(event) {
    setState((p)=>{return {...p,requestType:event.target.value}});
  }

  const getAddressObject = (address_components) => {
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
      
      setState((p)=>{return {...p,towJobRequestLocation: address?.label}});
    };
    func();
  }, [address]);

  const RadioOnChange = (event) => {
    setState((p)=>{return {...p,propertyName:null}});
    setKey(key+1);
    setState((p)=>{return {...p,vehicleOrProperty:event.target.value}});
  }
  const epuipmentData = (data) => {
    var arr = state.equipmentList;
    if (arr.indexOf(data) !== -1) {
      arr = arr.filter(function (item) {
        return item !== data
      })
      setState((p)=>{return {...p,equipmentList:arr}})
    }
    else {
      arr.push(data);
      setState((p)=>{return {...p,equipmentList:arr}})
    }
    if (arr.includes(0))
      SetTowEquipmentRequired(true)
    else
      SetTowEquipmentRequired(false)
  }
  
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">{config.createDispatchRequest}</h3>
                  </Col>
                </Row>
              </CardHeader>
              {localAccessData == null ? (
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
                        onToggle={(value) => {
                          setState((p)=>{return {...p,indicatePolice:value}});
                          setShowLEAgency(!value)
                        }} />
                    </div>
                  </div>
                  {!ShowLEAgency ? (
                    <FormGroup>
                      <Label for="exampleSelect">{config.sRequest["policeService"].label["l1"]}</Label>
                      <Select
                        name="form-field-name"
                        onChange={(val) => { setState((p)=>{return {...p,policeService:val.label}}) }}
                        labelKey='name'
                        valueKey='policeLabel'
                        options={renderList(dataDropdown?.policeDepartments)}
                      />
                    </FormGroup>
                  ) : null}
                  <legend>Item Type</legend>
                  <div onChange={RadioOnChange}>
                    <input type="radio" value="Vehicle" name="gender" defaultChecked /> Vehicle {'  '}
                    <input type="radio" value="Property" name="gender" /> Property
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <FormGroup>
                      <Label>{config.sRequest["propertyName"].label[String(state.vehicleOrProperty).includes("Vehicle")?"l1":"l2"]}</Label>
                      <Select
                        key={key}
                        onChange={(val) => {
                          setState((p)=>{return {...p,propertyName:val.label}});
                          
                          if (val.label == 'Other' || val.label == 'Other - Manual Entry') {
                            if(state.vehicleOrProperty == 'Vehicle'){
                              setVeh(true);
                              setProp(false);
                            }else{
                              setProp(true);
                              setVeh(false);  
                            }
                          } else {
                            setProp(false);
                            setVeh(false);
                          }
                        }}
                        valueKey='vehicleSelect'
                        options={renderList(state.vehicleOrProperty == 'Vehicle'?dataDropdown?.vehicleType:dataDropdown?.propertyType)}/>
                    </FormGroup>
                    {veh && !prop && state.vehicleOrProperty == 'Vehicle' ? (
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <Label
                              className="form-control-label"
                              htmlFor="input-username">
                              Other - Vehicle Type
                            </Label>
                            <Input
                              className="form-control-alternative"
                              id="input-username"
                              placeholder="Other - Vehicle Type"
                              type="text"
                              onChange={text => setState((p)=>{return {...p,vehicleName:text.target.value}})}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    ) : null}
                    {prop && !veh && state.vehicleOrProperty == 'Property' ? (
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <Label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Other - Property Type
                            </Label>
                            <Input
                              className="form-control-alternative"
                              id="input-username"
                              placeholder="Other - Property Type"
                              type="text"
                              onChange={text => setState((p)=>{return {...p,propertyName:text.target.value}})}
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
                          id="input-username"
                          placeholder="VIN Number"
                          type="text"
                          onBlur={() => { vinApiCall() }}
                          onChange={text => setState((p)=>{return {...p,vin:text.target.value}})}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Licence Plate Number
                        </Label>
                        <Input
                          className="form-control-alternative"
                          id="input-username"
                          placeholder=" Licence Plate Number"
                          onChange={text => setState((p)=>{return {...p,licensePlateNumber:text.target.value}})}
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
                          onChange={text => setState((p)=>{return {...p,otherContact:text.target.value}})}
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
                          htmlFor="input-first-name">
                          Item Type
                        </Label>
                        <Input
                          className="form-control-alternative"
                          id="input-first-name"
                          placeholder="Item Type"
                          defaultValue={vinData?.vehicleType}
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
                        value={state.isSpecialInstructions || false}
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
                          setState((p)=>{return {...p,isSpecialInstructions:!value}})
                        }} />
                    </div>
                  </div>
                  {!state.isSpecialInstructions ? (
                    <Row>
                      <Col lg="4">
                        <FormGroup>

                          <Label for="exampleSelect">Task</Label>
                          <Select
                            name="form-field-name"
                            onChange={(val) => {
                              setState((p)=>{return {...p,specialTask:val.label}})

                              if (val.label == 'Other' || val.label == 'Other - Manual Entry') {
                                setSpecialTaskListOther(true)
                              }
                              else {
                                setSpecialTaskListOther(false)
                              }
                            }}
                            
                            labelKey='name'
                            valueKey='countryCode'
                            options={renderList(dataDropdown?.specialTaskList)}
                          />

                        </FormGroup>
                        {specialTaskListOther === true && (
                          <FormGroup>
                            <Label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Other
                            </Label>
                            <Input
                              className="form-control-alternative"
                              id="input-username"
                              placeholder="Other"
                              type="text"
                              onChange={text => setState((p)=>{return {...p,specialTask:text.target.value}})}
                            />
                          </FormGroup>
                        )}
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
                            id="input-username"
                            placeholder="Special Instructions"
                            onChange={text => setState((p)=>{return {...p,specialComments:text.target.value}})}
                            type="textarea"
                            name="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  ) : null}

                  <legend>Vehicle Owner Information</legend>
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="input-username">{config.sRequest["ownerName"].label["l1"]}</Label>
                        <Input
                          className="form-control-alternative"
                          id="input-username"
                          placeholder="Name"
                          type="text"
                          onChange={text => setState((p)=>{return {...p,ownerName:text.target.value}})}
                        />
                      </FormGroup>
                    </Col>


                    <Col lg="4">
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          {config.sRequest["ownerMobile"].label["l1"]}
                        </Label>
                        <Input
                          className="form-control-alternative"
                          id="input-username"
                          placeholder="Phone Number"
                          onChange={text => setState((p)=>{return {...p,ownerMobile:text.target.value}})}
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
                          Email
                        </Label>
                        <Input
                          className="form-control-alternative"
                          id="input-username"
                          placeholder="Email"
                          onChange={text => setState((p)=>{return {...p,ownerEmail:text.target.value}})}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Address
                        </Label>
                        <AddressInput
                          className="form-control-alternative form-control"
                          id="ownerAddress"
                          placeholder="Search Address"
                          value={state.ownerAddress ? state.ownerAddress : ""}
                          onChange={(text) => {
                            setState((p)=>{return {...p,ownerAddress:text}});
                          }}
                        />
                      </FormGroup>
                    </Col>

                  </Row>
                  <legend>Lien Holder Information</legend>
                  <Row>

                    <Col lg="4">
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Name
                        </Label>
                        <Input
                          className="form-control-alternative"
                          id="input-username"
                          placeholder="Name"
                          type="text"
                          onChange={text => setState((p)=>{return {...p,lienName:text.target.value}})}
                        />
                      </FormGroup>
                    </Col>

                    <Col lg="4">
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Phone Number
                        </Label>
                        <Input
                          className="form-control-alternative"
                          id="input-username"
                          placeholder="Phone Number"
                          onChange={text => setState((p)=>{return {...p,lienMobile:text.target.value}})}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="input-username">
                          Email
                        </Label>
                        <Input
                          className="form-control-alternative"
                          id="input-username"
                          placeholder="Email"
                          onChange={text => setState((p)=>{return {...p,lienEmail:text.target.value}})}
                          type="text"
                        />
                      </FormGroup>
                    </Col>

                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="input-username">
                          Address
                        </Label>
                        <AddressInput
                          className="form-control-alternative form-control"
                          id="lienAddress"
                          value={state.lienAddress ? state.lienAddress : ""}
                          placeholder="Search Address"
                          onChange={(text) => setState((p)=>{return {...p,lienAddress:text}})}
                        />
                      </FormGroup>
                    </Col>

                  </Row>
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
                            setsameAsAbove(!sameAsAbove)
                            if (checked === true) {
                              setState((p)=>{return {...p,driverName:state.ownerName}});
                              setState((p)=>{return {...p,driverAddress:state.ownerAddress}});
                              setState((p)=>{return {...p,driverEmail:state.ownerEmail}});
                              setState((p)=>{return {...p,driverMobile:state.ownerMobile}});
                            }else {
                              setState((p)=>{return {...p,driverName:""}});
                              setState((p)=>{return {...p,driverAddress:""}});
                              setState((p)=>{return {...p,driverEmail:""}});
                              setState((p)=>{return {...p,driverMobile:""}});
                            }

                          }}
                        />{'  '}
                        {' '}Same as Owner
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="input-username">
                          {config.sRequest["driverName"].label["l1"]}
                        </Label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={state.driverName ? state.driverName : ''}
                          id="input-username"
                          placeholder="Name"
                          type="text"
                          onChange={text => setState((p)=>{return {...p,driverName:text.target.value}})}
                        />
                      </FormGroup>
                    </Col>

                    <Col lg="4">
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          {config.sRequest["driverMobile"].label["l1"]}
                        </Label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={state.driverMobile ? state.driverMobile : ''}
                          id="input-username"
                          placeholder="Phone Number"
                          onChange={text => setState((p)=>{return {...p,driverMobile:text.target.value}})}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="input-username">
                          Email
                        </Label>
                        <Input
                          className="form-control-alternative"
                          defaultValue={state.driverEmail ? state.driverEmail : ''}
                          id="input-username"
                          placeholder="Email"
                          onChange={text => setState((p)=>{return {...p,driverEmail :text.target.value}})}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="input-username"
                        >
                          Address
                        </Label>
                        <AddressInput
                          className="form-control-alternative form-control"
                          id="driverAddress"
                          placeholder="Search Address"
                          value={state.driverAddress ? state.driverAddress : ''}
                          onChange={(text) => setState((p)=>{return {...p,driverAddress:text}})}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <legend>{!ShowLEAgency ? 'Law Enforcement:' : 'Client Information'}</legend>
                  <Form>
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
                                id="input-username"
                                placeholder="LE Agency Occurrence #"
                                onChange={text => setState((p)=>{return {...p,policeOccurrence:text.target.value}})}
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
                               {config.sRequest["officerBadge"].label["l1"]}
                              </Label>
                              <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="Officer Badge"
                                onChange={text => setState((p)=>{return {...p,officerBadge:text.target.value}})}
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
                                {config.sRequest["officerName"].label["l1"]}
                              </Label>
                              <Input
                                className="form-control-alternative"
                                id="input-username"
                                type="text"
                                onChange={text => setState((p)=>{return {...p,officerName:text.target.value}})}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="input-username">
                                  {config.sRequest["officerContact"].label["l1"]}
                                
                              </Label>
                              <Input
                                className="form-control-alternative"
                                id="input-username"
                                onChange={text => setState((p)=>{return {...p,officerContact:text.target.value}})}
                                type="text"
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
                                {config.sRequest["officerDepart"].label["l1"]}
                              </Label>
                              <Input
                                className="form-control-alternative"
                                id="input-first-name"
                                type="text"
                                onChange={text => setState((p)=>{return {...p,officerDepart:text.target.value}})}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      )}
                      {!ShowLEAgency && (
                        <Row>
                          <Col lg="4">
                            
                            <h6 className="heading-small text-muted">
                            {state.isOfficerInCharge} Officer in Charge:
                            </h6>
                            <ToggleButton
                              value={state.isOfficerInCharge || false}
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
                                setState((p)=>{return {...p,isOfficerInCharge:!value}})
                              }} />
                          </Col>
                          {state.isOfficerInCharge && (
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
                                    onChange={text => setState((p)=>{return {...p,officerInChargeBadge:text.target.value}})}
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
                                    onChange={text => setState((p)=>{return {...p,officerInCharge:text.target.value}})}
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
                              value={state.isOccurrenceNumbers || false}
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
                                setState((p)=>{return {...p,isOccurrenceNumbers:!value}})
                              }} />
                          </Col>
                          {state.isOccurrenceNumbers && (
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
                                  id="input-username"
                                  placeholder="Other Occurrence Number"
                                  onChange={text => setState((p)=>{return {...p,occurrenceNumbers:text.target.value}})}
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                          )}
                        </Row>
                      )}
                      <Row>
                        {ShowLEAgency && (
                          <>
                        <Col lg="4">
                          <FormGroup>
                            <Label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              {config.sRequest["officerName"].label["l2"]}
                            </Label>
                            <Input
                              className="form-control-alternative"
                              id="input-username"
                              onChange={text => setState((p)=>{return {...p,officerName:text.target.value}})}
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
                              {config.sRequest["officerContact"].label["l2"]}
                            </Label>
                            <Input
                              className="form-control-alternative"
                              id="input-username"
                              onChange={text => setState((p)=>{return {...p,officerContact:text.target.value}})}
                              type="text"
                            />
                          </FormGroup>
                        </Col></>)}

                        <Col lg="4">
                          <FormGroup>
                            <Label
                              className="form-control-label"
                              htmlFor="input-username">
                              Other Contact Info
                            </Label>
                            <Input
                              className="form-control-alternative"
                              id="input-username"
                              placeholder="Other Contact Info"
                              onChange={text => setState((p)=>{return {...p,otherContact:text.target.value}})}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <Label for="exampleSelect">{config.sRequest["vehicleName"].label["l1"]}</Label>
                            <Select
                              name="form-field-name"
                              onChange={(val) => {
                                setState((p)=>{return {...p,vehicleName:val.label}});
                                if (val.label == 'Other' || val.label == 'Other-Manual Entry') {
                                  SetTowVehicleRequested(true)
                                }
                                else {
                                  SetTowVehicleRequested(false)
                                  setState((p)=>{return {...p,vehicleType:val.label}});
                                }
                              }}
                              labelKey='name'
                              valueKey='countryCode'
                              options={renderFList(fleetVehicles?.list)}
                            />
                          </FormGroup>
                          {towVehicleRequested && (
                            <Col lg="12" className="zeroPadding">
                              <FormGroup>
                                <Input
                                  className="form-control-alternative"
                                  id="input-username"
                                  placeholder="Other"
                                  type="text"
                                  onChange={text => setState((p)=>{return {...p,vehicleType:text.target.value}})}
                                />
                              </FormGroup>
                            </Col>
                          )}
                        </Col>
                      </Row>

                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <Label for="exampleSelect">Tow Equipment Required</Label>
                            {dataDropdown?.equipmentList.map(
                              (number, index) =>
                                <Form>
                                  <FormGroup className="eq-style"
                                    check
                                    inline
                                  >
                                    <Input type="checkbox" onChange={() => {
                                      epuipmentData(number?.id)
                                    }} />
                                    <Label check className="eq-field">
                                      {number?.field1}
                                    </Label>
                                  </FormGroup>
                                </Form>
                            )}

                          </FormGroup>
                          {TowEquipmentRequired && (
                            <Col lg="12" className="zeroPadding">
                              <FormGroup>
                                <Input
                                  className="form-control-alternative"
                                  id="input-username"
                                  placeholder="Other"
                                  type="text"
                                  onBlur={(text) => { }}
                                />
                              </FormGroup>
                            </Col>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                        </Col>
                      </Row>
                      <legend>Service Information</legend>
                      <div onChange={onChangeValue}>
                        <FormGroup tag="fieldset">
                          <h4>{config.sRequest["requestType"].label["l1"]}</h4>
                          <FormGroup check>
                            <Label check>
                              <input type="radio" value="Roadside Assistance" name="requestType" checked={state.requestType === "Roadside Assistance"} />
                              {' '}Roadside Assistance
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <input type="radio" value="Tow and Impound/Storage" name="requestType" checked={state.requestType === "Tow and Impound/Storage"} />
                              {' '}Tow and Impound/Storage
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <input type="radio" value="Tow Only" name="requestType" checked={state.requestType === "Tow Only"} />
                              {' '}Tow Only
                            </Label>
                          </FormGroup>
                        </FormGroup>
                      </div>
                      {/* <Col lg="4"> */}
                      <FormGroup>

                        {state.requestType == 'Roadside Assistance' ? (
                          <Row>
                            <Col lg="6">
                              <FormGroup>
                                <Label for="exampleSelect">Roadside Assistance Type</Label>
                                <Select
                                  name="form-field-name"
                                  onChange={(val) => {
                                    setRoadAssistance(val.label)
                                    if (val.label == 'Other' || val.label == 'Other-Manual Entry') {
                                      setotherRoad(true)
                                    }
                                    else {
                                      setotherRoad(false)
                                    }
                                  }}
                                  labelKey='name'
                                  valueKey='countryCode'
                                  options={renderList(dataDropdown?.roadSideAssistance)}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                <Label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  {config.sRequest["startingLocation"].label["l1"]}
                                </Label>
                                <AddressInput
                                  className="form-control-alternative form-control"
                                  id="startingLocationOfTow"
                                  placeholder="Location of Service Request"
                                  value={state.startingLocation ? state.startingLocation : ""}
                                  onChange={(text) => {
                                      setState((p)=>{return {...p,towJobRequestLocation: text}});
                                      setState((p)=>{return {...p,startingLocation:text}});
                                    }
                                  }
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        ) : (
                          <>
                            <Label for="exampleSelect">{state.requestType == 'Tow and Impound/Storage' ? "Reason for Tow" : "Tow Service Request"}</Label>
                            <Select
                              name="form-field-name"
                              onChange={(val) => {
                                setState((p)=>{return {...p,reasonForTow:val.label}});
                                if (val.label == 'Other' || val.label == 'Other-Manual Entry') {
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
                            {towOnlySet === true && state.requestType === 'Tow and Impound/Storage' && (
                              <FormGroup>
                                <Label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Other
                                </Label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-username"
                                  placeholder="Other"
                                  type="text"
                                  onChange={text => setState((p)=>{return {...p,reasonForTow:text.target.value}})}
                                />
                              </FormGroup>
                            )}
                          </>
                        )}
                        {towOnlySet && state.requestType === "Tow Only" ? (
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
                                  id="input-username"
                                  placeholder="Other"
                                  type="text"
                                  onChange={text => setState((p)=>{return {...p,reasonForTow:text.target.value}})}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        ) : null}
                        {state.requestType === "Tow Only" ? (
                          <>
                            <legend style={{ marginTop: 10 }}>Additional Service Information</legend>
                            <Row>
                              <Col lg="6">
                                <FormGroup>
                                  <Label>Date of Service Request</Label>
                                  <DateTimePicker format={'yyyy-MM-dd hh:mm:ss a'} onChange={(date)=>{setState((p)=>{return {...p,towOrImpoundDate:date}})}} value={state.towOrImpoundDate} />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <FormGroup>
                                  <Label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                  >
                                    {config.sRequest["startingLocation"].label["l1"]}
                                  </Label>
                                  <AddressInput
                                    className="form-control-alternative form-control"
                                    id="startingLocationOfTow"
                                    value={state.startingLocation ? state.startingLocation : ""}
                                    onChange={(text) => {
                                      setState((p)=>{return {...p,towJobRequestLocation:text}});
                                      setState((p)=>{return {...p,startingLocation:text}});
                                    }
                                    }
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg="6">
                                <FormGroup>
                                  <Label
                                    className="form-control-label"
                                    htmlFor="input-username"
                                  >
                                    Ending Location of Tow
                                  </Label>
                                  <AddressInput
                                    className="form-control-alternative form-control"
                                    id="endingLocationOfTow"
                                    placeholder="Ending Location of Tow"
                                    onChange={(text) => setState((p)=>{return {...p,finishingLocation:text}})}
                                  />

                                </FormGroup>
                              </Col>
                            </Row>
                          </>
                        ) : null}

                        {otherRoad && state.requestType == 'Roadside Assistance' ? (
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
                                  id="input-username"
                                  placeholder="Other"
                                  type="text"
                                  onChange={text => setState((p)=>{return {...p,reasonForTow:text.target.value}})}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        ) : null}
                        {state.requestType == 'Roadside Assistance' ? (
                          <>
                            <legend style={{ marginTop: 10 }}>Additional Service Information</legend>
                            <Row>
                              <Col lg="4">
                                <FormGroup>
                                  <Label>Date of Service Request</Label>
                                  <DateTimePicker format={'yyyy-MM-dd hh:mm:ss a'} onChange={(date)=>{setState((p)=>{return {...p,towOrImpoundDate:date}})}} value={state.towOrImpoundDate} />
                                </FormGroup>
                              </Col>
                            </Row>
                          </>
                        ) : null}
                      </FormGroup>
                      <Row>
                        <>
                          {state.requestType == 'Tow and Impound/Storage' && (

                            <Col lg="12">
                              <FormGroup>
                                <Label for="exampleSelect">Reason for Impound/Storage</Label>
                                <Select
                                  name="form-field-name"
                                  onChange={(val) => {
                                    setState((p)=>{return {...p,reasonForImpound:val.label}})
                                    if (val.label == 'Other' || val.label == 'Other - Manual Entry') {
                                      setTowOnlyImpound(true)
                                    }
                                    else {
                                      setTowOnlyImpound(false)
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
                      {towOnlyImpound && state.requestType == 'Tow and Impound/Storage' ? (
                        <Row className="ma-class">
                          <Col lg="12">
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="input-username">
                                Other
                              </Label>
                              <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="Other"
                                type="text"
                                onChange={text => setState((p)=>{return {...p,reasonForImpound:text.target.value}})}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      ) : null}
                      <Row>
                        {state.requestType == 'Tow and Impound/Storage' ? (
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
                                  value={state.isRelease || false}
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
                                    setState((p)=>{return {...p,isRelease:!value}})
                                  }} />
                              </div>
                            </div>
                            {!state.isRelease ? (
                              <>
                                <Col lg="4">
                                  <FormGroup>
                                    <Label for="exampleSelect">Release Status</Label>
                                    <Select
                                      name="form-field-name"
                                      onChange={(val) => {
                                        setState((p)=>{return {...p,releaseStatus:val.label}})
                                        if (val.label == 'Cannot be Released') {
                                          setDateDisabled(true)
                                        }
                                        else {
                                          setDateDisabled(false)
                                        }
                                        if (val.label == 'Other' || val.label == 'Other-Manual Entry') {
                                          setReleasedStatus(true)
                                        }
                                        else {
                                          setReleasedStatus(false)
                                        }
                                      }}
                                      labelKey='name'
                                      valueKey='countryCode'
                                      options={renderList(dataDropdown?.releaseStatus)}
                                    />
                                  </FormGroup>
                                  {ReleasedStatus && (


                                    <Col lg="12" className="zeroPadding">
                                      <FormGroup>
                                        <Input
                                          className="form-control-alternative"
                                          id="input-username"
                                          placeholder="Other"
                                          type="text"
                                          onChange={text => setState((p)=>{return {...p,releaseStatus:text.target.value}})}
                                        />
                                      </FormGroup>
                                    </Col>
                                  )}
                                </Col>
                                <Col lg="4">
                                  <FormGroup>
                                    <Label>Start Date</Label>
                                    <DateTimePicker format={'yyyy-MM-dd hh:mm:ss a'} onChange={(date)=>{setState((p)=>{return {...p,startDate:date}})}} value={state.startDate} />
                                  </FormGroup>
                                </Col>
                                <Col lg="4">
                                  <FormGroup>
                                    <Label>End Date</Label>
                                    <DateTimePicker disabled={dateDisabled} format={'yyyy-MM-dd hh:mm:ss a'} onChange={(date)=>{setState((p)=>{return {...p,endDate:date}})}} value={dateDisabled ? '' : state.endDate} />

                                  </FormGroup>
                                </Col>
                              </>
                            ) : null}
                            <>
                              <legend>Additional Service Information</legend>

                              <Row className="widths">
                                <Col lg="6">
                                  <FormGroup>
                                    <Label>Date of Service Request</Label>
                                    <DateTimePicker format={'yyyy-MM-dd hh:mm:ss a'} onChange={(date)=>{setState((p)=>{return {...p,towOrImpoundDate:date}})}} value={state.towOrImpoundDate} />
                                  </FormGroup>
                                </Col>
                                <Col lg="6">
                                  <FormGroup>
                                    <Label for="exampleSelect">Impound/Storage Location</Label>
                                    <AddressInput
                                      className="form-control-alternative form-control"
                                      id="ImpoundStorage"
                                      placeholder="Impound/Storage Location"
                                      value={state.impoundLocation ? state.impoundLocation : ""}
                                      onChange={(text) => setState((p)=>{return {...p,impoundLocation:text}})}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row className="widths">
                                <Col lg="6">
                                  <FormGroup>
                                    <Label
                                      className="form-control-label"
                                      htmlFor="input-username"
                                    >
                                      {config.sRequest["startingLocation"].label["l1"]}
                                    </Label>
                                    <AddressInput
                                      className="form-control-alternative form-control"
                                      id="startingLocationOfTow"
                                      placeholder="Starting Location of Tow"
                                      value={state.startingLocation ? state.startingLocation : ""}
                                      onChange={(text) => {
                                        setState((p)=>{return {...p,towJobRequestLocation:text}});
                                        setState((p)=>{return {...p,startingLocation:text}});
                                      }
                                      }
                                    />
                                  </FormGroup>
                                </Col>
                                <Col lg="6">
                                  <FormGroup>
                                    <Label
                                      className="form-control-label"
                                      htmlFor="input-username"
                                    >
                                      Ending Location of Tow
                                    </Label>
                                    <AddressInput
                                      className="form-control-alternative form-control"
                                      id="endingLocationOfTow"
                                      placeholder="Ending Location of Tow"
                                      onChange={(text) => setState((p)=>{return {...p,finishingLocation:text}})}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </>
                          </>
                        ) : null}
                      </Row>

                      {state.requestType?.includes('Tow') ? (
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <Label for="exampleSelect">Held for other purpose</Label>
                              <Select
                                name="form-field-name"
                                onChange={(val) => {
                                  setState((p)=>{return {...p,heldPurpose: val.label}})
                                  if (val.label == 'Other' || val.label == 'Other - Manual Entry') {
                                    setShowHeldForOthers(true)
                                  }
                                  else {
                                    setShowHeldForOthers(false)
                                  }
                                }}
                                labelKey='name'
                                options={renderList(dataDropdown?.heldPurposeList)}
                              />
                            </FormGroup>
                            {showheldForOthers === true && (
                              <FormGroup>
                                <Label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Other
                                </Label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-username"
                                  placeholder="Other"
                                  type="text"
                                  onChange={text => setState((p)=>{return {...p,heldPurpose: text.target.value}})}
                                />
                              </FormGroup>
                            )}
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <Label for="exampleSelect">Vehicle/Property forfeit</Label>
                              <Select
                                name="form-field-name"
                                onChange={(val) => {
                                  setState((p)=>{return {...p,propertyForfiet: val.label}})
                                  if (val.label == 'Other' || val.label == 'Other - Manual Entry') {
                                    setShowPropertyForfiet(true)
                                  }
                                  else {
                                    setShowPropertyForfiet(false)
                                  }
                                }}
                                labelKey='name'
                                options={renderList(dataDropdown?.propertyForfietList)}
                              />
                            </FormGroup>
                            {showPropertyForfiet === true && (
                              <FormGroup>
                                <Label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Other
                                </Label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-username"
                                  placeholder="Other"
                                  type="text"
                                  onChange={text => setState((p)=>{return {...p,propertyForfiet: text.target.value}})}
                                />
                              </FormGroup>
                            )}

                          </Col>
                        </Row>) : <></>}

                      <Button onClick={() => { onSubmit() }} className="my-4" color="primary" type="button">
                        {config.submit}
                      </Button>
                    </div>

                  </Form>
                </CardBody>
              ) : (
                <CardBody>
                  <div id="overlay">
                    <div id="text" style={{ top: '75%' }}>Under Development Version 2</div>
                  </div>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
        <Modal size="lg" style={{ maxWidth: '1600px', width: '80%' }} isOpen={modal} toggle={() => { toggle() }}>
          <ModalBody>
            <Row>
              <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <h3 className="mb-0">{config.availableDrivers}</h3>
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
                        <th scope="col">Phone</th>
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
                              <td className="text-sm">{item?.userName}</td>
                              <td className="text-sm">{item?.title} {item?.firstName} {item?.lastName}</td>

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
                        listClassName="justify-content-end mb-0">
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
