// import Header from "components/Headers/Header";
// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { Col, FormGroup, Input, Label, Row, Table } from "reactstrap";
// import Select from "react-select";
// import moment from "moment";

// const JobDetails = (props) => {
//   const [openViewImageModal, setViewImageModal] = useState(false);
//   const [imageData, setDataImage] = useState();

//   const ViewImage = (item) => {
//     setDataImage(item);
//     setViewImageModal(!openViewImageModal);
//   };

//   let { id } = useParams();
//   const receiptPicture = null;
//   const vehiclePicture = null;
//   const inventoryAndDamagePicture = null;

//   const data = {
//     id: 538,
//     userId: "dec8674d-c3f8-4179-9dc2-e1993a16d8cb",
//     indicatePolice: true,
//     isMandatory: false,
//     isOccurrenceNumbers: true,
//     isOfficerInCharge: false,
//     towJobRequestLocation: "starting location datafield test",
//     questionAsked: null,
//     startingMileage: 1235,
//     endingMileage: 1236,
//     equipmentList: [],
//     equipmentListStr: "",
//     onSceneInitialImages: [],
//     onSceneFinalImages: [],
//     policeOfficers: [],
//     towTruckPersons: [],
//     isOtherVehicle: false,
//     loading: false,
//     mandatoryDate: "2023-12-12",
//     occurrenceNumbers: "additional occ #'s datafield",
//     officerInCharge: "oic name datafield",
//     officerInChargeBadge: "oic badge number datafield",
//     otherVehicle: null,
//     policeOccurrence: "2023-LE occ datafield",
//     policeService: "York Regional Police",
//     officerBadge: "badge # datafield",
//     officerDepart: "assignment datafield",
//     officerName: "Officer name datafield",
//     otherCompany:
//       "other number datafield test from info entered in Android app",
//     officerContact: "officer phone number datafield",
//     licensePlateNumber: "AXJZ639",
//     specialInstructions: "",
//     otherContact: "Test other contact info datafield",
//     reasonForImpound: "CCC VIP Minimum 45 Days",
//     reasonForTow: "Impaired Driving",
//     releaseStatus: "Can be Released after Mandatory Seizure/Hold Period",
//     requestType: "Tow and Impound/Storage",
//     requestStatus: "Pending",
//     roadService: "",
//     step: "538",
//     sent: true,
//     towOrImpoundDate: "2023-12-12",
//     vehicleType: "Light Tow/Duty tilt and load tow truck.",
//     vehicle: "Car",
//     vin: "19uua66285a804804",
//     vinBasicData: {
//       doors: 4,
//       driveType: "FWD",
//       trim: "",
//       year: 2005,
//       oemDoors: 4,
//       rearAxle: "",
//       bodyType: "Sedan",
//       vehicleType: "Car",
//       model: "TL",
//       oemBodyStyle: "Sedan",
//       make: "Acura",
//       bodySubtype: "",
//       response: null,
//     },
//     jurisdiction: null,
//     status: "Complete",
//     requestlongitude: null,
//     requestlatitude: null,
//     vehicleOrProperty: "Vehicle",
//     property: "",
//     specialTask: "Liquid/Oil Clean Up Required",
//     specialComments: "Test absorbent ",
//     comments: "test datafield from Android app ",
//     startingLocation: "starting location datafield test",
//     finishingLocation: "ending location datafield test",
//     startDate: "2023-12-12T14:44:26.25",
//     endDate: "2024-01-26T19:44:00",
//     isRelease: false,
//     registeredOwnerNotified: false,
//     registeredOwnerComments: null,
//     finalComments: null,
//     heldPurpose:
//       "Criminal Proceedings – Homicide, Fatal Collision, Major Project, etc",
//     propertyForfiet: "Forfeiture datafield test",
//     propertyForfietDetails: "",
//     notifyOwner: null,
//     notifyOwnerName: null,
//     notifyOwnerEmail: null,
//     notifyContact: null,
//     notifiedBy: null,
//     isSpecialInstructions: false,
//     isSelfGenerated: false,
//     driverName: "Driver First Name Surname",
//     driverMobile: "driver phone number",
//     driverAddress: "Driver address datafield",
//     driverEmail: "driver email datafield",
//     ownerName: "Vehicle Owner First name Surname",
//     ownerMobile: "Vehicle owner phone number datafield",
//     ownerAddress: "12 Springwood Ct, Barrie, ON L4N 5V1, Canada",
//     ownerEmail: "Vehicle Owner email datafield",
//     lienName: "Test Lien Hold First Name Last Name",
//     lienMobile: "123-456-7890 Ext Lien Holder",
//     lienAddress: "1lien holder way address datafield",
//     lienEmail: "lienholder@email.com",
//     companyId: 49,
//     testStatus: null,
//     userUrl:
//       "https://stage-api.etows.app:8443/user/userinfo?userId=dec8674d-c3f8-4179-9dc2-e1993a16d8cb",
//     createdAt: "2023-12-12T15:02:05.722021",
//     updatedAt: "2023-12-12T15:51:56.362609",
//     response: null,
//   };

//   console.log(":", id);
//   return (
//     <div>
//       <Header />
//       <Table hover style={{ margin: "20px" }}>
//         <thead>
//           <tr>
//             <th>Job Id: {data?.id}</th>
//             <th>Update Job</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <th scope="row">Company Id:</th>
//             <td>{data?.companyId}</td>
//           </tr>
//           <tr>
//             <th scope="row">Other Number:</th>
//             <td>{data?.otherCompany}</td>
//           </tr>
//           <tr>
//             <th scope="row">UserId:</th>
//             <td>{data?.userId}</td>
//           </tr>
//           <tr>
//             <th scope="row">Licence Plate Number:</th>
//             <td>{data?.licensePlateNumber}</td>
//           </tr>
//           <tr>
//             <th scope="row">Service Request Date:</th>
//             <td>{moment(data?.towOrImpoundDate).format("MMMM Do YYYY")}</td>
//           </tr>
//           <tr>
//             <th scope="row">Item Type {data?.vehicleOrProperty}:</th>
//             <td>
//               {" "}
//               {data?.vehicleOrProperty == "Vehicle"
//                 ? data?.vehicle
//                 : data?.property}
//             </td>
//           </tr>
//           <tr>
//             <th scope="row">Tow Vehicle Required:</th>
//             <td>{data?.vehicleType}</td>
//           </tr>
//           <tr>
//             <th scope="row">Tow Truck Persons:</th>
//             <td>{data?.towTruckPersons}</td>
//           </tr>
//           <tr>
//             <th scope="row">Other Vehicle</th>
//             <td>{data?.otherVehicle}</td>
//           </tr>
//           <tr>
//             <th scope="row">OnScene Initial Images: </th>
//             <td>
//               {" "}
//               <ul>
//                 {vehiclePicture.map((image) => {
//                   return (
//                     <li>
//                       <a
//                         onClick={() => {
//                           ViewImage(image);
//                         }}
//                         target="_blank"
//                         style={{ cursor: "pointer" }}
//                       >
//                         {image?.name}
//                       </a>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </td>
//           </tr>
//           <tr>
//             <th scope="row">OnScene Final Images: </th>
//             <td>
//               {" "}
//               <ul>
//                 {inventoryAndDamagePicture.map((image) => {
//                   return (
//                     <li>
//                       <a
//                         onClick={() => {
//                           ViewImage(image);
//                         }}
//                         target="_blank"
//                         style={{ cursor: "pointer" }}
//                       >
//                         {image?.name}
//                       </a>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </td>
//           </tr>
//           <tr>
//             <th scope="row">Service Request Location:</th>
//             <td>{data?.towJobRequestLocation}</td>
//           </tr>
//           <tr>
//             <th scope="row">Other Contact Info</th>
//             <td>{data?.otherContact}</td>
//           </tr>
//           <tr>
//             <th scope="row">Is Special Task</th>
//             <td>{data?.isSpecialInstructions ? "Yes" : "No"}</td>
//           </tr>
//           <tr>
//             <th scope="row">Special Task</th>
//             <td>{data?.specialTask}</td>
//           </tr>
//           <tr>
//             <th scope="row">Special Comments</th>
//             <td>{data?.specialComments}</td>
//           </tr>
//           <tr>
//             <th scope="row">Is LE:</th>
//             <td>{data?.indicatePolice ? "Yes" : "No"}</td>
//           </tr>
//           {data?.indicatePolice && (
//             <>
//               <tr>
//                 <th scope="row">LE Tow (Police/ Bylaw):</th>
//                 <td>{data?.policeService}</td>
//               </tr>
//               <tr>
//                 <th scope="row">LE Agency Occ. #:</th>
//                 <td>{data?.policeOccurrence}</td>
//               </tr>
//               <tr>
//                 <th scope="row">Officer Badge #:</th>
//                 <td>{data?.officerBadge}</td>
//               </tr>
//               <tr>
//                 <th scope="row">Officer Assignment:</th>
//                 <td>{data?.officerDepart}</td>
//               </tr>
//               <tr>
//                 <th scope="row">Officer Name:</th>
//                 <td>{data?.officerName}</td>
//               </tr>
//               <tr>
//                 <th scope="row">Officer Contact</th>
//                 <td>{data?.officerContact}</td>
//               </tr>
//               <tr>
//                 <th scope="row">Is Officer Incharge:</th>
//                 <td>
//                   {data?.isOfficerInCharge &&
//                   (data?.isOfficerInCharge == true ||
//                     data?.isOfficerInCharge == "true")
//                     ? "Yes"
//                     : "No"}
//                 </td>
//               </tr>
//               {data?.isOfficerInCharge && (
//                 <>
//                   <tr>
//                     <th scope="row">Officer In Charge Badge#:</th>
//                     <td>{data?.officerInChargeBadge}</td>
//                   </tr>
//                   <tr>
//                     <th scope="row">Officer In Charge:</th>
//                     <td>{data?.officerInCharge}</td>
//                   </tr>
//                 </>
//               )}
//               <tr>
//                 <th scope="row">Is Occurrence Numbers:</th>
//                 <td>
//                   {data?.isOccurrenceNumbers &&
//                   (data?.isOccurrenceNumbers == true ||
//                     data?.isOccurrenceNumbers == "true")
//                     ? "Yes"
//                     : "No"}
//                 </td>
//               </tr>
//               {data?.isOccurrenceNumbers && (
//                 <tr>
//                   <th scope="row">Occurrence Numbers</th>
//                   <td>{data?.occurrenceNumbers}</td>
//                 </tr>
//               )}
//               <tr>
//                 <th scope="row">Confirm LE Tow Reciept: </th>
//                 <td>
//                   {" "}
//                   {receiptPicture.map((image) => {
//                     return (
//                       <li>
//                         <a
//                           onClick={() => {
//                             ViewImage(image);
//                           }}
//                           target="_blank"
//                           style={{ cursor: "pointer" }}
//                         >
//                           {image?.name}
//                         </a>
//                       </li>
//                     );
//                   })}
//                 </td>
//               </tr>
//             </>
//           )}
//           {!data?.indicatePolice && (
//             <>
//               <tr>
//                 <th scope="row">Client Name:</th>
//                 <td>{data?.officerName}</td>
//               </tr>
//               <tr>
//                 <th scope="row">Client Contact</th>
//                 <td>{data?.officerContact}</td>
//               </tr>
//             </>
//           )}
//           <tr>
//             <th scope="row">VIN Number:</th>
//             <td>{data?.vin}</td>
//           </tr>
//           <tr>
//             <th scope="row">Year:</th>
//             <td>{data.vinBasicData?.year}</td>
//           </tr>
//           <tr>
//             <th scope="row">Make:</th>
//             <td>{data.vinBasicData?.make}</td>
//           </tr>
//           <tr>
//             <th scope="row">Model:</th>
//             <td>{data.vinBasicData?.model}</td>
//           </tr>
//           <tr>
//             <th scope="row">Body Style:</th>
//             <td>{data.vinBasicData?.oemBodyStyle}</td>
//           </tr>
//           <tr>
//             <th scope="row">Vehicle Type:</th>
//             <td>{data.vinBasicData?.vehicleType}</td>
//           </tr>
//           <tr>
//             <th scope="row">Body Type:</th>
//             <td>{data.vinBasicData?.bodyType}</td>
//           </tr>
//           <tr>
//             <th scope="row">Driver Type:</th>
//             <td>{data.vinBasicData?.driveType}</td>
//           </tr>
//           <tr>
//             <th scope="row">Doors:</th>
//             <td>{data.vinBasicData?.doors}</td>
//           </tr>
//         </tbody>
//       </Table>
//       <Table hover style={{ margin: "20px" }}>
//         <thead>
//           <tr>
//             <th>Job Id: {data?.id}</th>
//             <th>Update Job</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <th scope="row">Starting Mileage:</th>
//             <td>{data?.startingMileage}</td>
//           </tr>
//           <tr>
//             <th scope="row">Ending Mileage:</th>
//             <td>{data?.endingMileage}</td>
//           </tr>
//           <tr>
//             <th scope="row">Equipment List:</th>
//             <td>{data?.equipmentListStr}</td>
//           </tr>
//           <tr>
//             <th scope="row">Starting Location:</th>
//             <td>{data?.startingLocation}</td>
//           </tr>
//           <tr>
//             <th scope="row">Finishing Location:</th>
//             <td>{data?.finishingLocation}</td>
//           </tr>
//           <tr>
//             <th scope="row">Final Comments:</th>
//             <td>{data?.finalComments}</td>
//           </tr>
//           <tr>
//             <th scope="row">Release Status</th>
//             <td>{data?.releaseStatus}</td>
//           </tr>
//           {data?.requestType == "Tow and Impound/Storage" && (
//             <>
//               <tr>
//                 <th scope="row">Is Release:</th>
//                 <td>{data?.isRelease ? "Yes" : "No"}</td>
//               </tr>
//               <tr>
//                 <th scope="row">Start Date:</th>
//                 <td>{data?.startDate}</td>
//               </tr>
//               {data?.releaseStatus == "Cannot be Released" ? (
//                 <tr>
//                   <th scope="row">End Date:</th>
//                   <td>-</td>
//                 </tr>
//               ) : (
//                 <tr>
//                   <th scope="row">End Date:</th>
//                   <td>{data?.startDate}</td> {/*end date krni hai shayed*/}
//                 </tr>
//               )}
//             </>
//           )}
//           <tr>
//             <th scope="row">Jurisdiction:</th>
//             <td>{data?.jurisdiction}</td>
//           </tr>
//           <tr>
//             <th scope="row">Mandatory Date:</th>
//             <td>{data?.mandatoryDate}</td>
//           </tr>
//           <tr>
//             <th scope="row">Comments:</th>
//             <td>{data?.comments}</td>
//           </tr>
//           <tr>
//             <th scope="row">Owner Name:</th>
//             <td>{data?.ownerName}</td>
//           </tr>
//           <tr>
//             <th scope="row">Owner Mobile:</th>
//             <td>{data?.ownerMobile}</td>
//           </tr>
//           <tr>
//             <th scope="row">Owner Address:</th>
//             <td>{data?.ownerAddress}</td>
//           </tr>
//           <tr>
//             <th scope="row">Owner Email:</th>
//             <td>{data?.ownerEmail}</td>
//           </tr>
//           <tr>
//             <th scope="row">Lien Name:</th>
//             <td>{data?.lienName}</td>
//           </tr>
//           <tr>
//             <th scope="row">Lien Mobile:</th>
//             <td>{data?.lienMobile}</td>
//           </tr>
//           <tr>
//             <th scope="row">Lien Address:</th>
//             <td>{data?.lienAddress}</td>
//           </tr>
//           <tr>
//             <th scope="row">Lien Email:</th>
//             <td>{data?.lienEmail}</td>
//           </tr>
//           <tr>
//             <th scope="row">Driver Name</th>
//             <td>{data?.driverName}</td>
//           </tr>
//           <tr>
//             <th scope="row">Driver Mobile</th>
//             <td>{data?.driverMobile}</td>
//           </tr>
//           <tr>
//             <th scope="row">Driver Address</th>
//             <td>{data?.driverAddress}</td>
//           </tr>
//           <tr>
//             <th scope="row">Driver Email</th>
//             <td>{data?.driverEmail}</td>
//           </tr>
//           {data?.requestType == "Tow and Impound/Storage" && (
//             <tr>
//               <th scope="row">Reason For Impound</th>
//               <td>{data?.reasonForImpound}</td>
//             </tr>
//           )}
//           {(data?.requestType == "Tow and Impound/Storage" ||
//             data?.requestType == "Tow only") && (
//             <tr>
//               <th scope="row">Reason For Tow</th>
//               <td>{data?.reasonForTow}</td>
//             </tr>
//           )}
//           <tr>
//             <th scope="row">Request Type</th>
//             <td>{data?.requestType}</td>
//           </tr>
//           <tr>
//             <th scope="row">Service Status</th>
//             <td>{data?.status == "LE Request" ? "Pending" : data?.status}</td>
//           </tr>
//           <tr>
//             <th scope="row">Registered Owner Notified</th>
//             <td>{data?.registeredOwnerNotified ? "Yes" : "No"}</td>
//           </tr>
//           {data?.registeredOwnerNotified && (
//             <tr>
//               <th scope="row">{data?.registeredOwnerComments}</th>
//               <td>{data?.registeredOwnerComments}</td>
//             </tr>
//           )}
//           {data?.requestType == "Roadside Assistance" && (
//             <tr>
//               <th scope="row">Road Service</th>
//               <td>{data?.roadService}</td>
//             </tr>
//           )}
//           <tr>
//             <th scope="row">Held Purpose:</th>
//             <td>
//               <Row>
//                 <Col lg="12">
//                   <FormGroup>
//                     <Label for="exampleSelect">{heldForOthersVal}</Label>
//                     <Select
//                       name="form-field-name"
//                       // onChange={(val) => { setReasonforTow(val.label) }}
//                       onChange={(val) => {
//                         setHeldForOthers(val.label);
//                         if (
//                           val.label == "Other" ||
//                           val.label == "Other - Manual Entry"
//                         ) {
//                           setShowHeldForOthers(true);
//                         } else {
//                           setShowHeldForOthers(false);
//                         }
//                       }}
//                       labelKey="name"
//                       options={renderList(dataDropdown?.heldPurposeList)}
//                     />
//                   </FormGroup>
//                   {showheldForOthers === true && (
//                     <Col lg="12">
//                       <FormGroup>
//                         <Label
//                           className="form-control-label"
//                           htmlFor="input-username"
//                         >
//                           Other
//                         </Label>
//                         <Input
//                           className="form-control-alternative"
//                           // defaultValue={data?.userName}
//                           id="input-username"
//                           placeholder="Other"
//                           type="text"
//                           onChange={(text) =>
//                             setHeldForOthers(text.target.value)
//                           }
//                         />
//                       </FormGroup>
//                     </Col>
//                   )}
//                 </Col>
//               </Row>
//             </td>
//           </tr>
//           <tr>
//             <th scope="row">Property Forfiet:</th>
//             <td>
//               <Row>
//                 <Col lg="12">
//                   <FormGroup>
//                     <Label for="exampleSelect">{propertyForfietVal}</Label>
//                     <Select
//                       name="form-field-name"
//                       onChange={(val) => {
//                         setPropertyForfiet(val.label);
//                         if (
//                           val.label == "Other" ||
//                           val.label == "Other - Manual Entry"
//                         ) {
//                           setShowPropertyForfiet(true);
//                         } else {
//                           setShowPropertyForfiet(false);
//                         }
//                       }}
//                       labelKey="name"
//                       options={renderList(dataDropdown?.propertyForfietList)}
//                     />
//                   </FormGroup>

//                   {showPropertyForfiet === true && (
//                     <FormGroup>
//                       <Label
//                         className="form-control-label"
//                         htmlFor="input-username"
//                       >
//                         Other
//                       </Label>
//                       <Input
//                         className="form-control-alternative"
//                         // defaultValue={data?.userName}
//                         id="input-username"
//                         placeholder="Other"
//                         type="text"
//                         onChange={(text) =>
//                           setPropertyForfiet(text.target.value)
//                         }
//                       />
//                     </FormGroup>
//                   )}
//                 </Col>
//               </Row>
//             </td>
//           </tr>
//           <tr>
//             <th scope="row">Notified Owner details </th>
//             <td>
//               <Row>
//                 <Col lg="12">
//                   <FormGroup check>
//                     <Input
//                       id="checkbox2"
//                       className="checkq"
//                       type="checkbox"
//                       checked={notifyOwner}
//                       onChange={(e) => {
//                         const { checked } = e.target;
//                         setNotifyOwner(checked);
//                       }}
//                     />
//                     {"  "} Notify Owner?
//                   </FormGroup>
//                   {notifyOwner && (
//                     <>
//                       <FormGroup style={{ marginTop: 10 }}>
//                         <Label
//                           className="form-control-label"
//                           htmlFor="input-username"
//                         >
//                           Notify Owner Name
//                         </Label>
//                         <Input
//                           className="form-control-alternative"
//                           defaultValue={notifyOwnerName}
//                           id="input-username"
//                           placeholder="i.e. forfiet details"
//                           type="text"
//                           onChange={(text) =>
//                             setNotifyOwnerName(text.target.value)
//                           }
//                         />
//                       </FormGroup>
//                       <FormGroup style={{ marginTop: 10 }}>
//                         <Label
//                           className="form-control-label"
//                           htmlFor="input-username"
//                         >
//                           Notify Owner Email
//                         </Label>
//                         <Input
//                           className="form-control-alternative"
//                           defaultValue={notifyOwnerEmail}
//                           id="input-username"
//                           placeholder="i.e. forfiet details"
//                           type="text"
//                           onChange={(text) =>
//                             setNotifyOwnerEmail(text.target.value)
//                           }
//                         />
//                       </FormGroup>

//                       <FormGroup style={{ marginTop: 10 }}>
//                         <Label
//                           className="form-control-label"
//                           htmlFor="input-username"
//                         >
//                           Notify Owner Contact
//                         </Label>
//                         <Input
//                           className="form-control-alternative"
//                           defaultValue={notifyContact}
//                           id="input-username"
//                           placeholder="i.e. forfiet details"
//                           type="text"
//                           onChange={(text) =>
//                             setNotifyContact(text.target.value)
//                           }
//                         />
//                       </FormGroup>

//                       <FormGroup style={{ marginTop: 10 }}>
//                         <Label
//                           className="form-control-label"
//                           htmlFor="input-username"
//                         >
//                           Notified by
//                         </Label>
//                         <Input
//                           className="form-control-alternative"
//                           defaultValue={notifiedBy}
//                           id="input-username"
//                           placeholder="i.e. forfiet details"
//                           type="text"
//                           onChange={(text) => setNotifiedBy(text.target.value)}
//                         />
//                       </FormGroup>
//                     </>
//                   )}
//                 </Col>
//               </Row>
//             </td>
//           </tr>
//           <tr>
//             <th scope="row">asd</th>
//             <td>Larry</td>
//           </tr>
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default JobDetails;
