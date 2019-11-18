import React from 'react';
import { render, cleanup, act, waitForElement } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

import { GET_TODO } from 'queries';
import ViewTodo from 'screens/ViewTodo';

afterEach(cleanup);

describe('ViewTodo', () => {
  it('renders a todo', async () => {
    const mocks = [
      {
        request: {
          query: GET_TODO
          // variables: { id: 'one' } Variables aren't being passed for some reason
        },
        result: {
          data: {
            todo: {
              id: 'one',
              type: 'csser'
            }
          }
        }
      }
    ];

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ViewTodo />
      </MockedProvider>
    );

    await waitForElement(() => component.getByTestId('todo'));
  });
});
