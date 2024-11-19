import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Track from './Track';

test('Track name is displayed', () => {
    render(<Track track={{name: 'Sound of Silence'}} />)

    const track = screen.getByText(/sound of silence/i);

    expect(track).toBeInTheDocument();
});
test('click handler runs when clicked', () => {
    const handleClick = jest.fn();
    render(<Track track={{name: 'Sound of Silence'}} handleTrackClick={handleClick} />)

    const listitem = screen.getByRole('listitem');
    userEvent.click(listitem);

    expect(handleClick).toHaveBeenCalled();
});

