import React, { useEffect, useState } from 'react';
import { Grid, Typography, makeStyles, Paper } from '@material-ui/core';
import ChatInput from './ChatInput';

import moment from 'moment';
import { firebaseFirestore } from '../services/firestore';

const useStyles = makeStyles((theme) => ({
  paper: (sentByClient) => ({
    padding: theme.spacing(2),
    borderRadius: sentByClient ? '4px 20px 20px 20px' : '20px 4px 20px 20px',
    background: sentByClient ? '#f5f5f5' : '#FFC0CB',
    color: sentByClient
      ? theme.palette.getContrastText('#f5f5f5')
      : theme.palette.getContrastText('#FFC0CB'),
  }),
  time: (sentByClient) => ({
    marginTop: 2,
    color: 'gray',
    fontSize: 10,
    textAlign: sentByClient ? 'left' : 'right',
  }),
  message: (sentByClient) => ({
    paddingTop: 6,
    display: 'flex',
    justifyContent: sentByClient ? 'flex-start' : 'flex-end',
  }),
}));

function ChatMessages(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (props.chatRoom !== null) {
      const collection = firebaseFirestore.collection(
        `users/${props.chatRoom.id}/messages`
      );

      const unsubscribe = collection
        .orderBy('timestamp')
        .onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMessages(data);
        });
      return () => {
        unsubscribe();
      };
    }
  }, [props.chatRoom]);

  if (!props.chatRoom) {
    return (
      <Typography style={{ display: 'flex', justifyContent: 'center' }}>
        Selecine uma sala de chat!
      </Typography>
    );
  }

  return <ChatMessagesView messages={messages} chatRoom={props.chatRoom} />;
}

function ChatMessagesView(props) {
  if (props.messages.length === 0) {
    return (
      <Typography style={{ display: 'flex', justifyContent: 'center' }}>
        Nenhuma mensagem!
      </Typography>
    );
  }

  return (
    <Grid container direction='column' style={{ padding: 16 }}>
      {props.messages.map((message, index) => (
        <Message key={message.id} message={message} />
      ))}
      <ChatInput chatRoom={props.chatRoom} />
    </Grid>
  );
}

function Message(props) {
  const classes = useStyles(!props.message.sentByIpatas);

  const date =
    (props.message.timestamp && props.message.timestamp.toDate()) ||
    moment.now();

  return (
    <div className={classes.message}>
      <Paper elevation={0} className={classes.paper}>
        <Grid container direction='column'>
          <Typography variant='body1'>{props.message.message}</Typography>
          <Typography className={classes.time} variant='body2'>
            {moment(date).format('HH:mm')}
          </Typography>
        </Grid>
      </Paper>
    </div>
  );
}

export default ChatMessages;
