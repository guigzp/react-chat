import React from 'react';
import {
  CircularProgress,
  ButtonBase,
  Grid,
  Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  messageContainer: {
    width: '100%',
    textAlign: 'left',
    padding: 16,
  },
  messageContainerSelected: {
    width: '100%',
    textAlign: 'left',
    padding: 16,
    backgroundColor: '#FFC0CB',
  },
  avatar: {
    // backgroundColor: '#999898',
    backgroundColor: '#E6266B',
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  gridAvatar: {
    alignSelf: 'center',
  },
  previewMessage: {
    display: 'block',
    fontSize: '0.9rem',
    color: 'gray',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
}));

function ChatRooms(props) {
  if (!props.chatRooms) return <CircularProgress></CircularProgress>;

  if (props.chatRooms && props.chatRooms.length === 0)
    return (
      <Typography style={{ display: 'flex', justifyContent: 'center' }}>
        Nenhuma sala de chat!
      </Typography>
    );

  return props.chatRooms.map((chatRoom, index) => (
    <ChatRoom
      key={index}
      chatRoom={chatRoom}
      selected={props.selected !== null && chatRoom.id === props.selected.id}
      changeSelected={props.changeSelected}
    />
  ));
}

function ChatRoom(props) {
  const classes = useStyles();

  const hasMessage = props.chatRoom.lastMessage;

  const date =
    (props.chatRoom.lastMessage.timestamp &&
      props.chatRoom.lastMessage.timestamp.toDate()) ||
    moment.now();

  return (
    <ButtonBase
      className={
        !props.selected
          ? classes.messageContainer
          : classes.messageContainerSelected
      }
      onClick={() => {
        props.changeSelected(props.chatRoom);
      }}
    >
      <Grid container>
        <Grid className={classes.gridAvatar}>
          <Avatar className={classes.avatar}>{props.chatRoom.name[0]}</Avatar>
        </Grid>
        <Grid item sm={8} style={{ marginLeft: 8 }}>
          <Grid container direction='column'>
            <Typography
              style={{
                fontWeight: 'bold',
              }}
            >
              {props.chatRoom.name}
            </Typography>
            <Grid item sm={12}>
              <Typography className={classes.previewMessage}>
                {hasMessage
                  ? props.chatRoom.lastMessage.message
                  : 'Nenhuma mensagem'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={2}>
          <Typography className={classes.previewMessage}>
            {hasMessage ? moment(date).format('HH:mm') : ''}
          </Typography>
        </Grid>
      </Grid>
    </ButtonBase>
  );
}

export default ChatRooms;
