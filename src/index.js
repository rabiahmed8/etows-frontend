// import { createRoot } from 'react-dom/client';
// import Index from 'views/Index';
import React, { useContext, useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
// import { useLocation } from 'react-router-dom';
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import logo from "../src/assets/img/theme/logo.png";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { AuthContext, AuthProvider, TAuthConfig } from "react-oauth2-code-pkce";
import { Constants } from "./Environment";
import CompanyDetail from "views/examples/CompanyDetail";
import GovtAgencyDetail from "views/examples/GovtAgencyDetail";
import { getUserData } from "APIstore/apiCalls";
import Profile from "views/examples/Profile";
import AllUsers from "views/examples/AllUsers";
import CorpDetail from "views/examples/CorpDetail";
import FleetDetail from "views/examples/FleetDetail";
import { fetchToken, onMessageListener } from "../src/Service/firebase";
import reportWebVitals from "../src/Service/reportWebVitals";
import Notifications, { notify } from "react-notify-toast";
import NotificationsComponent from "component/NotificationsComponent";
import config from "config";
console.warn(`${Constants.authUrl}/oauth2/authorize`);
const authConfig: TAuthConfig = {
  // clientId: "etows-v1-HZYsxFmrQvi9H9r3RHtw",
  clientId: "etows-v2-AM4pQ0fCQoI3Dr7meIRR",
  authorizationEndpoint: `${Constants.authUrl}/oauth2/authorize`,
  tokenEndpoint: `${Constants.authUrl}/oauth2/token`,
  // Whereever your application is running. Must match configuration on authorization server
  redirectUri: Constants.url,
  // Optional
  scope: "openid",
  // Optional
  logoutEndpoint: "",
  // Optional
  logoutRedirect: "",
  // Example to redirect back to original path after login has completed
  preLogin: () =>
    localStorage.setItem("preLoginPath", window.location.pathname),
  postLogin: () =>
    window.location.replace(localStorage.getItem("preLoginPath")),
  decodeToken: true,
};
function LoginInfo(props) {
  const navigate = useHistory();
  // const location = useLocation();
  const { tokenData, token, idToken, logOut, error, login } =
    useContext(AuthContext);
  useEffect(() => {
    async function myfetch() {
      if (token) {
        await localStorage.setItem("myData", tokenData);
        await localStorage.setItem("token", token);
        navigate.push("/admin/index");
      }
    }
    myfetch();
  }, []);
  useEffect(() => {
    async function myfetchData() {
      const token = await localStorage.getItem("token");

      if (token) {
        navigate.push("/admin/index");
      }
    }
    myfetchData();
  }, []);
  useEffect(() => {
    loadGoogleMapScript();
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/firebase-messaging-sw.js")
          .then((reg) => {
            console.log("Registration successful, scope is:", reg.scope);
          })
          .catch((err) => {
            console.log("Service worker registration failed, error:", err);
          });
      });
    }
  }, []);
  const loadGoogleMapScript = useCallback((callback) => {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${config.GOOGLE_MAP_API_KEY}&libraries=places`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", callback);
  }, []);
  return (
    <div class="container h-100">
      <div class="row h-100">
        <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
          <div class="d-table-cell align-middle">
            <div class="text-center mt-4">
              <h1 class="h2">Welcome back to eTOWS</h1>
              <p class="lead">Sign in to your account to continue</p>
            </div>

            <div
              style={{
                position: "relative",
                flexDirection: "column",
                flex: 1,
                minWidth: 0,
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "#e5e9f2",
                borderRadius: 10,
                wordBreak: "break-word",
                marginBottom: 24,
                boxShadow: "rgb(217 189 182 / 34%) 1px 2px 9px",
                margin: "4em",
                padding: "1em",
              }}
            >
              <div class="card-body">
                <div class="m-sm-4">
                  <div class="text-center">
                    <img src={logo} alt="Etows" class="img-fluid" width="75%" />
                  </div>
                  <form>
                    <div class="text-center mt-6" style={{ width: "100%" }}>
                      {/* <a href="https://etows.app:8443/oauth2/authorize" style={{ width: "100%", backgroundColor: 'green', border: 0 }} class="btn btn-lg btn-primary">Login</a> */}
                      <button
                        style={{
                          width: "100%",
                          backgroundColor: "green",
                          border: 0,
                        }}
                        class="btn btn-lg btn-primary"
                        onClick={() => login()}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
ReactDOM.render(
  <AuthProvider authConfig={authConfig}>
    <Notifications options={{ zIndex: 200, top: "30px" }} />
    <NotificationsComponent />
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/admin/company-detail" element={<CompanyDetail />} />
        <Route path="/admin/agency-detail" element={<GovtAgencyDetail />} />
        <Route path="/admin/corp-documents-detail" element={<CorpDetail />} />
        <Route path="/admin/fleet-detail" element={<FleetDetail />} />
        <Route path="/admin/user-profile" component={Profile} />
        <Route path="/admin/allusers" component={AllUsers} />
        <LoginInfo />
      </Switch>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);

reportWebVitals();
// ReactDOM.render(

//   <AuthProvider authConfig={authConfig}>

//     <BrowserRouter>
//       <Switch>
//         <Route path="/" element={<Index />} />
//         <Route path="/admin" render={props => <AdminLayout {...props} />} />
//         <Route path="/admin/company-detail" element={<CompanyDetail />} />
//         <Route path="/admin/user-profile" component={Profile} />
//         {/* <Route exact path="/error" component={Index} /> */}
//         {/* <Route path="/auth" render={props => <AuthLayout {...props} />} /> */}
//         <LoginInfo />
//       </Switch>
//     </BrowserRouter>
//   </AuthProvider>,
//   document.getElementById("root")
// );

// const container = document.getElementById('root');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(
//   <AuthProvider authConfig={authConfig}>

//     <BrowserRouter>
//       <Switch>
//         <Route path="/" element={<Index />} />
//         <Route path="/admin" render={props => <AdminLayout {...props} />} />
//         <Route path="/admin/company-detail" element={<CompanyDetail />} />
//         <Route path="/admin/user-profile" component={Profile} />
//         {/* <Route exact path="/error" component={Index} /> */}
//         {/* <Route path="/auth" render={props => <AuthLayout {...props} />} /> */}
//         <LoginInfo />
//       </Switch>
//     </BrowserRouter>
//   </AuthProvider>
// );
