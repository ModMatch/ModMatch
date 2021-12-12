import { useState, useEffect } from 'react';
import Api from '../api';

function useAuth() {
  const[auth, setAuth] = useState();
  const[name, setName] = useState("");
  const[id, setId] = useState("");

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
          setName(auth.data.name);
          setId(auth.data.id);
        }
      } catch(err) {
          setAuth(false);
      }
    };

    getAuth();

  },[]);
  return {auth, name, id};
}

export default useAuth;
