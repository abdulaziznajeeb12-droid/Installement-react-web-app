import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://localhost:5001/api/Account/Login", {
        email,
        password
      });

      alert(res.data);
    } catch (err) {
      alert("Invalid Login");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} /><br/><br/>
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br/><br/>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;