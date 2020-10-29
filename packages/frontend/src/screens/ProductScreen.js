import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';

import { fetchProduct, createProductReview } from '../actions/productActions';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const productDetail = useSelector(state => state.productDetail);
  const { loading, error, product } = productDetail;

  const productReviewCreate = useSelector(state => state.productReviewCreate);
  const { error: errorProductReview, success: successProductReview } = productReviewCreate;

  useEffect(() => {
    if(successProductReview) {
      setRating(0);
      setComment('');

      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }

    dispatch(
      fetchProduct(match.params.id)
    );
  }, [dispatch, match, successProductReview]);

  const submitReviewHandler = (event) => {
    event.preventDefault();

    dispatch(
      createProductReview(product, { rating, comment })
    );
  }

  const addToCartHandler = (event) => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  }

  return(
    <>
      <Link to="/" className="btn btn-light my-3">
        Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(event) => { setQty(event.target.value); }}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (value) => {
                                value += 1;
                                return <option key={value} value={value}>{value}</option>
                              }
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="py-5">
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant="flush">
                  {
                    product.reviews.map(review => (
                      <ListGroup.Item key={review._id}>
                        <Rating value={review.rating} />
                        <strong>{review.user.name}</strong>
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))
                  }
                  {userInfo && (
                    <ListGroup.Item>
                      <h3>Write a review</h3>
                      {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
                      <Form onSubmit={submitReviewHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(event) => setRating(event.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                          />
                        </Form.Group>
                        <Button type="submit" variant="primary">Submit</Button>
                      </Form>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  )
};

export default ProductScreen;
