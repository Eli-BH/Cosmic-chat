import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "../slices/user";

const NavbarComponent = () => {
  const userToken = localStorage.getItem("cosmicUser");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser(userToken));
  }, [dispatch, userToken]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Cosmic Chat</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
