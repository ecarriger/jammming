import { screen, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';

import Message from './Message';

const renderMessage = (messageContent = '', showMessage = false) => {
    render(
        <Message
            messageContent={messageContent}
            showMessage={showMessage}
        />
    )
};

test('message visible if has content and show is true', () => {
    renderMessage('My message', true);

    const message = screen.getByText(/my message/i);

    expect(message).toBeInTheDocument();
});
test('message not visible if show is false', () => {
    renderMessage('My message', false);

    const message = screen.getByText(/my message/i);

    expect(message).toBeVisible();
});