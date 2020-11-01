import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();

    if(keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  }

  return(
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        className="mr-sm-2 ml-sm-5"
        type="text"
        placeholder="Search products..."
        name="q"
        onChange={event => setKeyword(event.target.value)}
      />
      <Button type="submit" variant="outline-success" className="p-2">Search</Button>
    </Form>
  );
};

export default SearchBox;
