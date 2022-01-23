import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import Api from '../Api';

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
    <div>{content}</div>
  );
  
}

export default Token;
