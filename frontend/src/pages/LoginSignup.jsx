import React, {useState} from 'react'
import './Css/LoginSignup.css'

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username :"",
    password : "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const authenticate = async (action) => {
    let responseData;

    try {
      const response = await fetch(`http://localhost:4000/${action}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      responseData = await response.json();
    } catch (error) {
      console.error(`Error during ${action}:`, error);
      // Handle the error appropriately if needed
    }

    if (responseData && responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData ? responseData.error : 'An error occurred.');
    }
  };

  return (
    <div className='login-signup'>
      <div className="login-signup-container">
        <h1>{state}</h1>
        <div className="login-signup-fields">
            {state==="Sign Up"?
              <input type="text" name="username" value={formData.username} onChange = {changeHandler} placeholder='Name' /> : <></>}
            <input name="email" value={formData.email} onChange = {changeHandler} type="email" placeholder='Email Address' />
            <input name="password" value={formData.password} onChange = {changeHandler} type="password" placeholder='Password' />
            <button onClick={() => authenticate(state === 'Sign Up' ? 'signup' : 'login')}>{state}</button>
            {state==="Sign Up" ? 
            <p className="login-signup-login">
            Already Have an account? <span onClick={() => setState("Login")}>Login here</span>
            </p>  :
            <p className="login-signup-login">
             Create an account? <span onClick={() => setState("Sign Up")}>Click here</span>
            </p>
           }           
            {state==="Sign Up" ? <div className="login-signup-agree">
              <input type="checkbox" name="" id="" />
              <p>By Signing up, I agree to Terms & Policies.</p>
            </div> :<></>} 
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
