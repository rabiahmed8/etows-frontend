import React, { useEffect, useState, useRef } from "react";

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
// import { useStat } from 'react-usestateref'
import Header from "components/Headers/Header.js";
import { AllUsersApi, getCSVApi, CreateUsersApiCompany, GetAllUsersApi, AllUsersByType, CheckEnabledDisabled, deleteUser, disableUser, UploadCsvApi, UpdateUserPassword, UpdateUsersApi, companyList, getLoggedinApi, getUserData, getJurisdictionAll, addUserJurisdiction, getCompanyJurisdictionAll, updateUserJurisdiction, getUserJurisdictionAll } from "../../APIstore/apiCalls";
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
function AllUsers(props) {
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
  const [rolesDa, setRoleData] = useState('');
  const [CompId, setCompId] = useState('');
  const [logData, setLogData] = useState('');
  const [loggingData, setLogging] = useState('');
  const stateRef = useRef(CompId);
  const [isLoader, setIsLoader] = useState(false);
  const [dropdownData, setDropdownData] = useState();
  const [dropdownDataUpdate, setDropdownDataUpdate] = useState();
  const [jurisdictionData, setJurisdictionData] = useState();
  const [selectedservices, setselectedservices] = useState([]);
  stateRef.current = CompId;
  const [visible, setVisible] = useState(true);
  const options = [
    { value: 'DRIVER', label: 'Driver' },
    { value: 'TOW_ADMIN', label: 'Tow Admin' },
    { value: 'POLICE_ADMIN', label: 'LE Admin' },
    { value: 'POLICE', label: 'LE' },
    { value: 'STAFF', label: 'Staff' },
  ]

  const toggleAdd = () => {
    setModalAdd(!modalAdd);
  }
  const renderList = (selectedArray) => {
    return (selectedArray?.map(data => ({ label: data?.jurisdiction, value: data?.id })))
  }
  const OnSubmitAdd = () => {
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
        officerUnit: userDetail?.officerUnit || '',
        officerBadge: userDetail?.officerBadge || '',
        lawEnforcementAgencyOccurrence: userDetail?.lawEnforcementAgencyOccurrence || '',
        isStartShifted: true,
        enabled: true,
        active: "string",
        accountNonLocked: true,
        accountNonExpired: true,
        credentialsNonExpired: true,
        roles: [rolesData],
        companyId: props?.idData
      }
      console.log("rolesData", rolesData)
      let userID;
      try {
        CreateUsersApiCompany(obj, async (res) => {
          console.log("asd", res)
          if (res.sucess) {

            if (res.sucess.messages[0].message == 'Request failed! User already created!') {
              errorAlert(res.sucess.messages[0].message)
            }
            else {
              if (jurisdictionData && jurisdictionData.length > 0) {
                userID = res.sucess.generatedIds[0];
                var myArray = [];
                for (let i = 0; i < jurisdictionData.length; i++) {
                  myArray.push({
                    jurisdiction: { id: jurisdictionData[i].value },
                    userId: res.sucess.generatedIds[0],
                  });
                };
                try {
                  addUserJurisdiction(userID, myArray, async (res) => {
                    console.log("aaaaa", res)
                    if (res.sucess.statusCode == 'success') {
                      successAlert("Jurisdiction added successfully")
                    } else {
                      errorAlert('Jurisdiction not added')
                    }
                  });
                } catch (error) {
                  console.log("error", error)
                }
              }
              toggleAdd()
              successAlert(res.sucess.messages[0].message)
            }
            try {
              companyList(props?.idData, async (res) => {
                if (res.sucess) {
                  console.log("res.sucess.kk", res.sucess)
                  setData(res.sucess.list);

                } else {
                  console.log("errrrr")
                }
              });
            } catch (error) {
              console.log("error", error)
            }


          } else {
            // toggleAdd()
            errorAlert('Something went wrong');
          }
        });
      } catch (error) {
        // toggleAdd()
        errorAlert(error);
      }
    }
  }
  const OnChangePassword = () => {
    if (!newPass) {
      errorAlert('Please enter New Password');
      return;
    }
    if (!confirmPass) {
      errorAlert('Please enter Confirm Password');
      return;
    }
    else {
      let obj = {
        userId: setItem?.id,
        currentPassword: '',
        newPassword: newPass,
        reTypePassword: confirmPass
      }
      try {
        UpdateUserPassword(obj, async (res) => {
          console.log("asd", res)
          if (res.sucess.messages[0].message == 'Password updated!') {
            // setSuccessPass(true);
            setModalUpdate(!modalUpdate);
            successAlert(res.sucess.messages[0].message);
            // setTimeout(() => {
            //   setSuccessPass(false)
            //   setModalUpdate(!modalUpdate);
            // }, 3000);
          } else {
            // setErrorPass(true);
            setModalUpdate(!modalUpdate);
            errorAlert(res.sucess.messages[0].message);
            // setTimeout(() => {
            //   setErrorPass(false)
            //   setModalUpdate(!modalUpdate);
            // }, 3000);
          }
        });
      } catch (error) {
        errorAlert(error);
      }
    }
  }
  const toggle = () => {
    setModal(!modal)
  }
  const Deletetoggle = (item) => {
    setUserId(item?.id)
    setDeletToggle(!deleteModal)
  }
  const toggleUpdate = (item) => {
    try {
      getUserJurisdictionAll(item.id, async (res) => {

        if (res.sucess) {
          console.log("res.res.res.sucess", res.sucess.list);
          let data = res.sucess.list;
          // setJurisdictionData(res.sucess.list);
          var myArray = [];
          for (let i = 0; i < data.length; i++) {
            myArray.push({
              jurisdiction: data[i].jurisdiction.jurisdiction,
              id: data[i].jurisdiction.id,
            });
          };
          setDropdownDataUpdate(myArray)
          setselectedservices(renderList(myArray).map((i) => i));
          console.log("myArray", myArray);
        } else {
          console.log("errrrr")
        }
      });
    } catch (error) {
      console.log("error", error)
    }
    setModalUpdate(!modalUpdate);
    // alert(JSON.stringify(item))
    setItemData(item)
  }
  const deleteFunc = () => {
    // const obj = {
    //   [userID]
    // }
    try {
      deleteUser([userID], async (res) => {
        if (res.sucess) {
          console.log("res", res);
          setDeletToggle(!deleteModal)
          successAlert(res.sucess.messages[0].message);
          fetchData()
        } else {
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
    let setBol = false;
    if (item?.enabled == true) {
      setBol = false
    }
    else {
      setBol = true
    }
    try {
      disableUser(item, setBol, async (res) => {

        if (res.sucess) {
          console.log("res", res);
          // setDeletToggle(!deleteModal)
          successAlert(res.sucess.messages[0].message)
          fetchData()
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
  const fetchData = async () => {
    const storedData = await localStorage.getItem('accessData')
    let parsedData = JSON.parse(storedData)
    const storedloggedData = await localStorage.getItem('loggedData')
    let parsedstoredloggedData = JSON.parse(storedloggedData)
    if (parsedData) {
      setLogging(parsedData)
    }
    else {

      setLogging(parsedstoredloggedData)
    }

    console.log("parsedstoredloggedData", parsedstoredloggedData);
    if (props?.data == 2) {

      // alert(props?.idData)
      // setIsLoader(true)
      try {
        companyList(props?.idData, async (res) => {
          // alert(JSON.stringify(res))
          if (res.sucess) {
            console.log("rewrwerwer", res.sucess)
            setData(res.sucess.list);
            setIsLoader(false)
          } else {
            setIsLoader(false)
            console.log("errrrr")
          }
        });
      } catch (error) {
        setIsLoader(false)
        console.log("error", error)
      }
    }
    else if (parsedstoredloggedData.roles[0] != 'ADMIN') {
      // alert(logData)
      // alert('')
      // setIsLoader(true)
      try {
        companyList(parsedstoredloggedData.companyId, async (res) => {
          if (res.sucess) {
            console.log("dddd", res.sucess)
            setData(res.sucess.list);
            setIsLoader(false)
          } else {
            setIsLoader(false)
            console.log("errrrr")
          }
        });
      } catch (error) {
        setIsLoader(false)
        console.log("error", error)
      }
    }
    else if (parsedData?.roles[0] == 'POLICE_ADMIN' || parsedData?.roles[0] == 'TOW_ADMIN') {
      // setIsLoader(true)
      try {
        companyList(parsedData.companyId, async (res) => {
          // alert(CompId)
          if (res.sucess) {
            console.log("res.sucess.kk", res.sucess)
            setData(res.sucess.list);
            setIsLoader(false)
          } else {
            console.log("errrrr")
            setIsLoader(false)
          }
        });
      } catch (error) {
        setIsLoader(false)
        console.log("error", error)
      }
    }
    else {
      // setIsLoader(true)
      try {
        GetAllUsersApi('', async (res) => {
          if (res.sucess) {
            console.log("res.sucess.list", res.sucess.list)
            setData(res.sucess.list);
            setIsLoader(false)
          } else {
            setIsLoader(false)
            console.log("errrrr")
          }
        });
      } catch (error) {
        setIsLoader(false)
        console.log("error", error)
      }
    }
  }
  useEffect(() => {
    if (props.typeData == 'Tow Company') {
      setIsLoader(true)
      try {
        getCompanyJurisdictionAll(props.idData, async (res) => {
          if (res.sucess) {
            console.log("res.res.res.sucess", res.sucess.list);
            let data = res.sucess.list;
            var myArray = [];
            for (let i = 0; i < data.length; i++) {
              myArray.push({
                jurisdiction: data[i].jurisdiction.jurisdiction,
                id: data[i].jurisdiction.id,
              });
            };
            setDropdownData(myArray)
            setIsLoader(false)
            // setselectedservices(renderList(myArray).map((i) => i));
            console.log("ass", myArray);
          } else {
            setIsLoader(false)
            console.log("errrrr")
          }
        });
      } catch (error) {
        setIsLoader(false)
        console.log("error", error)
      }
    }
    else {
      // setIsLoader(true)
      try {
        getJurisdictionAll('', async (res) => {
          if (res.sucess) {
            setDropdownData(res.sucess.list);
            // setIsLoader(false)
          } else {
            // setIsLoader(false)
            console.log("errrrr")
          }
        });
      } catch (error) {
        // setIsLoader(false)
        console.log("error", error)
      }
    }
  }, [])
  useEffect(() => {
    fetchData()
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
    const obj = {
      id: setItem?.id,
      userName: userDetail?.userName === undefined ? setItem?.userName : setItem?.userName,
      firstName: userDetail.firstName === undefined ? setItem?.firstName : userDetail?.firstName,
      lastName: userDetail.lastName === undefined ? setItem?.lastName : userDetail?.lastName,
      // email: userDetail.email === undefined ? setItem?.email : setItem?.email,
      address: userDetail.address === undefined ? setItem?.address : userDetail.address,
      phone: userDetail.phone === undefined ? setItem?.phone : userDetail.phone,
      postalCode: userDetail.postalCode === undefined ? setItem?.postalCode : userDetail.postalCode,
      country: userDetail.country === undefined ? setItem?.country : userDetail.country,
      city: userDetail.city === undefined ? setItem?.city : userDetail.city,
      province: userDetail?.province === undefined ? setItem?.province : userDetail.province,
      // title: userDetail?.title === undefined ? setItem?.title : userDetail.title,
      // gender: userDetail?.gender === undefined ? setItem?.gender : userDetail.gender,

      officerUnit: userDetail.officerUnit === undefined ? setItem?.officerUnit : userDetail.officerUnit,
      officerBadge: userDetail.officerBadge === undefined ? setItem?.officerBadge : userDetail.officerBadge,
      province: userDetail?.lawEnforcementAgencyOccurrence === undefined ? setItem?.lawEnforcementAgencyOccurrence : userDetail.lawEnforcementAgencyOccurrence,
      enabled: true,
      accountNonLocked: false,
      accountNonExpired: false,
      credentialsNonExpired: false,
      // roles: [
      //   rolesData
      // ]
      roles: rolesData == '' ? setItem?.roles : [rolesData]
    }
    try {
      UpdateUsersApi(obj, async (res) => {
        if (res.sucess) {
          // setsucessUpdate(true);
          // setTimeout(() => {
          //   setsucessUpdate(false)
          //   toggleUpdate()
          // }, 3000);
          if (jurisdictionData && jurisdictionData.length > 0) {
            var myArray = [];
            for (let i = 0; i < jurisdictionData.length; i++) {
              myArray.push({
                jurisdiction: { id: jurisdictionData[i].value },
                userId: setItem.id,
              });
            };

            try {
              addUserJurisdiction(setItem.id, myArray, async (res) => {

                console.log("aaaaa", res)
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
          toggleUpdate()
          successAlert(res.sucess.messages[0].message);

        } else {
          // setErrorUpdate(true);
          // setTimeout(() => {
          //   setErrorUpdate(false)
          //   toggleUpdate()
          // }, 3000);
          toggleUpdate();
          errorAlert('Something went wrong');
        }
      });
    } catch (error) {
      errorAlert(error);
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
      fetchData()
    }
    else {
      let filteredData = data.filter(filterData => filterData.userName.includes(val));
      setData(filteredData)
    }
  }
  const ChangeStatusJob = async (status) => {
    let parsedstoredloggedData;
    const storedData = await localStorage.getItem('accessData')
    if (storedData) {
      const getdata = await localStorage.getItem('accessData')
      parsedstoredloggedData = JSON.parse(getdata)
    }
    else {
      const getdata = await localStorage.getItem('loggedData')
      parsedstoredloggedData = JSON.parse(getdata)
    }
    if (status) {
      setLogging(parsedstoredloggedData)
      if (props?.data == 2) {
        try {
          setIsLoader(true)
          companyList(props?.idData, async (res) => {
            if (res.sucess) {
              let result = res.sucess.list.filter(el => el.roles[0] === status);
              setData(result);
              setIsLoader(false)
            } else {
              setIsLoader(false)
              console.log("errrrr")
            }
          });
        } catch (error) {
          setIsLoader(false)
          console.log("error", error)
        }

      }
      else if (parsedstoredloggedData.roles[0] != 'ADMIN') {
        setIsLoader(true)
        try {
          companyList(parsedstoredloggedData.companyId, async (res) => {
            if (res.sucess) {
              let result = res.sucess.list.filter(el => el.roles[0] === status);
              setData(result);
              setIsLoader(false)
            } else {
              setIsLoader(false)
              console.log("errrrr")
            }
          });
        } catch (error) {
          setIsLoader(false)
          console.log("error", error)
        }
      }
      else if (parsedstoredloggedData?.roles[0] == 'POLICE_ADMIN' || parsedstoredloggedData?.roles[0] == 'TOW_ADMIN') {
        setIsLoader(true)
        try {
          companyList(parsedstoredloggedData.companyId, async (res) => {
            // alert(CompId)
            if (res.sucess) {
              let result = res.sucess.list.filter(el => el.roles[0] === status);
              setData(result);
              setIsLoader(false)

            } else {
              setIsLoader(false)
              console.log("errrrr")
            }
          });
        } catch (error) {
          console.log("error", error)
        }
      }
      else {
        setIsLoader(true)
        try {
          GetAllUsersApi('', async (res) => {
            if (res.sucess) {
              let result = res.sucess.list.filter(el => el.role === status);
              setData(result);
              setIsLoader(false)
            } else {
              setIsLoader(false)
              console.log("errrrr")
            }
          });
        } catch (error) {
          setIsLoader(false)
          console.log("error", error)
        }
      }
    }
    else {
      setIsLoader(true)
      fetchData()
    }
    // setStatusData(status)
  }
  const ShowActivenInActive = async (status) => {
    let parsedstoredloggedData;
    const storedData = await localStorage.getItem('accessData')
    if (storedData) {
      const getdata = await localStorage.getItem('accessData')
      parsedstoredloggedData = JSON.parse(getdata)
    }
    else {
      const getdata = await localStorage.getItem('loggedData')
      parsedstoredloggedData = JSON.parse(getdata)
    }
    setLogging(parsedstoredloggedData)
    if (props?.data == 2) {
      // alert(props?.idData)
      setIsLoader(true)
      try {
        companyList(props?.idData, async (res) => {
          // alert(JSON.stringify(res))
          if (res.sucess) {
            let result = res.sucess.list.filter(el => el.enabled === status);
            setData(result);
            setIsLoader(false)
          } else {
            setIsLoader(false)
            console.log("errrrr")
          }
        });
      } catch (error) {
        setIsLoader(false)
        console.log("error", error)
      }
    }
    else if (parsedstoredloggedData.roles[0] != 'ADMIN') {
      // alert(logData)
      // alert('')
      setIsLoader(true)
      try {
        companyList(parsedstoredloggedData.companyId, async (res) => {
          if (res.sucess) {
            let result = res.sucess.list.filter(el => el.enabled === status);
            setData(result);
            setIsLoader(false)

          } else {
            setIsLoader(false)
            console.log("errrrr")
          }
        });
      } catch (error) {
        setIsLoader(false)
        console.log("error", error)
      }
    }
    else if (parsedstoredloggedData?.roles[0] == 'POLICE_ADMIN' || parsedstoredloggedData?.roles[0] == 'TOW_ADMIN') {
      setIsLoader(true)
      try {
        companyList(parsedstoredloggedData.companyId, async (res) => {
          // alert(CompId)
          if (res.sucess) {
            let result = res.sucess.list.filter(el => el.enabled === status);
            setData(result);
            setIsLoader(false)
          } else {
            setIsLoader(false)
            console.log("errrrr")
          }
        });
      } catch (error) {
        setIsLoader(false)
        console.log("error", error)
      }
    }
    else {
      setIsLoader(true)
      try {
        GetAllUsersApi('', async (res) => {
          if (res.sucess) {
            let result = res.sucess.list.filter(el => el.enabled === status);
            setData(result);
            setIsLoader(false)

          } else {
            setIsLoader(false)
            console.log("errrrr")
          }
        });
      } catch (error) {
        setIsLoader(false)
        console.log("error", error)
      }
    }

  }
  const accessButton = async (item) => {
    await localStorage.setItem('access', item.id);
    // navigate.push('/admin/index')
    window.open('/admin/index', '_self');
  }
  return (
    <>
      {props?.data == 2 ? (
        <></>
      ) : (
        <Header />
      )}
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        {sucess && (
          <Alert color="success">
            CSV is Uploaded successfully
          </Alert>
        )}
        {errors && (
          <Alert color="danger">
            Something went Wrong
          </Alert>
        )}
        {sucessUdelete && (
          <Alert color="success">
            User Deleted Successfully
          </Alert>
        )}
        {errorsUdelete && (
          <Alert color="danger">
            Something went Wrong
          </Alert>
        )}
        {/* <Spinner type="grow" color="warning"
          children={false} /> */}
        <Row>
          <div className="col" style={{ marginTop: props?.data == '2' ? "8%" : 0 }}>
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>


                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 className="mb-0">{config.allUsers}</h3>
                    {props?.data == 2 && (
                      <div style={{ position: "absolute", right: 15 }}>
                        <Button onClick={() => { toggleAdd() }} className="" color="primary" type="button">
                          Add User
                        </Button>
                      </div>
                    )}

                  </div>

                  <UncontrolledDropdown style={{ marginLeft: 10 }}>
                    {props?.data == 2 ? (
                      <></>
                    ) : <>
                      <DropdownToggle
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
                      </DropdownToggle></>}

                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem

                        onClick={() => { ChangeStatusJob('') }}
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

                        onClick={() => { ChangeStatusJob('ADMIN') }}
                      >
                        Super Admin
                      </DropdownItem>
                      <DropdownItem

                        onClick={() => { ChangeStatusJob('TOW_ADMIN') }}
                      >
                        Tow Admin
                      </DropdownItem>
                      <DropdownItem

                        onClick={() => { ChangeStatusJob('POLICE_ADMIN') }}
                      >
                        LE Admin
                      </DropdownItem>
                      <DropdownItem

                        onClick={() => { ChangeStatusJob('POLICE') }}
                      >
                        LE
                      </DropdownItem>
                      <DropdownItem

                        onClick={() => { ChangeStatusJob('STAFF') }}
                      >
                        Staff
                      </DropdownItem>
                      <DropdownItem

                        onClick={() => { ChangeStatusJob('DRIVER') }}
                      >
                        Driver
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <button
                    className="importCSV"
                    onClick={() => {
                      toggle()
                    }}
                  >
                    {config.importCSV}
                  </button>
                  {/* <input
                    type="search"
                    placeholder="Search"
                    onBlur={text => getFilteredData(text.target.value)}
                    onChange={text => getFilteredData(text.target.value)}
                  /> */}
                  <Form>
                    <InputGroup className="pad">
                      <Input
                        aria-label="Search"
                        className=""
                        placeholder="Search by Email"
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
                  </Form>
                </Row>
                {/* <h3 style={{ position: "absolute", right: 20, top: 25, }} className="mb-0">Keep Scrolling ►</h3> */}
              </CardHeader>
              {isLoader && (
                <Spinner className="loader" children={true} />)}
              {data.length > 0 ? (
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>

                      <th scope="col">Email(Username)</th>
                      <th scope="col">Name</th>

                      {props?.data == '2' ? (
                        <></>
                      ) : (
                        <th scope="col">Company Name</th>
                      )}
                      <th scope="col">Phone</th>
                      <th scope="col">Role</th>
                      <th scope="col">Status</th>
                      {/* <th scope="col">Access Profile</th> */}

                      <th scope="col" />
                    </tr>
                  </thead>
                  {data ? (
                    <tbody>
                      {data.map((item) => {
                        return (
                          <tr style={{ borderWidth: 1, borderColor: 'black' }}>

                            <td style={{ textDecoration: 'underline black', cursor: "pointer" }} onClick={() => { toggleUpdate(item) }} className="text-sm">{item?.userName}</td>
                            <td className="text-sm">{item?.title} {item?.firstName} {item?.lastName}</td>
                            {/* <td className="text-sm">
                            {item?.address}, {item?.city}, {item?.country}
                          </td> */}


                            {props?.data == '2' ? (
                              <></>
                            ) : (
                              <td className="text-sm">
                                {item?.companyName}
                              </td>
                            )}
                            <td className="text-sm">
                              {item?.phone}

                            </td>
                            {item.roles && item?.roles[0] === 'POLICE' && (
                              <td className="text-sm">
                                LE
                              </td>
                            )}
                            {!item.roles && (
                              <td className="text-sm">
                                ---
                              </td>
                            )}
                            {item.roles && item?.roles[0] != 'POLICE' && (
                              <td className="text-sm">
                                {item?.roles[0] === 'POLICE_ADMIN' ? 'LE ADMIN' : item?.roles}
                              </td>
                            )}
                            <td className="text-sm">
                              {item?.enabled ? 'Active' : 'Inactive'}

                            </td>
                            {props?.data == '2' && (
                              <>
                                {item.roles && (item?.roles != 'DRIVER' && item?.roles != 'POLICE') ? (
                                  <Button onClick={() => { accessButton(item) }} className="my-4" color="primary" type="button">
                                    Access Profile
                                  </Button>
                                ) : (
                                  <Button onClick={() => {
                                    window.open('https://etows.app/', '_blank', 'noopener,noreferrer');
                                  }} className="my-4" color="primary" type="button">
                                    Access Profile
                                  </Button>
                                )}
                              </>
                            )}
                            {/* <td className="text-sm">
                            <div className="d-flex align-items-center">
                              <span className="mr-2"></span>
                              <div>
                                <span>{item.gender.startsWith('m') || item.gender.startsWith('M') ? 'Male' : 'Female'}</span>
                              </div>
                            </div>
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
                                    {config.updateUser}
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => { Deletetoggle(item) }}
                                  >
                                    {config.Delete}
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => { disableFunc(item) }}
                                  >
                                    {item?.enabled ? 'Inactive' : 'Active'}
                                  </DropdownItem>
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
                      {/* <h3>No Record Found</h3> */}
                    </div>
                  )}
                </Table>
              ) : (
                <>
                  {!isLoader && (
                    <div className="text-center">
                      <h2>No Record Found</h2>
                    </div>
                  )}
                </>
              )}
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
                        <h3 className="mb-0">{config.updateUser}</h3>
                      </Col>

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
                                Email(Username)
                              </label>
                              <Input
                                disabled
                                className="form-control-alternative"
                                defaultValue={setItem?.userName}
                                id="input-username"
                                placeholder="Username"
                                onChange={text => textOnchange(text, 'userName')}
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
                                First name
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={setItem?.firstName}
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
                                defaultValue={setItem?.lastName}
                                id="input-username"
                                placeholder="Last Name"
                                onChange={text => textOnchange(text, 'lastName')}
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        {(props?.typeData == 'L.E/Govt Agency' || setItem?.roles == 'POLICE' || setItem?.roles == 'POLICE_ADMIN') && (
                          <Row>
                            <Col lg="4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Officer Unit
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  defaultValue={setItem?.officerUnit}
                                  id="input-username"
                                  placeholder="Officer Unit"
                                  type="text"
                                  onChange={text => textOnchange(text, 'officerUnit')}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Officer Badge
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  defaultValue={setItem?.officerBadge}
                                  id="input-username"
                                  placeholder="Officer Badge"
                                  type="text"
                                  onChange={text => textOnchange(text, 'officerBadge')}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  LE Agency Occurrence
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  defaultValue={setItem?.lawEnforcementAgencyOccurrence}
                                  id="input-username"
                                  placeholder="LE Agency Occurrence"
                                  type="text"
                                  onChange={text => textOnchange(text, 'lawEnforcementAgencyOccurrence')}
                                />
                              </FormGroup>


                            </Col>

                          </Row>
                        )}
                        <Row>
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
                                defaultValue={setItem?.phone}
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
                                Street Address
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue={setItem?.address}
                                id="input-username"
                                placeholder="Street Address"
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
                                defaultValue={setItem?.city}
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
                                defaultValue={setItem?.province}
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
                                defaultValue={setItem?.postalCode}
                                id="input-username"
                                placeholder="Postal/Zip Code"
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
                                defaultValue={setItem?.country}
                                id="input-username"
                                placeholder="Country"
                                onChange={text => textOnchange(text, 'country')}
                                type="text"
                              />
                            </FormGroup>
                          </Col>


                        </Row>
                        <Row>
                          <Col lg="4">
                            <FormGroup>
                              <Label for="exampleSelect">Role</Label>
                              <Select
                                name="form-field-name"
                                onChange={(val) => {
                                  setRoles(val.value)
                                  const new_obj = { ...setItem, roles: [val.value] }
                                  setItemData(new_obj)
                                }}
                                value={userDetail?.roles}
                                labelKey='name'
                                defaultInputValue={setItem?.roles != 'POLICE_ADMIN' ? setItem?.roles == 'POLICE' ? 'LE' : setItem?.roles : 'LE ADMIN'}
                                valueKey='countryCode'
                                options={props.data == 2 ? (setItem?.roles == 'POLICE' || setItem?.roles == 'POLICE_ADMIN') ? optionsComLE : optionsComTow : loggingData?.roles == 'ADMIN' ? options : (loggingData?.roles == 'TOW_ADMIN' || loggingData?.roles == 'DRIVER' || loggingData?.roles == 'STAFF') ? optionsComTow : optionsComLE}
                              />

                              {/* </Input> */}
                            </FormGroup>

                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Company Name
                              </label>
                              <Input
                              disabled="true"
                                className="form-control-alternative"
                                defaultValue={setItem?.companyName}
                                id="input-username"
                                placeholder="Country"
                                // onChange={text => textOnchange(text, 'country')}
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        {/* {alert(setItem.roles)} */}
                        {(setItem?.roles == 'DRIVER') && (
                          <Row>
                            <Col lg="12">
                              <FormGroup>
                                <Label for="exampleSelect">Jurisdiction(s)</Label>
                                <Select
                                  value={selectedservices}
                                  onChange={(val) => {
                                    setJurisdictionData(val)
                                    setselectedservices(val)
                                    console.log("vall", val)
                                  }}
                                  closeMenuOnSelect={false}
                                  // defaultValue={[colourOptions[0], colourOptions[1]]}
                                  isMulti
                                  options={renderList(dropdownData)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        )}
                        <Button onClick={() => { OnSubmit() }} className="my-4" color="primary" type="button">
                          {config.save}
                        </Button>

                        <Button color="primary" onClick={() => { toggleUpdate() }}>{config.close}</Button>
                        <Row>
                          {/* <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-city"
                              >
                                Current Password
                              </label>
                              <Input
                                className="form-control-alternative"
                                // defaultValue={data?.city}
                                id="input-city"
                                placeholder="Current Password"
                                type="text"
                                onChange={text => setCurrentPassword(text.target.value)}
                              />
                            </FormGroup>
                          </Col> */}
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
                                // type="text"
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
                                // type="number"
                                // defaultValue={data?.postalCode}
                                onChange={text => setConfirmPassword(text.target.value)}
                              />
                            </FormGroup>


                          </Col>

                        </Row>

                        <Button onClick={() => { OnChangePassword() }} className="my-4" color="primary" type="button">
                          Save Password
                        </Button>

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
            <Button color="secondary" onClick={() => { setDeletToggle(false) }}>No</Button>
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
                        <h3 className="mb-0">Add User</h3>
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
                              <label
                                className="form-control-label"
                                htmlFor="input-username"
                              >
                                Email(Username) *
                              </label>
                              <Input
                                // disabled
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
                        {(props?.typeData == 'L.E/Govt Agency' || setItem?.roles == 'POLICE' || setItem?.roles == 'POLICE_ADMIN') && (
                          <Row>
                            <Col lg="4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Officer Unit
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  // defaultValue={setItem?.officerUnit}
                                  id="input-username"
                                  placeholder="Officer Unit"
                                  type="text"
                                  onChange={text => textOnchange(text, 'officerUnit')}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Officer Badge
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  // defaultValue={setItem?.officerBadge}
                                  id="input-username"
                                  placeholder="Officer Badge"
                                  type="text"
                                  onChange={text => textOnchange(text, 'officerBadge')}
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  LE Agency Occurrence
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  // defaultValue={setItem?.lawEnforcementAgencyOccurrence}
                                  id="input-username"
                                  placeholder="LE Agency Occurrence"
                                  type="text"
                                  onChange={text => textOnchange(text, 'lawEnforcementAgencyOccurrence')}
                                />
                              </FormGroup>


                            </Col>

                          </Row>
                        )}
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
                                Street Address
                              </label>
                              <Input
                                className="form-control-alternative"
                                // defaultValue={data?.phone}
                                id="input-username"
                                placeholder="Street Address"
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
                                placeholder="Postal/Zip Code"
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
                        {/* {alert(loggingData.roles)} */}
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
                                options={props.data == 2 ? props.typeData != 'Tow Company' ? optionsComLE : optionsComTow : loggingData?.roles == 'ADMIN' ? options : (loggingData?.roles == 'TOW_ADMIN' || loggingData?.roles == 'DRIVER' || loggingData?.roles == 'STAFF') ? optionsComTow : optionsComLE}
                              />

                              {/* </Input> */}
                            </FormGroup>
                            {/* <Button onClick={() => { OnSubmit() }} className="my-4" color="primary" type="button">
                              {config.save}
                            </Button> */}
                          </Col>

                        </Row>
                        {/* {alert(rolesData)} */}
                        {(rolesData == 'DRIVER') && (
                          <Row>
                            <Col lg="12">
                              <FormGroup>
                                <Label for="exampleSelect">Jurisdiction(s)</Label>
                                <Select
                                  value={selectedservices}
                                  onChange={(val) => {
                                    setJurisdictionData(val)
                                    setselectedservices(val)
                                    // textOnchange(val.label, 'companyType')
                                    // setCompanyType(val.label)
                                    console.log("vall", val)
                                  }}
                                  closeMenuOnSelect={false}
                                  // defaultValue={[colourOptions[0], colourOptions[1]]}
                                  isMulti
                                  options={renderList(dropdownData)}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        )}
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

export default AllUsers;
