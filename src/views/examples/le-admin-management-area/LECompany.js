import React, { useLocation,useEffect, useState } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row
} from "reactstrap";
import { Link } from "react-router-dom";
// core components
import Header from "components/Headers/Header.js";
import { getAllAssignedTowCompany} from "../../../APIstore/apiCalls";

function LECompany(props) {
  const [data, setData] = useState([]);
  const [setItem, setItemData] = useState('');
  
  useEffect(() => {
    try {
      getAllAssignedTowCompany('', async (res) => {
        console.warn("<<< getAllAssignedTowCompany res", res);
        if (res.sucess) {
          const response=res.sucess.list;
          setData(response.map((val)=>val.assigned));
        } else 
          console.error("error: getAllAssignedTowCompany");

        console.warn(">>> getAllAssignedTowCompany");
      });
    } catch (error) {
      console.log("error", error)
    }
  }, [setItem])

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                    <h3 className="mb-0">Tow/Impound/Storage Company</h3>
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
                      <th scope="col" />
                    </tr>
                  </thead>
                  {data ? (
                    <tbody>
                      {data.map((item) => {
                        return (
                          <tr style={{ borderWidth: 1, borderColor: 'black' }}>
                            <Link
                              to={{
                                pathname: props?.location?.pathname=="/admin/le-assigned-company-management"?
                                  "/admin/le-assigned-company-details":"/admin/alljobs",
                                state: item // your data array of objects
                              }}> 
                            <td style={{textDecoration: "underline black",cursor:"pointer"}} className="text-sm">{item?.id}</td>
                            </Link>
                            <td className="text-sm">{item?.companyName}</td>
                            <td className="text-sm">{item?.corporateName}</td>
                            <td className="text-sm">
                              {item?.companyType}
                            </td>
                            <td className="text-sm">
                              {item?.corporateAddress}

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
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default LECompany;