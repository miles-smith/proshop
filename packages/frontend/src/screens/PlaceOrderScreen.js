import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';

import { createOrder } from '../actions/orderActions';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state =>  state.cart);
  const { cartItems } = cart;

  const orderCreate = useSelector(state => state.orderCreate);
  const { order, success, error } = orderCreate;

  cart.itemsPrice = cartItems.reduce((acc, item) => (
    acc + item.price * item.qty
  ), 0);

  cart.shippingPrice = +(cart.itemsPrice > 100 ? 0 : 10).toFixed(2);
  cart.taxPrice = +(0.15 * cart.itemsPrice).toFixed(2);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  useEffect(() => {
    if(success) {
      history.push(`/orders/${order._id}`);
    } else {

    }
  }, [history, success, order]);

  const placeOrderHandler = (event) => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingDetails: cart.shippingDetails,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  }

  return(
    <>
      <CheckoutSteps stepOne stepTwo stepThree stepFour />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <address>
                <strong>Address: </strong>
                {[
                  cart.shippingDetails.address,
                  cart.shippingDetails.city,
                  cart.shippingDetails.postalCode,
                  cart.shippingDetails.country
                ].join(", ")}
              </address>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>{cart.paymentMethod}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                {cartItems.map(item => (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={1}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded />
                      </Col>
                      <Col>
                        <Link to={`/prouducts/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
