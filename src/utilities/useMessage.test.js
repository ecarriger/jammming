import { renderHook, waitFor } from "@testing-library/react";

import useMessage from "./useMessage";

test('setNewMessage can set messageContent and showMessage', async () => {
    const {result} = renderHook(useMessage);
    const setNewMessage = result.current[2];
    
    setNewMessage('My new message', 500);

    await waitFor(() => {
        const messageContent = result.current[0];
        expect(messageContent).toBe('My new message');
    });
    await waitFor(() => {
        const showMessage = result.current[1];
        expect(showMessage).toBe(true);
    });
});
test('message is removed and show is false after duration', async () => {
    const {result} = renderHook(useMessage);
    const setNewMessage = result.current[2];
    
    setNewMessage('My new message', 500); 
    await waitFor(() => {
        const messageContent = result.current[0];
        expect(messageContent).toBe('My new message');
    });
    await waitFor(() => {
        const showMessage = result.current[1];
        expect(showMessage).toBe(true);
    });
    await waitFor(() => {
        const messageContent = result.current[0];
        expect(messageContent).toBe('');
    });
    await waitFor(() => {
        const showMessage = result.current[1];
        expect(showMessage).toBe(false);
    });
});
test('message persists if setMessage passes no duration', async () => {
    const {result} = renderHook(useMessage);
    const setNewMessage = result.current[2];

    setNewMessage('My new message');

    setTimeout(() => {
        const [messageContent, showMessage] = result.current;
        expect(messageContent).toBe('My new message');
        expect(showMessage).toBe(true);
    }, 1000);

});
test('message is removed if no messageContent passed to setMessage', async () => {
    const {result} = renderHook(useMessage);
    
    const setNewMessage = result.current[2];
    setNewMessage('My new message');

    await waitFor(() => {
        const messageContent = result.current[0];
        expect(messageContent).toBe('My new message');
    });
    await waitFor(() => {
        const showMessage = result.current[1];
        expect(showMessage).toBe(true);
    });

    setNewMessage();

    await waitFor(() => {
        const messageContent = result.current[0];
        expect(messageContent).toBe('');
    });
    await waitFor(() => {
        const showMessage = result.current[1];
        expect(showMessage).toBe(false);
    });
});