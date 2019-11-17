import React, { useState, FormEvent } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Input, Button, Row, Col } from 'antd';

import { GET_TODOS, GET_TODO, ADD_TODO, UPDATE_TODO } from '../queries';

export interface Props {
  isEditing: boolean;
  id: string;
}

const AddTodo: React.FC<Props> = ({ isEditing, id }) => {
  const [type, setType] = useState('');
  const [addTodo, { loading }] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }]
  });
  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: GET_TODO, variables: { id } }]
  });

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    setType('');
    isEditing
      ? updateTodo({ variables: { id, type } })
      : addTodo({ variables: { type } });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3rem">
      <Row gutter={16} type="flex" justify="space-between">
        <Col xs={24} sm={24} md={17} lg={19} xl={20}>
          <Input
            placeholder={
              isEditing ? 'Update todo' : 'What would you like to do next?'
            }
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
            {isEditing ? 'Update todo' : 'Add Todo'}
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default AddTodo;
