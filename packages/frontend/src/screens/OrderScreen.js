import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';

import { ORDER_PAYMENT_RESET } from '../constants/orderConstants';
import {
  getOrderDetails,
  payOrder,
} from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const OrderScreen = ({ match }) => {
  const dispatch = useDispatch();

  const orderId = match.params.id;

  const [clientId, setClientId] = useState('sb');

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPayment = useSelector(state => state.orderPayment);
  const { success: successPayment } = orderPayment;

  let itemsPrice = 0;
  if(order) {
    itemsPrice = order.orderItems.reduce((acc, item) => (
      acc + item.price * item.qty
    ), 0);
  }

  const getPayPalConfig = async () => {
    const { data: clientId } = await axios.get('/api/config/paypal');
    setClientId(clientId);
  }

  useEffect(() => {
    getPayPalConfig();
  }, []);

  useEffect(() => {
    if(!order || order._id !== orderId || successPayment) {
      dispatch({ type: ORDER_PAYMENT_RESET });
      dispatch(
        getOrderDetails(orderId)
      );
    }
  }, [dispatch, match, orderId, order, successPayment]);

  const onPaymentSuccessHandler = (paymentResult) => {
    dispatch(
      payOrder(order._id, paymentResult)
    );
  };

  return(
    loading ? (
      <Loader />
    ) : error ? (
      <Message variant="danger">{error}</Message>
    ) : (
      <>
        <h1>Order {order._id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <strong>{order.user.name}</strong><br />
                <address>
                  {order.shippingDetails.address}<br />
                  {order.shippingDetails.city}<br />
                  {order.shippingDetails.postalCode}<br />
                  {order.shippingDetails.country}<br />
                </address>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                <div className="py-2">
                  {order.isDelivered ? (
                    <Message variant="success">Delivered on {order.deliveredAt}</Message>
                  ) : (
                    <Message variant="danger">Not delivered</Message>
                  )}
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <strong>{order.paymentMethod}</strong>
                <div className="py-2">
                  {order.isPaid ? (
                    <Message variant="success">Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not paid</Message>
                  )}
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Items</h2>
                <ListGroup variant="flush">
                {order.orderItems.map(item => (
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
                    <Col>${itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {!successPayment && (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={onPaymentSuccessHandler}
                        options={{ clientId: clientId }}
                      />
                    )}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    )
  );
};

export default OrderScreen;
