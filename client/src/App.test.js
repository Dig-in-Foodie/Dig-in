const {fetch} = require('whatwg-fetch');
global.fetch = fetch;
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { App } from './App';

it('should render', () => {
  render(<App />);

  expect(screen.getByText('Dig into this foodie')).toBeInTheDocument();
});