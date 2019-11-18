import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  wait
} from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

import { ADD_TODO, UPDATE_TODO } from 'queries';
import AddTodo from '../components/AddTodo';

afterEach(cleanup);

describe('AddTodo', () => {
  it('should render without error', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AddTodo id="sdcs" />
      </MockedProvider>
    );
  });

  it('allows input', () => {
    const component = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AddTodo />
      </MockedProvider>
    );
    const input = component.getByPlaceholderText('What would you like to do?');

    let inputValue = 'Adding a todo';
    fireEvent.change(input, { target: { value: inputValue } });
    expect(input.value).toBe('Adding a todo');
  });

  it('creates a todo', async () => {
    let addTodoMutationCalled = false;
    const mocks = [
      {
        request: {
          query: ADD_TODO,
          variables: { type: 'Test todo' }
        },
        result: () => {
          addTodoMutationCalled = true;
          return { data: { type: 'Test todo', id: 'sitywee' } };
        }
      }
    ];

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddTodo />
      </MockedProvider>
    );

    const button = component.getByTestId('submit-button');
    fireEvent.click(button);

    await wait(() => expect(addTodoMutationCalled).toBe(true));

    component.debug();
  });
});
