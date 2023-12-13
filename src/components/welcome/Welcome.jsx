import React from 'react';
import './welcome.css'
import { Link, useNavigate } from 'react-router-dom';
import image1 from '../../assets/interview.svg'

const Welcome = () => {

    const navigate = useNavigate();
    return (
      <div className="page-container">
        <header className="header-container">
          <div className="header-logo">
            <h2 className="welcome-header">
              <span className="cover-logo">cover</span>builder.
            </h2>
          </div>
          <div className="navbar">
            <h4>Already a member? </h4>
            <Link to={"/login"} className="nav-link login-link">
              Login here
            </Link>
          </div>
        </header>
        <div className="containter">
          <section id="welcome">
            <div className="main-container">
              <div className="welcome-container">
                <div className="col-flex">
                  <img src={image1} alt="" className="welcome-img" />
                </div>
                <div className="col-flex">
                  <h2 className="welcome-quote">
                    Create your <span className="cover-logo">cover letter</span>{" "}
                    today!
                  </h2>
                  <p>
                    Build a cover letter for the job you want. Cover Builder
                    will help you every step of the way with tools, guides and
                    expert advice. Try our Cover Builder and see for yourself —
                    it’s fast, easy and backed by experts!
                  </p>
                  <div className="cont-btn">
                    <button
                      className="welcome-btn"
                      onClick={() => navigate("/login")}
                    >
                      Build my cover letter today
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="second-main-container">
              <div className="second-content">
                <p className='quote'>
                  "Unlock your path to professional success with our
                  cutting-edge cover builder app! Elevate your chances of
                  getting hired today by crafting a standout cover letter that
                  showcases your unique skills and experiences effortlessly."
                </p>
              </div>
            </div>
          </section>
          <section id="about-us">
            <div className="div-container"></div>
          </section>
        </div>
        <footer></footer>
      </div>
    );
}

export default Welcome;