import "./App.css";
import "materialize-css";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  
  useEffect(() => {
    if(query !=''){
      axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${query}`)
      .then((res) => setPosts(res.data));
    }else{
      axios
      .get(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => setPosts(res.data));
    }
  }, [query]);
  
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => setUsers(res.data));
  }, []);

  const getAuthor = (posts) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === posts.userId) {
        return users[i].name;
      }
    }
  };


  
  return (
    <div>
      <div className="row">
        <form className="col s5 offset-s5">
          <div className="row">
            <i className="input-field col s6">
              <i className="material-icons prefix">search</i>
              <input 
                type="text"
                className="materialize-textarea"
                onChange={(e) => {setQuery(e.target.value)}}
                value={query}
               
                placeholder="Filter by author"
              />
            </i>
          </div>
        </form>
      </div>

      <div className="row">
        {posts.map((posts, id) => {
          return (
            <div className="col s4" key={id} style={{ minHeight: "250px" }}>
              <div className="">
                <div className="card whight-1">
                  <div className="card-content black-text">
                    <span className="card-title blue-text">{posts.title}</span>
                    <p>{posts.body}</p>
                    <p className="grey-text">{getAuthor(posts)}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
