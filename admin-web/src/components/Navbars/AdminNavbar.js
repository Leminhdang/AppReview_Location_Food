import { Link } from "react-router-dom";
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
  Container,
  Media,
} from "reactstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

const AdminNavbar = (props) => {
  const [data, setData] = useState();
  const history = useHistory();

  const updateNoti = (item, id) => {
    axios({
      method: "POST",
      url: "http://localhost:8080/admin/updateStatusReport",
      data: { id },
      timeout: 5000,
    }).catch((err) => console.log(err));

    history.push({
      pathname: "/admin/detail",
      state: {
        // location state
        data: item,
      },
    });
  };

  useEffect(() => {
    const getData = () => {
      axios({
        method: "POST",
        url: "http://localhost:8080/admin/getNotificationReport",
        timeout: 5000,
      })
        .then((response) => setData(response.data.data))
        .catch((err) => console.log(err));
    };
    getData();
  }, []);
  console.log(data);

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <UncontrolledDropdown>
              <DropdownToggle
                href="#pablo"
                role="button"
                size="sm"
                color=""
                onClick={(e) => e.preventDefault()}
              >
                <i
                  className="ni ni-bell-55"
                  style={{ color: "#fff", position: "relative" }}
                />

                {data ? (
                  <i
                    className="fa fa-circle"
                    style={{
                      color: "red",
                      position: "absolute",
                      fontSize: 8,
                      right: 24,
                      top: 10,
                    }}
                  />
                ) : (
                  <></>
                )}
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                {data &&
                  data.map((item) => {
                    return (
                      <tr>
                        <td
                          style={{ padding: 8, fontSize: 12, color: "#000" }}
                          onClick={(e) => updateNoti(item, item.idReport)}
                        >
                          Bài viết{" "}
                          <a style={{ fontSize: 12, fontWeight: "bold" }}>
                            {item.title}
                          </a>{" "}
                          vừa bị báo cáo bởi{" "}
                          <a style={{ fontSize: 12, fontWeight: "bold" }}>
                            {item.fullname}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Form>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={
                        require("../../assets/img/theme/team-4-800x800.jpg")
                          .default
                      }
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">Admin</span>
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
                <DropdownItem divider />
                <DropdownItem
                  href="#pablo"
                  onClick={() => (window.location.href = "/auth/login")}
                >
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
