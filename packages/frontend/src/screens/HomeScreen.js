import React, { useEffect } from 'react';
import { useDispatch, useSelector }  from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import ProductCarousel from '../components/ProductCarousel';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(
      listProducts(keyword, pageNumber)
    );
  }, [dispatch, keyword, pageNumber]);

  return(
    <>
      <div className="my-3">
        {!keyword ? <ProductCarousel /> : <Link to="/" className="btn btn-primary">Back</Link>}
      </div>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {
              products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))
            }
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
