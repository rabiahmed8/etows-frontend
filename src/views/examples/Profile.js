import React, { useEffect, useState, useCallback } from "react";

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
  Label,
  Alert
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { getLoggedinApi, UpdateUserInfoApi, UpdatePassword } from "../../APIstore/apiCalls";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId
} from "react-google-places-autocomplete";
import { successAlert, errorAlert } from '../../Theme/utils';
import toast, { Toaster } from 'react-hot-toast';
function Profile() {
  const [data, setData] = useState();
  const [userDetail, setUserDetail] = useState({});
  const [sucess, setSuccess] = useState(false);
  const [errors, setError] = useState(false);
  const [sucessPass, setSuccessPass] = useState(false);
  const [errorsPass, setErrorPass] = useState(false);
  const [currentPass, setCurrentPassword] = useState('');
  const [newPass, setNewPassword] = useState('');
  const [confirmPass, setConfirmPassword] = useState('');
  const [address, setAddress] = useState();
  const [addressObj, setAddressObj] = useState();
  const [sendRequest, setSendRequest] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const textOnchange = (text, name) => {
    const val = text.target ? text.target.value : text;
    let user = userDetail;
    user[name] = val;
    setUserDetail(user);
  };
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  const OnChangePassword = () => {

    if (!currentPass) {
      errorAlert('Please enter Current Password');
      return;
    }
    if (!newPass) {
      errorAlert('Please enter New Password');
      return;
    }

    if (!confirmPass) {
      errorAlert('Please enter Confirm Password');
      return;
    }
    if (confirmPass != newPass) {
      errorAlert('Your New Password and Confirm Password is not matched');
      return;
    }

    let obj = {
      currentPassword: currentPass,
      newPassword: newPass,
      reTypePassword: confirmPass
    }
    try {
      UpdatePassword(obj, async (res) => {
        if (res.sucess) {
          // setSuccessPass(true);
          // setTimeout(() => {
          //   setSuccessPass(false)
          // }, 3000);
          console.log("Asdas", res.sucess.messages[0].message);

          successAlert(res.sucess.messages[0].message)
        } else {
          // setErrorPass(true);
          // setTimeout(() => {
          //   setErrorPass(false)
          // }, 3000);
          errorAlert('Something went wrong')
        }
      });
    } catch (error) {
      errorAlert(error)
    }
  }
  // useEffect(() => {

  // }, [])

  const getData = useCallback(async () => {
    const getAccess = await localStorage.getItem('accessData');
    console.log("asd", JSON.parse(getAccess));
    let filterData = JSON.parse(getAccess)
    if (filterData) {
      // alert(filterData.roles[0])
      setData(filterData)
    }
    else {
      try {
        getLoggedinApi('', async (res) => {
          if (res.sucess) {
            console.log("res.sucess", res.sucess)
            setData(res.sucess)
          } else {
            errorAlert('Something went wrong')
          }
        });
      } catch (error) {
        errorAlert(error)
      }
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const OnSubmit = () => {
    var obj = {};
    Object.assign(obj, {
      id: data?.id,
      userName: userDetail.userName === undefined ? data?.userName : userDetail.userName,
      firstName: userDetail.firstName === undefined ? data?.firstName : userDetail.firstName,
      lastName: userDetail.lastName === undefined ? data?.lastName : userDetail.lastName,
      address: userDetail.address === undefined ? data?.address : userDetail.address,
      phone: userDetail.phone === undefined ? data?.phone : userDetail.phone,
      postalCode: userDetail.postalCode === undefined ? data?.postalCode : userDetail.postalCode,
      country: userDetail.country === undefined ? data?.country : userDetail.country,
      city: userDetail.city === undefined ? data?.city : userDetail.city,
      province: "Ontario",
      enabled: true,
      accountNonLocked: false,
      accountNonExpired: false,
      credentialsNonExpired: false,
      isStartShifted: true,
      companyName: userDetail.companyName === undefined ? data?.companyName : userDetail.companyName,
      position: userDetail.position === undefined ? data?.position : userDetail.position,
      // active: "string",
    });
    console.log("obj", data?.firstName)
    try {
      UpdateUserInfoApi(obj, async (res) => {
        console.log("asd", res)
        if (res.sucess) {
          getData();
          successAlert('Profile Updated Successfully');
          window.location.reload(false);
        } else {
          errorAlert('Something went wrong')
        }
      });
    } catch (error) {
      errorAlert(error)
    }
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
    // if(data?.address){
    //   textOnchange(data?.address,'address');
    // }
    const func = async () => {
      const geocodeObj =
        address &&
        address?.value &&
        (await geocodeByPlaceId(address.value?.place_id));
      const addressObject =
        geocodeObj && getAddressObject(geocodeObj[0]?.address_components);
      // let makeString = `${addressObject?.address == undefined ? '' : addressObject?.address} ${addressObject?.city == undefined ? '' : addressObj?.city} ${addressObject?.province == undefined ? '' : addressObject?.province} ${addressObject?.country == undefined ? '' : addressObject?.country}`
      // alert(address?.label);

      if (address?.label) {
        textOnchange(address?.label, 'address');
      }
    };
    func();
  }, [address]);
  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {sucess && (
          <Alert color="success">
            Profile Updated
          </Alert>
        )}
        {errors && (
          <Alert color="danger">
            Something went Wrong
          </Alert>
        )}
        {sucessPass && (
          <Alert color="success">
            Password has been Updated
          </Alert>
        )}
        {errorsPass && (
          <Alert color="danger">
            Something went Wrong
          </Alert>
        )}
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              {/* <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image" style={{ top: "-35px" }}>
                    <a>
                      <img

                        alt="..."
                        className="rounded-circle"
                        src={require("assets/img/theme/team-4-800x800.png")}
                      />
                    </a>
                  </div>
                </Col>
              </Row> */}
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My Account</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Email
                          </label>
                          <Input
                            disabled
                            className="form-control-alternative"
                            defaultValue={data?.userName}
                            id="input-username"
                            placeholder="Email"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Corporate Name/Company Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data?.companyName}
                            id="input-username"
                            placeholder="Corporate Name/Company Name"
                            type="text"
                          onChange={text => textOnchange(text, 'companyName')}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <h6 className="heading-small text-muted mb-4">
                      Primary Contact
                    </h6>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data?.firstName}
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                            onChange={text => textOnchange(text, 'firstName')}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data?.lastName}
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                            onChange={text => textOnchange(text, 'lastName')}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Phone Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data?.phone}
                            id="input-username"
                            placeholder="Phone"
                            type="text"
                            onChange={text => textOnchange(text, 'phone')}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Position (i.e: President)
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data?.position}
                            id="input-last-name"
                            placeholder="President"
                            type="text"
                          onChange={text => textOnchange(text, 'position')}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      {/* <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data?.address}
                            id="input-address"
                            placeholder="Address"
                            type="text"
                            onChange={text => textOnchange(text, 'address')}
                          />
                        </FormGroup>
                      </Col> */}
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Street Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data?.address}
                            id="input-country"
                            placeholder="Street Address"
                            type="text"
                            onChange={text => textOnchange(text, 'address')}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City, Province/State
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data?.city}
                            id="input-city"
                            placeholder="City, Province/State"
                            type="text"
                            onChange={text => textOnchange(text, 'city')}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={data?.country}
                            id="input-country"
                            placeholder="Country"
                            type="text"
                            onChange={text => textOnchange(text, 'country')}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Postal/Zip code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-postal-code"
                            placeholder="Postal/Zip code"
                            type="text"
                            defaultValue={data?.postalCode}
                            onChange={text => textOnchange(text, 'postalCode')}
                          />
                        </FormGroup>
                        <Button onClick={() => { OnSubmit() }} className="my-4" color="primary" type="button">
                          Save
                        </Button>
                        <Button onClick={() => { window.location.reload(false); }} className="my-4" color="primary" type="button">
                          Cancel
                        </Button>

                      </Col>

                    </Row>
                  </div>
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-city"
                        >
                          Current Password
                        </label>
                        <Input
                          type="password"
                          className="form-control-alternative"
                          // defaultValue={data?.city}
                          id="input-city"
                          placeholder="Current Password"
                          // type="text"
                          onChange={text => setCurrentPassword(text.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-country"
                        >
                          New Password
                        </label>
                        <Input
                          className="form-control-alternative"
                          // defaultValue={data?.country}
                          id="input-country"
                          placeholder="New Password"
                          type="password"
                          onChange={text => setNewPassword(text.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="4">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-country"
                        >
                          Confirm Password
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-postal-code"
                          placeholder="Confirm Password"
                          type="password"
                          // defaultValue={data?.postalCode}
                          onChange={text => setConfirmPassword(text.target.value)}
                        />
                      </FormGroup>
                      <Button onClick={() => { OnChangePassword() }} className="my-4" color="primary" type="button">
                        Update Password
                      </Button>

                    </Col>

                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
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

export default Profile;
