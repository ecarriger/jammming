import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders Jamming title', () => {
    render(<App />);
    const linkElement = screen.getByText(/Jammming/i);
    expect(linkElement).toBeInTheDocument();
  });
});