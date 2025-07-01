import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import ProjectDetails from '../pages/ProjectDetails';
import ProjectManager from '../pages/ProjectManager';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/project-manager" element={<ProjectManager />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
