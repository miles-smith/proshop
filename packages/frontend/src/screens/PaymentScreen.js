import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import { savePaymentDetails } from '../actions/cartActions';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { shippingDetails } = cart;

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(
      savePaymentDetails(paymentMethod)
    );

    history.push("/placeorder");
  };

  if(!shippingDetails) {
    history.push("/shipping");
  }

  return(
    <FormContainer>
      <CheckoutSteps stepOne stepTwo stepThree />
      <h1>Payment</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="paymentMethod">
          <Form.Label as="legend">Select Method</Form.Label>
            <Form.Check
              type="radio"
              id="paypal"
              name="paymentMethod"
              label="PayPal or Credit Card"
              value="PayPal"
              checked
              onChange={(event) => setPaymentMethod(event.target.value)}
            />
        </Form.Group>
        <Button type="submit" variant="primary">Continue</Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
