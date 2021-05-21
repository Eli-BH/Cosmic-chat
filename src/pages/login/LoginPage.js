import "./login.scss";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogin, authSelector } from "../../slices/auth";

const LoginPage = () => {
  const email = useRef();
  const password = useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  const { hasError } = useSelector(authSelector);

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = {
      email: email.current.value,
      password: password.current.value,
    };

    dispatch(authLogin(formData));

    if (hasError) {
      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      history.push("/");
    }
  };
  return (
    <div className="login">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
      <div className="loginWrapper">
        <Container>
          <h3 className="heading">Login for Cosmic Chat</h3>
          <Form className="loginForm" onSubmit={handleLogin}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  ref={email}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridPassword1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Password..."
                ref={password}
                type="password"
              />
            </Form.Group>

            <Form.Row>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <p style={{ margin: "auto 0" }} variant="info" className="ml-5">
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
            </Form.Row>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default LoginPage;
