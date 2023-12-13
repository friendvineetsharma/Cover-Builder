// App.js
import React from 'react';
import Form from './components/form/Form';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import Welcome from './components/welcome/Welcome';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/coverbuildergenerator" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
