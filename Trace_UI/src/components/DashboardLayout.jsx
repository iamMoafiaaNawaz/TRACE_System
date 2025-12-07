import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UploadCloud, History, LogOut, Menu, X } from 'lucide-react';
import traceLogo from '../assets/trace-logo.png';

const DashboardLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // --- 1. DYNAMIC USER STATE ---
  const [user, setUser] = useState({ fullName: 'User', role: 'Guest' });

  // --- 2. LOAD USER FROM LOCAL STORAGE ---
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { name: 'Overview', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'New Analysis', icon: <UploadCloud size={20} />, path: '/dashboard/upload' },
    { name: 'History', icon: <History size={20} />, path: '/dashboard/history' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-100">
          <img src={traceLogo} alt="TRACE" className="h-8 w-auto" />
          <span className="font-bold text-slate-800 text-lg">TRACE</span>
        </div>

        <nav className="p-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive 
                    ? 'bg-[#1E90FF]/10 text-[#1E90FF]' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* TOP HEADER */}
        <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 px-6 flex items-center justify-between">
          <button className="md:hidden text-slate-500" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>

          <div className="flex-1"></div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              {/* --- 3. DYNAMIC NAME & ROLE --- */}
              <p className="text-sm font-bold text-slate-800">{user.fullName}</p>
              <p className="text-xs text-slate-500">{user.role} Account</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-[#1E90FF] font-bold border border-blue-200">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="p-6 overflow-y-auto">
          {children}
        </main>

      </div>
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />}
    </div>
  );
};

export default DashboardLayout;