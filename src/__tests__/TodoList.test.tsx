import React from 'react';
import { render, cleanup, act, waitForElement } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

import { GET_TODOS } from 'queries';
import TodoList from 'components/TodoList';

afterEach(cleanup);

describe('TodoList', () => {
  it('renders without error', async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <TodoList />
        </MockedProvider>
      );
    });
  });

  it('renders a list of todos', async () => {
    const mocks = [
      {
        request: {
          query: GET_TODOS
        },
        result: {
          data: {
            todos: [
              {
                id: 'H1RqAZx3H',
                type: 'csser'
              },
              {
                id: 'r1jcAZg3B',
                type: 'csdff'
              }
            ]
          }
        }
      }
    ];

    const { getAllByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TodoList />
      </MockedProvider>
    );

    await waitForElement(() => getAllByText('View'));
  });
});
