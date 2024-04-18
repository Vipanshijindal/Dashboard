import { useState } from "react";
import { API_URL } from "../../data/ApiPath";
const Register = ({showLoginHandler}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
   
      const data = await response.json();
      
      if (response.ok) {
        console.log(data);
        setUsername("");
        setEmail("");
        setPassword("");
        alert("vendor registered successfully");
        showLoginHandler();
      }else{
        console.log(data.error)
      }
    } catch (error) {
      console.log("Registration failed", error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="registerSection">
      <form className="authForm" onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>
        <label>Username</label>
        <input
          type="text"
          name="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          placeholder="Enter your name"
        />
        <br />
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          placeholder="Enter your email"
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          
          placeholder="Enter password"
        />
        <br />

        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
