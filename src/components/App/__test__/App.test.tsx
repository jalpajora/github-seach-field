import React from 'react';
// , fireEvent, waitFor, screen
import { render, RenderResult, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

import App from '../../App';

let RenderedApp: RenderResult;
beforeEach(() => {
  RenderedApp = render(<App />);
});

test('renders search field', () => {
  expect(RenderedApp.getByTestId('search-field')).toBeInTheDocument();
});

test('not start search if text length is less than 4', () => {
  const input = RenderedApp.getByPlaceholderText('Search github users');
  expect(input).toBeInTheDocument();

  userEvent.type(input, 'abc');
  const li = RenderedApp.getByText(
    'Please input more than 3 letters to search',
    { selector: 'li' }
  );
  expect(li).toBeInTheDocument();
});

test('start search when input is more than 3', async () => {
  const input = RenderedApp.getByPlaceholderText('Search github users');
  expect(input).toBeInTheDocument();

  userEvent.type(input, 'abcd');
  const li = RenderedApp.getByText('Searching user...', { selector: 'li' });
  expect(li).toBeInTheDocument();

  const searchCount = RenderedApp.getByTestId('search-count');
  expect(searchCount.textContent).toBe('0 found');

  await waitFor(() => {
    expect(searchCount.textContent).toBe('2 found');
  });
});
