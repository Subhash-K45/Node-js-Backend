import { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://product-api-7eap.onrender.com/login", {
        Email: email,
        Password: password,
      })
      .then((res) => {
        console.log(res.data);
        // Set the token received from the response in the state
        setToken(res.data.token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(email, password);
  }, [email, password]);

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
      <button type="submit" className="login-button">
        Login
      </button>
    </form>
  );
};

export default Login;
