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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert,
  Label
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import '../../appstyle.css'
import { CreateUsersApi } from "../../APIstore/apiCalls";
import PropTypes from 'prop-types';
import Select from 'react-select';
import config from "config";
import toast, { Toaster } from 'react-hot-toast';
import { successAlert, errorAlert, emailValidator } from '../../Theme/utils';
import { Routes, Route, useNavigate, useHistory } from 'react-router-dom';
const options = [
  { value: 'DRIVER', label: 'Driver' },
  { value: 'TOW_ADMIN', label: 'Tow Admin' },
  { value: 'POLICE_ADMIN', label: 'Police Admin' },
  { value: 'POLICE', label: 'Police' },
  { value: 'STAFF', label: 'Staff' },
]
const optionsComLE = [
  { value: 'POLICE_ADMIN', label: 'LE Admin' },
  { value: 'POLICE', label: 'LE' }
]
const optionsComTow = [
  { value: 'DRIVER', label: 'Driver' },
  { value: 'TOW_ADMIN', label: 'Tow Admin' },
  { value: 'STAFF', label: 'Staff' },
]
function CreateUsers({ direction, ...args }) {
  const [data, setData] = useState();
  const [dataForm, setDataForm] = useState();
  const [userDetail, setUserDetail] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sucess, setSuccess] = useState(false);
  const [errors, setError] = useState(false);
  const [fieldErrors, setFieldsError] = useState(false);
  const [rolesData, setRoles] = useState('');
  const [password, setPassword] = useState('');
  // const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(true);
  const [logged, setLogged] = useState(true);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const navigate = useHistory();
  const OnSubmit = () => {
    console.log("Asd", userDetail)

    if (!userDetail.userName) {
      errorAlert('Please enter Email (Username)');
      return;
    }
    const emailError = emailValidator(userDetail.userName);
    if (emailError) {
      errorAlert(emailError);
      return;
    }

    if (!userDetail.firstName) {
      errorAlert('Please enter First Name');
      return;
    }
    if (!userDetail.lastName) {
      errorAlert('Please enter Last Name');
      return;
    }
    if (!userDetail.phone) {
      errorAlert('Please enter Phone Number');
      return;
    }
    if (!rolesData) {
      errorAlert('Please select at least one role');
      return;
    }
    else {
      const obj = {

        userName: userDetail?.userName || '',
        firstName: userDetail?.firstName,
        lastName: userDetail?.lastName,
        address: userDetail?.address || '',
        phone: userDetail?.phone,
        postalCode: userDetail?.postalCode || '',
        province: userDetail?.province || '',
        country: userDetail?.country || '',
        city: userDetail?.city || '',
        isStartShifted: true,
        enabled: true,
        active: "string",
        accountNonLocked: true,
        accountNonExpired: true,
        credentialsNonExpired: true,



        // userName: userDetail?.username || '',
        // firstName: userDetail?.firstName,
        // lastName: userDetail?.lastName,
        // // address: userDetail?.address || '',
        // phone: userDetail?.phone,
        // email: userDetail?.email,
        // postalCode: userDetail?.postalCode || '',
        // country: userDetail?.country || '',
        // city: userDetail?.city || '',
        // province: userDetail?.province || '',
        // // title: userDetail?.title || '',
        // // gender: userDetail?.gender || '',
        // enabled: true,
        // accountNonLocked: false,
        // accountNonExpired: false,
        // credentialsNonExpired: false,
        roles: [rolesData]
      }
      console.log("obj", obj)
      try {
        CreateUsersApi(obj, async (res) => {
          console.log("asd", res)
          if (res.sucess) {
            successAlert(res.sucess.messages[0].message)
          } else {
            errorAlert('Something went wrong');
          }
        });
      } catch (error) {
        errorAlert(error);
      }
    }
  }
  const textOnchange = (text, name) => {
    const val = text.target.value;
    console.log("Asdas", val)
    let user = userDetail;
    user[name] = val;
    setUserDetail(user);
  };
  useEffect(() => {
    async function fetchData() {
      const storedData = await localStorage.getItem('accessData')
      let parsedData = JSON.parse(storedData)
      if (parsedData) {
        setLogged(parsedData)
      }
      else {
        const storedloggedData = await localStorage.getItem('loggedData')
        let parsedstoredloggedData = JSON.parse(storedloggedData);
        setLogged(parsedstoredloggedData)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/*      
     
        {password && (
          <Alert color="info" isOpen={visible} toggle={onDismiss()}>
            {password}
          </Alert>
        )} */}
        {sucess && (
          <Alert color="success">
            Record has been inserted successfully
          </Alert>
        )}
        {errors && (
          <Alert color="danger">
            Something went Wrong
          </Alert>
        )}
        {fieldErrors && (
          <Alert color="danger">
            Please Enter all email
          </Alert>
        )}

        <Row>

          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">{config.createUsers}</h3>
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
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-3">
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Email(Username) *
                          </label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue={data?.userName}
                            id="input-username"
                            placeholder="Email"
                            onChange={text => textOnchange(text, 'userName')}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      {/* <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Title
                          </label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue={data?.firstName}
                            id="input-first-name"
                            placeholder="Title"
                            type="text"
                            onChange={text => textOnchange(text, 'title')}
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Gender
                          </label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue={data?.userName}
                            id="input-username"
                            placeholder="Gender"
                            onChange={text => textOnchange(text, 'gender')}
                            type="text"
                          />
                        </FormGroup>
                      </Col> */}
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name *
                          </label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue={data?.firstName}
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                            onChange={text => textOnchange(text, 'firstName')}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Last Name *
                          </label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue={data?.userName}
                            id="input-username"
                            placeholder="Last Name"
                            onChange={text => textOnchange(text, 'lastName')}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue={data?.firstName}
                            id="input-first-name"
                            placeholder="First name"
                            type="text"
                            onChange={text => textOnchange(text, 'firstName')}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Last Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue={data?.userName}
                            id="input-username"
                            placeholder="Last Name"
                            onChange={text => textOnchange(text, 'lastName')}
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
                            // defaultValue={data?.phone}
                            id="input-username"
                            placeholder="Email"
                            type="text"
                            onChange={text => textOnchange(text, 'email')}
                          />
                        </FormGroup>
                      </Col>
                    </Row> */}
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Phone *
                          </label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue={data?.phone}
                            id="input-username"
                            placeholder="Phone"
                            type="text"
                            onChange={text => textOnchange(text, 'phone')}
                          />
                        </FormGroup>
                      </Col>


                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue={data?.phone}
                            id="input-username"
                            placeholder="Address"
                            type="text"
                            onChange={text => textOnchange(text, 'address')}
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue={data?.phone}
                            id="input-username"
                            placeholder="City"
                            type="text"
                            onChange={text => textOnchange(text, 'city')}
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
                            Province
                          </label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue={data?.firstName}
                            id="input-first-name"
                            placeholder="Province"
                            type="text"
                            onChange={text => textOnchange(text, 'province')}
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Postal/Zip Code
                          </label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue={data?.phone}
                            id="input-username"
                            placeholder="Postal Code"
                            type="text"
                            onChange={text => textOnchange(text, 'postalCode')}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue={data?.userName}
                            id="input-username"
                            placeholder="Country"
                            onChange={text => textOnchange(text, 'country')}
                            type="text"
                          />
                        </FormGroup>
                      </Col>



                    </Row>
                    {/* {alert(logged?.roles)} */}
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <Label for="exampleSelect">Role</Label>
                          <Select
                            name="form-field-name"
                            onChange={(val) => { setRoles(val.value) }}
                            value={userDetail?.roles}
                            labelKey='name'
                            valueKey='countryCode'
                            // options={(logged?.roles == 'POLICE' || logged?.roles == 'POLICE_ADMIN') ? optionsComLE : optionsComTow}
                            options={logged?.roles != 'ADMIN' ? (logged?.roles == 'POLICE' || logged?.roles == 'POLICE_ADMIN') ? optionsComLE : optionsComTow : options}
                          />

                          {/* </Input> */}
                        </FormGroup>
                        <Button onClick={() => { OnSubmit() }} className="my-4" color="primary" type="button">
                          {config.save}
                        </Button>
                        <Button color="primary" onClick={() => { navigate.push('/admin/allusers') }}>{config.close}</Button>
                      </Col>

                    </Row>
                  </div>


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
CreateUsers.propTypes = {
  direction: PropTypes.string,
};
export default CreateUsers;
