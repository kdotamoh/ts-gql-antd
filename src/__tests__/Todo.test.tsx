import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Todo from '../components/Todo';

afterEach(cleanup);

describe('Todo', () => {
  it('renders a Todo', () => {
    const { getByText } = render(<Todo id="cdewrw" type="test todo" />);
    getByText('test todo');
  });
});
