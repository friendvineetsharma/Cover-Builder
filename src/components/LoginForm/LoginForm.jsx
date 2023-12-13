import React from 'react';
import {faEnvelope, faLock, faUser,} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './LoginForm.css';
import signupImg from '../../assets/login.svg'
import singinImg from '../../assets/sign_in.svg'
import { useEffect, useState }  from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
    //user data
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //email registration
    const [email, setEmail] = useState('');
    
    //token
    //const [token, setToken] = useState('');
    //navigate call
    const navigate = useNavigate();

    //registraton status state
    const [registrationStatus, setRegistrationStatus] = useState(null);

    //login status state
    const [loginStatus, setLoginStatus] = useState(null);
    //UI elements
    const [isSignUpMode, setIsSignUpMode] = useState(false);

    useEffect(() => {
      const container = document.querySelector(".container");

      if (isSignUpMode) {
        container.classList.add("sign-up-mode");
      } else {
        container.classList.remove("sign-up-mode");
      }
    }, [isSignUpMode]);

    //login
    const loginSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:8081/api/login', { username, password });
          console.log(response.data);
          if (response.data.status === 'success') {
            setLoginStatus('success');
    
            sessionStorage.setItem('token', response.data.token);
            

            setTimeout(() => {
              navigate('/coverbuildergenerator');
            }, 1000);

    
            //window.location.href = '/coverbuildergenerator';
          } else {
            setLoginStatus('error');
          }
        } catch (error) {
          console.error(error);
        }
      } 

      //register
      const registerUser = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:8081/api/signup', {
                username,
                email,
                password,
            });
            console.log(response.data);
            
            if (response.data.status === 'success') {
                setRegistrationStatus('success');
                
                //clear form fields
                setEmail('')
                setUsername('')
                setPassword('')
            } else {
                setRegistrationStatus('error');
            }
        } catch (err) {
            console.error(err);
        }
       
    }

    return (
      <div className="container">
        <header className="header-container">
          <div className="header-logo">
            <h2 className="welcome-header">
              <span className="cover-logo">cover</span>builder.
            </h2>
          </div>
        </header>
        <div className="forms-container">
          <div className="signin-singup">
            {/* <h1>
              <span className="cover-logo">cover</span> builder.
            </h1> */}
            <form onSubmit={loginSubmit} className="sign-in-form">
              <h2 className="header">SIGN IN</h2>
              <div className="input-field">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <input
                  type="text"
                  placeholder="Username"
                  autoComplete="off"
                  value={username}
                  id="username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-field">
                <FontAwesomeIcon icon={faLock} className="icon" />
                <input
                  type="password"
                  placeholder="Password"
                  autoComplete="off"
                  value={password}
                  id="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn solid">
                Login
              </button>
              {loginStatus === "success" && (
                <p className="login-success">
                  Login Successful! Redirecting...
                </p>
              )}
              {loginStatus === "error" && (
                <p className="login-error">Uh-oh, Please try again.</p>
              )}
            </form>

            <form onSubmit={registerUser} className="sign-up-form">
              <h2 className="header">SIGN UP</h2>
              <div className="input-field">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <input
                  type="text"
                  placeholder="Username"
                  id="username"
                  required
                  autoComplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-field">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-field">
                <FontAwesomeIcon icon={faLock} className="icon" />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  autoComplete="off"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input type="submit" className="btn solid" value="Sign Up" />
              {registrationStatus === "success" && (
                <p className="success-message">
                  User created successfully! Login Now!
                </p>
              )}
              {registrationStatus === "error" && (
                <p className="error-message">
                  Username or email is not available. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Welcome to Cover Builder</h3>
              <p>
                Step into success with{" "}
                <span className="app-name">Cover Builder</span>, where crafting
                standout cover letters is a breeze. Transform your professional
                journey with our user-friendly cover letter builder, empowering
                you to make a lasting impression on potential employers.
              </p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={() => setIsSignUpMode(true)}
              >
                Sign Up
              </button>
            </div>

            <img src={signupImg} alt="Sign Up Logo" className="image" />
          </div>

          <div className="panel right-panel">
            <div className="content">
              <h3>Start Now</h3>
              <p>
                Unlock the door to career opportunities! Log in to{" "}
                <span className="app-name">Cover Builder</span> and let us
                assist you in crafting personalized cover letters that open
                doors to your dream job.
              </p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={() => setIsSignUpMode(false)}
              >
                Sign In
              </button>
            </div>

            <img src={singinImg} alt="Sign Up Logo" className="image" />
          </div>
        </div>
      </div>
    );
}

export default LoginForm; 