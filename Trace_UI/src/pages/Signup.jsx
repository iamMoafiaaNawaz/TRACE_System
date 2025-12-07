import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, User, Briefcase, Check, X } from 'lucide-react'
import PrimaryButton from '../components/PrimaryButton'
import InputField from '../components/InputField'
import traceLogo from '../assets/trace-logo.png' 
import axios from 'axios' // IMPORT AXIOS

const Signup = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  // ERROR STATE KO SERVER RESPONSE SHOW KARNE KE LIYE USE KARENGE
  const [error, setError] = useState('') 

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'Student',
  })

  // Logic
  const [validations, setValidations] = useState({
    minLength: false,
    hasNumber: false,
    hasUpper: false,
    hasSymbol: false,
  })
  const [strength, setStrength] = useState(0) 

  // Smart Checker
  useEffect(() => {
    const pwd = formData.password
    const checks = {
      minLength: pwd.length >= 8,
      hasNumber: /\d/.test(pwd),
      hasUpper: /[A-Z]/.test(pwd),
      hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    }
    setValidations(checks)
    const score = Object.values(checks).filter(Boolean).length
    setStrength(score)
  }, [formData.password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (strength < 4) return

    setLoading(true)
    setError('')

    try {
      // --- ASLI BACKEND CALL ---
      const response = await axios.post('http://127.0.0.1:5000/api/auth/signup', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      console.log("Signup Success:", response.data);
      setLoading(false);
      
      // Success ke baad Login par bhejo
      alert("Account Created Successfully! Please Login.");
      navigate('/login'); 

    } catch (err) {
      console.error("Signup Error:", err);
      // Agar backend se error aya (e.g. Email exists), wo yahan dikhega
      setError(err.response?.data?.error || "Server Error: Could not connect to Backend.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden font-sans">
      
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-300/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#1E90FF]/20 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-100 border border-white/60 p-8"
      >
        <div className="text-center mb-6">
          <div className="inline-flex justify-center items-center w-14 h-14 bg-white rounded-2xl shadow-sm mb-3 p-2">
            <img src={traceLogo} alt="TRACE" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Create Account</h2>
          <p className="text-slate-500 text-sm">Join TRACE AI System</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <InputField
            label="Full Name"
            type="text"
            placeholder="Dr. Ali Khan"
            required
            icon={<User className="w-5 h-5" />}
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />

          <InputField
            label="Email Address"
            type="email"
            placeholder="doctor@hospital.com"
            required
            icon={<Mail className="w-5 h-5" />}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Role</label>
            <div className="relative">
              <Briefcase className="absolute left-4 top-3.5 text-slate-400" size={20} />
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full pl-12 pr-10 py-3.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E90FF] appearance-none text-slate-700 font-medium cursor-pointer"
              >
                <option value="Student">Medical Student</option>
                <option value="Clinician">Clinician / Doctor</option>
                <option value="Admin">Administrator</option>
              </select>
            </div>
          </div>

          <div>
            <InputField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              required
              icon={<Lock className="w-5 h-5" />}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              rightIcon={
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-[#1E90FF]">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              }
            />

            {formData.password && (
              <div className="mt-3 animate-fade-in">
                <div className="h-1.5 w-full bg-slate-100 rounded-full mb-3 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ease-out ${
                      strength <= 2 ? 'bg-red-400' : strength === 3 ? 'bg-yellow-400' : 'bg-green-500'
                    }`}
                    style={{ width: `${(strength / 4) * 100}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <RequirementBadge met={validations.minLength} label="8+ Characters" />
                  <RequirementBadge met={validations.hasNumber} label="1 Number" />
                  <RequirementBadge met={validations.hasUpper} label="1 Uppercase" />
                  <RequirementBadge met={validations.hasSymbol} label="1 Symbol" />
                </div>
              </div>
            )}
          </div>

          {/* ERROR MESSAGE DISPLAY */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg text-center border border-red-100">
              {error}
            </p>
          )}

          <PrimaryButton 
            type="submit" 
            className="w-full mt-2 bg-blue-700 hover:bg-blue-800 shadow-lg shadow-blue-900/20" 
            disabled={strength < 4 || loading}
          >
            {loading ? 'Connecting to Server...' : 'Create Account'}
          </PrimaryButton>

        </form>

        <p className="text-center mt-6 text-slate-500 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-700 font-bold hover:underline">
            Login
          </Link>
        </p>

      </motion.div>
    </div>
  )
}

const RequirementBadge = ({ met, label }) => (
  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-300 ${
    met 
      ? 'bg-green-50 border-green-200 text-green-700' 
      : 'bg-slate-50 border-slate-100 text-slate-400'
  }`}>
    {met ? <Check size={12} strokeWidth={3} /> : <div className="w-3 h-3 rounded-full bg-slate-200" />}
    {label}
  </div>
);

export default Signup