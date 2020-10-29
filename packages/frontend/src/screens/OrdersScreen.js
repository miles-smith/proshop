import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { getOrders } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const OrdersScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const orderList = useSelector(state => state.orderList);
  const { loading, error, orders } = orderList;

  useEffect(() => {
    if(!userInfo && userInfo.isAdmin) {
      history.push('/login');
    }

    dispatch(
      getOrders()
    );
  }, [history, dispatch, userInfo]);

  return(
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table size="sm" responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>
                    {
                      order.isPaid ?
                        order.paidAt.substring(0, 10) :
                        <i className="fas fa-times text-danger" />
                    }
                  </td>
                  <td>
                    {
                      order.isDelivered ?
                        order.deliveredAt.substring(0, 10) :
                        <i className="fas fa-times text-danger" />
                    }
                  </td>
                  <td>
                    <LinkContainer to={`/orders/${order._id}`}>
                      <Button className="btn-sm">Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrdersScreen;
