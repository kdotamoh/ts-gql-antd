import React, { useState, FormEvent } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Input, Button, Row, Col, message } from 'antd';

import { GET_TODOS, GET_TODO, ADD_TODO, UPDATE_TODO } from '../queries';

export interface Props {
  isEditing?: boolean;
  id?: string;
}

interface Todo {
  id: string;
  type: string;
}

const AddTodo: React.FC<Props> = ({ isEditing, id }) => {
  const [type, setType] = useState('');
  const [addTodo, { loading }] = useMutation(ADD_TODO, {
    update: (store, { data: { addTodo } }) => {
      // Todo: fix any
      const data: any = store.readQuery({ query: GET_TODOS });
      store.writeQuery({
        query: GET_TODOS,
        data: {
          ...data,
          todos: [addTodo, ...data.todos]
        }
      });
    },
    onCompleted: (): void => {
      message.success('Todo added!');
    },
    onError: (): void => {
      message.error('Something went wrong. Please try again.');
    }
  });
  const [updateTodo, { loading: updateLoading }] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: GET_TODO, variables: { id } }],
    onCompleted: (): void => {
      message.success('Todo updated!');
    },
    onError: (): void => {
      message.error('Something went wrong. Please try again.');
    }
  });

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    setType('');
    isEditing
      ? updateTodo({ variables: { id, type } })
      : addTodo({
          variables: { type },
          optimisticResponse: {
            __typename: 'Mutation',
            addTodo: {
              __typename: 'Todo',
              id: 'optimistic',
              type
            }
          }
        });
  };

  return (
    <form data-testid="form" onSubmit={handleSubmit} className="mb-3rem">
      <Row gutter={16} type="flex" justify="space-between">
        <Col xs={24} sm={24} md={17} lg={19} xl={20}>
          <Input
            style={{ marginBottom: '1rem' }}
            placeholder={
              isEditing ? 'Update todo' : 'What would you like to do?'
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
            loading={isEditing ? updateLoading : loading}
            disabled={type ? false : true}
            block
          >
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </Col>
      </Row>
    </form>
  );
};

export default AddTodo;
