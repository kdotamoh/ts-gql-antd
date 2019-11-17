import React from 'react';

export interface Props {
  id: string;
  type: string;
}

const Todo: React.FC<Props> = ({ type }) => {
  return <div>{type}</div>;
};

export default Todo;
