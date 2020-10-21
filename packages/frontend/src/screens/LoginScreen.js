import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';

import { login } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

const LoginScreen = ({ history, location }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if(userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(
      login(email, password)
    );
  }

  return(
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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
        <Button type="submit" variant="primary">Sign In</Button>
      </Form>
      <Row className="py-3">
        <Col>
          New customer? <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default LoginScreen;
