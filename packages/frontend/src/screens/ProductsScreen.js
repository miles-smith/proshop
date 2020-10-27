import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { listProducts, deleteProduct } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductsScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector(state => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  useEffect(() => {
    if(userInfo && userInfo.isAdmin) {
      dispatch(
        listProducts()
      );
    } else {
      history.push('/login');
    }
  }, [history, dispatch, userInfo, successDelete]);

  const createProductHandler = (product) => {
    // TODO:
  };

  const deleteProductHandler = (id) => {
    if(window.confirm("Are you sure?")) {
      dispatch(
        deleteProduct(id)
      );
    }
  };

  return(
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button
            className="my-3"
            onClick={createProductHandler}
          >
            <i className="fas fa-plus" /> Add Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table size="sm" responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              products.map(product => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                      <Button className="btn-sm">
                        <i className="fas fa-edit" />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteProductHandler(product._id)}
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

export default ProductsScreen;
