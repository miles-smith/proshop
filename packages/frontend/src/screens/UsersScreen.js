import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { getUsers, deleteUser } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const UsersScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector(state => state.userList);
  const { users, loading, error } = userList;

  const userDelete = useSelector(state => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if(userInfo && userInfo.isAdmin) {
      dispatch(
        getUsers()
      );
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, successDelete]);

  const onDeleteHandler = (id) => {
    if(window.confirm('Are you sure?')) {
      dispatch(
        deleteUser(id)
      );
    }
  };

  return(
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table size={"sm"} responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                  <td>
                    {
                      user.isAdmin ?
                        <i className="fas fa-check text-success" /> :
                        <i className="fas fa-times text-danger" />
                    }
                  </td>
                  <td>
                    <LinkContainer to={`/user/${user._id}/edit`}>
                      <Button className="btn-sm">
                        <i className="fas fa-edit" />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => onDeleteHandler(user._id)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
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

export default UsersScreen;
