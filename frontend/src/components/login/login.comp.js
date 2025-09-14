// Importing necessary hooks and components
import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { loginPending, loginSuccess, loginFail } from "./loginSlice"; // Redux actions
import { useDispatch, useSelector } from 'react-redux'; // For interacting with Redux store
import { userLogin } from "../../api/userApi"; // API call to login user
import { useNavigate } from 'react-router-dom'; // For programmatic navigation
import { getUserProfile } from '../../page/dashboard/userAction'; // Redux action to fetch user profile

// Login component starts
const Login = ({ formSwitcher }) => {
  // React local state to handle form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();  // To dispatch actions to Redux store
  const navigate = useNavigate();  // To redirect user after login

  // Extracting values from Redux state
  const { isLoading, isAuth, error } = useSelector(state => state.login);

  // useEffect to redirect to dashboard if already logged in (JWT token present)
  useEffect(() => {
    if (sessionStorage.getItem('accessJWT')) {
      navigate("/dashboard");
    }
  }, [navigate, isAuth]);

  // Handle changes in input fields
  const handleOnchange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  // Form submit handler
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!email || !password) {
      return alert("Fill up all form fields");
    }

    dispatch(loginPending()); // Set loading = true in Redux

    try {
      // Call the login API with credentials
      const isAuth = await userLogin({ email, password });

      // If API returns error, show it
      if (isAuth.status === 'error') {
        return dispatch(loginFail(isAuth.message)); // Set error in Redux
      }

      dispatch(loginSuccess());         // Set isAuth = true in Redux
      dispatch(getUserProfile());       // Fetch and store user profile
      navigate("/dashboard");           // Redirect user to dashboard
      console.log(isAuth);
    } catch (error) {
      dispatch(loginFail(error.message)); // Handle network or server error
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className='text-info text-center'>Client Login</h1>
          <hr />
          
          {/* Show error if exists */}
          {error && <Alert variant='danger'>{error}</Alert>}

          {/* Login Form */}
          <Form autoComplete='off' onSubmit={handleOnSubmit}>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={handleOnchange}
                placeholder="Enter Email"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={handleOnchange}
                placeholder="Enter Password"
                required
              />
            </Form.Group>

            <Button type="submit">Login</Button>

            {/* Show loading spinner while API call is in progress */}
            {isLoading && <Spinner variant='primary' animation='border' />}
          </Form>

          <hr />
        </Col>
      </Row>

      {/* Forgot password link */}
      <div className="text-center mt-3">
        <a href="/password-reset" className="btn btn-outline-info btn-sm rounded-pill px-4 shadow-sm">
          Forgot Password?
        </a>
      </div>
      <div className="text-center mt-3">
        Are you new here? {' '}
        <a href="/registration" className="btn btn-outline-info btn-sm rounded-pill px-4 shadow-sm">
          Register Now
        </a>
      </div>
    </Container>
  );
};

export default Login;
