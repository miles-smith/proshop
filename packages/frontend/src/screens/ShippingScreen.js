import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import { saveShippingDetails } from '../actions/cartActions';
import FormContainer from '../components/FormContainer';

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { shippingDetails } = cart;

  const [address, setAddress] = useState(shippingDetails.address);
  const [city, setCity] = useState(shippingDetails.city);
  const [postalCode, setPostalCode] = useState(shippingDetails.postalCode);
  const [country, setCountry] = useState(shippingDetails.country);

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(
      saveShippingDetails({ address, city, postalCode, country })
    );

    history.push('/payment');
  };

  return(
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
           />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="string"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            value={postalCode}
            onChange={(event) => setPostalCode(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="string"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">Continue</Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
