import { useState, useEffect } from 'react';

/***
    useMessage is a custom React hook that manages a message content and visibility.
    Initialize by destructuring returned array.
        1st element (messageContent): message state for holding message content string
        2nd element (showMessage): showMessage state boolean for managing visibility
        3rd element (setMessage): function with two parameters for new message content and duration
        4th element (setAnimationDuration): state setter for changing delay between setting message content and visibility
    Pass a new message and a duration to fade it in and out.
    If message content is passed, but no duration, the message will remain until setter is called again.
    If no new message is passed, then current message will fade out and be cleared.
    Default animation duration delay is 250ms, but can be overridden by passing a value at initializion or using setter function
***/
const useMessage = (startingAnimationDuration = 250) => {
  const [messageContent, setMessageContent] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(startingAnimationDuration)
  const [messageConfig, setMessageConfig] = useState(['', 0]);

  useEffect(() => {
    const newMessage = messageConfig[0];
    const messageDuration = messageConfig[1];

    //if no newMessage then fade out current message and then clear
    if(!newMessage) {
      setShowMessage(false);
      setTimeout(() => {
        setMessageContent('');
      }, animationDuration);
    }
    //if no duration passed then set message and fade it in and return
    else if(!messageDuration) {
      setMessageContent(newMessage);
      setShowMessage(true);
    }
    else {
      setMessageContent(newMessage);
      setShowMessage(true);
      setTimeout(() => {
          setShowMessage(false);
          setTimeout(() => {
              setMessageContent('');
          }, animationDuration);
      }, messageDuration);
    }
  }, [messageConfig, animationDuration]);
  const setNewMessage = (newMessage = '', messageDuration = null) => {
      setMessageConfig([newMessage, messageDuration]);
  };
  
  return [messageContent, showMessage, setNewMessage, setAnimationDuration];
};

export default useMessage;