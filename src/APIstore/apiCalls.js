import { Constants } from "../Environment";

const axios = require("axios");

const postRequest = async (api, paylaod, myCallback) => {
  const token = await localStorage.getItem("token");
  const constApiLink = `${Constants.apiUrl}/${api}`;
  let options = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  axios({
    method: "post",
    url: constApiLink,
    data: paylaod,
    headers: options,
  })
    .then((response) => {
      myCallback({ sucess: response.data });
    })
    .catch((error) => {
      const res = error.response.data;
      let message = "";
      if (res.non_field_errors) {
        message = res.non_field_errors[0];
      } else {
        for (const [key, value] of Object.entries(res)) {
          message = message + `${key} : ${JSON.stringify(value)} `;
        }
      }
      myCallback({ error: message });
    });
};
const postRequestStatic = async (api, paylaod, myCallback) => {
  const constApiLink = `${Constants.authUrl}/${api}`;
  const token = await localStorage.getItem("token");
  console.log("url =>", constApiLink);
  let options = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  axios({
    method: "post",
    url: constApiLink,
    data: paylaod,
    headers: options,
  })
    .then((response) => {
      myCallback({ sucess: response.data });
    })
    .catch((error) => {
      const res = error.response.data;
      let message = "";
      if (res.non_field_errors) {
        message = res.non_field_errors[0];
      } else {
        for (const [key, value] of Object.entries(res)) {
          message = message + `${key} : ${JSON.stringify(value)} `;
        }
      }
      myCallback({ error: message });
    });
};
const putRequest = async (api, paylaod, myCallback) => {
  const constApiLink = `${Constants.apiUrl}/${api}`;
  const token = await localStorage.getItem("token");
  console.log("url =>", constApiLink);
  let options = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token != "") {
    options = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  axios({
    url: constApiLink,
    method: "put",
    data: paylaod,
    headers: options,
  })
    .then((response) => {
      myCallback({ sucess: response.data });
    })
    .catch((error) => {
      const res = error.response.data;
      console.log(res);
      let message = "";
      if (res.non_field_errors) {
        message = res.non_field_errors[0];
      } else {
        for (const [key, value] of Object.entries(res)) {
          message = message + `${key} : ${JSON.stringify(value)} `;
        }
      }
      myCallback({ error: message });
    });
};

const postUploadRequest = async (api, paylaod, myCallback) => {
  const token = await localStorage.getItem("token");
  const constApiLink = `${Constants.apiUrl}/${api}`;
  console.log("url =>", constApiLink);

  let options = {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };
  axios({
    url: constApiLink,
    method: "POST",
    data: paylaod,
    headers: options,
  })
    .then((response) => {
      myCallback({ sucess: response.data });
    })
    .catch((error) => {
      const res = error.response.data;
      let message = "";
      if (res.non_field_errors) {
        message = res.non_field_errors[0];
      } else {
        for (const [key, value] of Object.entries(res)) {
          message = message + `${key} : ${JSON.stringify(value)} `;
        }
      }
      myCallback({ error: message });
    });
};
const uploadRequest = (api, paylaod, myCallback, token = "") => {
  const constApiLink = `${Constants.apiUrl}/${api}`;
  console.log("url =>", constApiLink);
  let options = {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  };

  if (token != "") {
    options = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  axios({
    url: constApiLink,
    method: "POST",
    data: paylaod,
    headers: options,
  })
    .then((response) => {
      myCallback({ sucess: response.data });
    })
    .catch((error) => {
      const res = error.response.data;

      let message = "";
      if (res.non_field_errors) {
        message = res.non_field_errors[0];
      } else {
        for (const [key, value] of Object.entries(res)) {
          message = message + `${key} : ${JSON.stringify(value)} `;
        }
      }
      myCallback({ error: message });
    });
};

const deleteRequest = async (api, myCallback) => {
  const constApiLink = `${Constants.apiUrl}/${api}`;
  const token = await localStorage.getItem("token");
  console.log("url =>", constApiLink);
  let options = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token != "") {
    options = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  axios({
    url: constApiLink,
    method: "DELETE",
    headers: options,
  })
    .then((response) => {
      myCallback({ sucess: response.data });
    })
    .catch((error) => {
      const res = error.response.data;

      let message = "";
      if (res.non_field_errors) {
        message = res.non_field_errors[0];
      } else {
        for (const [key, value] of Object.entries(res)) {
          message = message + `${key} : ${JSON.stringify(value)} `;
        }
      }
      myCallback({ error: message });
    });
};

const getRequest = async (api, myCallback) => {
  const token = await localStorage.getItem("token");
  const constApiLink = `${Constants.apiUrl}/${api}`;
  console.log("getReq", constApiLink);

  let options = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  axios({
    url: constApiLink,
    method: "GET",
    headers: options,
  })
    .then((response) => {
      console.log("response___", response);

      myCallback({ sucess: response.data });
    })
    .catch((error) => {
      console.log("error___", error);

      const res = error.response.data;

      let message = "";
      if (res.non_field_errors) {
        message = res.non_field_errors[0];
      } else {
        for (const [key, value] of Object.entries(res)) {
          message = message + `${key} : ${JSON.stringify(value)} `;
        }
      }
      myCallback({ error: message });
    });
};
const getRequestStatic = async (api, myCallback) => {
  const constApiLink = `${Constants.authUrl}/${api}`;
  const token = await localStorage.getItem("token");

  let options = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  axios({
    url: constApiLink,
    method: "GET",
    headers: options,
  })
    .then((response) => {
      myCallback({ sucess: response.data });
    })
    .catch((error) => {
      const res = error.response.data;

      let message = "";
      if (res.non_field_errors) {
        message = res.non_field_errors[0];
      } else {
        for (const [key, value] of Object.entries(res)) {
          message = message + `${key} : ${JSON.stringify(value)} `;
        }
      }
      myCallback({ error: message });
    });
};

const getApiByUrl = async (api, myCallback) => {
  const constApiLink = api;
  const token = await localStorage.getItem("token");
  console.log("constApiLink", constApiLink);

  let options = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  axios({
    url: constApiLink,
    method: "GET",
    headers: options,
  })
    .then((response) => {
      myCallback({ sucess: response.data });
    })
    .catch((error) => {
      console.log("eee", error);
      const res = error.response.data;

      let message = "";
      if (res.non_field_errors) {
        message = res.non_field_errors[0];
      } else {
        for (const [key, value] of Object.entries(res)) {
          message = message + `${key} : ${JSON.stringify(value)} `;
        }
      }
      myCallback({ error: message });
    });
};
const getApiByUrlForUpload = async (api, myCallback) => {
  const constApiLink = api;
  const token = await localStorage.getItem("token");
  console.log("constApiLink", constApiLink);
  let options = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  axios({
    url: constApiLink,
    method: "GET",
    headers: options,
    responseType: "blob",
  })
    .then((response) => {
      myCallback({ sucess: response.data });
    })
    .catch((error) => {
      const res = error.response.data;

      let message = "";
      if (res.non_field_errors) {
        message = res.non_field_errors[0];
      } else {
        for (const [key, value] of Object.entries(res)) {
          message = message + `${key} : ${JSON.stringify(value)} `;
        }
      }
      myCallback({ error: message });
    });
};

export const AllUsersApi = (payload, myCallback) => {
  getRequestStatic("user/userinfo-list-by-type/driver", myCallback);
};
export const AddDeviceToken = (payload, myCallback) => {
  postRequest("notification/device/add-device", payload, myCallback);
};
export const GetAllUsersApi = (payload, myCallback) => {
  getRequestStatic("user/userinfo-list?isAdmin=true", myCallback);
};
export const AllUsersTowAdminApi = (payload, myCallback) => {
  getRequestStatic("user/userinfo-list-by-type/TOD_ADMIN", myCallback);
};
export const AllUsersByType = (payload, myCallback) => {
  getRequestStatic(`user/userinfo-list-by-type/${payload}`, myCallback);
};
export const ActiveUserApi = (payload, myCallback) => {
  getRequestStatic(`user/userinfo-list?companyId=${payload}`, myCallback);
};
export const CheckEnabledDisabled = (paylaod, myCallback) => {
  getRequestStatic(
    `user/userinfo-list-by-enabled?enabled=${paylaod}`,
    myCallback
  );
};
export const getLoggedinApi = (payload, myCallback) => {
  getRequestStatic("user/userinfo", myCallback);
};
export const AllJobsApi = (payload, myCallback) => {
  getRequest(
    "tow-admin/tow-job-requests" +
      (payload === "" ? "" : "?companyId=" + payload),
    myCallback
  );
};
export const AvailableDriversApi = (payload, myCallback) => {
  getRequest("tow-admin/available-users?active=1", myCallback);
};
export const JobRequestByStatusApi = (payload, myCallback) => {
  getRequest(`tow-admin/tow-job-requests-by-status/${payload}`, myCallback);
};
export const JobRequestByIDApi = (payload, myCallback) => {
  getRequest("tow-admin/tow-job-request/161", myCallback);
};
export const getLocationDriver = (payload, myCallback) => {
  getRequest(
    `geolocation/user-location-by-params?userId=${payload}`,
    myCallback
  );
};
export const GetUserTowResquestApi = (payload, myCallback) => {
  getRequest("tow/tow-job-requests", myCallback);
};
export const GetUserTowResquestByStatusApi = (payload, myCallback) => {
  getRequest("tow/tow-job-requests-by-status/Pending", myCallback);
};
export const GetUserTowResquestByIDApi = (payload, myCallback) => {
  getRequest("tow/tow-job-request/170", myCallback);
};
export const JobFormDataApi = (payload, myCallback) => {
  getRequest("tow/job-form-data", myCallback);
};
export const AvailableFleets = (myCallback) => {
  getRequest("tow/shift/available-fleets", myCallback);
};
export const getFleetTypes = (myCallback) => {
  getRequest("agencies/fleetTypes", myCallback);
};
export const TowFormDataApi = (payload, myCallback) => {
  getRequest("tow/job-form-data", myCallback);
};
export const getCSVApi = (payload, myCallback) => {
  getRequest("file/public/csv/users-template.csv", myCallback);
};

export const getDropDownApi = (payload, myCallback) => {
  getRequest("tow/job-form-data", myCallback);
};
export const ChangeJobStatusApi = (payload, myCallback) => {
  postRequest("tow-admin/update-job-request-status", payload, myCallback);
};
export const AssignJobApi = (payload, myCallback) => {
  postRequest("tow-admin/assign-job-request", payload, myCallback);
};
export const UpdateUserInfoApi = (payload, myCallback) => {
  postRequestStatic("user/userinfo-update", payload, myCallback);
};
export const UserTowJobReqUpdateApi = (payload, myCallback) => {
  postRequest("tow/tow-job-request-update", payload, myCallback);
};
export const UserNotInListApi = (payload, myCallback) => {
  postRequestStatic(
    "user/userinfo-list-ids-not-in?enabled=true&userType=driver",
    payload,
    myCallback
  );
};
export const CreateUsersApi = (payload, myCallback) => {
  postRequestStatic("user/create-user", payload, myCallback);
};
export const CreateUsersApiCompany = (payload, myCallback) => {
  postRequestStatic("user/create-user?isAdmin=true", payload, myCallback);
};
export const UpdateUsersApi = (payload, myCallback) => {
  postRequestStatic("user/userinfoUpdate", payload, myCallback);
};
export const deleteUser = (payload, myCallback) => {
  postRequestStatic("user/delete-users", payload, myCallback);
};
export const disableUser = (payload, bol, myCallback) => {
  postRequestStatic(`user/disable-users/${bol}`, [payload.id], myCallback);
};
export const DispatchUserRequest = (payload, myCallback) => {
  postRequest("tow-admin/tow-job-request", payload, myCallback);
};
export const DispatchUserRequestUpdate = (payload, myCallback) => {
  postRequest("tow-admin/tow-job-request-update", payload, myCallback);
};
export const UploadCsvApi = (payload, myCallback) => {
  postUploadRequest("user/import-users", payload, myCallback);
};
export const SaveAgencies = (payload, myCallback) => {
  postRequest("agencies/save-agencies", payload, myCallback);
};
export const UpdateAgencies = (payload, myCallback) => {
  postRequest("agencies/update-agencies", payload, myCallback);
};
export const getAgencies = (payload, myCallback) => {
  getRequest("agencies/get-agencies", myCallback);
};
export const getAgenciesType = (payload, myCallback) => {
  getRequest(`agencies/get-agencies-by-agencyType/${payload}`, myCallback);
};
export const getVehicles = (payload, myCallback) => {
  getRequest("vehicle/get-vehicles", myCallback);
};
export const getVehiclesType = (payload, myCallback) => {
  getRequest("vehicle/get-vehicle-types", myCallback);
};
export const getVinData = (payload, myCallback) => {
  getRequest(`lien-info/vin/search?vinId=${payload}`, myCallback);
};

export const getVehiclesbyType = (payload, myCallback) => {
  getRequest(`vehicle/get-vehicles-by-vehicleType/${payload}`, myCallback);
};
export const getUploadData = (payload, myCallback) => {
  getRequest(
    `file/files?id=${payload.id}&fileType=${payload.type}`,
    myCallback
  );
};
export const getImagesData = (payload, myCallback) => {
  getRequest(
    `tow/image/images?id=${payload.id}&fileType=${payload.type}`,
    myCallback
  );
};

export const SaveVehicles = (payload, myCallback) => {
  postRequest("vehicle/save-vehicles", payload, myCallback);
};
export const UpdateVehicles = (payload, myCallback) => {
  postRequest("vehicle/update-vehicles", payload, myCallback);
};
export const UpdatePassword = (payload, myCallback) => {
  postRequestStatic("user/userpasswd-update", payload, myCallback);
};
export const companyList = (payload, myCallback) => {
  getRequestStatic(`user/userinfo-list?companyId=${payload}`, myCallback);
};
export const UpdateUserPassword = (payload, myCallback) => {
  postRequestStatic("user/userpassword-update", payload, myCallback);
};

export const AllStaffApi = (payload, myCallback) => {
  getRequestStatic("user/userinfo-list-by-type/staff", myCallback);
};
export const getGroups = (payload, myCallback) => {
  getRequestStatic("group/user-groups", myCallback);
};
export const getAllLogs = (payload, myCallback) => {
  getRequestStatic("logs/all", myCallback);
};
export const getLogsRoles = (payload, myCallback) => {
  getRequestStatic(`logs/all?role=${payload}`, myCallback);
};
export const getUserData = (payload, myCallback) => {
  getRequestStatic(`user/userinfo?userId=${payload}`, myCallback);
};

export const AddCompany = (payload, myCallback) => {
  postRequest("company/add-all", payload, myCallback);
};
export const UpdateCompany = (payload, myCallback) => {
  postRequest("company/update-all", payload, myCallback);
};
export const DeleteCompany = (payload, myCallback) => {
  deleteRequest(`company/single/${payload}`, myCallback);
};

export const getAllCompany = (payload, myCallback) => {
  getRequest("company/all", myCallback);
};
//Younis Update
export const getAllTowCompany = (payload, myCallback) => {
  getRequest("company/all?type=Tow%20Company", myCallback);
};
export const assignCompany = (id, payload, myCallback) => {
  postRequest(
    `company/assign-company/all?companyId=${id}`,
    payload,
    myCallback
  );
};
export const getAssignCompany = (id, myCallback) => {
  getRequest(`company/assign-company/all?companyId=${id}`, myCallback);
};
export const assignedCompany = (payload, myCallback) => {
  postRequest(`company/assign-company/all`, payload, myCallback);
};
//End Younis Update
export const getAllAssignedTowCompany = (payload, myCallback) => {
  getRequest("company/assign-company/all", myCallback);
};
export const UpdateTowCompany = (payload, myCallback) => {
  putRequest("company/assign-company/all", payload, myCallback);
};
export const getSingleCompany = (payload, myCallback) => {
  getRequest(`company/single/${payload}`, myCallback);
};

export const getCourtProceedings = (payload, myCallback) => {
  getRequest(`court-proceeding/all`, myCallback);
};
export const addCourtProceedings = (payload, myCallback) => {
  postRequest("court-proceeding/add-all", payload, myCallback);
};
export const updateCourtProceedings = (payload, myCallback) => {
  postRequest("court-proceeding//update-all", payload, myCallback);
};
export const deleteCourtProceedings = (payload, myCallback) => {
  deleteRequest(`court-proceeding/single/${payload}`, myCallback);
};
export const deleteJurisdiction = (payload, myCallback) => {
  deleteRequest(`company/jurisdiction/single/${payload}`, myCallback);
};

export const getJurisdictionAll = (payload, myCallback) => {
  getRequest(`company/jurisdiction/all`, myCallback);
};

export const addJurisdiction = (payload, myCallback) => {
  postRequest("company/jurisdiction/add-all", payload, myCallback);
};
export const updateJurisdiction = (payload, myCallback) => {
  postRequest("company/jurisdiction/update-all", payload, myCallback);
};
export const addCompanyJurisdiction = (id, payload, myCallback) => {
  postRequest(
    `company/jurisdiction/company-jurisdiction/add-all?companyId=${id}`,
    payload,
    myCallback
  );
};
export const updateCompanyJurisdiction = (id, payload, myCallback) => {
  postRequest(
    `company/jurisdiction/company-jurisdiction/update-all?companyId=${id}`,
    payload,
    myCallback
  );
};
// export const getCompanyJurisdictionAll = (payload, myCallback) => {
//   getRequest(`company/jurisdiction/company-jurisdiction/single/${payload}`, myCallback);
// };
export const getCompanyJurisdictionAll = (payload, myCallback) => {
  getRequest(
    `company/jurisdiction/company-jurisdiction/all?companyId=${payload}`,
    myCallback
  );
};

export const getUserJurisdictionAll = (payload, myCallback) => {
  getRequest(
    `company/jurisdiction/user-jurisdiction/all?userId=${payload}`,
    myCallback
  );
};

export const addUserJurisdiction = (id, payload, myCallback) => {
  postRequest(
    `company/jurisdiction/user-jurisdiction/add-all?userId=${id}`,
    payload,
    myCallback
  );
};
export const updateUserJurisdiction = (payload, myCallback) => {
  postRequest(
    "company/jurisdiction/user-jurisdiction/update-all",
    payload,
    myCallback
  );
};

export const getUserDatabyUrl = (payload, myCallback) => {
  getApiByUrl(payload, myCallback);
};
export const getUploadDatabyUrl = (payload, myCallback) => {
  getApiByUrlForUpload(payload, myCallback);
};

//GOVT-AGENCY

export const singleSaveAgency = (payload, myCallback) => {
  postRequest("agencies/single", payload, myCallback);
};
export const singleUpdateAgency = (payload, myCallback) => {
  putRequest("agencies/single", payload, myCallback);
};
export const singleAllAgency = (payload, myCallback) => {
  getRequest("agencies/all", myCallback);
};
export const singleGetAgency = (payload, myCallback) => {
  getRequest(`agencies/single?id=${payload}`, myCallback);
};
export const singleDeleteAgency = (payload, myCallback) => {
  deleteRequest(`agencies/single?id=${payload}`, myCallback);
};

//Corporate

export const singleSaveCorporate = (payload, myCallback) => {
  postRequest("agencies/corporate-details/single", payload, myCallback);
};
export const singleUpdateCorporate = (payload, myCallback) => {
  putRequest("agencies/corporate-details/single", payload, myCallback);
};
export const singleAllCorporate = (payload, myCallback) => {
  console.log("myCallback___", myCallback);

  payload != null && payload != undefined && payload != ""
    ? getRequest(
        `agencies/corporate-details/all?type=fleet&companyId=${payload}`,
        myCallback
      )
    : getRequest(`agencies/corporate-details/all?type=fleet`, myCallback);
};
export const singleGetCorporate = (payload, myCallback) => {
  getRequest(`agencies/corporate-details/single?id=${payload}`, myCallback);
};
export const singleDeleteCorporate = (payload, myCallback) => {
  deleteRequest(`agencies/corporate-details/single?id=${payload}`, myCallback);
};

//UPLOAD FILES

export const UploadContractsApi = (payload, myCallback) => {
  postUploadRequest("file/upload", payload, myCallback);
};
export const UploadUpdateContractsApi = (payload, myCallback) => {
  postUploadRequest("file/upload", payload, myCallback);
};
export const UploadGetContractsApi = (payload, myCallback) => {
  payload.comId
    ? getRequest(
        `file/all?refId=${payload.id}&subType=${payload.subType}&type=${payload.type}&companyId=${payload.comId}`,
        myCallback
      )
    : getRequest(
        `file/all?refId=${payload.id}&subType=${payload.subType}&type=${payload.type}`,
        myCallback
      );
};
export const singleDeleteFile = (payload, myCallback) => {
  deleteRequest(
    `file/single?id=${payload.id}&filename=${payload.name}`,
    myCallback
  );
};
export const getOnDutyDrivers = (payload, myCallback) => {
  getRequest(
    payload
      ? `tow-admin/on-duty-users?companyId=${payload}`
      : "tow-admin/on-duty-users",
    myCallback
  );
};
export const getDashboard = (payload, myCallback) => {
  getRequest(`tow-admin/dashboard`, myCallback);
};
export const getOndutyLocations = (payload, myCallback) => {
  getRequest(
    "geolocation/users-locations" +
      (payload == "" ||
      payload == "0" ||
      payload == undefined ||
      payload == null
        ? ""
        : "?companyId=" + payload),
    myCallback
  );
};
// 4S3BJ6332P6953766
