import React,{useState} from 'react'
import { auth } from './FirebaseFile';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Signup.css'
const Login = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errormsg, setErrormsg] = useState("");
  const handleSubmit = (e) => {
    if (!formData.email || !formData.password) {
      setErrormsg("fill all field");
    //   console.log(errormsg)
      return;
    }    signInWithEmailAndPassword(
      auth, 
      formData.email,
      formData.password
    )
      .then((res) => {
        const user =res.user
        console.log(user);
        localStorage.setItem('login', true);
        navigate("/home")

      })


      .catch((err) => {
        setErrormsg(err.message);
      });
  
    }  

    function backtologin(){
      navigate("/signup")
  }
    return (<div className="main">
<form>
      <div className="jis">
      <h2 className="login-form-title">LOGIN FORM</h2>
        <div className='check'>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            onChange={(event) =>
              setFormData((prevData) => ({
                ...prevData,
                email: event.target.value,
              }))
            }
          />{" "}
        </div>
        <div className='check'>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={(event) =>
              setFormData((prevData) => ({
                ...prevData,
                password: event.target.value,
              }))
            }
          />{" "}
          {errormsg}
        </div>
        <button onClick={handleSubmit} type="button">
Login        </button>
        <div className="login">
        <h2 onClick={backtologin}> Don't have an account?  <b>SIGNUP</b></h2>
        </div>
      </div>
    </form> 
    </div> )
}

export default Login