import React, { useEffect, useState } from 'react';
import { Grid, Paper } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import ChatRooms from './ChatRooms';
import ChatMessages from './ChatMessages';
import { firebaseFirestore } from '../services/firestore';

const useStyles = makeStyles((theme) => ({
  scrollContainerList: {
    overflowY: 'auto',
    height: 'calc(100vh - 115px)',
  },
}));

export function ChatTab(props) {
  const [selected, changeSelected] = useState(null);
  const [chatRooms, setChatRooms] = useState(null);

  useEffect(() => {
    const collection = firebaseFirestore.collection('users');

    const unsubscribe = collection.onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setChatRooms(data);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ChatScreen
      chatRooms={chatRooms}
      selected={selected}
      changeSelected={changeSelected}
    />
  );
}

function ChatScreen(props) {
  const classes = useStyles();

  return (
    <Grid container spacing={2} alignItems={'stretch'}>
      <Grid item xs={3}>
        <Paper className={classes.scrollContainerList}>
          <ChatRooms
            chatRooms={props.chatRooms}
            selected={props.selected}
            changeSelected={props.changeSelected}
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <Paper className={classes.scrollContainerList}>
          <ChatMessages chatRoom={props.selected} />
        </Paper>
      </Grid>
    </Grid>
  );
}
