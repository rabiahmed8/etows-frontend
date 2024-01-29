// import React, { useEffect, useState } from "react";
// import {
//     Button,
//     DropdownMenu,
//     DropdownItem,
//     UncontrolledDropdown,
//     DropdownToggle,
//     Table
// } from "reactstrap";

// function PicturesTable(props) {
// return (<Table className="align-items-center table-flush" responsive>
//         {dataOD?.length > 0 ? (
//             <>
//                 <thead className="thead-light">
//                     <tr>
//                         <th scope="col">ID</th>
//                         <th scope="col">Name</th>
//                         <th scope="col">Comments</th>
//                         <th scope="col">Issued Date</th>
//                         <th scope="col">Expiry Date</th>
//                         <th scope="col" />
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {dataOD.map((item) => {
//                         return (
//                             <tr>
//                                 <td className="text-sm">{item?.id}</td>
//                                 <td className="text-sm">
//                                     <Button onClick={() => { ViewImage(item) }} className="my-4 p-btm" color="primary" type="button">
//                                         View
//                                     </Button>
//                                 </td>

//                                 <td className="text-sm">
//                                     {item?.comments}
//                                 </td>
//                                 <td className="text-sm">
//                                     {item?.issueDate}
//                                 </td>
//                                 <td className="text-sm">
//                                     {item?.expiryDate}
//                                 </td>
//                                 <td className="text-right">
//                                     {logData1.role != 'POLICE_ADMIN' && (
//                                         <UncontrolledDropdown>
//                                             <DropdownToggle
//                                                 className="btn-icon-only text-light"
//                                                 href="#pablo"
//                                                 role="button"
//                                                 size="sm"
//                                                 color=""
//                                                 onClick={e => e.preventDefault()}
//                                             >
//                                                 <i className="fas fa-ellipsis-v" />
//                                             </DropdownToggle>
//                                             <DropdownMenu className="dropdown-menu-arrow" right>
//                                                 <DropdownItem
//                                                     onClick={() => { toggleUpdateOD(item) }}
//                                                 >
//                                                     Update
//                                                 </DropdownItem>
//                                                 <DropdownItem
//                                                     onClick={() => { Deletetoggle(item) }}
//                                                 >
//                                                     Delete
//                                                 </DropdownItem>
//                                             </DropdownMenu>
//                                         </UncontrolledDropdown>
//                                     )}
//                                 </td>
//                             </tr>
//                         )
//                     })}

//                 </tbody>
//             </>
//         ) : (
//             <div className="text-center">
//                 <h3>No Record Found</h3>
//             </div>
//         )}
//     </Table>