import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import "./App.css";
import { CREATE_USER } from "./mutations/user";
import { GET_ALL_USERS, GET_USER } from "./query/user";
function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const { data: OneUser, loading: OneUserLoading } = useQuery(GET_USER, {
    variables: {
      id: 1,
    },
  });
  const [users, setUsers] = useState([]);
  const [newUser] = useMutation(CREATE_USER);
  const [username, setUserName] = useState("");
  const [age, setage] = useState("");
  console.log(window.innerWidth - document.documentElement.clientWidth);
  console.log(OneUser);
  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);

  const addUser = (e) => {
    e.preventDefault();
    console.log(username, age);
    newUser({
      variables: {
        input: {
          username,
          age,
        },
      },
    })
      .then(({ data }) => {
        console.log(data);
        setUserName("");
        setage("");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getAll = (e) => {
    e.preventDefault();
    refetch();
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <form>
        <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
        <input type="number" value={age} onChange={(e) => setage(+e.target.value)} />
        <div className="btns">
          <button onClick={(e) => addUser(e)}>Создать</button>
          <button onClick={(e) => getAll(e)}>Получить</button>
        </div>
      </form>
      <div>
        {users.map((user) => (
          <div className="user" key={user.id}>
            {user.id}. {user.username}. {user.age}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
