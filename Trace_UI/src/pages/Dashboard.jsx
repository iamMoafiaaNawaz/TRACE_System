import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UploadCloud, Activity, Clock, AlertCircle, ArrowRight, FileCheck } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const Dashboard = () => {
  // --- REAL USER STATE ---
  const [userName, setUserName] = useState('Doctor');
  const [stats, setStats] = useState({ totalScans: 0, completed: 0, pending: 0, issues: 0 });
  const [recentScans, setRecentScans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- FETCH USER FROM STORAGE ---
  useEffect(() => {
    // 1. User Name Load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.fullName); // Set Name dynamically
      } catch (e) {
        console.error("Error parsing user", e);
      }
    }

    // 2. Mock API Call for Stats
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <DashboardLayout>
      
      {/* 1. DYNAMIC WELCOME HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1 text-sm">
            Welcome, <span className="font-semibold text-[#1E90FF]">{userName}</span>.
          </p>
        </div>
        
        <div className="text-right hidden md:block">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium justify-end">
            <span className="relative flex h-2.5 w-2.5">
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            System Operational
          </div>
        </div>
      </div>

      {/* 2. STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Scans" value={isLoading ? "-" : stats.totalScans} icon={<Activity size={20} />} />
        <StatCard title="Completed" value={isLoading ? "-" : stats.completed} icon={<FileCheck size={20} />} />
        <StatCard title="Pending" value={isLoading ? "-" : stats.pending} icon={<Clock size={20} />} />
        <StatCard title="Flagged Issues" value={isLoading ? "-" : stats.issues} icon={<AlertCircle size={20} />} />
      </div>

      {/* 3. MAIN ACTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 bg-[#1E90FF] rounded-3xl p-8 text-white shadow-xl shadow-blue-200 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">Start New Analysis</h2>
            <p className="text-blue-100 text-sm max-w-md leading-relaxed">
              Upload a dermoscopic image. The system will strictly validate the image quality before processing.
            </p>
          </div>
          <Link to="/dashboard/upload" className="relative z-10 bg-white text-[#1E90FF] px-8 py-4 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-sm">
            <UploadCloud size={18} />
            Upload Image
          </Link>
        </div>

        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-center items-start shadow-sm">
          <div className="bg-slate-50 p-3 rounded-xl mb-4">
            <FileCheck size={24} className="text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">Recent Results</h2>
          <p className="text-slate-500 text-sm mb-6">View past classification details.</p>
          <Link to="/dashboard/history" className="text-[#1E90FF] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* 4. RECENT ACTIVITY */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Recent Results</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-400 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-8 py-4">Scan Date</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Result</th>
                <th className="px-8 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentScans.length > 0 ? (
                recentScans.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td>{item.date}</td>
                    {/* ... (Rows rendering logic) */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-8 py-12 text-center text-slate-400 text-sm">
                    No analysis results found. Upload an image to start.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </DashboardLayout>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4 shadow-sm">
    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 border border-slate-100">
      {icon}
    </div>
    <div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{value}</h3>
    </div>
  </div>
);

export default Dashboard;