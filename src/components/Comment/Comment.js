import React, { useState } from 'react';
import CommentForm from './CommentForm';
import { Button, Link, Typography, Card, CardHeader, CardContent, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Comment(props) {

  const[edit, setEdit] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onCommentEditButClick = (e) => {
    setEdit(true);
  }

  if (edit) {
    return (<div data-commentid={props.id}>
      <CommentForm onSubmit={props.onCommentSaveButClick} description={props.desc} commentId={props.id}/>
    </div>);
  }
  return (
    <Card variant='outlined'>
      <CardHeader 
        title={<Link href={props.commenterurl} underline="hover">
                  <Typography variant='subtitle1'>
                    {props.commenter}
                  </Typography>
                </Link>
        }
        subheader={<Typography variant='subtitle2'>
                      {props.date}
                    </Typography>
        }
        action={
          props.commenterid == props.curruserid ? 
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton> : null
        }
      />
      <CardContent>
        <Typography sx={{wordBreak: 'break-all'}}>
            {props.desc} 
        </Typography>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '20ch',
          },
        }}
      > 
        <MenuItem
            onClick={props.onCommentDelButClick}
            data-commentid={props.id}
        >
            Delete
        </MenuItem>
        <MenuItem 
            onClick={onCommentEditButClick}
        >
            Edit
        </MenuItem>

      </Menu>
    </Card>
  );
  
}

export default Comment;
