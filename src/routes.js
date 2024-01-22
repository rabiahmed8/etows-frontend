import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import AllUsers from "views/examples/AllUsers.js";
import ActiveUsers from "views/examples/ActiveUsers.js";
import AllJobs from "views/examples/AllJobs.js";
import AvailableDrivers from "views/examples/AvailableDrivers.js";
import AddRequest from "views/examples/AddRequest.js";
import CreateUsers from "views/examples/CreateUsers.js";
import GovtAgencyContacts from "views/examples/ManagmentArea/GovtAgencyContacts.js";
import InsuranceInformation from "views/examples/ManagmentArea/InsuranceInformation.js";
import Staff from "views/examples/ManagmentArea/Staff.js";
import OtherStaff from "views/examples/ManagmentArea/OtherStaff.js";
import corporateDetails from "views/examples/ManagmentArea/corporateDetails.js";
import TowImpounded from "views/examples/ManagmentArea/TowImpounded.js";
import config from "config";
import Company from "views/examples/Company";
import Logs from "views/examples/Logs";
import CompanyDetail from "views/examples/CompanyDetail";
import CourtProceedings from "views/examples/CourtProceedings";
import Jurisdiction from "views/examples/Jurisdiction";
import Fleet from "views/examples/ManagmentArea/Fleet";
import GovtAgencyDetail from "views/examples/GovtAgencyDetail";
import CorpDetail from "views/examples/CorpDetail";
import FleetDetail from "views/examples/FleetDetail";
import InsuranceInfo from "views/examples/InsuranceInfo";
// import Icons from "views/examples/Icons.js";

var routes = [
  {
    path: "/create-dispatch-request",
    name: config.createDispatchRequest,
    icon: "ni ni-single-02 text-yellow",
    component: AddRequest,
    layout: "/admin"
  },
  {
    path: "/jurisdiction",
    name: 'Jurisdiction',
    icon: "ni ni-single-02 text-yellow",
    component: Jurisdiction,
    layout: "/admin"
  },
  {
    path: "/court-proceeding",
    name: 'Court Proceedings',
    icon: "ni ni-single-02 text-yellow",
    component: CourtProceedings,
    layout: "/admin"
  },
  {
    path: "/company-detail",
    name: '',
    icon: "ni ni-single-02 text-yellow",
    component: CompanyDetail,
    layout: "/admin"
  },
  {
    path: "/agency-detail",
    name: '',
    icon: "ni ni-single-02 text-yellow",
    component: GovtAgencyDetail,
    layout: "/admin"
  },
  {
    path: "/fleet-detail",
    name: '',
    icon: "ni ni-single-02 text-yellow",
    component: FleetDetail,
    layout: "/admin"
  },
  {
    path: "/insurance-detail",
    name: '',
    icon: "ni ni-single-02 text-yellow",
    component: InsuranceInfo,
    layout: "/admin"
  },
  {
    path: "/company",
    name: 'Company',
    icon: "ni ni-single-02 text-yellow",
    component: Company,
    layout: "/admin"
  },
  {
    path: "/logs",
    name: 'Logs',
    icon: "ni ni-single-02 text-yellow",
    component: Logs,
    layout: "/admin"
  },
  {
    path: "/index",
    name: config.dashbaord,
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/govt-agency",
    name: config.govtAgency,
    icon: "ni ni-tv-2 text-primary",
    component: GovtAgencyContacts,
    layout: "/admin"
  },
  {
    path: "/corporate-documents",
    name: config.CorporateDetails,
    icon: "ni ni-tv-2 text-primary",
    component: corporateDetails,
    layout: "/admin"
  },
  {
    path: "/corp-documents-detail",
    name: config.CorporateDetails,
    icon: "ni ni-tv-2 text-primary",
    component: CorpDetail,
    layout: "/admin"
  },
  {
    path: "/fleet",
    name: config.fleet,
    icon: "ni ni-tv-2 text-primary",
    component: Fleet,
    layout: "/admin"
  },
  {
    path: "/driver-detail",
    name: config.driver,
    icon: "ni ni-tv-2 text-primary",
    component: Staff,
    layout: "/admin"
  },
  {
    path: "/other-staff",
    name: config.Otherstaff,
    icon: "ni ni-tv-2 text-primary",
    component: OtherStaff,
    layout: "/admin"
  },
  {
    path: "/insurance-information",
    name: config.InsuranceInformation,
    icon: "ni ni-tv-2 text-primary",
    component: InsuranceInformation,
    layout: "/admin"
  },
  {
    path: "/impounded-vehicle",
    name: config.TowImpoundedVehicle,
    icon: "ni ni-tv-2 text-primary",
    component: TowImpounded,
    layout: "/admin"
  },

  {
    path: "/maps",
    name: config.map,
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: config.userprofile,
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },

  {
    path: "/allusers",
    name: config.allUsers,
    icon: "ni ni-bullet-list-67 text-red",
    component: AllUsers,
    layout: "/admin"
  },
  {
    path: "/activeusers",
    name: config.activeUsers,
    icon: "ni ni-bullet-list-67 text-red",
    component: ActiveUsers,
    layout: "/admin"
  },
  {
    path: "/alljobs",
    name: config.allJobs,
    icon: "ni ni-bullet-list-67 text-red",
    component: AllJobs,
    layout: "/admin"
  },
  {
    path: "/availabledrivers",
    name: config.availableDrivers,
    icon: "ni ni-bullet-list-67 text-red",
    component: AvailableDrivers,
    layout: "/admin"
  },

  {
    path: "/create-user",
    name: config.createUsers,
    icon: "ni ni-single-02 text-yellow",
    component: CreateUsers,
    layout: "/admin"
  },
  {
    tag: "DropdownMenu",
    path: "/notifications",
    name: "Admin",
    rtlName: "إخطارات",
    icon: "tim-icons fas fa-user-shield",
    component: CreateUsers,
    layout: "/admin",
    children: [
      {
        _tag: "DropdownItem",
        path: "/notifications",
        name: "User Manange",
        rtlName: "إخطارات",
        icon: "tim-icons fas fa-user-shield",
        component: CreateUsers,
        layout: "/admin",
      },
    ],
  },
];
export default routes;
