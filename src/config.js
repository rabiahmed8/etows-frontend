const config = {
  month: "Month",
  week: "Week",
  seeAll: "See All",
  save: "Save",
  totalTowRequest: "Total Tow Request",
  totalUser: "Total Users",
  pageVisit: "Page visits",
  socialTraffics: "Social traffic",
  appName: "eTOWS",
  myAccount: "My Account",
  allUsers: "All Users",
  importCSV: "Import CSV",
  updateUser: "Update User",
  uploadNow: "Upload Now",
  activeUsers: "Active Users",
  allJobs: "All Service Requests",
  jobDetails: "Job Details",
  all: "All",
  active: "Active",
  pending: "Pending",
  goToLocation: "Go to Location",
  assign: "Assign",
  close: "Close",
  availableDrivers: "On Duty Drivers",
  createDispatchRequest: "Service Request",
  submit: "Submit",
  createUsers: "Create Users",
  userprofile: "User Profile",
  map: "Maps",
  dashbaord: "Dashboard",
  towRequestLocation: "Tow Request Location",
  assignJob: "Assign Job",
  Delete: "Delete User",
  govtAgency: "Agency/Company Information",
  towVehicle: "Tow Vehicle Inventory",
  CorporateDetails: "Corporate Documents",
  corpDetails: "Corporate Documents Detail",
  fleetInventory: "Fleet Inventory",
  fleet: "Fleet Vehicles",
  staff: "Staff",
  InsuranceInformation: "Insurance Information",
  TowImpoundedVehicle: "Tow/Impounded vehicle",
  police: "Police",
  byLaw: "By-Law",
  others: "Other",
  IssuedDate: "Issued Date",
  PaidDate: "Paid Date",
  Outstanding: "Outstanding",
  DataPrepopulatedDriverLE: "Data pre-populated by Tow Driver/LE",
  ByPoundAdminVehicleProperty:
    "By Pound Admin - Disposition of Vehicle/Property",
  driver: "Driver",
  Otherstaff: "Other Staff",
  contact1: "Contact1",
  contact2: "Contact2",
  leCompany: "Tow  Management Area",
  leCompanyDetail: "LE Company Detail",
  GOOGLE_MAP_API_KEY: "AIzaSyCuC0N234IJDgCJLD6pV3YHBh0NcL29Tuw",
  sRequest: {
    policeService: {
      label: { l1: "LE Related *" },
      checkCond: "indicatePolice:l1",
    },
    propertyName: {
      label: { l1: "Select Vehicle *", l2: "Select Property *" },
      ext: "Item Type ",
      checkCond: "vehicleOrProperty:l1",
    },
    ownerName: { label: { l1: "Name *" }, ext: "Owner " },
    ownerMobile: { label: { l1: "Phone Number *" }, ext: "Owner " },
    driverName: { label: { l1: "Name *" }, ext: "Driver " },
    driverMobile: { label: { l1: "Phone Number *" }, ext: "Driver " },
    vehicleName: { label: { l1: "Tow Vehicle Required *" } },
    requestType: { label: { l1: "Select Type *" } },
    startingLocation: { label: { l1: "Starting Location of Tow *" } },
    officerBadge: {
      label: { l1: "Officer Badge *" },
      checkCond: "indicatePolice:l1",
    },
    officerName: {
      label: { l1: "Officer Name *", l2: "Name *" },
      checkCond: "indicatePolice:l1",
      cext: "client ",
    },
    officerContact: {
      label: { l1: "Officer Contact *", l2: "Phone Number *" },
      checkCond: "indicatePolice:l1",
      cext: "client ",
    },
    officerDepart: {
      label: { l1: "Officer Unit/Assignment *" },
      checkCond: "indicatePolice:l1",
    },
  },
};
export default config;
