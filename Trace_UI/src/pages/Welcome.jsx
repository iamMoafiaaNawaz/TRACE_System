import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import skinBg from '../assets/skin-bg.jpg'; 
import traceLogo from '../assets/trace-logo.png'; 

const Welcome = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white font-sans">
      
      {/* 1. Background Image (Opacity 40%) */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none" 
        style={{
          backgroundImage: `url(${skinBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* 2. Top Navigation */}
      <nav className="relative z-10 w-full p-6 flex justify-between items-center max-w-7xl mx-auto">
        
        {/* LOGO STYLING (NEW) */}
        <div className="flex items-center gap-3">
          {/* Logo Container - Makes it look like a rounded badge */}
          <div className="w-14 h-14 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center p-2 overflow-hidden transition-transform hover:scale-105">
            <img 
              src={traceLogo} 
              alt="TRACE" 
              className="w-full h-full object-contain" 
            />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight hidden md:block">TRACE</span>
        </div>

        <Link 
          to="/login" 
          className="bg-white/80 backdrop-blur-sm px-6 py-2.5 rounded-full text-slate-700 font-semibold hover:text-[#1E90FF] border border-slate-200 shadow-sm transition-all hover:shadow-md"
        >
          Login
        </Link>
      </nav>

      {/* 3. Main Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto mt-[-40px]">
        
        {/* Badge */}
        <span className="bg-blue-100/90 backdrop-blur-sm text-[#1E90FF] px-5 py-2 rounded-full text-sm font-bold mb-8 border border-blue-200 tracking-wide uppercase shadow-sm">
          AI Dermatology Assistant
        </span>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight drop-shadow-sm">
          Detect Early. <br/>
          <span className="text-[#1E90FF]">Treat Confidently.</span>
        </h1>

        {/* Subtitle */}
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm mb-10 max-w-3xl">
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium">
            TRACE helps medical students and clinicians analyze dermoscopic images 
            with AI-powered precision for faster, reliable skin cancer detection.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <Link 
            to="/login"
            className="px-10 py-4 bg-[#1E90FF] hover:bg-blue-600 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transform hover:-translate-y-1"
          >
            Start Analysis
            <ArrowRight size={20} />
          </Link>
          
          <Link 
            to="/signup"
            className="px-10 py-4 bg-white/90 hover:bg-white text-slate-700 border border-slate-300 hover:border-[#1E90FF] hover:text-[#1E90FF] rounded-full font-bold text-lg transition-all flex items-center justify-center shadow-md hover:shadow-lg"
          >
            Create Account
          </Link>
        </div>

      </main>

      {/* 4. Footer with Updated Links */}
      <footer className="relative z-10 py-8 text-center border-t border-slate-200/50 bg-white/30 backdrop-blur-sm">
        
        {/* Navigation Links in Footer */}
        <div className="flex justify-center gap-6 mb-4 text-sm font-semibold text-slate-600">
          <Link to="/about" className="hover:text-[#1E90FF] transition-colors">About Us</Link>
          <span className="text-slate-300">•</span>
          <Link to="/terms" className="hover:text-[#1E90FF] transition-colors">Terms of Service</Link>
          <span className="text-slate-300">•</span>
          <Link to="/contact" className="hover:text-[#1E90FF] transition-colors">Contact Support</Link>
        </div>

        <p className="text-slate-400 font-medium text-xs">
          © 2025 TRACE System. Empowering Healthcare with AI.
        </p>
      </footer>

    </div>
  );
};

export default Welcome;