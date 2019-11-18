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

  // Todo: Optimistic update/cache shenanigans cause this test fail because data is undefined.
  // This blog post appears to have some good ideas on how to fix this:
  // https://mmazzarolo.com/blog/2019-07-13-test-apollo-client-cache/

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

    const formComponent = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddTodo />
      </MockedProvider>
    );
    fireEvent.submit(formComponent.getByTestId('form'));
    await wait(() => expect(addTodoMutationCalled).toBe(true));
    formComponent.debug();
  });

  // Not sure why this is failing. Maybe result doesb't fire?
  it('updates a todo', async () => {
    let updateTodoMutationCalled = false;
    const mocks = [
      {
        request: {
          query: UPDATE_TODO,
          variables: { id: 'sitywee', type: 'Test todo' }
        },
        result: () => {
          updateTodoMutationCalled = true;
          return { data: { id: 'sitywee', type: 'Test todo' } };
        }
      }
    ];

    const formComponent = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddTodo isEditing />
      </MockedProvider>
    );
    fireEvent.submit(formComponent.getByTestId('form'));
    await wait(() => expect(updateTodoMutationCalled).toBe(true));
    formComponent.debug();
  });
});
