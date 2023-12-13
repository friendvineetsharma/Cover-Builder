import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBuildingUser, faUser, faWandMagicSparkles, faPeopleGroup, faLaptopFile, faFile} from '@fortawesome/free-solid-svg-icons'
import './Form.css'
import image1 from '../../assets/interview.svg'
import image2 from '../../assets/generate.svg'
import { useNavigate, Link } from 'react-router-dom';
const Form = () => {


  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);


  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [details, setDetails] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [count, setCount] = useState(0);



  useEffect(() => {
    let interval;

    if (isLoading === true) {
      interval = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isLoading]);

  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('company', company);
    formData.append('position', position);
    formData.append('details', details);
    axios
      .post("http://localhost:8081/generate", { name, company, position, details})
      .then((response) => {
        setCoverLetter(response.data);
        localStorage.setItem('coverLetter', coverLetter);
        setCount(0)
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

      

   const upload = new FormData();
    upload.append("file", file);
    await axios
      .post("http://localhost:8081/upload", upload)
      .then((res) => {})
      .catch((er) => console.log(er));
  }
        // //upload
        //   const uploadData = () => {
        //     const upload = new FormData();
        //     upload.append("file", file);
        //     axios
        //       .post("http://localhost:8081/upload", upload)
        //       .then((res) => {})
        //       .catch((er) => console.log(er));
        //   };
       
        
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="container-1">
      <header className="header-container">
        <div className="header-logo">
          <h2 className="welcome-header">
            <span className="cover-logo">cover</span>builder.
          </h2>
        </div>
        <div className="navbar">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
        </div>
      </header>
      {/* <h1 className='text-logo'><span className='cover-logo'>cover</span> builder.</h1> */}
      <div className="cover-container">
        {/* <img src={image1} alt="" className="image-1" /> */}
        <form onSubmit={handleSubmit} className="form-1">
          <h3 className="page2-h3">We like to know you!</h3>
          <div className="input-field-1">
            <FontAwesomeIcon icon={faUser} className="icon" />
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              autoComplete="off"
            />
          </div>
          <div className="input-field-1">
            <FontAwesomeIcon icon={faBuildingUser} className="icon" />
            <input
              type="text"
              id="company"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
              autoComplete="off"
            />
          </div>
          <div className="input-field-1">
            <FontAwesomeIcon icon={faPeopleGroup} className="icon" />
            <input
              type="text"
              id="position"
              name="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Position"
              autoComplete="off"
            />
          </div>
          <div className="input-field-text">
            <FontAwesomeIcon icon={faLaptopFile} className="icon" />
            <textarea
              id="details"
              name="details"
              rows="3"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Paste Job Description Here... (Optional)"
            ></textarea>
          </div>
          {/* <h4 className='resume-h4'>Attach Resume</h4> */}
          {/* <div className="input-field-1"> */}
          <FontAwesomeIcon icon={faFile} className="icon" />
          <input
            type="file"
            name="resume"
            id="resume"
            className="upload"
            hidden
            onChange={handleFileChange}
          />
          <label htmlFor="resume" className="label-resume">
            Attach Resume (PDF)
          </label>
          <span className="file-name">{fileName}</span>
          {/* </div> */}

          <button type="submit" className="btn2">
            Generate Cover Letter
          </button>

          {/* <img src={image2} alt='image2' className='image2' /> */}
        </form>
        {/* <button type="submit" className="btn2">
              Upload
            </button> */}
        <form className="form-2">
          {/* <h3 className='page2-h3'>Cover Letter</h3> */}
          {isLoading && (
            <div className="loading">
              <FontAwesomeIcon icon={faWandMagicSparkles} />
              Please wait while we generate your cover letter...{count}
            </div>
          )}
          <textarea className="result-letter" value={coverLetter} disabled />
        </form>
      </div>
    </div>
  );
}

export default Form;
