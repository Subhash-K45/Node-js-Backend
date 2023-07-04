import { useEffect, useState } from "react";
import axios from "axios"
const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  useEffect(()=>{
    axios.post("https://product-api-7eap.onrender.com/login", { 
        Email:email,
        Password:password
     }).then((res)=>console.log(res.data))
    console.log(email,password)
  },[isLogin])
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    setIsLogin(true);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <button type="submit" className="login-button">Login</button>
    </form>
  );
};

export default Login;
