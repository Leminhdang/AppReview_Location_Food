import { Link } from "react-router-dom";
// reactstrap components
import { NavbarBrand, Navbar, Container } from "reactstrap";

const AdminNavbar = () => {
  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            {/* <img
              alt="..."
              style={{ width: "10%", height: "10%" }}
              src={require("../../assets/img/logo.jpg").default}
            /> */}
          </NavbarBrand>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
