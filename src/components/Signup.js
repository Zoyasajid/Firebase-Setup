import React, { useState} from "react";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./FirebaseFile";
import {db} from "./FirebaseFile"
import { setDoc,doc} from "firebase/firestore";
import './Signup.css'

const Signup = () => {
  const [contacts,setContacts]=useState([])

    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const [errormsg, setErrormsg] = useState("");
  const handleSubmit = (e) => {
    if (!formData.name || !formData.email || !formData.password) {
      setErrormsg("fill all field");
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    )       
   

      .then((userCredential) => {
        const user = userCredential.user;

        if (user) {updateProfile(user, { displayName: formData.name })
        .then(() => {
          const saveUserData = async (db, user, userData) => {
            try {
             
              await setDoc(doc(db, "users", user.uid), userData);
              console.log("User data saved successfully!");
            } catch (error) {
              console.error("Error saving user data: ", error);
            }
          };
          saveUserData(db, user, formData)
          console.log(user,'Display name updated:', formData.name);
          navigate('/home');
          setContacts(user)
        })
      }}
      )
      .catch((err) => {
        setErrormsg(err.message);
        console.log(errormsg)
      });
    }
    function backtologin(){
        navigate("/")
    }
  return (<div className="main">
    <form>
      <div className="jis">
        <div>
        <h2 className="login-form-title">SIGNUP FORM</h2>        
          <label>Name:</label>
          <input
            type="text"
            name="name"
            onChange={(event) =>
              setFormData((prevData) => ({
                ...prevData,
                name: event.target.value,
              }))
            }
          />
        </div>
        <div>
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
        <div>
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
<h2 className="errormsg"><i>{errormsg}</i></h2>     
   </div>
        <button onClick={handleSubmit} type="button" className="btn">
          Sign Up

        </button>
        <div className="login">
        <h2 onClick={backtologin}> Already have an account?  <b>Login</b></h2>
        </div>
      </div>
    </form>

</div>);
};

export default Signup;

// export default Login
