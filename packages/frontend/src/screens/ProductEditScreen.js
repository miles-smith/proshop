import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import { fetchProduct, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

const ProductEditScreen = ({ history, match }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetail);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector(state => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

  useEffect(() => {
    if(successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/products");
    } else {
      if(product._id !== productId) {
        dispatch(
          fetchProduct(productId)
        );
      } else {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
      }
    }
  }, [history, dispatch, productId, product, successUpdate]);

  const uploadFileHandler = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();

    formData.append('image', file);

    setUploading(true);

    try {
      const config = {
        "Content-Type": "multipart/form-data"
      };

      const { data } = await axios.post('/api/uploads', formData, config);

      setImage(data);
    } catch (e) {
      console.error(e);
    } finally {
      setUploading(false);
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(
      updateProduct({
        _id: product._id,
        name,
        description,
        price,
        image,
        brand,
        category,
        countInStock
      })
    );
  }

  return(
    <>
      <Link to="/admin/products" className="btn btn-light my-3">Back to products</Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ): (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                onChange={(event) => { setName(event.target.value); }}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={description}
                onChange={(event) => { setDescription(event.target.value); }}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(event) => { setPrice(event.target.value); }}
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(event) => { setImage(event.target.value); }}
              />
              <Form.File
                id="image-file"
                label="Choose file"
                custom
                onChange={uploadFileHandler}
              />
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                value={brand}
                onChange={(event) => { setBrand(event.target.value); }}
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                onChange={(event) => { setCategory(event.target.value); }}
              />
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Count in stock</Form.Label>
              <Form.Control
                type="number"
                value={countInStock}
                onChange={(event) => { setCountInStock(event.target.value); }}
              />
            </Form.Group>
            <Button type="submit" variant="primary">Save</Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
