import React, {useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from './Loading';
import Api from '../Api';
import { Typography, Box, IconButton} from '@mui/material';

function Token(props) {

  let param = useParams();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(); 

  useEffect(() => {
    setLoading(true);
    Api({
      method: 'put',
      url: `users/${param.id}/verify/${param.token}`,
    }).then((res) => {
      setContent(res.data.message);
      setLoading(false);
    });
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <Box>
      <Typography color="secondary.dark" align='center'>
        {content}
      </Typography>
      <IconButton 
          component={Link} 
          to="/ " 
          variant="contained" 
          color="inherit"
          sx={{ flexGrow: 1 }}
        >
          Login Now!
        </IconButton>
    </Box>
  );
  
}

export default Token;
