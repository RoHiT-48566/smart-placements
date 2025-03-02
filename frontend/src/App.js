import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PlacementAnalysis from './pages/PlacementAnalysis';
import CompanyRecruitment from './pages/CompanyRecruitment';
import CompanyList from './pages/CompanyList';
import Chatbot from './pages/Chatbot';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analysis" element={<PlacementAnalysis />} />
            <Route path="/recruitment" element={<CompanyRecruitment />} />
            <Route path="/companies" element={<CompanyList />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;