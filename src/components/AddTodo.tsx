import React, { useState, FormEvent } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { GET_TODOS, ADD_TODO } from '../queries';

const AddTodo: React.FC = () => {
  const [type, setType] = useState('');
  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS }]
  });

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    addTodo({ variables: { type } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What would you like to do next?"
        onChange={(event): void => {
          setType(event.target.value);
        }}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodo;
