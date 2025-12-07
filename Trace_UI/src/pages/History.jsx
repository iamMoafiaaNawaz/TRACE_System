import React from 'react';
import { FileText, Download, Calendar, Search } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

const History = () => {
  // Mock Data (Sirf "My Scans")
  const historyData = [
    { id: 101, date: 'Dec 07, 2025', diagnosis: 'Melanoma', confidence: '94%', status: 'Suspicious' },
    { id: 102, date: 'Dec 06, 2025', diagnosis: 'Nevus', confidence: '98%', status: 'Benign' },
    { id: 103, date: 'Nov 28, 2025', diagnosis: 'Benign Keratosis', confidence: '89%', status: 'Benign' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto font-sans">
        
        {/* Header with Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">My Analysis History</h1>
            <p className="text-slate-500 text-sm">View past reports and diagnosis.</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by date..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#1E90FF] w-64"
            />
          </div>
        </div>
        
        {/* Simple Clean Table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Date Scanned</th>
                <th className="px-6 py-4">Diagnosis Result</th>
                <th className="px-6 py-4">Confidence</th>
                <th className="px-6 py-4">Risk Level</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {historyData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-600 flex items-center gap-2">
                    <Calendar size={16} className="text-slate-400" />
                    {item.date}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">
                    {item.diagnosis}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {item.confidence}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'Suspicious' 
                        ? 'bg-red-50 text-red-700 border border-red-100' 
                        : 'bg-green-50 text-green-700 border border-green-100'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-3">
                    <button className="text-slate-400 hover:text-[#1E90FF] transition-colors" title="View Report">
                      <FileText size={18} />
                    </button>
                    <button className="text-slate-400 hover:text-[#1E90FF] transition-colors" title="Download">
                      <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {historyData.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-sm">
              No history found. Start your first scan.
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default History;