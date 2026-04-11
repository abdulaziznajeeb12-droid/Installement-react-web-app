import { useState } from "react";
import axios from "axios";

function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("https://localhost:5001/api/Account/Register", {
        userName,
        email,
        password
      });

      alert(res.data);
    } catch (err) {
      console.log(err);
      alert("Error");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input placeholder="Username" onChange={e => setUserName(e.target.value)} /><br/><br/>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} /><br/><br/>
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br/><br/>

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;