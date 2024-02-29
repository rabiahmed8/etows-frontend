import Header from "components/Headers/Header";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, FormGroup, Input, Label, Row, Table } from "reactstrap";
import Select from "react-select";
import moment from "moment";
import { getDropDownApi } from "APIstore/apiCalls";
import { errorAlert } from "Theme/utils";
import { getJobDetails } from "APIstore/apiCalls";
import { getImagesData } from "APIstore/apiCalls";
import ViewImageModal from "component/ViewImageModal";
import { Constants } from "Environment";
import image_placeholder from "assets/img/icons/img.png";

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

const JobDetails = () => {
  let { id } = useParams();
  console.log(":", id);

  const [openViewImageModal, setViewImageModal] = useState(false);
  const [data, setData] = useState({});

  const [imageData, setDataImage] = useState();
  const [vehiclePicture, setVehiclePicture] = useState([]);
  const [inventoryAndDamagePicture, setInventoryAndDamagePicture] = useState(
    []
  );
  const [receiptPicture, setReceiptPicture] = useState([]);

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
    dropDownData();
    getData();
  }, []);

  const dropDownData = () => {
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
  };
  const getData = () => {
    try {
      getJobDetails(id, async (res) => {
        if (res.sucess) {
          console.log(res.sucess);
          let item = res.sucess;
          console.log("item id: " + item.id);

          loadImages(item?.id, "vehiclePicture");
          loadImages(item?.id, "inventoryAndDamagePicture");
          loadImages(item?.id, "receiptPicture");

          console.log("item", item);
          setNotifyOwner(item?.notifyOwner ? item.notifyOwner : false);
          setNotifyOwnerName(item?.notifyOwnerName);
          setNotifyContact(item?.notifyContact);
          setNotifyOwnerEmail(item?.notifyOwnerEmail);
          setNotifiedBy(item?.notifiedBy);
          setData(item);

          setHeldForOthers(item?.heldPurpose);
          setPropertyForfiet(item?.propertyForfiet);
        } else {
          console.log("errrrr");
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const loadImages = (jobId, type) => {
    const obj = {
      type: type,
      id: jobId,
    };
    try {
      if (type == "vehiclePicture") setVehiclePicture([]);
      else if (type == "inventoryAndDamagePicture")
        setInventoryAndDamagePicture([]);
      else if (type == "receiptPicture") setReceiptPicture([]);

      getImagesData(obj, async (res) => {
        if (res.sucess) {
          var list = res.sucess.list;
          console.log("res", res.sucess);
          if (type == "vehiclePicture") {
            setVehiclePicture(list != null ? list : []);
          } else if (type == "inventoryAndDamagePicture") {
            setInventoryAndDamagePicture(list != null ? list : []);
          } else if (type == "receiptPicture") {
            setReceiptPicture(list != null ? list : []);
          }
        } else {
          console.log("errrrr");
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };

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

        {/* <div className="table-flex"> */}
        <Row className="stretch">
          <Col md={6}>
            <div className="table-card">
              <Table borderless hover className={"one-col"}>
                <thead>
                  <tr>
                    <th className="table-heading">Law Enforcement Tow</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Job Id: </th>
                    <td>{data?.id} </td>
                  </tr>
                  <tr>
                    <th scope="row">Company Id: </th>
                    <td>{data?.companyId} </td>
                  </tr>

                  <tr>
                    <th scope="row">Other Number (Call #/Club #/PO #):</th>
                    <td>{data?.otherCompany}</td>
                  </tr>
                  <tr>
                    <th scope="row">UserId: </th>
                    <td>{data?.userId} </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
          <Col md={6}>
            <div className="table-card">
              <Table borderless hover className={"one-col"}>
                <thead>
                  <tr>
                    <th className="table-heading">Service Request Details</th>
                    {/* <th>Update Job</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Service Request Date:</th>
                    <td>
                      {moment(data?.towOrImpoundDate).format("MMMM Do YYYY")}
                    </td>
                  </tr>
                  {data?.requestType == "Tow and Impound/Storage" && (
                    <tr>
                      <th scope="row">Reason For Impound</th>
                      <td>{data?.reasonForImpound}</td>
                    </tr>
                  )}
                  {(data?.requestType?.toUpperCase() ==
                    "Tow and Impound/Storage".toUpperCase() ||
                    data?.requestType?.toUpperCase() ==
                      "Tow only".toUpperCase()) && (
                    <tr>
                      <th scope="row">Reason For Tow</th>
                      <td>{data?.reasonForTow}</td>
                    </tr>
                  )}
                  <tr>
                    <th scope="row">Request Type</th>
                    <td>{data?.requestType}</td>
                  </tr>
                  <tr>
                    <th scope="row">Service Status</th>
                    <td>
                      {data?.status == "LE Request" ? "Pending" : data?.status}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Held Purpose:</th>
                    <td>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <Label for="exampleSelect">
                              {heldForOthersVal}
                            </Label>
                            <Select
                              name="form-field-name"
                              // onChange={(val) => { setReasonforTow(val.label) }}
                              onChange={(val) => {
                                setHeldForOthers(val.label);
                                if (
                                  val.label == "Other" ||
                                  val.label == "Other - Manual Entry"
                                ) {
                                  setShowHeldForOthers(true);
                                } else {
                                  setShowHeldForOthers(false);
                                }
                              }}
                              labelKey="name"
                              options={renderList(
                                dataDropdown?.heldPurposeList
                              )}
                            />
                          </FormGroup>
                          {showheldForOthers === true && (
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
                                  onChange={(text) =>
                                    setHeldForOthers(text.target.value)
                                  }
                                />
                              </FormGroup>
                            </Col>
                          )}
                        </Col>
                      </Row>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
          <Col md={12}>
            <div className="table-card">
              <Table borderless hover className={"two-col"}>
                <thead>
                  <tr>
                    <th className="table-heading">Service Summary</th>
                    {/* <th>Update Job</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Item Type {data?.vehicleOrProperty}:</th>
                    <td>
                      {data?.vehicleOrProperty == "Vehicle"
                        ? data?.vehicle
                        : data?.property}
                    </td>
                    <th scope="row">Tow Vehicle Required:</th>
                    <td>{data?.vehicleType}</td>
                  </tr>
                  <tr>
                    <th scope="row">Other Vehicle</th>
                    <td>{data?.otherVehicle}</td>
                    <th scope="row">Other Contact Info</th>
                    <td>{data?.otherContact}</td>
                  </tr>
                  <tr>
                    <th scope="row">Is Special Task</th>
                    <td>{data?.isSpecialInstructions ? "Yes" : "No"}</td>
                    <th scope="row">Special Task</th>
                    <td>{data?.specialTask}</td>
                  </tr>
                  <tr>
                    <th scope="row">Equipment List:</th>
                    <td>{data?.equipmentListStr}</td>
                    <th scope="row">Is LE:</th>
                    <td>{data?.indicatePolice ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <th scope="row">OnScene Initial Images: </th>
                    <td>
                      <div className="image-wrap">
                        {(vehiclePicture || []).map((image) => {
                          return (
                            <span
                              onClick={() => {
                                ViewImage(image);
                              }}
                              target="_blank"
                              style={{ cursor: "pointer" }}
                            >
                              <img
                                width={40}
                                src={image_placeholder}
                                alt="img placeholder"
                              />
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <th scope="row">OnScene Final Images: </th>
                    <td>
                      <div className="image-wrap">
                        {(inventoryAndDamagePicture || []).map((image) => {
                          return (
                            <span
                              onClick={() => {
                                ViewImage(image);
                              }}
                              target="_blank"
                              style={{ cursor: "pointer" }}
                            >
                              <img
                                width={40}
                                src={image_placeholder}
                                alt="img placeholder"
                              />
                            </span>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Service Request Location:</th>
                    <td>{data?.towJobRequestLocation}</td>
                    <th scope="row">Release Status</th>
                    <td>{data?.releaseStatus}</td>
                  </tr>
                  <tr>
                    <th scope="row">Jurisdiction:</th>
                    <td>{data?.jurisdiction}</td>
                    <th scope="row">Mandatory Date:</th>
                    <td>{data?.mandatoryDate}</td>
                  </tr>
                  <tr>
                    <th scope="row">Starting Mileage:</th>
                    <td>{data?.startingMileage}</td>
                    <th scope="row">Ending Mileage:</th>
                    <td>{data?.endingMileage}</td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <th scope="row">Starting Location:</th>
                    <td>{data?.startingLocation}</td>
                    <th scope="row">Finishing Location:</th>
                    <td>{data?.finishingLocation}</td>
                  </tr>
                  {data?.requestType == "Tow and Impound/Storage" && (
                    <>
                      <tr>
                        <th scope="row">Storage Start Date:</th>
                        <td>{data?.startDate}</td>
                        <th scope="row">Is Release:</th>
                        <td>{data?.isRelease ? "Yes" : "No"}</td>
                      </tr>
                      {data?.releaseStatus == "Cannot be Released" ? (
                        <tr>
                          <th scope="row">Storage End Date:</th>
                          <td>-</td>
                        </tr>
                      ) : (
                        <tr>
                          <th scope="row">Storage End Date:</th>
                          <td>{data?.startDate}</td>{" "}
                          {/*end date krni hai shayed*/}
                        </tr>
                      )}
                    </>
                  )}

                  {data?.indicatePolice && (
                    <>
                      <tr>
                        {data?.indicatePolice && (
                          <>
                            <th scope="row">LE Tow (Police/ Bylaw):</th>
                            <td>{data?.policeService}</td>
                          </>
                        )}
                        <th scope="row">LE Agency Occ. #:</th>
                        <td>{data?.policeOccurrence}</td>
                      </tr>
                      <tr>
                        <th scope="row">Officer Badge #:</th>
                        <td>{data?.officerBadge}</td>
                        <th scope="row">Officer Assignment:</th>
                        <td>{data?.officerDepart}</td>
                      </tr>
                      <tr>
                        <th scope="row">Officer Name:</th>
                        <td>{data?.officerName}</td>
                        <th scope="row">Officer Contact</th>
                        <td>{data?.officerContact}</td>
                      </tr>
                      <tr>
                        <th scope="row">Is Officer Incharge:</th>
                        <td>
                          {data?.isOfficerInCharge &&
                          (data?.isOfficerInCharge == true ||
                            data?.isOfficerInCharge == "true")
                            ? "Yes"
                            : "No"}
                        </td>
                        <th scope="row">Is Occurrence Numbers:</th>
                        <td>
                          {data?.isOccurrenceNumbers &&
                          (data?.isOccurrenceNumbers == true ||
                            data?.isOccurrenceNumbers == "true")
                            ? "Yes"
                            : "No"}
                        </td>
                      </tr>
                      {data?.isOfficerInCharge && (
                        <>
                          <tr>
                            <th scope="row">Officer In Charge Badge#:</th>
                            <td>{data?.officerInChargeBadge}</td>
                            <th scope="row">Officer In Charge:</th>
                            <td>{data?.officerInCharge}</td>
                          </tr>
                        </>
                      )}
                      <tr>
                        {data?.isOccurrenceNumbers && (
                          <>
                            <th scope="row">Occurrence Numbers</th>
                            <td>{data?.occurrenceNumbers}</td>
                          </>
                        )}
                        <th scope="row">Confirm LE Tow Receipt: </th>
                        <td>

                        <div className="image-wrap">
                          {(receiptPicture || []).map((image) => {
                            return (
                              <span
                              onClick={() => {
                                ViewImage(image);
                              }}
                              target="_blank"
                              style={{ cursor: "pointer" }}
                            >
                              <img
                                width={40}
                                src={image_placeholder}
                                alt="img placeholder"
                              />
                            </span>
                            );
                          })}
                          </div>
                        </td>

                      </tr>
                    </>
                  )}
                  <tr>
                    <th scope="row">Registered Owner Notified</th>
                    <td>{data?.registeredOwnerNotified ? "Yes" : "No"}</td>
                    {data?.registeredOwnerNotified && (
                      <>
                        <th scope="row">{data?.registeredOwnerComments}</th>
                        <td>{data?.registeredOwnerComments}</td>
                      </>
                    )}
                  </tr>
                  <tr>
                    <th scope="row">Property Forfeit:</th>
                    <td>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <Label for="exampleSelect">
                              {propertyForfietVal}
                            </Label>
                            <Select
                              name="form-field-name"
                              onChange={(val) => {
                                setPropertyForfiet(val.label);
                                if (
                                  val.label == "Other" ||
                                  val.label == "Other - Manual Entry"
                                ) {
                                  setShowPropertyForfiet(true);
                                } else {
                                  setShowPropertyForfiet(false);
                                }
                              }}
                              labelKey="name"
                              options={renderList(
                                dataDropdown?.propertyForfietList
                              )}
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
                                // defaultValue={data?.userName}
                                id="input-username"
                                placeholder="Other"
                                type="text"
                                onChange={(text) =>
                                  setPropertyForfiet(text.target.value)
                                }
                              />
                            </FormGroup>
                          )}
                        </Col>
                      </Row>
                    </td>

                    <th scope="row">Notified Owner Details </th>
                    <td>
                      <Row>
                        <Col lg="12">
                          <FormGroup check>
                            <Input
                              id="checkbox2"
                              className="checkq"
                              type="checkbox"
                              checked={notifyOwner}
                              onChange={(e) => {
                                const { checked } = e.target;
                                setNotifyOwner(checked);
                              }}
                            />
                            {"  "} Owner Notified?
                          </FormGroup>
                          {notifyOwner && (
                            <>
                              <FormGroup style={{ marginTop: 10 }}>
                                <Label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Notified Owner Name
                                </Label>
                                <Input
                                  className="form-control-alternative"
                                  defaultValue={notifyOwnerName}
                                  id="input-username"
                                  placeholder="i.e. First Name Last Name"
                                  type="text"
                                  onChange={(text) =>
                                    setNotifyOwnerName(text.target.value)
                                  }
                                />
                              </FormGroup>
                              <FormGroup style={{ marginTop: 10 }}>
                                <Label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Notified Owner Email
                                </Label>
                                <Input
                                  className="form-control-alternative"
                                  defaultValue={notifyOwnerEmail}
                                  id="input-username"
                                  placeholder=" i.e. Email Address"
                                  type="text"
                                  onChange={(text) =>
                                    setNotifyOwnerEmail(text.target.value)
                                  }
                                />
                              </FormGroup>

                              <FormGroup style={{ marginTop: 10 }}>
                                <Label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Notified Owner Cell
                                </Label>
                                <Input
                                  className="form-control-alternative"
                                  defaultValue={notifyContact}
                                  id="input-username"
                                  placeholder="i.e. Cell Number"
                                  type="text"
                                  onChange={(text) =>
                                    setNotifyContact(text.target.value)
                                  }
                                />
                              </FormGroup>

                              <FormGroup style={{ marginTop: 10 }}>
                                <Label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Notified Owner Contacted By
                                </Label>
                                <Input
                                  className="form-control-alternative"
                                  defaultValue={notifiedBy}
                                  id="input-username"
                                  placeholder="i.e. Registered Letter, Email, Text, etc."
                                  type="text"
                                  onChange={(text) =>
                                    setNotifiedBy(text.target.value)
                                  }
                                />
                              </FormGroup>
                            </>
                          )}
                        </Col>
                      </Row>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>

          <Col md={6}>
            <div className="table-card">
              <Table borderless hover>
                <thead>
                  <tr>
                    <th className="table-heading">Tow Driver Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Driver Name</th>
                    <td>{data?.driverName}</td>
                  </tr>
                  <tr>
                    <th scope="row">Driver Mobile</th>
                    <td>{data?.driverMobile}</td>
                  </tr>
                  <tr>
                    <th scope="row">Driver Address</th>
                    <td>{data?.driverAddress}</td>
                  </tr>
                  <tr>
                    <th scope="row">Driver Email</th>
                    <td>{data?.driverEmail}</td>
                  </tr>
                  <tr>
                    <th scope="row">Tow Truck Assistant:</th>
                    <td>{data?.towTruckPersons}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>

          <Col md={6}>
            <div className="table-card">
              <Table borderless hover>
                <thead>
                  <tr>
                    <th className="table-heading">Owner Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Owner Name:</th>
                    <td>{data?.ownerName}</td>
                  </tr>
                  <tr>
                    <th scope="row">Owner Mobile:</th>
                    <td>{data?.ownerMobile}</td>
                  </tr>
                  <tr>
                    <th scope="row">Owner Address:</th>
                    <td>{data?.ownerAddress}</td>
                  </tr>
                  <tr>
                    <th scope="row">Owner Email:</th>
                    <td>{data?.ownerEmail}</td>
                  </tr>
                  <tr>
                    <th scope="row">Lien Name:</th>
                    <td>{data?.lienName}</td>
                  </tr>
                  <tr>
                    <th scope="row">Lien Mobile:</th>
                    <td>{data?.lienMobile}</td>
                  </tr>
                  <tr>
                    <th scope="row">Lien Address:</th>
                    <td>{data?.lienAddress}</td>
                  </tr>
                  <tr>
                    <th scope="row">Lien Email:</th>
                    <td>{data?.lienEmail}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>

          <Col md={6}>
            <div className="table-card">
              <Table borderless hover>
                <thead>
                  <tr>
                    <th className="table-heading">Vehicle Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Licence Plate Number:</th>
                    <td>{data?.licensePlateNumber}</td>
                  </tr>
                  <tr>
                    <th scope="row">VIN Number:</th>
                    <td>{data?.vin}</td>
                  </tr>
                  <tr>
                    <th scope="row">Year:</th>
                    <td>{data.vinBasicData?.year}</td>
                  </tr>
                  <tr>
                    <th scope="row">Make:</th>
                    <td>{data.vinBasicData?.make}</td>
                  </tr>
                  <tr>
                    <th scope="row">Model:</th>
                    <td>{data.vinBasicData?.model}</td>
                  </tr>
                  <tr>
                    <th scope="row">Body Style:</th>
                    <td>{data.vinBasicData?.oemBodyStyle}</td>
                  </tr>
                  <tr>
                    <th scope="row">Vehicle Type:</th>
                    <td>{data.vinBasicData?.vehicleType}</td>
                  </tr>
                  <tr>
                    <th scope="row">Body Type:</th>
                    <td>{data.vinBasicData?.bodyType}</td>
                  </tr>
                  <tr>
                    <th scope="row">Drive Type:</th>
                    <td>{data.vinBasicData?.driveType}</td>
                  </tr>
                  <tr>
                    <th scope="row">Doors:</th>
                    <td>{data.vinBasicData?.doors}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
          <Col md={6}>
            <div className="table-card">
              <Table borderless hover>
                <thead>
                  <tr>
                    <th className="table-heading">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Comments:</th>
                    <td>{data?.comments}</td>
                  </tr>
                  <tr>
                    <th scope="row">Final Comments:</th>
                    <td>{data?.finalComments}</td>
                  </tr>
                  <tr>
                    <th scope="row">Special Comments</th>
                    <td>{data?.specialComments}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
        {/* </div> */}
      </div>
      <ViewImageModal
        modal={openViewImageModal}
        itemData={imageData}
        prefix={Constants.apiUrl}
        loading={true}
      />
    </div>
  );
};
export default JobDetails;
