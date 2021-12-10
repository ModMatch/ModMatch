import { useState, useEffect } from 'react';
import Api from '../api';

function useAuth() {
  const[auth, setAuth] = useState(false);
  //const[user, setUser] = useState({});

  useEffect(()=> {
    async function getAuth() {
      try {
        const auth = await Api.get('/auth', {
          headers: {
            Authorization: localStorage.getItem("Authorization")
          }
        })
        if (auth.data.auth) {
          setAuth(true);
          //setUser(auth.data.user);
        }
      } catch(err) {
        if (err.response.status == 401) {
          setAuth(false);
        }
      }
    };

    getAuth();

  },[]);

  return auth;
}

export default useAuth;
