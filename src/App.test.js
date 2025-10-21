import { render, screen } from '@testing-library/react';
import App from './App';
import { faBootstrap } from '@fortawesome/free-brands-svg-icons';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
