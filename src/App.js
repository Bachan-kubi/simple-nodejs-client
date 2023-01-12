import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([])
  
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res=>res.json())
    .then(data=>setUsers(data))
  }, []);

  const handleAddUsers=(event)=>{
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = {name, email};
    event.target.reset();
    console.log(user);

    // post data to backend
    fetch('http://localhost:5000/users', {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user)
    })
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        const newUsers = [...users, data]
        setUsers(newUsers);
      })
      .catch(err=>console.error(err))
      // post data to backend
  }

  return (
    <div className="App">
      <h2>Simple Nodejs!</h2>
      <h2>{users.length}</h2>
      <div>
        {users.map(user=><p key={user.id}>{user.name} {user.email}</p>)}
      </div>
      
      <div>
        <form onSubmit={handleAddUsers}>
          <input type="text" name="name" placeholder="Name" /> <br />
          <input type="email" name="email" placeholder="Email" /><br />
          <button type="submit">Add Users</button>
        </form>
      </div>
    </div>
  );
}

export default App;
