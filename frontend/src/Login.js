import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";



const Login = () => {
  const [email,setEmail]=useState("")
  const[password,SetPassword]=useState("")
  const[state,isState]=useState("")
  useEffect(()=>{
    axios.post("https://product-api-7eap.onrender.com/login",{
    Email:email,
    Password:password
    })
      },[state])
  function handle_Email_change(e){
    setEmail(e.target.value)
  }
  
  function handle_Password_Change(e){
    SetPassword(e.target.value)
  }
  function Handle_Submit(e){
    e.preventDefault()
    isState(prev=>!prev)
    console.log(email,password)
  }
return(
  <div>
    <form>
    <h1>User Login</h1>
    <input type="email" onInput={(e)=>handle_Email_change(e)} required/>
    <input type="password" onInput={(e)=>handle_Password_Change(e)} required/>
    <p>Not Login <Link to="SignUp">SignUp</Link></p>
    <button onClick={(e)=>Handle_Submit(e)}>Sumbit</button>
    </form>
  </div>
)

};

export default Login;