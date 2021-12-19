import React, {useState, useEffect} from 'react';
import useAuth from './hooks/useAuth';
import Header from './components/Header';
import Api from './Api';
import { useNavigate, useParams } from 'react-router-dom';

function ResponsePage(props) {

  let param = useParams();
  let {isAuth, name, id} = useAuth();
  const [post, setPost] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    Api.get(`/posts/${param.postid}/viewapp`, {
      headers: {
        Authorization: localStorage.getItem("Authorization")
      }
    }).then((res) => {
      setPost(res.data.post);
      setLoading(false);
    });
  }, [])

  const onSubmit = async (e) => {
    navigate('/groups')
    await Api({
      method: 'put',
      url: `groups/${param.postid}/close`,
      headers: {
        Authorization: localStorage.getItem("Authorization")
      }
    })
  }

  const onApprove = async (e) => {
    navigate(0);
    await Api({
      method: 'put',
      url: `groups/${param.postid}/requests/${e.target.dataset.resid}`,
      headers: {
        Authorization: localStorage.getItem("Authorization")
      },
      data: {approval: "true"}
    })

  }

  const onReject = async (e) => {
    navigate(0);
    await Api({
      method: 'put',
      url: `groups/${param.postid}/requests/${e.target.dataset.resid}`,
      headers: {
        Authorization: localStorage.getItem("Authorization")
      },
      data: {approval: "false"}
    })
  }

  const onUndo = async (e) => {
    navigate(0);
    await Api({
      method: 'put',
      url: `groups/${param.postid}/requests/${e.target.dataset.resid}`,
      headers: {
        Authorization: localStorage.getItem("Authorization")
      },
      data: {approval: "pending"}
    })
  }

  if (loading) {
    return "loading..."
  }
  
  return (
    <div>
      <Header user={name} id={id} />
      {post.title}
      {post.description}
      {post.group.requests.map((re) => {
        return (
          <div>
            {re.responses.map((r, i) => {
              return(<div>
                {post.group.questions[i]} <br/>
                {r}
                </div>)
            })}
            {re.approval !== "pending" ? <div>{re.approval == "true" ? "approved" : "rejected"}
                                            <button onClick={onUndo} data-resid={re._id}>Undo</button>
                                         </div> : <div data-resid={re._id}>
              <button onClick={onApprove} data-resid={re._id}>Accept</button><button data-resid={re._id} onClick={onReject}>Reject</button>
              </div>}

          </div>
        )
      })}
      <button onClick={onSubmit}>Close application</button>
    </div>
  );
}

export default ResponsePage;