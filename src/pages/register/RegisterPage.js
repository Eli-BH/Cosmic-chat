import "./register.scss";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authRegister, authSelector } from "../../slices/auth";

const RegisterPage = () => {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const confirmPass = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  const { hasError } = useSelector(authSelector);

  hasError &&
    hasError(
      toast.error("Passwords do not match", {
        position: hasError,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    );

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = {
      email: email.current.value,
      username: username.current.value,
      password: password.current.value,
    };

    if (confirmPass.current.value === password.current.value) {
      dispatch(authRegister(formData));
      history.push("/");
    } else {
      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="register">
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
      <div className="registerWrapper">
        <Container>
          <h3 className="heading">Register for Cosmic Chat</h3>
          <Form className="registerForm" onSubmit={handleRegister}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  ref={email}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  ref={username}
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

            <Form.Group controlId="formGridPassword2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                ref={confirmPass}
              />
            </Form.Group>

            <Form.Row>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <p style={{ margin: "auto 0" }} variant="info" className="ml-5">
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </Form.Row>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default RegisterPage;
