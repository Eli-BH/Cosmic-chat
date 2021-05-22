import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser, userSelector } from "../slices/user";
import { logout } from "../slices/auth";
import { useHistory } from "react-router-dom";

const NavbarComponent = () => {
  const userToken = localStorage.getItem("cosmicUser");
  const dispatch = useDispatch();
  const history = useHistory();

  const { userData } = useSelector(userSelector);

  useEffect(() => {
    dispatch(getCurrentUser(userToken));
  }, [dispatch, userToken]);

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.clear();
    history.push("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Cosmic Chat</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/">
            <button type="button" className="btn btn-outline-info">
              Home
            </button>
          </Nav.Link>
          <Nav.Link href="/login">
            {userData ? (
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button type="button" className="btn btn-outline-info">
                Login
              </button>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
