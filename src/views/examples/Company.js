import React, { useEffect, useState } from "react";

// reactstrap components
import {
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
  Modal, ModalHeader, ModalBody, ModalFooter,
  Input,
  CardBody,
  Form,
  FormGroup,
  Label
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
// core components
import Header from "components/Headers/Header.js";
import { assignCompany, assignedCompany, getAllTowCompany, getAllAssignedTowCompany, AllUsersApi, getCSVApi, GetAllUsersApi, DeleteCompany, UpdateCompany, AddCompany, getAllCompany, AllUsersByType, CheckEnabledDisabled, deleteUser, disableUser, UploadCsvApi, UpdateUserPassword, UpdateUsersApi, getSingleCompany, getJurisdictionAll, addCompanyJurisdiction, getCompanyJurisdictionAll, updateCompanyJurisdiction, UpdateTowCompany, getAssignCompany } from "../../APIstore/apiCalls";
import { CsvToHtmlTable } from 'react-csv-to-table';
import axios from 'axios';
import config from "config";
import Select, { StylesConfig } from 'react-select';
import { successAlert, errorAlert } from '../../Theme/utils';
import toast, { Toaster } from 'react-hot-toast';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import AddressInput from './AddressInput';
function Company(props) {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [setItem, setItemData] = useState('');
  const [modalUpdate, setModalUpdate] = useState(false);
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
  const [address, setAddress] = useState();
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
  const [corporateAddress,setCorporateAddress]=useState('');
  const navigate = useHistory()
  const options = [
    { value: 'Tow Company', label: 'Tow Company' },
    { value: 'L.E/Govt Agency', label: 'L.E/Govt Agency' }
  ]
  // const options = [
  //   { value: 'Tow Company', label: 'Tow Company' },
  //   { value: 'L.E/Govt Agency', label: 'L.E/Govt Agency' },
  //   { value: 'Security Company', label: 'Security Company' },
  //   { value: 'Company - Other', label: 'Company - Other' },
  // ]
  const optionsJuridiction = [
    { value: '1', label: '1' },
    { value: '2', label: '2' }
  ]
  const Jurisdiction = [
    { value: 'chocolate', label: 'ChosetCompanyDropdownDatacolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  const redirect = (to, query) => {
    navigate.push(to, query);
  }
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

  const renderCompanyList = (selectedArray) => {
    return (selectedArray?.map(data => ({ label: data?.corporateName, value: data?.id })))
  }

  const renderList = (selectedArray) => {
    return (selectedArray?.map(data => ({ label: data?.jurisdiction, value: data?.id })))
  }
  const toggle = (item) => {
    setModal(!modal);
    setItemData(item)
  }
  const addUsers = (item) => {
    // setUserId(item.id)
    setAddUsers(!adduser)
  }
  const Deletetoggle = (item) => {
    setUserId(item.id)
    setDeletToggle(!deleteModal)
  }
  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
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
  const toggleAdd = () => {
    setModalAdd(!modalAdd);
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
  const deleteFunc = () => {
    try {
      DeleteCompany(userID, async (res) => {

        if (res.sucess) {
          console.log("res", res);
          setDeletToggle(!deleteModal)
          successAlert(res.sucess.messages[0].message);
          try {
            getAllCompany('', async (res) => {
              if (res.sucess) {
                console.log("res.sucess", res.sucess)
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

  // useEffect(() => {
    // if(data?.address){
    //   textOnchange(data?.address,'address');
    // }
    // const func = async () => {
    //   const geocodeObj =
    //     address &&
    //     address?.value &&
    //     (await geocodeByPlaceId(address.value?.place_id));
    //   const addressObject =
    //     geocodeObj && getAddressObject(geocodeObj[0]?.address_components);
    //   // let makeString = `${addressObject?.address == undefined ? '' : addressObject?.address} ${addressObject?.city == undefined ? '' : addressObj?.city} ${addressObject?.province == undefined ? '' : addressObject?.province} ${addressObject?.country == undefined ? '' : addressObject?.country}`
    //   // alert(address?.label);

    //   if (address?.label) {
    //     textOnchange(address?.label, 'corporateAddress');
    //   }
    // };
    // func();
  // }, [address]);

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
    setIsLoader(true)
    try {
      getAllCompany('', async (res) => {
        console.warn("res.sucess.younis", res);
        if (res.sucess) {
          console.log("res.sucess.asdsa", res.sucess.list)
          setData(res.sucess.list);
          setIsLoader(false)
        } else {
          console.log("errrrr")
          setIsLoader(false)
        }
      });
    } catch (error) {
      console.log("error", error)
      setIsLoader(false)
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
              assignCompany(setItem.id,assignedCompArray, async (res) => {
                if (res.sucess.statusCode == 'success')
                  successAlert(res.sucess.messages[0].message)
                else
                  errorAlert('Companies not updated')
              });
            } catch (error) {
              successAlert(error)
            }
          }
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

    if (!cType) {
      errorAlert('Please Select Compant Type');
      return
    }
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

    }
    // console.log("obj", jurisdictionData)
    // var objData;
    // for (var i = 0; i <= jurisdictionData.length; i++) {
    //   jurisdictionData.forEach(function (car) {
    //     objData = {
    //       aa: car.value
    //     }
    //   })
    // }


    // console.log("asda", objData);
    // return
    let comPId;
    try {
      AddCompany([obj], async (res) => {
        if (res.sucess) {
          comPId = res.sucess.generatedIds[0];
          if (jurisdictionData && jurisdictionData.length > 0) {
            comPId = res.sucess.generatedIds[0];
            var myArray = [];
            for (let i = 0; i < jurisdictionData.length; i++) {
              myArray.push({
                jurisdiction: { id: jurisdictionData[i].value },
                company: { id: res.sucess.generatedIds[0] },
                description: ""
              });
            };
            try {
              addCompanyJurisdiction(comPId, myArray, async (res) => {
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
          var assignedCompArray = [];
          for (let i = 0; companiesData && i < companiesData?.length; i++) {
            assignedCompArray.push({
              assigned: { id: companiesData[i].value },
              company: { id: res.sucess.generatedIds[0] },
              description: companiesData[i].value + " assinged to " + res.sucess.generatedIds[0]
            });
          };

          if(assignedCompArray!=null && assignedCompArray.length>0){
            try {
              assignedCompany(assignedCompArray, async (res) => {
                console.warn("response: ",res);
                if (res.sucess.statusCode == 'success')
                  successAlert("Companies assigned successfully")
                else
                  errorAlert('Companies not added')
              });
            } catch (error) {
              successAlert(error)
            }
          }
          toggleAdd()
          successAlert(res.sucess.messages[0].message)

          try {
            getSingleCompany(res.sucess.generatedIds[0], async (res) => {
              if (res.sucess) {
                console.log("generatedIds", res.sucess)
                setAllData(res.sucess);
                addUsers()
              } else {
                console.log("errrrr")
              }
            });
          } catch (error) {
            console.log("error", error)
          }
          try {
            getAllCompany('', async (res) => {
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
  const handleFocus = (event) => {
    console.log(JSON.stringify(event))
    //   setJurisdictionData(val)
    //   console.log("val",val);
    //   var myArray = [];
    //   for (let i = 0; i < val.length; i++) {
    //     myArray.push({
    //       id: setItem.id,
    //       jurisdiction: { id: val[i].value },
    //       company: { id: setItem.id },
    //       description: ""
    //     });
    //   };
    //   console.log("myArray",myArray);
    //   return
    // //  setJurisdictionUpdateData(myArray)
    //   try {
    //     updateCompanyJurisdiction(myArray, async (res) => {
    //       console.log("aaaaa", res)
    //       if (res.sucess) {
    //         // setAllData(res.sucess);
    //         // addUsers()
    //         setModalUpdate(!modalUpdate);
    //       } else {
    //         console.log("errrrr")
    //       }
    //     });
    //   } catch (error) {
    //     console.log("error", error)
    //   }
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>

        {/* {isLoader && (
          <Spinner className="loader" children={true} />)} */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                    <h3 className="mb-0">Company</h3>
                    <Button onClick={() => { toggleAdd() }} className="" color="primary" type="button">
                      Add Company
                    </Button>
                  </div>
                </Row>
                {/* <h3 style={{ position: "absolute", right: 20, top: 25, }} className="mb-0">Keep Scrolling ►</h3> */}
              </CardHeader>
              {data.length > 0 ? (
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Operating Name</th>
                      <th scope="col">Legal Name</th>
                      <th scope="col">Company Type</th>
                      <th scope="col">Corporate Address</th>
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

                            <td onClick={() => { redirect("/admin/company-detail", item) }} style={{ textDecoration: 'underline black', cursor: "pointer" }}
                              // onClick={() => { toggle(item) }} 
                              className="text-sm">{item?.id}</td>
                            <td onClick={() => { redirect("/admin/company-detail", item) }} className="text-sm">{item?.companyName}</td>
                            <td onClick={() => { redirect("/admin/company-detail", item) }} className="text-sm">{item?.corporateName}</td>
                            <td onClick={() => { redirect("/admin/company-detail", item) }} className="text-sm">
                              {item?.companyType}
                            </td>
                            <td onClick={() => { redirect("/admin/company-detail", item) }} className="text-sm">
                              {item?.corporateAddress}

                            </td>
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
                                    Update Company
                                  </DropdownItem>
                                  <DropdownItem
                                    onClick={() => { Deletetoggle(item) }}
                                  >
                                    Delete Company
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
              ) : (
                <div className="text-center">
                  <h2>No Record Found</h2>
                </div>
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

          <ModalHeader>Company ID: {setItem?.id}</ModalHeader>
          <ModalBody>
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
                  <span className="text-sm listUiItem">Badge/ID</span>
                  <span className="text-sm">{setItem?.primarybadgeId}</span>
                </div>
              ) : null}
              {setItem?.primaryName ? (
                <div className="listUi">
                  <span className="text-sm listUiItem">Name</span>
                  <span className="text-sm">{setItem?.primaryName}</span>
                </div>
              ) : null}
              {setItem?.primaryContact ? (
                <div className="listUi">
                  <span className="text-sm listUiItem">Contact</span>
                  <span className="text-sm">{setItem?.primaryContact}</span>
                </div>
              ) : null}
              {setItem?.primaryRankPositionTitle ? (
                <div className="listUi">
                  <span className="text-sm listUiItem">Rank Position/Title</span>
                  <span className="text-sm">{setItem?.primaryRankPositionTitle}</span>
                </div>
              ) : null}
              {setItem?.primaryDepartment ? (
                <div className="listUi">
                  <span className="text-sm listUiItem">Department</span>
                  <span className="text-sm">{setItem?.primaryDepartment}</span>
                </div>
              ) : null}
              {setItem?.primaryEmail ? (
                <div className="listUi">
                  <span className="text-sm listUiItem">Email</span>
                  <span className="text-sm">{setItem?.primaryEmail}</span>
                </div>
              ) : null}
              {setItem?.primaryAddress ? (
                <div className="listUi">
                  <span className="text-sm listUiItem">Address</span>
                  <span className="text-sm">{setItem?.primaryAddress}</span>
                </div>
              ) : null}
              {setItem?.secondarybadgeId ? (
                <div className="listUi">
                  <span className="text-sm listUiItem">Badge/ID</span>
                  <span className="text-sm">{setItem?.secondarybadgeId}</span>
                </div>
              ) : null}
              {setItem?.secondaryName ? (
                <div className="listUi">
                  <span className="text-sm listUiItem">Name</span>
                  <span className="text-sm">{setItem?.secondaryName}</span>
                </div>
              ) : null}
              {setItem?.secondaryContact ? (
                <div className="listUi">
                  <span className="text-sm listUiItem">Contact</span>
                  <span className="text-sm">{setItem?.secondaryContact}</span>
                </div>
              ) : null}
              {setItem?.secondaryRankPositionTitle ? (
                <div className="listUi">
                  <span className="text-sm listUiItem">Rank Position/Title</span>
                  <span className="text-sm">{setItem?.secondaryRankPositionTitle}</span>
                </div>
              ) : null}
              {setItem?.secondaryDepartment ? (
                <div className="listUi">
                  <span className="text-sm listUiItem">Department</span>
                  <span className="text-sm">{setItem?.secondaryDepartment}</span>
                </div>
              ) : null}
              {setItem?.secondaryEmail ? (
                <div className="listUi">
                  <span className="text-sm listUiItem">Email</span>
                  <span className="text-sm">{setItem?.secondaryEmail}</span>
                </div>
              ) : null}
              {setItem?.secondaryAddress ? (
                <div className="listUi">
                  <span className="text-sm listUiItem">Address</span>
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
            {sucessUpdate && (
              <Alert color="success">
                User Updated successfully
              </Alert>
            )}
            {errorsUpdate && (
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
                        {cType == 'L.E/Govt Agency' && (
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
                                  defaultValue={renderList(companyDropdownData)}
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
                        {cType == 'Tow Company' && (
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
                                    console.log("valvalval", val);
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
                                id="companyAddress" 
                                placeholder="Search Address"
                                value={setItem?.corporateAddress ? setItem?.corporateAddress : ''}                          
                                onChange={(text) => {
                                  setCorporateAddress(text);
                                }}
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
                        {cType == 'L.E/Govt Agency' && (
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
                        {cType == 'L.E/Govt Agency' && (
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
                        {cType == 'L.E/Govt Agency' && (
                          <>
                            <div onClick={() => { setShowSec(!ShowSec) }}>
                              {ShowSec ? <AiFillMinusCircle size={22} /> : <AiFillPlusCircle size={22} />}
                            </div>
                            {ShowSec && (
                              <>
                                {cType == 'L.E/Govt Agency' && (
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
                                {cType == 'L.E/Govt Agency' && (
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
                        {cType == 'Tow Company' && (
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
                        {cType == 'Tow Company' && (
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

                        {cType == 'Tow Company' && (
                          <>
                            <div onClick={() => { setShowSec(!ShowSec) }}>
                              {ShowSec ? <AiFillMinusCircle size={22} /> : <AiFillPlusCircle size={22} />}
                            </div>
                            {ShowSec && (
                              <>

                                {cType == 'Tow Company' && (
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
                                {cType == 'Tow Company' && (
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
                        <h3 className="mb-0">Add Company</h3>
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
                                // value={this.state.value}
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
                                // defaultValue={setItem?.companyName}
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
                                // defaultValue={setItem?.companyName}
                                id="input-username"
                                placeholder="Operating Name"
                                onChange={text => textOnchange(text, 'companyName')}
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        {cType == 'L.E/Govt Agency' && (
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
                        {cType == 'Tow Company' && (
                          <Row>
                            <Col lg="12">
                              <FormGroup>
                                <Label for="exampleSelect">Jurisdiction(s)</Label>
                                <Select
                                  onChange={(val) => {
                                    setJurisdictionData(val)
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
                                value={setItem?.corporateAddress ? setItem?.corporateAddress : ''}                          
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
                        {cType == 'L.E/Govt Agency' && (
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
                                    // defaultValue={setItem?.additionalInformation}
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
                                    // defaultValue={setItem?.companyHolderName}
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
                                    // defaultValue={setItem?.companyHolderContact}
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
                        {cType == 'L.E/Govt Agency' && (
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
                                  // defaultValue={setItem?.additionalInformation}
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
                                  // defaultValue={setItem?.companyHolderName}
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
                                  // defaultValue={setItem?.companyHolderContact}
                                  id="input-username"
                                  placeholder="Email"
                                  type="text"
                                  onChange={text => textOnchange(text, 'primaryEmail')}
                                />
                              </FormGroup>


                            </Col>

                          </Row>
                        )}
                        {cType == 'L.E/Govt Agency' && (
                          <>
                            <div onClick={() => { setShowSec(!ShowSec) }}>
                              {ShowSec ? <AiFillMinusCircle size={22} /> : <AiFillPlusCircle size={22} />}
                            </div>
                            {ShowSec && (
                              <>

                                {cType == 'L.E/Govt Agency' && (
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
                                            // defaultValue={setItem?.secondarybadgeId}
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
                                            // defaultValue={setItem?.secondaryName}
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
                                            // defaultValue={setItem?.secondaryRankPositionTitle}
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
                                {cType == 'L.E/Govt Agency' && (
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
                                          // defaultValue={setItem?.secondaryDepartment}
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
                                          // defaultValue={setItem?.secondaryContact}
                                          id="input-username"
                                          placeholder="Phone"
                                          onChange={text => textOnchange(text, 'secondaryContact')}
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
                                          // defaultValue={setItem?.secondaryEmail}
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

                        {cType == 'Tow Company' && (
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
                                    // defaultValue={setItem?.primaryName}
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
                                    // defaultValue={setItem?.primaryRankPositionTitle}
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
                                    // defaultValue={setItem?.primaryContact}
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
                        {cType == 'Tow Company' && (
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
                                  // defaultValue={setItem?.primaryEmail}
                                  id="input-username"
                                  placeholder="Email"
                                  type="text"
                                  onChange={text => textOnchange(text, 'primaryEmail')}
                                />
                              </FormGroup>

                            </Col>

                          </Row>
                        )}
                        {cType == 'Tow Company' && (
                          <>
                            <div onClick={() => { setShowSec(!ShowSec) }}>
                              {ShowSec ? <AiFillMinusCircle size={22} /> : <AiFillPlusCircle size={22} />}
                            </div>
                            {ShowSec && (
                              <>
                                {cType == 'Tow Company' && (
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
                                            // defaultValue={setItem?.additionalInformation}
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
                                            // defaultValue={setItem?.companyHolderName}
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
                                            // defaultValue={setItem?.companyHolderContact}
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
                                {cType == 'Tow Company' && (
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
                                          // defaultValue={setItem?.companyHolderAddress}
                                          id="input-username"
                                          placeholder="Email"
                                          type="text"
                                          onChange={text => textOnchange(text, 'secondaryEmail')}
                                        />
                                      </FormGroup>

                                    </Col>
                                    {/* <Col lg="4">
                                      <FormGroup>
                                        <label
                                          className="form-control-label"
                                          htmlFor="input-username"
                                        >
                                          Secondary Contact
                                        </label>
                                        <Input
                                          className="form-control-alternative"
                                          id="input-username"
                                          placeholder="Secondary Contact"
                                          type="text"
                                          onChange={text => textOnchange(text, 'secondaryContact')}
                                        />
                                      </FormGroup>

                                    </Col> */}

                                  </Row>
                                )}

                              </>
                            )}

                          </>
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
        <div style={{ marginTop: 50 }}>
          <Modal isOpen={adduser} toggle={() => { addUsers() }} className={props.className}>
            <ModalHeader toggle={() => { addUsers() }}>Add Users</ModalHeader>
            <ModalBody>
              You want to add User?
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => {
                // alert(allData)
                // return
                props.history.push({
                  pathname: '/admin/company-detail',
                  state: allData // your data array of objects
                })

              }}>Yes</Button>{' '}
              <Button color="secondary" onClick={() => { addUsers() }}>No</Button>
            </ModalFooter>
          </Modal>
        </div>
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

export default Company;
