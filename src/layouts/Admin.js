import React from "react";
import { Route, Switch, Redirect, useNavigate } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import { getUserData } from "APIstore/apiCalls";
import { IoArrowBackSharp } from "react-icons/io5";
import { getLoggedinApi } from "APIstore/apiCalls";
import image from "assets/img/brand/argon-react.png";
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      da: "",
      data: "",
    };
  }
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  async componentDidMount() {
    const id = await localStorage.getItem("access");
    if (id) {
      // if (caches) {
      try {
        getUserData(id, async (res) => {
          if (res.sucess) {
            console.log("errrrr", res.sucess);
            this.setState({ data: res.sucess });
          } else {
            console.log("errrrr");
          }
        });
      } catch (error) {
        console.log("error", error);
      }

      // window.location.reload();
    }
    try {
      getLoggedinApi("", async (res) => {
        if (res.sucess) {
          await localStorage.setItem("loggedData", JSON.stringify(res.sucess));
        } else {
          console.log("Something went wrong");
        }
      });
    } catch (error) {
      console.log(error);
    }
    // window.location.reload(false)
    // }
  }
  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render() {
    return (
      <>
        {this.state.data != "" && (
          <div
            style={{
              cursor: "pointer",
              background: "#fa0000",
              width: "100%",
              padding: 20,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <span
              style={{ paddingLeft: 20, paddingRight: 20 }}
              className="TopHeadText"
            >
              Accessing - {this.state.data.firstName} {this.state.data.lastName}{" "}
            </span>
            <span
              onClick={async () => {
                await localStorage.removeItem("access");
                await localStorage.removeItem("accessData");
                this.props.history.push("admin/index");
                window.location.reload(false);
              }}
              className="TopHeadText"
            >
              <IoArrowBackSharp size={25} style={{ marginTop: -3 }} /> Exit
            </span>
          </div>
        )}
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: image,
            imgAlt: "...",
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            {this.getRoutes(routes)}
            <Redirect from="*" to="/admin/index" />
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default Admin;
