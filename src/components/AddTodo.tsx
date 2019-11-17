import React, { useState, FormEvent } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Input, Button, Row, Col } from 'antd';

import { GET_TODOS, ADD_TODO } from '../queries';

const AddTodo: React.FC = () => {
  const [type, setType] = useState('');
  const [addTodo, { loading }] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }]
  });

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    setType('');
    addTodo({ variables: { type } });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3rem">
      <Row gutter={16} type="flex" justify="space-between">
        <Col xs={24} sm={24} md={17} lg={19} xl={20}>
          <Input
            placeholder="What would you like to do next?"
            value={type}
            onChange={(event): void => {
              setType(event.target.value);
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={7} lg={5} xl={4}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={type ? false : true}
            block
          >
            Add Todo
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default AddTodo;
