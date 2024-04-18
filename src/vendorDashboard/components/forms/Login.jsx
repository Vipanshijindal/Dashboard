import { useState } from "react";
import { API_URL } from "../../data/ApiPath";
const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmail("");
        setPassword("");
        alert("Login successful");
        localStorage.setItem("loginToken", data.token);
        showWelcomeHandler();

      } 
      const vendorId=data.vendorId
      const vendorResponse=await fetch(`${API_URL}/vendor/onevendor/${vendorId}`)
      const vendorData=await vendorResponse.json();
      if(vendorResponse.ok){
        const vendorFirmId=vendorData.vendorFirmId;
        const vendorfirmName = vendorData.vendor.firm[0].firmname;
        console.log("my firmName is",vendorfirmName)
        localStorage.setItem("firmId",vendorFirmId)
        localStorage.setItem('firmname',vendorfirmName)
        window.location.reload()
      }
    } catch (error) {
      console.log("error", error);
      alert("Login Failed");
    }
  };
  return (
    <div className="loginSection">
      <form className="authForm" onSubmit={loginHandler}>
        <h3>Vendor Login</h3>
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
          value={password}
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

export default Login;
