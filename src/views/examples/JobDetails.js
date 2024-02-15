import Header from "components/Headers/Header";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, FormGroup, Input, Label, Row, Table } from "reactstrap";
import Select from "react-select";
import moment from "moment";
import { getDropDownApi } from "APIstore/apiCalls";
import { errorAlert } from "Theme/utils";

const data = {
  id: 538,
  userId: "dec8674d-c3f8-4179-9dc2-e1993a16d8cb",
  indicatePolice: true,
  isMandatory: false,
  isOccurrenceNumbers: true,
  isOfficerInCharge: false,
  towJobRequestLocation: "starting location datafield test",
  questionAsked: null,
  startingMileage: 1235,
  endingMileage: 1236,
  equipmentList: [],
  equipmentListStr: "",
  onSceneInitialImages: [],
  onSceneFinalImages: [],
  policeOfficers: [],
  towTruckPersons: [],
  isOtherVehicle: false,
  loading: false,
  mandatoryDate: "2023-12-12",
  occurrenceNumbers: "additional occ #'s datafield",
  officerInCharge: "oic name datafield",
  officerInChargeBadge: "oic badge number datafield",
  otherVehicle: null,
  policeOccurrence: "2023-LE occ datafield",
  policeService: "York Regional Police",
  officerBadge: "badge # datafield",
  officerDepart: "assignment datafield",
  officerName: "Officer name datafield",
  otherCompany: "other number datafield test from info entered in Android app",
  officerContact: "officer phone number datafield",
  licensePlateNumber: "AXJZ639",
  specialInstructions: "",
  otherContact: "Test other contact info datafield",
  reasonForImpound: "CCC VIP Minimum 45 Days",
  reasonForTow: "Impaired Driving",
  releaseStatus: "Can be Released after Mandatory Seizure/Hold Period",
  requestType: "Tow and Impound/Storage",
  requestStatus: "Pending",
  roadService: "",
  step: "538",
  sent: true,
  towOrImpoundDate: "2023-12-12",
  vehicleType: "Light Tow/Duty tilt and load tow truck.",
  vehicle: "Car",
  vin: "19uua66285a804804",
  vinBasicData: {
    doors: 4,
    driveType: "FWD",
    trim: "",
    year: 2005,
    oemDoors: 4,
    rearAxle: "",
    bodyType: "Sedan",
    vehicleType: "Car",
    model: "TL",
    oemBodyStyle: "Sedan",
    make: "Acura",
    bodySubtype: "",
    response: null,
  },
  jurisdiction: null,
  status: "Complete",
  requestlongitude: null,
  requestlatitude: null,
  vehicleOrProperty: "Vehicle",
  property: "",
  specialTask: "Liquid/Oil Clean Up Required",
  specialComments: "Test absorbent ",
  comments: "test datafield from Android app ",
  startingLocation: "starting location datafield test",
  finishingLocation: "ending location datafield test",
  startDate: "2023-12-12T14:44:26.25",
  endDate: "2024-01-26T19:44:00",
  isRelease: false,
  registeredOwnerNotified: false,
  registeredOwnerComments: null,
  finalComments: null,
  heldPurpose:
    "Criminal Proceedings – Homicide, Fatal Collision, Major Project, etc",
  propertyForfiet: "Forfeiture datafield test",
  propertyForfietDetails: "",
  notifyOwner: null,
  notifyOwnerName: null,
  notifyOwnerEmail: null,
  notifyContact: null,
  notifiedBy: null,
  isSpecialInstructions: false,
  isSelfGenerated: false,
  driverName: "Driver First Name Surname",
  driverMobile: "driver phone number",
  driverAddress: "Driver address datafield",
  driverEmail: "driver email datafield",
  ownerName: "Vehicle Owner First name Surname",
  ownerMobile: "Vehicle owner phone number datafield",
  ownerAddress: "12 Springwood Ct, Barrie, ON L4N 5V1, Canada",
  ownerEmail: "Vehicle Owner email datafield",
  lienName: "Test Lien Hold First Name Last Name",
  lienMobile: "123-456-7890 Ext Lien Holder",
  lienAddress: "1lien holder way address datafield",
  lienEmail: "lienholder@email.com",
  companyId: 49,
  testStatus: null,
  userUrl:
    "https://stage-api.etows.app:8443/user/userinfo?userId=dec8674d-c3f8-4179-9dc2-e1993a16d8cb",
  createdAt: "2023-12-12T15:02:05.722021",
  updatedAt: "2023-12-12T15:51:56.362609",
  response: null,
};

const JobDetails = (props) => {
  const [openViewImageModal, setViewImageModal] = useState(false);
  const [imageData, setDataImage] = useState();
  const [heldForOthersVal, setHeldForOthers] = useState(data?.heldPurpose);
  const [propertyForfietVal, setPropertyForfiet] = useState(
    data?.propertyForfiet
  );
  const [propertyForfietDetails, setPropertyForfietDetails] = useState(
    data?.propertyForfietDetails
  );
  const [notifyOwner, setNotifyOwner] = useState(data?.notifyOwner);
  const [notifyOwnerName, setNotifyOwnerName] = useState(data?.notifyOwnerName);
  const [notifyOwnerEmail, setNotifyOwnerEmail] = useState(
    data?.notifyOwnerEmail
  );
  const [notifyContact, setNotifyContact] = useState(data?.notifyContact);
  const [notifiedBy, setNotifiedBy] = useState(data?.notifiedBy);
  const [showheldForOthers, setShowHeldForOthers] = useState("");
  const [showPropertyForfiet, setShowPropertyForfiet] = useState("");
  const [dataDropdown, setDropdown] = useState();

  useEffect(() => {
    try {
      getDropDownApi("", async (res) => {
        if (res.sucess) {
          setDropdown(res.sucess);
        } else {
          // errorAlert('Something went wrong');
        }
      });
    } catch (error) {
      errorAlert(error);
    }
  }, []);

  const ViewImage = (item) => {
    setDataImage(item);
    setViewImageModal(!openViewImageModal);
  };

  const renderList = (selectedArray) => {
    return selectedArray?.map((data) => ({
      label: data?.field1,
      value: data?.id,
    }));
  };

  let { id } = useParams();
  const receiptPicture = null;
  const vehiclePicture = null;
  const inventoryAndDamagePicture = null;

  console.log(":", id);
  return (
    <div>
      <Header />
      <div
        style={{
          padding: "20px 40px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "260px",
            margin: "11px 55px",
            fontSize: "x-large",
            fontWeight: "bolder",
            color: "green",
          }}
        >
          <div>Job Id: {data?.id}</div>
          <Button color="primary">Update Job</Button>
        </div>

        {/* <div
          style={{
            padding: "30px 15px",
          }}
        >
          Basic Info
        </div> */}

        <div className="table-flex">
          <div className="table-card">
            <Table borderless hover>
              <thead>
                <tr>
                  <th className="table-heading">Law Enforcement Tow</th>
                  {/* <th>Update Job</th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Mandatory Date:</th>
                  <td>{data?.mandatoryDate} </td>
                </tr>

                <tr>
                  <th scope="row">Service Request Date:</th>
                  <td>
                    {moment(data?.towOrImpoundDate).format("MMMM Do YYYY")}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Service Status</th>
                  <td>
                    {data?.status === "LE Request" ? "Pending" : data?.status}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Service Request Location:</th>
                  <td>{data?.towJobRequestLocation}</td>
                </tr>
                <tr>
                  <th scope="row">Service Status</th>
                  <td>
                    {data?.status === "LE Request" ? "Pending" : data?.status}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div className="table-card">
            <Table borderless hover>
              <thead>
                <tr>
                  <th className="table-heading">Basic Info</th>
                  {/* <th>Update Job</th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Starting Mileage:</th>
                  <td>{data?.startingMileage}</td>
                </tr>
                <tr>
                  <th scope="row">Ending Mileage:</th>
                  <td>{data?.endingMileage}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default JobDetails;
