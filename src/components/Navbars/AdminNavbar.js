import { Constants } from "Environment";
import React from "react";
import { Link, useHistory } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Button,
  Container,
  Media,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from "reactstrap";
// import BASE from "environment";
import { getLoggedinApi } from "../../APIstore/apiCalls";
class AdminNavbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: [], modal: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  logout = async () => {
    await localStorage.removeItem('token');
    await localStorage.removeItem('myData');
    await window.localStorage.clear();
    await localStorage.clear();
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
    let f = await localStorage.getItem('token')
    // alert(f)
    this.setState({ modal: false })

    // window.opener = null;
    window.open(`${Constants.endpointUrl8443}/api/action/logout`, '1366002941508', 'width=50,height=50')
    window.location.replace(Constants.url);
    // window.location.reload(true);

  }

  _handleSubmit() {
    // alert(JSON.stringify(this.state.data));
    //Do your action
  }
  async componentDidMount() {
    let getAccess
    setTimeout(async () => {
      getAccess = await localStorage.getItem('accessData');

      console.log("asd", JSON.parse(getAccess));
      let filterData = JSON.parse(getAccess)
      if (filterData) {
        this.setState({ data: filterData }, () => {
          console.log(this.state.data)
        })
        // alert(filterData.roles[0])
        // this.setState({ data: filterData })
        // await this.setState({ data: filterData });
        // console.log(this.state.data);
      }
      else {
        try {
          getLoggedinApi('', async (res) => {
            if (res.sucess) {
              console.log("res.sucess", res.sucess)
              this.setState({ data: res.sucess })
            } else {
              console.log("errrrr")
            }
          });
        } catch (error) {
          console.log("error", error)
        }
      }
    }, 1000)
  }
  render() {
    let { data } = this.state;
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandText}
            </Link>
            {/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Search" type="text" />
                </InputGroup>
              </FormGroup>
            </Form> */}
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("assets/img/theme/team-4-800x800.png")}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 userStyle font-weight-bold" style={{}}>
                        {data?.firstName} {data?.lastName}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Welcome!</h6>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>
                  {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-settings-gear-65" />
                    <span>Settings</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Activity</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-support-16" />
                    <span>Support</span>
                  </DropdownItem> */}
                  <DropdownItem divider />
                  <DropdownItem onClick={() => {
                    // await localStorage.removeItem('token');
                    this.toggle()
                    // navigate.push('/')
                  }} >
                    <i className="ni ni-user-run" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
          {/* delete */}
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Logout</ModalHeader>
            <ModalBody>
              Are you sure want to Logout?
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => { this.logout() }}>Yes</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>No</Button>
            </ModalFooter>
          </Modal>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
