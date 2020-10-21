import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';

import { register } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

const RegisterScreen = ({ history, location }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if(userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (event) => {
    event.preventDefault();

    if(password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      setMessage(null);
      dispatch(
        register(name, email, password)
      );
    }
  }

  return(
    <FormContainer>
      <h1>Register an Account</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            value={name}
            onChange={(event) => { setName(event.target.value); }}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(event) => { setEmail(event.target.value); }}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(event) => { setPassword(event.target.value); }}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(event) => { setConfirmPassword(event.target.value); }}
          />
        </Form.Group>
        <Button type="submit" variant="primary">Register</Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Sign In</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default RegisterScreen;
