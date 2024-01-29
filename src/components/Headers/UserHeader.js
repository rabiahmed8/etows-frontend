import React, { useEffect, useState } from "react";

import { Button, Container, Row, Col } from "reactstrap";
import { getLoggedinApi } from "../../APIstore/apiCalls";
function UserHeader() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const getAccess = await localStorage.getItem('accessData');
      // alert(JSON.parse(getAccess));
      let filterData = JSON.parse(getAccess)
      if (filterData) {
        setData(filterData)
      }
      else {
        try {
          getLoggedinApi('', async (res) => {
            if (res.sucess) {
              setData(res.sucess)
            } else {
              console.log("errrrr")
            }
          });
        } catch (error) {
          console.log("error", error)
        }
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <div
        className="header pb-5 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "400px",
          backgroundImage:
            "url(" + require("assets/img/theme/profile-cover.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top"
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col>
              <h1 className="display-2 text-white">Hello {data?.firstName} {data?.lastName}</h1>
              <p className="text-white mt-0 mb-5">
                This is your profile page. Use this section to edit your user information
              </p>
              {/* <Button
                color="info"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                Edit profile
              </Button> */}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default UserHeader;
