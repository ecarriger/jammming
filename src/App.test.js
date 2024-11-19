import { render, screen } from '@testing-library/react';
import App from './App';
import SearchBar from './components/SearchBar';
import Auth from './components/Auth';


test('renders Jamming title', () => {
  render(<App />);

  const title = screen.getByRole('heading', {
    name: /jammming/i
  });

  expect(title).toBeInTheDocument();
});
