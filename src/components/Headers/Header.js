/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { getUserData } from "APIstore/apiCalls";
import React from "react";
import { IoArrowBackSharp } from 'react-icons/io5';
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      da: '',
      data: '',
    };

  }
  async componentDidMount() {
    const id = await localStorage.getItem('access');
    if (id) {
      try {
        getUserData(id, async (res) => {
          if (res.sucess) {
            console.log("errrrr", res.sucess)
            this.setState({ data: res.sucess })
          } else {
            console.log("errrrr")
          }
        });
      } catch (error) {
        console.log("error", error)
      }
    }
  }
  render() {
    // const { data } = this.state;
    return (
      <>
        {/* {this.state.data != '' && ( */}
          {/* <div onClick={async () => {
            await localStorage.removeItem('access')
            await localStorage.removeItem('accessData')
            window.location.reload(false);
          }} style={{ background: "blue", width: "100%",padding:20, display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
            <span style={{ color: "#fff" }}>Hello {this.state.data.firstName} {this.state.data.lastName} </span>
            <span  style={{ color: "#fff" }}><IoArrowBackSharp /> Exit</span>
          </div> */}
        {/* )} */}
        <div className="header pb-5 pt-5 pt-md-8" style={{ background: 'green' }}>
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
