import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- 1. Public Pages Imports ---
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Terms from './pages/Terms';
import Contact from './pages/Contact';

// --- 2. Dashboard Pages Imports ---
import Dashboard from './pages/Dashboard';       // Main Dashboard Home
import NewAnalysis from './pages/NewAnalysis';   // Upload & Analysis Flow
import History from './pages/History';           // Past Records

function App() {
  return (
    <Router>
      <Routes>
        
        {/* ==============================
            PUBLIC ROUTES (Accessible to Everyone)
           ============================== */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />

        {/* ==============================
            DASHBOARD ROUTES (Ideally Protected)
           ============================== */}
        
        {/* Main Dashboard Overview */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* New Analysis Workflow (Upload -> Result) */}
        <Route path="/dashboard/upload" element={<NewAnalysis />} />
        
        {/* Patient History List */}
        <Route path="/dashboard/history" element={<History />} />

        {/* ==============================
            FALLBACK ROUTE
           ============================== */}
        {/* Agar koi ghalat URL dale to wapis Welcome page par bhejo */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;