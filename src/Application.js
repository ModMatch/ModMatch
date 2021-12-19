import React, {useState, useEffect} from 'react';
import useAuth from './hooks/useAuth';
import Header from './components/Header';
import Api from './Api';
import { useNavigate, useParams } from 'react-router-dom';

function Application(props) {

  let param = useParams();
  let {isAuth, name, id} = useAuth();
  const [post, setPost] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    Api.get(`/posts/${param.postid}`, {
      headers: {
        Authorization: localStorage.getItem("Authorization")
      }
    }).then((res) => {
      setPost(res.data.post);
      setLoading(false);
    });
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    let ans = []
    for (let i = 0; i < e.target.length - 1; i++) {
      ans.push(e.target.childNodes[i].querySelector('input').value);
    }
    navigate(`/post/${param.postid}`);
    await Api({
      method: 'post',
      url: `/groups/${post.group._id}/request`,
      headers: {
        Authorization: localStorage.getItem("Authorization")
      },
      data: {responses: ans, id}
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
      <form className="Form" onSubmit={onSubmit}>
        {post.group.questions.map((q) => {
          return (
            <div>
              {q} <br/>
              <input name='input'/>
            </div>
          )
        })}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Application;