import React from "react";
// react plugin used to create google maps
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import config from "config";
// reactstrap components
import { Card, Row } from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
import { getOndutyLocations } from "APIstore/apiCalls";
import { errorAlert } from "Theme/utils";

let timerId;
let mapUrl =
  "https://maps.googleapis.com/maps/api/js?key=" + config.GOOGLE_MAP_API_KEY;
const MapWrapper = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={
        props.hidenShow !== "hide" && props.hidenShow !== "uShow" ? 5 : 12
      }
      defaultCenter={{
        lat: props?.lat ? props?.lat : 56.12022,
        lng: props.lng ? props.lng : -106.338832,
      }}
      defaultOptions={{
        scrollwheel: false,
        styles: [
          {
            featureType: "administrative",
            elementType: "labels.text.fill",
            stylers: [{ color: "#444444" }],
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [{ color: "#f2f2f2" }],
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [{ saturation: -100 }, { lightness: 45 }],
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [{ visibility: "simplified" }],
          },
          {
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [{ color: "#5e72e4" }, { visibility: "on" }],
          },
        ],
      }}
    >
      {props.hidenShow !== "hide" || props.hidenShow == "uShow" ? (
        <>
          {props?.markers?.map(({ id, name, position }) => (
            <Marker
              key={id}
              position={{
                lat: position?.lat ? props?.lat : "43.653225",
                lng: position?.lng ? position?.lng : "-79.383186",
              }}
            >
              <InfoWindow onCloseClick={() => {}}>
                <div>{name}</div>
              </InfoWindow>
            </Marker>
          ))}
        </>
      ) : props.showTruck == "towtruck" ? (
        <Marker
          position={{
            lat: props?.lat ? props?.lat : "43.653225",
            lng: props?.lng ? props?.lng : "-79.383186",
          }}
          icon={{
            url: require("assets/img/brand/towtruck.jpeg"),
            scaledSize: { width: 40, height: 40 },
          }}
        />
      ) : (
        <Marker
          position={{
            lat: props?.lat ? props?.lat : "43.653225",
            lng: props?.lng ? props?.lng : "-79.383186",
          }}
        />
      )}
    </GoogleMap>
  ))
);

class Maps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hideShow: "show",
      uHideShow: null,
      accessUserData:
        localStorage.getItem("accessData") != null &&
        localStorage.getItem("accessData") != undefined
          ? JSON.parse(localStorage.getItem("accessData"))
          : null,
      // loggedUserData:localStorage.getItem('loggedData')!=null && localStorage.getItem('loggedData')!=undefined?JSON.parse(localStorage.getItem('loggedData')):null
    };
  }
  loadData = () => {
    try {
      getOndutyLocations(
        this.state?.accessUserData != null
          ? this.state.accessUserData?.companyId
          : "",
        async (res) => {
          if (res.sucess) {
            this.setState({ markers: res.sucess });
          } else {
            // if(this.stage.loggedUserData!=null && this.stage.loggedUserData.role!="ADMIN") errorAlert('Something went wrong 1');
          }
        }
      );
    } catch (error) {
      errorAlert(error);
    }
  };
  componentDidMount() {
    this.setState({ hideShow: this.props.data });
    if (this.props.dataU) this.setState({ uHideShow: this.props.dataU });
    if (this.props.data !== "hide" || this.props.dataU == "a") {
      this.loadData();
      timerId = setInterval(this.loadData, 5000);
    } else {
      clearTimeout(timerId);
    }
  }
  componentWillUnmount() {
    clearTimeout(timerId);
  }
  render() {
    const { lat, lng, show } = this.props;

    const { hideShow, uHideShow, markers } = this.state;
    return (
      <>
        {hideShow !== "hide" && <Header />}
        <Row className={hideShow !== "hide" ? "map-main" : ""}>
          <div className="col">
            <Card className="shadow border-0">
              <MapWrapper
                showTruck={show}
                markers={markers}
                hidenShow={uHideShow == null ? hideShow : "uShow"}
                lat={lat ? lat : 43.64839}
                lng={lng ? lng : -79.87626}
                googleMapURL={mapUrl}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={
                  <div
                    style={{ height: `600px` }}
                    className={
                      hideShow !== "hide" ? "map-height" : "map-canvas"
                    }
                    id={hideShow !== "hide" ? "map-height" : "map-canvas"}
                  />
                }
                mapElement={
                  <div style={{ height: `100%`, borderRadius: "inherit" }} />
                }
              />
            </Card>
          </div>
        </Row>
      </>
    );
  }
}

export default Maps;
