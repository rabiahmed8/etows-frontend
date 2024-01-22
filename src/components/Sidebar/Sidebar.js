import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import '../../appstyle.css'

import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { FaDelicious, FaUserCog, } from 'react-icons/fa';
import { AiFillSetting } from 'react-icons/ai';
import { BsFillPinMapFill, BsTruck } from 'react-icons/bs';
import { FiUserCheck, FiUserPlus } from 'react-icons/fi';
import { GiMedallist } from 'react-icons/gi';
import { ImProfile } from 'react-icons/im';
import { VscLayersActive } from 'react-icons/vsc';
import { SiGoogletagmanager } from 'react-icons/si';

import 'react-pro-sidebar/dist/css/styles.css';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col, Modal, ModalHeader, ModalBody, ModalFooter,
} from "reactstrap";
import config from "config";
import './style.scss';
import { getLoggedinApi } from "../../APIstore/apiCalls";
import { get } from "react-hook-form";
import { Constants } from "Environment";
class Sidebar extends React.Component {

  state = {
    collapseOpen: false,
    data: []
  };
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
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
    this.setState({ modal: false })
    window.open(`${Constants.endpointUrl8443}/api/action/logout`, '1366002941508', 'width=50,height=50')
    window.location.replace(Constants.url);
    // window.location.reload(true);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };
  // creates the links that appear in the left menu / Sidebar
  createLinks = routes => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
          >
            <i style={{ color: '#fff' }} className={prop.icon} />
            <span style={{ color: '#fff' }}>{prop.name}</span>
          </NavLink>
        </NavItem>
      );
    });
  };
  async componentDidMount() {
    let getAccess
    setTimeout(async () => {
      getAccess = await localStorage.getItem('accessData');

      console.log("asd", JSON.parse(getAccess));
      let filterData = JSON.parse(getAccess)
      if (filterData) {
        // alert(filterData.roles[0])
        this.setState({ data: filterData.roles[0] })
        // window.location.reload()
      }
      else {
        try {
          getLoggedinApi('', async (res) => {
            if (res.sucess) {
              console.log("res.dsgdf", res.sucess.roles[0])
              this.setState({ data: res.sucess.roles[0] })
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
    const { bgColor, routes, logo } = this.props;

    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Brand */}
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
              />
            </NavbarBrand>
          ) : null}
          {/* User */}
          <Nav className="align-items-center d-md-none">
            <UncontrolledDropdown nav>
              <DropdownToggle nav className="nav-link-icon">
                <i className="ni ni-bell-55" />
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="navbar-default_dropdown_1"
                className="dropdown-menu-arrow"
                right
              >
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("assets/img/theme/team-1-800x800.jpg")}
                    />
                  </span>
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
                <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* Collapse */}
          <Collapse navbar isOpen={this.state.collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            {/* Form */}
            <Form className="mt-4 mb-3 d-md-none">
              <InputGroup className="input-group-rounded input-group-merge">
                <Input
                  aria-label="Search"
                  className="form-control-rounded form-control-prepended"
                  placeholder="Search"
                  type="search"
                />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <span className="fa fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Form>
            {/* Navigation */}
            {/* <Navigation
              // you can use your own router's api to get pathname
              activeItemId="/management/members"
              onSelect={({ itemId }) => {
                // maybe push to the route
              }}
              items={[
                {
                  title: 'Management Area',
                  itemId: '/management',
                  // elemBefore: () => <i className="ni ni-bell-55" />,
                  subNav: [
                    {
                      title: 'Projects',
                      itemId: '/management/projects',
                    },
                    {
                      title: 'Members',
                      itemId: '/management/members',
                    },
                  ],
                },
                {
                  title: 'Another Item',
                  itemId: '/another',
                  subNav: [
                    {
                      title: 'Teams',
                      itemId: '/management/teams',
                    },
                  ],
                },
              ]}
            /> */}
            {/* <Nav navbar>{this.createLinks(routes)}</Nav> */}
            <ProSidebar>
              <SidebarHeader>
                {/* <div
                  style={{
                    padding: '0px 24px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: 14,
                    letterSpacing: '1px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {config.appName}
                </div> */}
                <Form className="mt-4 mr-1">
                  <InputGroup className="">
                    <Input
                      aria-label="Search"
                      className=""
                      placeholder="Search"
                      type="search"
                    />
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <span className="fa fa-search" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Form>
                {this.state.data == 'TOW_ADMIN' && (
                  <Button style={{ width: "85%" }} onClick={() => { }} className="my-4 btn-margin" color="primary" type="button">
                    <Link to={"/admin/create-dispatch-request"}><span style={{ color: "#fff" }}>{config.createDispatchRequest}</span></Link>
                  </Button>
                )}
              </SidebarHeader>

              <SidebarContent>
                <Menu iconShape="circle">
                  {/* {alert(window.location.pathname)} */}
                  {(this.state.data == 'DRIVER' || this.state.data == 'POLICE') && (
                    <>
                      <SubMenu
                        suffix={<span className="badge yellow">1</span>}
                        title='Settings'
                        icon={<AiFillSetting />}
                      >
                        <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/user-profile' ? '#485368' : '' }} icon={<ImProfile />}><Link to={"/admin/user-profile"}>{config.userprofile}</Link></MenuItem>
                      </SubMenu>
                      <MenuItem onClick={() => {
                        // await localStorage.removeItem('token');
                        this.toggle()
                        // navigate.push('/')
                      }}
                        icon={<FaDelicious />}>
                        {/* <Link to={"/admin/index"}> */}
                        Logout
                        {/* </Link> */}
                      </MenuItem>
                    </>
                  )}
                  {this.state.data == 'STAFF' && (
                    <>
                      <SubMenu
                        suffix={<span className="badge yellow">1</span>}
                        title='Settings'
                        icon={<AiFillSetting />}
                      >
                        <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/user-profile' ? '#485368' : '' }} icon={<ImProfile />}><Link to={"/admin/user-profile"}>{config.userprofile}</Link></MenuItem>
                      </SubMenu>
                      <MenuItem onClick={() => {
                        // await localStorage.removeItem('token');
                        this.toggle()
                        // navigate.push('/')
                      }}
                        icon={<FaDelicious />}>
                        {/* <Link to={"/admin/index"}> */}
                        Logout
                        {/* </Link> */}
                      </MenuItem>
                    </>
                  )}
                  {this.state.data == 'POLICE_ADMIN' && (
                    <>
                      <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/index' ? '#485368' : '' }}
                        icon={<FaDelicious />}>
                        <Link to={"/admin/index"}>
                          {config.dashbaord}
                        </Link>
                      </MenuItem>
                      <SubMenu
                        suffix={<span className="badge yellow">3</span>}
                        title='Users'
                        icon={<FiUserCheck />}
                      >
                        <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/allusers' ? '#485368' : '' }}
                          icon={<FaUserCog />}>
                          <Link to={"/admin/allusers"}>
                            {config.allUsers}
                          </Link>
                        </MenuItem>
                        <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/activeusers' ? '#485368' : '' }}
                          icon={<VscLayersActive />}>
                          <Link to={"/admin/activeusers"}>{config.activeUsers}</Link>
                        </MenuItem>
                        {this.state.data != 'ADMIN' && (
                          <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/create-user' ? '#485368' : '' }}
                            icon={<FiUserCheck />}>
                            <Link to={"/admin/create-user"}>{config.createUsers}</Link>
                          </MenuItem>
                        )}
                      </SubMenu>
                      <SubMenu
                        suffix={<span className="badge yellow">1</span>}
                        title='Settings'
                        icon={<AiFillSetting />}
                      >
                        <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/user-profile' ? '#485368' : '' }} icon={<ImProfile />}><Link to={"/admin/user-profile"}>{config.userprofile}</Link></MenuItem>
                      </SubMenu>
                      <MenuItem onClick={() => {
                        // await localStorage.removeItem('token');
                        this.toggle()
                        // navigate.push('/')
                      }}
                        icon={<FaDelicious />}>
                        {/* <Link to={"/admin/index"}> */}
                        Logout
                        {/* </Link> */}
                      </MenuItem>
                    </>
                  )}
                  {(this.state.data == 'ADMIN' || this.state.data == 'LE_ADMIN') && (
                    <>
                      <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/index' ? '#485368' : '' }}
                        icon={<FaDelicious />}>
                        <Link to={"/admin/index"}>
                          {config.dashbaord}
                        </Link>
                      </MenuItem>
                      <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/company' ? '#485368' : '' }}
                        icon={<FaDelicious />}>
                        <Link to={"/admin/company"}>
                          Company
                        </Link>
                      </MenuItem>

                      {/* <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/logs' ? '#485368' : '' }}
                        icon={<FaDelicious />}>
                        <Link to={"/admin/logs"}>
                          Logs
                        </Link>
                      </MenuItem> */}
                      <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/jurisdiction' ? '#485368' : '' }}
                        icon={<FaDelicious />}>
                        <Link to={"/admin/jurisdiction"}>
                          Jurisdiction
                        </Link>
                      </MenuItem>
                      <SubMenu
                        suffix={<span className="badge yellow">3</span>}
                        title='Users'
                        icon={<FiUserCheck />}
                      >
                        <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/allusers' ? '#485368' : '' }}
                          icon={<FaUserCog />}>
                          <Link to={"/admin/allusers"}>
                            {config.allUsers}
                          </Link>
                        </MenuItem>
                        <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/activeusers' ? '#485368' : '' }}
                          icon={<VscLayersActive />}>
                          <Link to={"/admin/activeusers"}>{config.activeUsers}</Link>
                        </MenuItem>
                        {this.state.data != 'ADMIN' && (
                          <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/create-user' ? '#485368' : '' }}
                            icon={<FiUserCheck />}>
                            <Link to={"/admin/create-user"}>{config.createUsers}</Link>
                          </MenuItem>
                        )}
                      </SubMenu>
                      <SubMenu
                        suffix={<span className="badge yellow">1</span>}
                        title='Settings'
                        icon={<AiFillSetting />}
                      >
                        <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/user-profile' ? '#485368' : '' }} icon={<ImProfile />}><Link to={"/admin/user-profile"}>{config.userprofile}</Link></MenuItem>
                      </SubMenu>
                      <MenuItem onClick={() => {
                        // await localStorage.removeItem('token');
                        this.toggle()
                        // navigate.push('/')
                      }}
                        icon={<FaDelicious />}>
                        {/* <Link to={"/admin/index"}> */}
                        Logout
                        {/* </Link> */}
                      </MenuItem>
                    </>
                  )}
                  {/* {(this.state.data == 'TOW_ADMIN') && (
                    <MenuItem style={{ backgroundColor: window.location.pathname === '/court-proceeding' ? '#485368' : '' }}
                      icon={<FaDelicious />}>
                      <Link to={"/admin/court-proceeding"}>
                        Court Proceeding
                      </Link>
                    </MenuItem>
                  )} */}
                  {(this.state.data != 'ADMIN' || this.state.data == 'LE_ADMIN') || this.state.data == 'TOW_ADMIN' && (
                    <>
                      <SubMenu
                        suffix={<span className="badge yellow">1</span>}
                        title='Settings'
                        icon={<AiFillSetting />}
                      >
                        <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/user-profile' ? '#485368' : '' }} icon={<ImProfile />}><Link to={"/admin/user-profile"}>{config.userprofile}</Link></MenuItem>
                      </SubMenu>
                      <MenuItem onClick={() => {
                        // await localStorage.removeItem('token');
                        this.toggle()
                        // navigate.push('/')
                      }}
                        icon={<FaDelicious />}>
                        {/* <Link to={"/admin/index"}> */}
                        Logout
                        {/* </Link> */}
                      </MenuItem>
                    </>
                  )}

                  {this.state.data == 'TOW_ADMIN' && (
                    <>
                      <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/index' ? '#485368' : '' }}
                        icon={<FaDelicious />}>
                        <Link to={"/admin/index"}>
                          {config.dashbaord}
                        </Link>
                      </MenuItem>
                      <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/alljobs' ? '#485368' : '' }}
                        icon={<GiMedallist />}>
                        <Link to={"/admin/alljobs"}>{config.allJobs}</Link>
                      </MenuItem>
                      <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/availabledrivers' ? '#485368' : '' }}
                        icon={<BsTruck />}>
                        <Link to={"/admin/availabledrivers"}>{config.availableDrivers}</Link>
                      </MenuItem>
                      <SubMenu
                        suffix={<span className="badge yellow">2</span>}
                        title={config.staff}
                        icon={<FaDelicious />}
                      >
                        <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/driver-detail' ? '#485368' : '' }} icon={<ImProfile />}><Link to={"/admin/driver-detail"}>Tow Driver</Link></MenuItem>
                        <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/other-staff' ? '#485368' : '' }} icon={<ImProfile />}><Link to={"/admin/other-staff"}>Other Staff</Link></MenuItem>
                      </SubMenu>
                      <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/fleet' ? '#485368' : '' }} icon={<ImProfile />}><Link to={"/admin/fleet"}>{config.fleet}</Link></MenuItem>
                      <SubMenu
                        suffix={<span className="badge yellow">3</span>}
                        title='Management Area'
                        icon={<SiGoogletagmanager />}
                      >
                        <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/govt-agency' ? '#485368' : '' }}> <Link to={"/admin/govt-agency"}>{config.govtAgency} </Link></MenuItem>
                        {/* <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/corporate-details' ? '#485368' : '' }}> <Link to={"/admin/corporate-details"}>{config.CorporateDetails} </Link></MenuItem> */}

                        <SubMenu
                          suffix={<span className="badge yellow">1</span>}
                          title='Corporate Detail'

                        >
                          <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/corp-documents-detail' ? '#485368' : '' }} icon={<ImProfile />}><Link to={"/admin/corp-documents-detail"}>{config.CorporateDetails}</Link></MenuItem>

                        </SubMenu>


                        {/* <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/fleet' ? '#485368' : '' }}> <Link to={"/admin/fleet"}>{config.fleet} </Link></MenuItem> */}


                        <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/insurance-detail' ? '#485368' : '' }}> <Link to={"/admin/insurance-detail"}>{config.InsuranceInformation} </Link></MenuItem>
                        {/* <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/impounded-vehicle' ? '#485368' : '' }}> <Link to={"/admin/impounded-vehicle"}>{config.TowImpoundedVehicle} </Link></MenuItem> */}
                        {/* <SubMenu
                          suffix={<span className="badge yellow">2</span>}
                          title={config.TowImpoundedVehicle}

                        >
                          <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/impounded-vehicle' ? '#485368' : '' }} icon={<ImProfile />}><Link to={"/admin/impounded-vehicle"}>Tow driver</Link></MenuItem>
                          <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/impounded-vehicle' ? '#485368' : '' }} icon={<ImProfile />}><Link to={"/admin/impounded-vehicle"}>By Pound Admin</Link></MenuItem>
                        </SubMenu> */}
                      </SubMenu>

                      <SubMenu
                        suffix={<span className="badge yellow">3</span>}
                        title='Users'
                        icon={<FiUserCheck />}
                      >
                        <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/allusers' ? '#485368' : '' }}
                          icon={<FaUserCog />}>
                          <Link to={"/admin/allusers"}>
                            {config.allUsers}
                          </Link>
                        </MenuItem>
                        <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/activeusers' ? '#485368' : '' }}
                          icon={<VscLayersActive />}>
                          <Link to={"/admin/activeusers"}>{config.activeUsers}</Link>
                        </MenuItem>
                        {this.state.data != 'ADMIN' && (
                          <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/create-user' ? '#485368' : '' }}
                            icon={<FiUserCheck />}>
                            <Link to={"/admin/create-user"}>{config.createUsers}</Link>
                          </MenuItem>
                        )}
                      </SubMenu>

                      <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/maps' ? '#485368' : '' }}
                        icon={<BsFillPinMapFill />}>
                        <Link to={"/admin/maps"}>
                          {config.map}
                        </Link>
                      </MenuItem>


                      <SubMenu
                        suffix={<span className="badge yellow">1</span>}
                        title='Settings'
                        icon={<AiFillSetting />}
                      >
                        <MenuItem style={{ backgroundColor: window.location.pathname === '/admin/user-profile' ? '#485368' : '' }} icon={<ImProfile />}><Link to={"/admin/user-profile"}>{config.userprofile}</Link></MenuItem>
                      </SubMenu>
                    </>
                  )}
                </Menu>

              </SidebarContent>

              {/* <SidebarContent>
                <Menu iconShape="circle">
                  <MenuItem
                    icon={<FaTachometerAlt />}>
                    {config.dashbaord}
                  </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                  <SubMenu
                    suffix={<span className="badge yellow">5</span>}
                    title='Management Area'
                    icon={<FaRegLaughWink />}
                  >
                    <MenuItem>{config.govtAgency}</MenuItem>
                    <MenuItem>{config.towVehicle}</MenuItem>
                    <MenuItem>{config.staff}</MenuItem>
                    <MenuItem>{config.InsuranceInformation}</MenuItem>
                    <MenuItem>{config.TowImpoundedVehicle}</MenuItem>
                  </SubMenu>
                  <Menu iconShape="circle">
                    <MenuItem
                      icon={<FaTachometerAlt />}>
                      {config.map}
                    </MenuItem>
                  </Menu>
                  <Menu iconShape="circle">
                    <MenuItem
                      icon={<FaTachometerAlt />}>
                      {config.allUsers}
                    </MenuItem>
                  </Menu>
                  <Menu iconShape="circle">
                    <MenuItem
                      icon={<FaTachometerAlt />}>
                      {config.activeUsers}
                    </MenuItem>
                  </Menu>
                  <Menu iconShape="circle">
                    <MenuItem
                      icon={<FaTachometerAlt />}>
                      {config.allJobs}
                    </MenuItem>
                  </Menu>
                  <Menu iconShape="circle">
                    <MenuItem
                      icon={<FaTachometerAlt />}>
                      {config.availableDrivers}
                    </MenuItem>
                  </Menu>
                  <Menu iconShape="circle">
                    <MenuItem
                      icon={<FaTachometerAlt />}>
                      {config.createDispatchRequest}
                    </MenuItem>
                  </Menu>
                  <Menu iconShape="circle">
                    <MenuItem
                      icon={<FaTachometerAlt />}>
                      {config.createUsers}
                    </MenuItem>
                  </Menu>

                  <SubMenu

                    title='Settings'
                    icon={<FaHeart />}
                  >
                    <MenuItem>{config.userprofile}</MenuItem>
                  </SubMenu>

                </Menu>
              </SidebarContent> */}

              <SidebarFooter style={{ textAlign: 'center' }}>
                <div
                  className="sidebar-btn-wrapper"
                  style={{
                    padding: '0px 24px',
                  }}
                >
                  {/* <a
                    href="https://github.com/azouaoui-med/react-pro-sidebar"
                    target="_blank"
                    className="sidebar-btn"
                    rel="noopener noreferrer"
                  >
                    <FaGithub />
                    <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      title
                    </span>
                  </a> */}
                </div>
              </SidebarFooter>
            </ProSidebar>
            {/* Divider */}
            {/* <hr className="my-3" />
            <h6 className="navbar-heading text-muted">Documentation</h6>
            <Nav className="mb-md-3" navbar>
              <NavItem>
                <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/overview?ref=adr-admin-sidebar">
                  <i className="ni ni-spaceship" />
                  Getting started
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/colors?ref=adr-admin-sidebar">
                  <i className="ni ni-palette" />
                  Foundation
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/alerts?ref=adr-admin-sidebar">
                  <i className="ni ni-ui-04" />
                  Components
                </NavLink>
              </NavItem>
            </Nav> */}

          </Collapse>
        </Container>
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
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

export default Sidebar;
