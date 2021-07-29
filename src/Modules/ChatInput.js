import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { firebaseFirestore, now } from '../services/firestore';

function ChatInput(props) {
  const [text, setText] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const dateNow = now();
      firebaseFirestore.collection(`users/${props.chatRoom.id}/messages`).add({
        message: text,
        timestamp: dateNow,
        sentByIpatas: true,
      });

      firebaseFirestore.doc(`users/${props.chatRoom.id}`).update({
        lastSeenByIpatas: dateNow,
        lastMessage: {
          message: text,
          sentByIpatas: true,
          timestamp: dateNow,
        },
      });

      setText('');
    }
  };

  return (
    <TextField
      id='chat-input'
      label='Escreva sua mensagem'
      value={text}
      onChange={(event) => setText(event.target.value)}
      variant='outlined'
      onKeyDown={handleKeyDown}
    />
  );
}

export default ChatInput;
